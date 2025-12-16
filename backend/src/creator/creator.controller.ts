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

}



