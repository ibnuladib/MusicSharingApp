import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreatorService } from "src/creator/creator.service";
import { LoginDTO } from "src/creator/login.dto";
import { isMarkedAsUntransferable } from "worker_threads";
import * as bcrypt from "bcrypt";
import { jwtConstants } from "./constant";

@Injectable()
export class AuthService {
    constructor(
        private creatorService: CreatorService,
        private jwtService: JwtService
    ) {}

    async signIn( logindata: LoginDTO) : Promise<{access_token: string}> {
        const creator = await this.creatorService.findOne(logindata);
        if(!creator) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(logindata.password, creator.password);

        if(!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = logindata;
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: jwtConstants.secret })
        };
    }
}