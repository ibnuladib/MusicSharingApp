import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsUrl, Matches } from "class-validator";

export class CreatorDTO{
    
    name: string;
    email: string;
    password: string;
    @IsArray()
    @IsInt({ each: true })
    @IsIn([1, 2, 3, 4, 5], { each: true })
    genreIds: number[];
    birthyear: number;
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