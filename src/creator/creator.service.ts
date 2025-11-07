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

    upload(upload: UploadDTO) : object {
        return { msg: "Upload created", upload };
    } 


    getAllUploads() :object {
        return {msg: "All uploads"};
    }

    getUploadById(id: number) :object {
        return { msg: "Upload ID: " + id };
    }

    deleteUpload(id: number) :object {
        return { msg: "Upload deleted with ID: " + id };
    }

    replaceUpload(id: number, upload: UploadDTO) :object {
        return { msg: "Upload replaced with ID: " + id, upload };
    }

    patchUploadTitle(id: number, upload: UploadDTO, title: string) :object {
        upload.title = title;
        upload.id = id;
        return {
            title: upload.title,
            id: upload.id
         };
    }

  


}
