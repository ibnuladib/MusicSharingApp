import { Body, Controller,Get, Post } from "@nestjs/common";
import { consumerService } from "./consumer.service";
import { consumerDTO } from "./consumer.dto";

@Controller("consumer")
export class consumerController{
    constructor(private readonly consmrService: consumerService){}


    @Get()
    getConsumerHello(): string{
        return this.consmrService.getConsumerService();
    }
    @Post("create")
    createConsumer(@Body() mydata:consumerDTO): object{
        // console.log(mydata.name);
        return this.consmrService.createConsumer(mydata);
    }
}