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


@Injectable()
export class CreatorService {
    constructor(
    @InjectRepository(Creator)
    private creatorRepository: Repository<Creator>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
    private mailerService: MailerService
    ){}
    async create(dto: CreatorDTO): Promise<Creator> {
        const genre = await this.genreRepository.find({
            where: {
                id: In(dto.genreIds)
            }
        });

        if (genre.length !== dto.genreIds.length){
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

        if(!creator){
            throw new HttpException("Sign up failed",HttpStatus.BAD_REQUEST)
        }

        await this.mailerService.sendMail({
            to: dto.email,
            subject: "Welcome",
            text: "Dear Creator, Welcome to the APP",
        });

        return await this.creatorRepository.save(creator);
    }

    async validateCreator(dto: LoginDTO){

        const creator = await this.creatorRepository.findOne({
            where:{
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
    }

    async logout(){
        return { message: "Logged out"}
    }

    async addUpload(dto: UploadDTO, creatorId: number): Promise<Upload>{
        const creator = await this.findOneById(creatorId);
        if (!creator) throw new NotFoundException('Creator not found');

        const upload = this.uploadRepository.create({
            ...dto,
            creator,
        });
        return this.uploadRepository.save(upload);
    }

    async getAllUpload(creatorId: number): Promise<Upload[]>{
        return await this.uploadRepository.find({
            where : { creator: {id:creatorId}},
        });
    }


    async getCreator(id: number){
            const creator =  await this.uploadRepository.find({
                where : { creator: {id:id}},
                relations: ["creators"]
            });

            return 
    }

    async patchUploadTitle(id: number,uploadTitle: string): Promise<Upload>{
        let upload = await this.uploadRepository.findOne({
            where: {id: id,}
        });

        if(!upload) throw new NotFoundException("Upload not found");

        upload.title = uploadTitle;

        return await this.uploadRepository.save(upload);
    }

    async deleteUpload(id: number){
        const upload = await this.uploadRepository.findOne({
            where:{
                id
            }
        });

        if(!upload) throw new NotFoundException("Upload not found");

        return this.uploadRepository.remove(upload);
    }

    async findOne(loginData: LoginDTO): Promise<Creator | null> {
            return this.creatorRepository.findOne({
            where: { email: loginData.email },
    });
    }

    async findOneById(id: number): Promise<Creator | null> {
            return this.creatorRepository.findOneBy({id});
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

        return this.uploadRepository.save(upload);
    }

    

}
     

