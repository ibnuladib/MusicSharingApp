import { Injectable } from "@nestjs/common";
import { CreatorDTO } from "./creator.dto";
import { UploadDTO } from "./upload.dto";


@Injectable()
export class CreatorService {
    getCreator() : object {
        return {
            msg : " Creator"
        };
    }

    registerCreator(mydata: CreatorDTO): object{
        return {
            name: mydata.name,
            uname: mydata.uname,
            password: mydata.password
        };
    }

    upload(upload: UploadDTO) {
        return { msg: "Upload created", upload };
    } 


    getAllUploads() {
        return {"msg": "All uploads"};
    }

    getUploadById(id: number) {
        return { msg: "Upload ID: " + id };
    }

    deleteUpload(id: number) {
        return { msg: "Upload deleted with ID: " + id };
    }

    replaceUpload(id: number, upload: UploadDTO) {
        return { msg: "Upload replaced with ID: " + id, upload };
    }

    patchUploadTitle(id: number, upload: UploadDTO, title: string) {
        upload.title = title;
        return { msg: "Upload title patched with Title: " + title };
    }
}
