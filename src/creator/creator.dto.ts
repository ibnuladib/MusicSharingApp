import { IsDateString, IsNotEmpty, IsUrl, Matches } from "class-validator";


export class CreatorDTO{
    @Matches(/^[A-Za-z]+$/, {"message" : "No numbers in name"})
    name: string;

    @(IsDateString())
    date: string;

    @IsNotEmpty({"message": "Password required"})
    @Matches(/[@#$&]/, {"message":"Password must have special character"})
    password: string;

    @IsUrl()
    fbprofile: string;
}