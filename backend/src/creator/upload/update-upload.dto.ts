import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateUploadDTO {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Title cannot be empty' })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Description cannot be empty' })
  description?: string;
}