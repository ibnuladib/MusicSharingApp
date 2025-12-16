import { Body, Controller, Post, UseInterceptors } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginDTO } from "src/creator/login.dto"

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    signIn(@Body() logindata: LoginDTO) {
        return this.authService.signIn(logindata);
    }
}