import { Body, Controller,Get, Post,Param ,Patch, Query,Put,Delete,UseInterceptors, UploadedFile, UsePipes, ValidationPipe, BadRequestException} from "@nestjs/common";
import { consumerService } from "./consumer.service";
import { consumerDTO } from "./consumer.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError,diskStorage } from "multer";
import { consumerEntity } from "./consumer.entity";

@Controller("consumer")
export class consumerController{
    constructor(private readonly consmrService: consumerService){}


    @Get()
    printget():string{
        return "Default get"
    }

    @Get("get")
    getConsumerHello(): string{
        return this.consmrService.getConsumerService();
    }
    
    @Get("get/:id")
    getConsumerID(@Param("id") id: string){
        return this.consmrService.getParam(id)

    }


    @Get("getname")
    getQuery(@Query("name")name:string):string{
        return this.consmrService.getQuery(name)
    }

    @Post("post")
    createConsumer(@Body() mydata:consumerDTO): consumerDTO{
        // console.log(mydata.name);
        return this.consmrService.createConsumer(mydata)
    }
    
    @Patch("patch")
    updateOne(@Query("id") id:string){
        return this.consmrService.updateOne(id)
    }
    
    @Put("put")
    updateDTO(@Body() updateData:consumerDTO): object{
        return this.consmrService.updateDTO(updateData)
    }

    @Delete("delete/:id")
    deleteUpload(@Param("id") id: string) {
        return this.consmrService.deleteData(id)
    }

    @Post("validate")
    @UsePipes(new ValidationPipe())
    validatedData(@Body()validatedData:consumerDTO): object{
        return this.consmrService.validated(validatedData)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',
    { fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    cb(null, true);
    else {
    // cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    cb(new BadRequestException("File Size more than 2MB or is not an image"),false)
    }
    },
    limits: { fileSize: 2*1024*1024 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    }

    //DB

    @Post("dbcreatequery")
    dbCreateConsumerQuery(
    @Query("fullName") fullName: string,
    @Query("age") age: string,
    @Query("status") status: "active"|"inactive"
) {

    const newConsumer = {
        fullName,
        age: Number(age),
        status
    } as consumerEntity

    return this.consmrService.dbCreateConsumer(newConsumer);
}


    @Post('dbentry')
    dbCreateConsumer(@Body() mydbdata : consumerEntity){
        return this.consmrService.dbCreateConsumer(mydbdata)

    }

    @Get('dbshow')
    dbGetUsers(){
        return this.consmrService.dbGetUsers()
    }

    @Get('dbshowID/:id')
    dbGetUserById(@Param("id")id:number){
        return this.consmrService.dbGetUserById(id)
    }

    @Get('dbshowID')
    dbGetUserByIdQuery(@Query()qry:any){
        return this.consmrService.dbGetUserByIdQuery(qry)
    }

    @Put("dbupdate/:id")
    dbUpdateUser(@Param("id")myid:number,@Body() updatedInfo : consumerEntity){
        return this.consmrService.dbUpdateUser(myid,updatedInfo)
    }

    @Delete("dbdelete/:id")
    dbDeleteUser(@Param("id") id:number){
        return this.consmrService.dbDeleteUser(id)
    }

    @Get("dbinactive")
    dbInactive(){
        return this.consmrService.dbInactive()
    }

    @Get("dbolder")
    dbOlder(){
        return this.consmrService.dbOlder()
    }


    }

