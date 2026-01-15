import { AuthService } from './auth.service';
import { loginDTO } from 'src/consumer/consumer.dto';
import { consumerEntity } from 'src/consumer/consumer.entity';
import type { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    addUser(myobj: consumerEntity): Promise<consumerEntity>;
    signIn(logindata: loginDTO, response: Response): Promise<{
        access_token: string;
        user: {
            id: number;
            fullName: string;
            email: string;
        };
    }>;
}
