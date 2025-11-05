import { Body, Controller,Get, Post,Param ,Patch, Query,Put,Delete} from "@nestjs/common";
import { consumerService } from "./consumer.service";
import { consumerDTO } from "./consumer.dto";

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
    createConsumer(@Body() mydata:consumerDTO): object{
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
}