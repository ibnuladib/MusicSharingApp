import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatorModule } from './creator/creator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creator } from './creator/creator.entity';
@Module({
  imports: [CreatorModule, TypeOrmModule.forRoot(
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
  ),TypeOrmModule.forFeature([Creator])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
