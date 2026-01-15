import { consumerService } from 'src/consumer/consumer.service';
import { JwtService } from '@nestjs/jwt';
import { loginDTO } from 'src/consumer/consumer.dto';
import { consumerEntity } from 'src/consumer/consumer.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private newconsmrservice;
    private jwtservice;
    private authconsumerRepo;
    constructor(newconsmrservice: consumerService, jwtservice: JwtService, authconsumerRepo: Repository<consumerEntity>);
    signUp(myobj: consumerEntity): Promise<consumerEntity>;
    signIn(logindata: loginDTO): Promise<{
        access_token: string;
        user: {
            id: number;
            fullName: string;
            email: string;
        };
    }>;
}
