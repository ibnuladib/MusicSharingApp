"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerService = void 0;
const common_1 = require("@nestjs/common");
const consumer_entity_1 = require("./consumer.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const consumerLikes_entity_1 = require("./consumerLikes.entity");
const consumerComments_entity_1 = require("./consumerComments.entity");
let consumerService = class consumerService {
    consumerRepository;
    consCommentRepo;
    constructor(consumerRepository, consCommentRepo) {
        this.consumerRepository = consumerRepository;
        this.consCommentRepo = consCommentRepo;
    }
    likeRepo;
    commentRepo;
    getConsumerService() {
        return "Hello Consumer!";
    }
    getParam(id) {
        return `Your ID is ${id}`;
    }
    createConsumer(mydata) {
        return mydata;
    }
    updateOne(id) {
        return `Updated ID = ${id}`;
    }
    updateDTO(updateData) {
        return { msg: "Updated Data:", updateData };
    }
    deleteData(id) {
        return `Deleted the ID: ${id}`;
    }
    getQuery(name) {
        return `You're name is: ${name}`;
    }
    validated(validatedData) {
        return {
            "name": validatedData.fullname,
            "email": validatedData.email,
            "NID": validatedData.NID
        };
    }
    async dbCreateConsumer(newConsumer) {
        return this.consumerRepository.save(newConsumer);
    }
    async dbGetUsers() {
        return this.consumerRepository.find();
    }
    async dbGetUserById(myid) {
        const data = await this.consumerRepository.findOneBy({ id: myid });
        if (data !== null) {
            return data;
        }
        else {
            throw new common_1.HttpException("The ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async dbGetUserByIdQuery(qry) {
        const data = await this.consumerRepository.findOneBy({ id: qry.id });
        if (data !== null) {
            return data;
        }
        else {
            throw new common_1.HttpException("The ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async dbUpdateUser(myid, updatedUser) {
        await this.consumerRepository.update(myid, updatedUser);
        const founddata = this.consumerRepository.findOneBy({ fullName: myid });
        if (founddata !== null) {
            return founddata;
        }
        else {
            throw new common_1.HttpException("This Id does not exist", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async dbDeleteUser(myid) {
        const user = await this.consumerRepository.findOne({
            where: { id: myid }
        });
        if (!user) {
            throw new common_1.HttpException("ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
        await this.likeRepo.delete({ consumerID: { id: myid } });
        await this.commentRepo.delete({ consumerID: { id: myid } });
        await this.consumerRepository.delete(myid);
        return { "msg": "User deleted successfully" };
    }
    async dbInactive() {
        return await this.consumerRepository.find({
            where: { status: "inactive" }
        });
    }
    async dbOlder() {
        return await this.consumerRepository.find({
            where: { age: (0, typeorm_2.MoreThan)(40) }
        });
    }
    async dbGetUserByName(usrname) {
        const data = await this.consumerRepository.find({
            where: { fullName: usrname }
        });
        if (data !== null) {
            return data;
        }
        else {
            throw new common_1.HttpException("The ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async dbCreateLike(newLike) {
        const existingLike = await this.likeRepo.findOne({
            where: { consumerID: { id: newLike.consumerID.id } },
            relations: ['consumerID']
        });
        if (existingLike) {
            existingLike.songID = newLike.songID;
            existingLike.songName = newLike.songName;
            return this.likeRepo.save(existingLike);
        }
        return this.likeRepo.save(newLike);
    }
    async getAllLikes() {
        return this.likeRepo.find();
    }
    async getLikeById(id) {
        const like = await this.likeRepo.findOne({ where: { id } });
        if (!like) {
            throw new common_1.HttpException("Like not found", common_1.HttpStatus.NOT_FOUND);
        }
        return like;
    }
    async deleteLike(id) {
        const result = await this.likeRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException("Like ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async createComment(newComment) {
        return this.commentRepo.save(newComment);
    }
    async getAllComments() {
        return this.commentRepo.find({
            relations: ['consumerID'],
            select: {
                id: true,
                comment: true,
                consumerID: {
                    id: true,
                    fullName: true
                }
            }
        });
    }
    async getCommentById(id) {
        const comment = await this.commentRepo.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.HttpException("Comment not found", common_1.HttpStatus.NOT_FOUND);
        }
        return comment;
    }
    async deleteComment(id) {
        const result = await this.commentRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException("Comment ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findOne(logindata) {
        return await this.consumerRepository.findOneBy({ email: logindata.email });
    }
    async dbUserFromComment(cmtid) {
        const data = await this.commentRepo.findOne({
            where: { id: cmtid },
            relations: ['consumerID'],
        });
        if (!data) {
            throw new common_1.HttpException("The ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
    async dbUserFromLike(likeid) {
        const data = await this.likeRepo.findOne({
            where: { id: likeid },
            relations: ['consumerID'],
        });
        if (!data) {
            throw new common_1.HttpException("The ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
    async dbLikeFromUser(userid) {
        const like = await this.likeRepo.findOne({
            where: { consumerID: { id: userid } },
            relations: ['consumerID'],
        });
        if (!like) {
            throw new common_1.HttpException("No favorite song set", common_1.HttpStatus.NOT_FOUND);
        }
        return like;
    }
    async updateProfilePicture(id, filename) {
        const user = await this.consumerRepository.findOneBy({ id });
        if (user) {
            user.profilePicture = filename;
            return this.consumerRepository.save(user);
        }
        return null;
    }
    async dbCommentFromUser(userid) {
        const data = await this.consumerRepository.findOne({
            where: { id: userid },
            relations: ['consumerComments'],
        });
        if (!data) {
            throw new common_1.HttpException("The ID doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
};
exports.consumerService = consumerService;
__decorate([
    (0, typeorm_1.InjectRepository)(consumerLikes_entity_1.consumerLikesEntity),
    __metadata("design:type", typeorm_2.Repository)
], consumerService.prototype, "likeRepo", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(consumerComments_entity_1.consumerCommentsEntity),
    __metadata("design:type", typeorm_2.Repository)
], consumerService.prototype, "commentRepo", void 0);
exports.consumerService = consumerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consumer_entity_1.consumerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(consumerComments_entity_1.consumerCommentsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], consumerService);
//# sourceMappingURL=consumer.service.js.map