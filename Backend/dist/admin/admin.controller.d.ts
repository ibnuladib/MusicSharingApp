import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAdminHello(): object;
    createAdmin(mydata: AdminDTO): string;
}
