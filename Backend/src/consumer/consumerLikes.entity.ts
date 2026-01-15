import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { consumerEntity } from "./consumer.entity";
import { IsNotEmpty } from "class-validator";

@Entity("consumerLikes")
export class consumerLikesEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    id: number;

    @Column({ type: "int", unsigned: true, nullable: true })
    songID: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    songName: string;

    @IsNotEmpty({ "message": "Consumer ID must be provided" })
    @OneToOne(() => consumerEntity, consumer => consumer.consumerLikes)
    @JoinColumn()
    consumerID: consumerEntity
}
