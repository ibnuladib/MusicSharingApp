import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreatorDTO } from "./creator.dto";
import { UploadDTO } from "./upload/upload.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Creator } from "./creator.entity";
import { In, IsNull, Repository } from "typeorm";
import { Genre } from "./genre/genre.entity";
import * as bcrypt from 'bcrypt';
import { Upload } from "./upload/upload.entity";
import { LoginDTO } from "./login.dto";
import { MailerService } from "@nestjs-modules/mailer";
import path from "path";
import * as fs from 'fs';
import { ForbiddenException } from "@nestjs/common";
import { UpdateUploadDTO } from "./upload/update-upload.dto";
import { PusherService } from "../shared/pusher.service";
@Injectable()
export class CreatorService {
  constructor(
    @InjectRepository(Creator)
    private creatorRepository: Repository<Creator>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
    private mailerService: MailerService,
    private pusherService: PusherService
  ) { }
  async create(dto: CreatorDTO): Promise<Creator> {
    const genre = await this.genreRepository.find({
      where: {
        id: In(dto.genreIds)
      }
    });

    if (genre.length !== dto.genreIds.length) {
      throw new HttpException(
        "Genre does not exist.",
        HttpStatus.BAD_REQUEST
      );
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.password, salt);

    const creator = this.creatorRepository.create({
      fullName: dto.name,
      email: dto.email,
      password: hashPassword,
      genres: genre,
      birthyear: dto.birthyear
    })

    if (!creator) {
      throw new HttpException("Sign up failed", HttpStatus.BAD_REQUEST)
    }

    await this.mailerService.sendMail({
      to: dto.email,
      subject: "Welcome",
      text: "Dear Creator, Welcome to the APP",
    });

    return await this.creatorRepository.save(creator);
  }

  async validateCreator(dto: LoginDTO) {

    const creator = await this.creatorRepository.findOne({
      where: {
        email: dto.email
      },
    });

    if (!creator) return null;
    const isMatch = await bcrypt.compare(dto.password, creator.password);
    return isMatch ? creator : null;
  }

  async updateCreator(creatorId: number, dto: CreatorDTO) {
    const creator = await this.creatorRepository.findOne({ where: { id: creatorId } });

    if (!creator) throw new HttpException("Creator not found", HttpStatus.NOT_FOUND);
    if (dto.name) creator.fullName = dto.name;
    if (dto.email) creator.email = dto.email;
    if (dto.password) {
      const salt = await bcrypt.genSalt();
      creator.password = await bcrypt.hash(dto.password, salt);
    }
    if (dto.birthyear) creator.birthyear = dto.birthyear;

    if (dto.genreIds) {
      const genre = await this.genreRepository.find({
        where: {
          id: In(dto.genreIds)
        }
      });
      if (genre.length !== dto.genreIds.length) {
        throw new HttpException("Genre does not exist.", HttpStatus.BAD_REQUEST);
      }
      creator.genres = genre;
    }

    return this.creatorRepository.save(creator);
  }

  async logout() {
    return { message: "Logged out" }
  }

  async addUpload(dto: UploadDTO, creatorId: number): Promise<Upload> {
    const creator = await this.findOneById(creatorId);
    if (!creator) throw new NotFoundException('Creator not found');

    const upload = this.uploadRepository.create({
      ...dto,
      creator,
    });
    return this.uploadRepository.save(upload);
  }

  async getAllUpload(creatorId: number): Promise<Upload[]> {
    return await this.uploadRepository.find({
      where: { creator: { id: creatorId } },
    });
  }


  async getCreator(id: number) {
    const creator = await this.uploadRepository.find({
      where: { creator: { id: id } },
      relations: ["creators"]
    });

    return
  }

  async patchUploadTitle(id: number, uploadTitle: string): Promise<Upload> {
    let upload = await this.uploadRepository.findOne({
      where: { id: id, }
    });

    if (!upload) throw new NotFoundException("Upload not found");

    upload.title = uploadTitle;

    return await this.uploadRepository.save(upload);
  }

