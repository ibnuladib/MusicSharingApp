import { Module } from "@nestjs/common";
import { consumerService } from "./consumer.service";
import { consumerEntity } from "./consumer.entity";
import { consumerController } from "./consumer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { consumerLikesEntity } from "./consumerLikes.entity";
import { consumerCommentsEntity } from "./consumerComments.entity";

@Module({
    imports : [TypeOrmModule.forFeature([consumerEntity,consumerLikesEntity,consumerCommentsEntity])],
    controllers : [consumerController],
    providers : [consumerService],
    exports: [consumerService]
})
export class consumerModule{}
