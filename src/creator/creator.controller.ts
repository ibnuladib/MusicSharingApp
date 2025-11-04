import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from "@nestjs/common";
import { CreatorDTO } from "./creator.dto";
import { CreatorService } from "./creator.service";
import { UploadDTO } from "./upload.dto";


@Controller('creator')
export class CreatorController {
    constructor(private readonly creatorService: CreatorService) {}

    @Get("user")
    getCreatorHello() {
        return this.creatorService.getCreator();
    }

    @Post("register")
    registerCreator(@Body() data: CreatorDTO) {
        return this.creatorService.registerCreator(data);
    }

    @Post("upload")
    upload(@Body() data: UploadDTO) {
        return this.creatorService.upload(data);
    }

    @Get("uploads")
    getAllUploads() {
        return this.creatorService.getAllUploads();
    }

    @Get("uploads/:id")
    getUpload(@Param("id") id: string) {
        return this.creatorService.getUploadById(Number(id));
    }

    @Delete("uploads/:id")
    deleteUpload(@Param("id") id: string) {
        return this.creatorService.deleteUpload(Number(id));
    }

    @Put("uploads/:id")
    replaceUpload(@Param("id") id: string, @Body() data: UploadDTO) {
        return this.creatorService.replaceUpload(Number(id), data);
    }

    @Patch("uploads/:id/title")
    patchUploadTitle(@Param("id") id: string, @Body() data: UploadDTO, @Query("title") title: string) {
        return this.creatorService.patchUploadTitle(Number(id), data, title);
    }


}