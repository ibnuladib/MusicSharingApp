import { consumerLikesEntity } from "./consumerLikes.entity";
import { consumerCommentsEntity } from "./consumerComments.entity";
export declare class consumerEntity {
    id: number;
    fullName: string;
    age: number;
    status: "active" | "inactive";
    profilePicture: string;
    email: string;
    password: string;
    consumerLikes: consumerLikesEntity;
    consumerComments: consumerCommentsEntity[];
}
