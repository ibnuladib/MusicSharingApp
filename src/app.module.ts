import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatorModule } from './creator/creator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creator } from './creator/creator.entity';
import { Upload } from './creator/upload/upload.entity';
import { Genre } from './creator/genre/genre.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [CreatorModule, AuthModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username:'postgres',
      password: 'root',
      database: 'MusicSharingApp',
      autoLoadEntities: true,
      synchronize: true,  
    }
  ),TypeOrmModule.forFeature([Creator, Upload, Genre])],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
