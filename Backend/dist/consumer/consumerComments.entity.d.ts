import { consumerEntity } from "./consumer.entity";
export declare class consumerCommentsEntity {
    id: number;
    songID: number;
    songName: string;
    comment: string;
    consumerID: consumerEntity;
}
