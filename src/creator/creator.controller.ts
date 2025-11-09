import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreatorDTO } from "./creator.dto";
import { CreatorService } from "./creator.service";
import { UploadDTO } from "./upload.dto";


@Controller('creator')
export class CreatorController {
    constructor(private readonly creatorService: CreatorService) {}

    @Get("user")
    getCreatorHello() : object {
        return this.creatorService.getCreator();
    }

    @Post("register")
    @UsePipes(new ValidationPipe())
    registerCreator(@Body() data: CreatorDTO) : object {
        return this.creatorService.registerCreator(data);
    }

    @Post("upload")
    upload(@Body() data: UploadDTO) : object {
        return this.creatorService.upload(data);
    }

    @Get("uploads")
    getAllUploads() :object {
        return this.creatorService.getAllUploads();
    }

    @Get("uploads/:id")
    getUpload(@Param("id") id: number) : object{
        return this.creatorService.getUploadById(id);
    }

    @Delete("uploads/:id")
    deleteUpload(@Param("id") id: number) :object {
        return this.creatorService.deleteUpload(id);
    }

    @Put("uploads/:id")
    replaceUpload(@Param("id") id: number, @Body() data: UploadDTO) :object{
        return this.creatorService.replaceUpload(id, data);
    }

    @Patch("uploads/:id")
    patchUploadTitle(@Param("id") id: number, @Body() data: UploadDTO, @Query("title") title: string) :object {
        return this.creatorService.patchUploadTitle(id, data, title);
    }


}