import { Injectable, UnauthorizedException } from '@nestjs/common';
import { consumerService } from 'src/consumer/consumer.service';
import { JwtService } from '@nestjs/jwt';
import { consumerDTO, loginDTO } from 'src/consumer/consumer.dto';
import { consumerEntity } from 'src/consumer/consumer.entity';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private newconsmrservice: consumerService,
        private jwtservice: JwtService,
        @InjectRepository(consumerEntity) private authconsumerRepo: Repository<consumerEntity>
    ) { }

    async signUp(myobj: consumerEntity): Promise<consumerEntity> {
        return await this.newconsmrservice.dbCreateConsumer(myobj)
    }
    async signIn(logindata: loginDTO): Promise<{ access_token: string, user: { id: number, fullName: string, email: string } }> {
        const user = await this.authconsumerRepo.findOneBy({ email: logindata.email });
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(logindata.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = logindata;
        return {
            access_token: await this.jwtservice.signAsync(payload),
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email
            }
        };
    }


}
