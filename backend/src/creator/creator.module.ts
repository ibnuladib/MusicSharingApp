import { Module } from "@nestjs/common";
import { CreatorController } from "./creator.controller";
import { CreatorService } from "./creator.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Creator } from "./creator.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { Genre } from "./genre/genre.entity";
import { Upload } from "./upload/upload.entity";
import { JwtModule } from "@nestjs/jwt";


@Module(
    {
        imports: [
            MailerModule.forRoot({
                transport: {
                    host: "smtp.gmail.com",
                        port: 465,
                        ignoreTLS: true,
                        secure: true,
                        auth:{
                            user: "adib.bdhk@gmail.com",
                            pass: "dlff ykml rxfu pczn"
                        },
                }
            }),
            JwtModule.register({
                global: true,
                secret: "Admin",
                signOptions: {expiresIn: "30m",}
            }),
            TypeOrmModule.forFeature([Creator, Upload, Genre])],
        controllers: [CreatorController],
        providers: [CreatorService],
        exports: [CreatorService],
    }
)
export class CreatorModule {}