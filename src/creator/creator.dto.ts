import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsUrl, Matches } from "class-validator";

export class CreatorDTO{

    fullName : string;

    @Type(()=>Number)
    @IsNotEmpty()
    phone : number;
}



// export class CreatorDTO{
//     @Matches(/^[A-Za-z]+$/, {"message" : "No numbers in name"})
//     name: string;

//     @(IsDateString({},{"message":"Invalid Date"}))
//     date: string;

//     @IsNotEmpty({"message": "Password required"})
//     @Matches(/[@#$&]/, {"message":"Password must have special character"})
//     password: string;

//     @IsUrl()
//     fbprofile: string;
// }