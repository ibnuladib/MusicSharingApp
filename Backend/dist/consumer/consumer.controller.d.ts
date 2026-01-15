import { consumerService } from "./consumer.service";
import { consumerDTO } from "./consumer.dto";
import { consumerEntity } from "./consumer.entity";
import { consumerLikesEntity } from "./consumerLikes.entity";
import { consumerCommentsEntity } from "./consumerComments.entity";
export declare class consumerController {
    private readonly consmrService;
    constructor(consmrService: consumerService);
    printget(): string;
    getConsumerHello(): string;
    getConsumerID(id: string): string;
    getQuery(name: string): string;
    createConsumer(mydata: consumerDTO): consumerDTO;
    updateOne(id: string): string;
    updateDTO(updateData: consumerDTO): object;
    deleteUpload(id: string): string;
    validatedData(validatedData: consumerDTO): object;
    uploadFile(id: string, file: Express.Multer.File): Promise<{
        message: string;
        filename: string;
    }>;
    dbCreateConsumerQuery(fullName: string, age: string, status: "active" | "inactive"): Promise<consumerEntity>;
    dbCreateConsumer(mydbdata: consumerEntity): Promise<consumerEntity>;
    dbCreateLike(mydbdata: consumerLikesEntity): Promise<consumerLikesEntity>;
    dbGetUsers(): Promise<consumerEntity[]>;
    dbGetUserById(id: number): Promise<consumerEntity>;
    dbGetUserByName(name: string): Promise<consumerEntity[]>;
    dbGetUserByIdQuery(qry: any): Promise<consumerEntity>;
    dbUpdateUser(myid: string, updatedInfo: consumerEntity): Promise<consumerEntity | null>;
    dbDeleteUser(id: number): Promise<{
        msg: string;
    }>;
    dbInactive(): Promise<consumerEntity[]>;
    dbOlder(): Promise<consumerEntity[]>;
    createLike(newLike: consumerLikesEntity): Promise<consumerLikesEntity>;
    getAllLikes(): Promise<consumerLikesEntity[]>;
    getLikeById(id: string): Promise<consumerLikesEntity>;
    deleteLike(id: string): Promise<void>;
    createComment(newComment: consumerCommentsEntity): Promise<consumerCommentsEntity>;
    getAllComments(): Promise<consumerCommentsEntity[]>;
    getCommentById(id: number): Promise<consumerCommentsEntity>;
    deleteComment(id: string): Promise<void>;
    getProfile(req: any): any;
    dbFKGetUserById(id: number): Promise<consumerCommentsEntity>;
    dbFKGetCommentById(id: number): Promise<consumerEntity>;
    dbFKGetUserByLikeId(id: number): Promise<consumerLikesEntity>;
    dbFKGetLikeByUserId(id: number): Promise<consumerLikesEntity>;
}
