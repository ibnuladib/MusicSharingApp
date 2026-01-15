import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { consumerLikesEntity } from "./consumerLikes.entity";
import { consumerCommentsEntity } from "./consumerComments.entity";
import { IsEmail, IsNotEmpty } from "class-validator";

@Entity("consumer")
export class consumerEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    id: number;
    @Column({ type: "varchar", length: 100 })
    fullName: string;
    @Column({ type: "int", unsigned: true })
    age: number
    @Column({ type: "enum", enum: ["active", "inactive"], default: "active" })
    status: "active" | "inactive"

    @Column({ type: "varchar", length: 255, nullable: true })
    profilePicture: string

    @Column({ type: "varchar", length: 200 })
    @IsEmail()
    email: string

    @Column({ type: "varchar", length: 255 })
    @IsNotEmpty()
    password: string


    @OneToOne(() => consumerLikesEntity, consumerLikes => consumerLikes.consumerID, { cascade: true })
    consumerLikes: consumerLikesEntity

    @OneToMany(() => consumerCommentsEntity, consumerComments => consumerComments.consumerID, { cascade: true })
    consumerComments: consumerCommentsEntity[]



}