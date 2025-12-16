import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Creator } from "../creator.entity";


@Entity()
export class Upload{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    filePath: string;

    @Column({ nullable: true })
    fileType: string;

    @Column()
    date: Date;

    @Column()
    description: string;

    @ManyToOne(()=>Creator,creator => creator.uploads,{onDelete: 'CASCADE'})
    creator: Creator;

    @BeforeInsert()
    insertDate(){
        this.date = new Date();
    }
}