  async deleteUpload(creatorId: number, uploadId: number) {
    const upload = await this.uploadRepository.findOne({
      where: { id: uploadId },
      relations: ['creator'],
    });

    if (!upload) {
      throw new NotFoundException('Upload not found');
    }

    if (upload.creator.id !== creatorId) {
      throw new ForbiddenException('You do not have permission to delete this upload');
    }

    // Delete the file from filesystem
    if (upload.filePath) {
      this.deleteFile(upload.filePath);
    }

    await this.uploadRepository.remove(upload);

    return { message: 'Upload deleted successfully', uploadId };
  }

  async findOne(loginData: LoginDTO): Promise<Creator | null> {
    return this.creatorRepository.findOne({
      where: { email: loginData.email },
    });
  }

  async getCreatorProfile(creatorId: number) {
    const creator = await this.creatorRepository.findOne({
      where: { id: creatorId },
      relations: ['genres']
    });
    if (!creator) throw new NotFoundException('Creator not found');
    const { password, ...profile } = creator;
    return profile;
  }

  async findOneById(id: number): Promise<Creator | null> {
    return this.creatorRepository.findOneBy({ id });
  }

  async addUploadWithFile(
    dto: UploadDTO,
    creatorId: number,
    file: Express.Multer.File,
  ): Promise<Upload> {
    const creator = await this.findOneById(creatorId);
    if (!creator) throw new NotFoundException('Creator not found');

    const upload = this.uploadRepository.create({
      title: dto.title,
      description: dto.description,
      filePath: file.path,       // images/filename.jpg
      fileType: file.mimetype,   // image/jpeg
      creator,
    });

    const savedUpload = await this.uploadRepository.save(upload);

    await this.pusherService.trigger('upload-channel', 'new-upload', {
      message: `New upload: ${savedUpload.title}`,
      upload: savedUpload
    });

    return savedUpload;
  }

  async updateUpload(
    dto: UpdateUploadDTO,
    creatorId: number,
    uploadId: number,
    file?: Express.Multer.File,
  ): Promise<Upload> {
    const upload = await this.uploadRepository.findOne({
      where: { id: uploadId },
      relations: ['creator'],
    });

    if (!upload) {
      throw new NotFoundException('Upload not found');
    }
    if (upload.creator.id !== creatorId) {
      throw new ForbiddenException('You do not have permission to update this upload');
    }
    if (dto.title !== undefined) {
      upload.title = dto.title;
    }

    if (dto.description !== undefined) {
      upload.description = dto.description;
    }
    if (file) {
      this.deleteFile(upload.filePath);

      upload.filePath = file.path;
      upload.fileType = file.mimetype;
    }

    return this.uploadRepository.save(upload);
  }

  // Helper method to delete file from filesystem
  private deleteFile(filePath: string): void {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      // Don't throw error - we still want to update the database
    }
  }


  async getUploadById(id: number): Promise<Upload> {
    const upload = await this.uploadRepository.findOne({
      where: { id },
      relations: ["creator"],
    });

    if (!upload) {
      throw new NotFoundException(`Upload with id ${id} not found`);
    }

    return upload;
  }

  async getUpload(creatorId: number, uploadId: number): Promise<Upload> {
    const upload = await this.uploadRepository.findOne({
      where: { id: uploadId },
      relations: ['creator'],
    });

    if (!upload) {
      throw new NotFoundException('Upload not found');
    }

    if (upload.creator.id !== creatorId) {
      throw new ForbiddenException('You do not have permission to view this upload');
    }

    return upload;
  }

  async getAllUploads(creatorId: number): Promise<Upload[]> {
    const creator = await this.findOneById(creatorId);
    if (!creator) throw new NotFoundException('Creator not found');

    return this.uploadRepository.find({
      where: { creator: { id: creatorId } },
      order: { id: 'DESC' }, // Most recent first
    });
  }




}


