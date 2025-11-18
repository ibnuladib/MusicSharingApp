import { Module } from "@nestjs/common";
import { consumerService } from "./consumer.service";
import { consumerEntity } from "./consumer.entity";
import { consumerController } from "./consumer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports : [TypeOrmModule.forFeature([consumerEntity])],
    controllers : [consumerController],
    providers : [consumerService]
})
export class consumerModule{}
