import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { consumerModule } from './consumer/consumer.module';

@Module({
  imports: [AdminModule,consumerModule,TypeOrmModule.forRoot(
    {type:'postgres',
      host: 'localhost',
      port: 5450,
      username : 'postgres',
      password : '1234',
      database : 'consumerDB',
      autoLoadEntities : true,
      synchronize : true
    }
  )],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
