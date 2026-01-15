import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { consumerModule } from './consumer/consumer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminModule, consumerModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5450,
      username: 'postgres',
      password: '1234',
      database: 'consumerDB',
      autoLoadEntities: true,
      synchronize: true
    }
  ), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // Serve files from ../uploads (relative to dist/src)
    serveRoot: '/uploads',
  }), AuthModule],//
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
