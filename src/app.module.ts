import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { consumerModule } from './consumer/consumer.module';

@Module({
  imports: [AdminModule,consumerModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
