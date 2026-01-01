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




@Controller('creator')
export class CreatorController {
    constructor(
        private readonly creatorService: CreatorService,
        
    ) {}

    @Post("register")
    @UsePipes(new ValidationPipe())
    register (@Body() dto: CreatorDTO) {
        return this.creatorService.create(dto) 
    }


    @Put("/update/:id")
    @UsePipes(new ValidationPipe())
    updateCreator(@Body() dto: CreatorDTO, @Param("id") id: number){
        return this.creatorService.updateCreator(id,dto)
    }

    @Post("upload/:id")
    @UsePipes(new ValidationPipe()) 
    addUpload(@Body() dto:UploadDTO, @Param(("id"), ParseIntPipe)id){
        return this.creatorService.addUpload(dto, id);
    }

    @Get("allupload/:creatorid")
    getAllUploads(@Param(("creatorid"), ParseIntPipe)id){
        return this.creatorService.getAllUpload(id)
    }

    @Get("alluploads/:uploadid")
    getCreatorByUpload(@Param(("uploadid"), ParseIntPipe)id){
        return this.creatorService.getCreator(id)
    }

    @Patch("uploadtitle")
    updateUploadTitle(
        @Query('uploadId', ParseIntPipe) uploadId: number,
        @Query("title") newTitle: string
    ){
        return this.creatorService.patchUploadTitle(uploadId, newTitle);
    }

    @Delete("upload/:id")
    deleteUpload(@Param(("id"), ParseIntPipe)id: number){
        return this.creatorService.deleteUpload(id);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req){
        const email = req.user.email;
        return {
            "message":"Profile Fetched",
            "email": email
        };
    }

    @Post(':id/upload')
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

}



