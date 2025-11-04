import { Module } from "@nestjs/common";
import { consumerService } from "./consumer.service";
import { consumerController } from "./consumer.controller";

@Module({
    imports : [],
    controllers : [consumerController],
    providers : [consumerService]
})
export class consumerModule{}
