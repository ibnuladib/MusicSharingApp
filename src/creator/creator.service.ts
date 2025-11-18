import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatorDTO } from "./creator.dto";
import { UploadDTO } from "./upload.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Creator } from "./creator.entity";
import { IsNull, Repository } from "typeorm";


@Injectable()
export class CreatorService {
    constructor(@InjectRepository(Creator) private creatorRepository: Repository<Creator>) {}


    async create(creator : Creator): Promise<Creator> {
        return await this.creatorRepository.save(creator);
    }

    async updatePhone(phone: number, id: string): Promise<Creator> {
        const creator = await this.creatorRepository.findOneBy(
            {id}
        );
        if(creator==null){
            throw new NotFoundException(`Creator with ID: ${id} doesnt exist`)
        }
        else{
            creator.phone = phone;
            await this.creatorRepository.save(creator);
            return creator;
        }

    }

    async findNull(): Promise<Creator[]>{
        return await this.creatorRepository.find(
            {
                where: {fullName: IsNull()},
            }
        );
    }

    async deleteCreator(id: string): Promise<void> {
        await this.creatorRepository.delete(id);
    }
}
     









    // registerCreator(mydata: CreatorDTO): object{
    //     return {
    //         fullname: mydata.fullName,
    //         phone: mydata.phone,
    //     };
    // }

    // upload(upload: UploadDTO) : object {
    //     return { msg: "Upload created", upload };
    // } 


    // getAllUploads() :object {
    //     return {msg: "All uploads"};
    // }

    // getUploadById(id: number) :object {
    //     return { msg: "Upload ID: " + id };
    // }

    // deleteUpload(id: number) :object {
    //     return { msg: "Upload deleted with ID: " + id };
    // }

    // replaceUpload(id: number, upload: UploadDTO) :object {
    //     return { msg: "Upload replaced with ID: " + id, upload };
    // }

    // patchUploadTitle(id: number, upload: UploadDTO, title: string) :object {
    //     upload.title = title;
    //     upload.id = id;
    //     return {
    //         title: upload.title,
    //         id: upload.id
    //      };
    // }




// • Name field should not contain any numbers 
// • Password field is required and it must contain one 
// of the special character (@ or # or $ or &) 
// • Validate a Date given is valid date type
//  • Validate Social media links (URL format).


// User Category 2:
// Schema Criteria:
// - Id: generateId(): use @BeforeInsert for custom logic before insertion.
// - isActive: A boolean column default value to true.
// - fullName: A Nullable varchar column.
// - phone: type bigint that is unsigned.
// Operation:
// - Create a user
// - Modify the phone number of an existing user.
// - Retrieve users with null values in the full name column.
// - Remove a user from the system based on their id.