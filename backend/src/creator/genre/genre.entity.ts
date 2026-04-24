import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Creator } from "../creator.entity";


@Entity()
export class Genre{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => Creator, creator => creator.genres)
    creators : Creator[];
}