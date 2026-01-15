import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { consumerEntity } from "./consumer.entity";
import { IsNotEmpty } from "class-validator";

@Entity("consumerComments")
export class consumerCommentsEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    id: number;
    @Column({ type: "int", unsigned: true, nullable: true })
    songID: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    songName: string;

    @Column({ type: "varchar", length: 10000 })
    comment: string;

    @IsNotEmpty()
    @ManyToOne(() => consumerEntity, consumer => consumer.consumerComments)
    @JoinColumn()
    consumerID: consumerEntity
}