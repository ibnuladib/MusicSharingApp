import { Controller, Get, Post, Body } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('bye')
    getAdminHello(): object {
        return this.adminService.getAdmin();
    }

    @Post('create')
    createAdmin(@Body() mydata: AdminDTO) : string {
        return this.adminService.createAdmin(mydata);
    }
}