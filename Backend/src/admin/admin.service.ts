import { Injectable } from "@nestjs/common";
import { AdminDTO } from "./admin.dto";


@Injectable()
export class AdminService {
    getAdmin() : object {
        return {
            msg : "Hello Admin"
        };
    }

    createAdmin(mydata: AdminDTO): string{
        return mydata.uname;
    }
}