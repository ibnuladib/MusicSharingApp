import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { consumerModule } from 'src/consumer/consumer.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { consumerLikesEntity } from 'src/consumer/consumerLikes.entity';
import { consumerCommentsEntity } from 'src/consumer/consumerComments.entity';
import { consumerEntity } from 'src/consumer/consumer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      consumerEntity,
      consumerLikesEntity,
      consumerCommentsEntity,
    ]),

    consumerModule,

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

