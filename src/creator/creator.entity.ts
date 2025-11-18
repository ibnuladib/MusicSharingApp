import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Creator{

    @PrimaryGeneratedColumn()
    id :string;

    @Column()
    isActive: boolean;

    @Column({type: 'varchar', nullable: true})
    fullName: string | null;

    @Column({type: 'bigint', unsigned: true})
    phone: number;


    @BeforeInsert()
    ActiveTrue(){
        this.isActive = true;
    }
}