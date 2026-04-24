import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Req } from "@nestjs/common";
import { CreatorDTO } from "./creator.dto";
import { CreatorService } from "./creator.service";
import { UploadDTO } from "./upload/upload.dto";
import { Creator } from "./creator.entity";
import { LoginDTO } from "./login.dto";
import { Upload } from "./upload/upload.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { Request } from '@nestjs/common';
import { request } from "http";
import {
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateUploadDTO } from "./upload/update-upload.dto";




@Controller('creator')
export class CreatorController {
    constructor(
        private readonly creatorService: CreatorService,

    ) { }

    @Post("register")
    @UsePipes(
        new ValidationPipe({
        }),
    )
    register(@Body() dto: CreatorDTO) {
        return this.creatorService.create(dto)
    }

    @UseGuards(AuthGuard)
    @Get(':id/upload/:uploadId')
    async getUpload(
        @Param('id', ParseIntPipe) creatorId: number,
        @Param('uploadId', ParseIntPipe) uploadId: number,
    ) {
        return this.creatorService.getUpload(creatorId, uploadId);
    }


    @UseGuards(AuthGuard)
    @Put(':id/update')
    @UsePipes(new ValidationPipe())
    updateCreator(@Body() dto: CreatorDTO, @Param("id", ParseIntPipe) id: number) {
        return this.creatorService.updateCreator(id, dto)
    }

    @UseGuards(AuthGuard)
    @Get(':id/uploads')
    async getAllUploads(@Param('id', ParseIntPipe) creatorId: number) {
        return this.creatorService.getAllUploads(creatorId);
    }
    // @Post("newupload/:id")
    // @UsePipes(new ValidationPipe()) 
    // addUpload(@Body() dto:UploadDTO, @Param(("id"), ParseIntPipe)id){
    //     return this.creatorService.addUpload(dto, id);
    // }

    // @Get("allupload/:creatorid")
    // getAllUploads(@Param(("creatorid"), ParseIntPipe)id){
    //     return this.creatorService.getAllUpload(id)
    // }

    // @Get('getuploads/:id')
    // async getUpload(@Param('id', ParseIntPipe) id: number) {
    //     return this.creatorService.getUploadById(id);
    // }

    @Get("alluploads/:uploadid")
    getCreatorByUpload(@Param(("uploadid"), ParseIntPipe) id) {
        return this.creatorService.getCreator(id)
    }

    @Patch("uploadtitle")
    updateUploadTitle(
        @Query('uploadId', ParseIntPipe) uploadId: number,
        @Query("title") newTitle: string
    ) {
        return this.creatorService.patchUploadTitle(uploadId, newTitle);
    }

    @UseGuards(AuthGuard)
    @Delete(':id/upload/:uploadId')
    async deleteUpload(
        @Param('id', ParseIntPipe) creatorId: number,
        @Param('uploadId', ParseIntPipe) uploadId: number,
    ) {
        return this.creatorService.deleteUpload(creatorId, uploadId);
    }

    @UseGuards(AuthGuard)
    @Get(':id/profile')
    async getProfile(@Param('id', ParseIntPipe) creatorId: number) {
        return this.creatorService.getCreatorProfile(creatorId);
    }


    @UseGuards(AuthGuard)
    @Post(':id/createupload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './images',
                filename: (req, file, cb) => {
                    const uniqueName =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname));
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    return cb(new Error('Only image files allowed!'), false);
                }
                cb(null, true);
            },
        }),
    )
    async uploadFile(
        @Param('id', ParseIntPipe) creatorId: number,
        @Body() dto: UploadDTO,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.creatorService.addUploadWithFile(dto, creatorId, file);
    }

    @UseGuards(AuthGuard)
    @Put(':id/upload/:uploadId')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './images',
                filename: (req, file, cb) => {
                    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname));
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    return cb(new Error('Only image files allowed!'), false);
                }
                cb(null, true);
            },
        }),
    )
    async updateUpload(
        @Param('id', ParseIntPipe) creatorId: number,
        @Param('uploadId', ParseIntPipe) uploadId: number,
        @Body() dto: UpdateUploadDTO,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.creatorService.updateUpload(dto, creatorId, uploadId, file);
    }

}



