import { Body, Controller, Post, Res, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { consumerDTO, loginDTO } from 'src/consumer/consumer.dto';
import * as bcrypt from "bcrypt"
import { consumerEntity } from 'src/consumer/consumer.entity';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @UsePipes(new ValidationPipe)
  async addUser(@Body() myobj: consumerEntity): Promise<consumerEntity> {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(myobj.password, salt);
    myobj.password = hashedpassword;
    return this.authService.signUp(myobj);
  }

  @Post('login')
  async signIn(@Body() logindata: loginDTO, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.signIn(logindata);

    // Set JWT in httpOnly cookie for secure authentication
    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return result;
  }
}
