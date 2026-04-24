import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Upload } from "./upload/upload.entity";
import { Genre } from "./genre/genre.entity";


@Entity()
export class Creator{

    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    fullName: string;

    @Column({ unique: true})
    email : string;

    @Column()
    password: string;

    @Column()
    birthyear: number;

    @OneToMany(()=>Upload, upload => upload.creator)
    uploads: Upload[];

    @ManyToMany(()=>Genre,genre => genre.creators, {cascade: true})
    @JoinTable()
    genres: Genre[];

}