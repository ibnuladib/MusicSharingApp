import { Body, Controller, Get, Request, Post, Param, Patch, Query, Put, Delete, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, BadRequestException, ParseIntPipe, UseGuards } from "@nestjs/common";
import { consumerService } from "./consumer.service";
import { consumerDTO } from "./consumer.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { consumerEntity } from "./consumer.entity";
import { consumerLikesEntity } from "./consumerLikes.entity";
import { consumerCommentsEntity } from "./consumerComments.entity";
import { AuthGuard } from "src/auth/auth.guard";


@Controller("consumer")
export class consumerController {
    constructor(private readonly consmrService: consumerService) { }


    @Get()
    printget(): string {
        return "Default get"
    }

    @Get("get")
    getConsumerHello(): string {
        return this.consmrService.getConsumerService();
    }

    @Get("get/:id")
    getConsumerID(@Param("id") id: string) {
        return this.consmrService.getParam(id)

    }


    @Get("getname")
    getQuery(@Query("name") name: string): string {
        return this.consmrService.getQuery(name)
    }

    @Post("post")
    createConsumer(@Body() mydata: consumerDTO): consumerDTO {
        // console.log(mydata.name);
        return this.consmrService.createConsumer(mydata)
    }

    @Patch("patch")
    updateOne(@Query("id") id: string) {
        return this.consmrService.updateOne(id)
    }

    @Put("put")
    updateDTO(@Body() updateData: consumerDTO): object {
        return this.consmrService.updateDTO(updateData)
    }

    @Delete("delete/:id")
    deleteUpload(@Param("id") id: string) {
        return this.consmrService.deleteData(id)
    }

    @Post("validate")
    @UsePipes(new ValidationPipe())
    validatedData(@Body() validatedData: consumerDTO): object {
        return this.consmrService.validated(validatedData)
    }

    @Post('upload-profile/:id')
    @UseInterceptors(FileInterceptor('file',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new BadRequestException("File Size more than 2MB or is not an image"), false)
                }
            },
            limits: { fileSize: 2 * 1024 * 1024 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }))
    async uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        const filename = file.filename;
        await this.consmrService.updateProfilePicture(Number(id), filename);
        return { message: "Profile picture uploaded successfully", filename };
    }

    //DB

    @Post("dbcreatequery")
    dbCreateConsumerQuery(
        @Query("fullName") fullName: string,
        @Query("age") age: string,
        @Query("status") status: "active" | "inactive"
    ) {

        const newConsumer = {
            fullName,
            age: Number(age),
            status
        } as consumerEntity

        return this.consmrService.dbCreateConsumer(newConsumer);
    }


    @Post('dbentry')
    dbCreateConsumer(@Body() mydbdata: consumerEntity) {
        return this.consmrService.dbCreateConsumer(mydbdata)

    }

    @Post('dblikeentry')
    dbCreateLike(@Body() mydbdata: consumerLikesEntity) {
        return this.consmrService.dbCreateLike(mydbdata)

    }

    @UseGuards(AuthGuard)
    @Get('dbshow')
    dbGetUsers() {
        return this.consmrService.dbGetUsers()
    }

    @Get('dbshowID/:id')
    dbGetUserById(@Param("id") id: number) {
        return this.consmrService.dbGetUserById(id)
    }

    @Get('dbshowName/:name')
    dbGetUserByName(@Param("name") name: string) {
        return this.consmrService.dbGetUserByName(name)
    }

    @Get('dbshowID')
    dbGetUserByIdQuery(@Query() qry: any) {
        return this.consmrService.dbGetUserByIdQuery(qry)
    }

    @Put("dbupdate/:id")
    dbUpdateUser(@Param("id") myid: string, @Body() updatedInfo: consumerEntity) {
        return this.consmrService.dbUpdateUser(myid, updatedInfo)
    }

    @Delete("dbdelete/:id")
    dbDeleteUser(@Param("id") id: number) {
        return this.consmrService.dbDeleteUser(id)
    }

    @Get("dbinactive")
    dbInactive() {
        return this.consmrService.dbInactive()
    }

    @Get("dbolder")
    dbOlder() {
        return this.consmrService.dbOlder()
    }

    // Consumer Likes Routes
    @Post('like')
    createLike(@Body() newLike: consumerLikesEntity) {
        return this.consmrService.dbCreateLike(newLike);
    }

    @Get('showlikes')
    getAllLikes() {
        return this.consmrService.getAllLikes();
    }

    @Get('showlikes/:id')
    getLikeById(@Param('id') id: string) {
        return this.consmrService.getLikeById(Number(id));
    }

    @Delete('deletelikes/:id')
    deleteLike(@Param('id') id: string) {
        return this.consmrService.deleteLike(Number(id));
    }

    // Consumer Comments Routes
    @Post('comment')
    createComment(@Body() newComment: consumerCommentsEntity) {
        return this.consmrService.createComment(newComment);
    }

    @Get('showcomments')
    getAllComments() {
        return this.consmrService.getAllComments();
    }

    @Get("showcomments/:id")
    getCommentById(@Param("id", ParseIntPipe) id: number) {
        return this.consmrService.getCommentById(id);
    }

    @Delete('deletecomments/:id')
    deleteComment(@Param('id') id: string) {
        return this.consmrService.deleteComment(Number(id));
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }


    @Get('dbuserfromcomment/:id')
    dbFKGetUserById(@Param("id") id: number) {
        return this.consmrService.dbUserFromComment(id)
    }

    @Get('dbcommentfromuser/:id')
    dbFKGetCommentById(@Param("id") id: number) {
        return this.consmrService.dbCommentFromUser(id)
    }

    @Get('dbuserfromlike/:id')
    dbFKGetUserByLikeId(@Param("id") id: number) {
        return this.consmrService.dbUserFromLike(id)
    }
    @Get('dblikefromuser/:id')
    dbFKGetLikeByUserId(@Param("id") id: number) {
        return this.consmrService.dbLikeFromUser(id)
    }





}

