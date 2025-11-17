import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches } from "class-validator";

export class consumerDTO{

    @Matches(/^(?:[A-Za-z]+)$/,{message:"Name cannot contain numbers or symbols"})
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password : string;

    @IsNumberString()
    @Length(10)
    NID : number
    
}