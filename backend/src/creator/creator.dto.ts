import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsUrl, Matches } from "class-validator";

export class CreatorDTO{
    
    name: string;
    email: string;
    password: string;

//   @Transform(({ value }) => {
//     // value could be string | string[]
//     if (Array.isArray(value)) return value.map(Number);
//     if (value == null) return [];
//     return [Number(value)]; // wrap single value in array
//   })
//    @IsArray()
//   @IsInt({ each: true })
//   @IsIn([1, 2, 3, 4, 5], { each: true })
 // genreIds: number[];

    @Type(() => Number) 
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