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
exports.consumerController = void 0;
const common_1 = require("@nestjs/common");
const consumer_service_1 = require("./consumer.service");
const consumer_dto_1 = require("./consumer.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const consumer_entity_1 = require("./consumer.entity");
const consumerLikes_entity_1 = require("./consumerLikes.entity");
const consumerComments_entity_1 = require("./consumerComments.entity");
const auth_guard_1 = require("../auth/auth.guard");
let consumerController = class consumerController {
    consmrService;
    constructor(consmrService) {
        this.consmrService = consmrService;
    }
    printget() {
        return "Default get";
    }
    getConsumerHello() {
        return this.consmrService.getConsumerService();
    }
    getConsumerID(id) {
        return this.consmrService.getParam(id);
    }
    getQuery(name) {
        return this.consmrService.getQuery(name);
    }
    createConsumer(mydata) {
        return this.consmrService.createConsumer(mydata);
    }
    updateOne(id) {
        return this.consmrService.updateOne(id);
    }
    updateDTO(updateData) {
        return this.consmrService.updateDTO(updateData);
    }
    deleteUpload(id) {
        return this.consmrService.deleteData(id);
    }
    validatedData(validatedData) {
        return this.consmrService.validated(validatedData);
    }
    async uploadFile(id, file) {
        const filename = file.filename;
        await this.consmrService.updateProfilePicture(Number(id), filename);
        return { message: "Profile picture uploaded successfully", filename };
    }
    dbCreateConsumerQuery(fullName, age, status) {
        const newConsumer = {
            fullName,
            age: Number(age),
            status
        };
        return this.consmrService.dbCreateConsumer(newConsumer);
    }
    dbCreateConsumer(mydbdata) {
        return this.consmrService.dbCreateConsumer(mydbdata);
    }
    dbCreateLike(mydbdata) {
        return this.consmrService.dbCreateLike(mydbdata);
    }
    dbGetUsers() {
        return this.consmrService.dbGetUsers();
    }
    dbGetUserById(id) {
        return this.consmrService.dbGetUserById(id);
    }
    dbGetUserByName(name) {
        return this.consmrService.dbGetUserByName(name);
    }
    dbGetUserByIdQuery(qry) {
        return this.consmrService.dbGetUserByIdQuery(qry);
    }
    dbUpdateUser(myid, updatedInfo) {
        return this.consmrService.dbUpdateUser(myid, updatedInfo);
    }
    dbDeleteUser(id) {
        return this.consmrService.dbDeleteUser(id);
    }
    dbInactive() {
        return this.consmrService.dbInactive();
    }
    dbOlder() {
        return this.consmrService.dbOlder();
    }
    createLike(newLike) {
        return this.consmrService.dbCreateLike(newLike);
    }
    getAllLikes() {
        return this.consmrService.getAllLikes();
    }
    getLikeById(id) {
        return this.consmrService.getLikeById(Number(id));
    }
    deleteLike(id) {
        return this.consmrService.deleteLike(Number(id));
    }
    createComment(newComment) {
        return this.consmrService.createComment(newComment);
    }
    getAllComments() {
        return this.consmrService.getAllComments();
    }
    getCommentById(id) {
        return this.consmrService.getCommentById(id);
    }
    deleteComment(id) {
        return this.consmrService.deleteComment(Number(id));
    }
    getProfile(req) {
        return req.user;
    }
    dbFKGetUserById(id) {
        return this.consmrService.dbUserFromComment(id);
    }
    dbFKGetCommentById(id) {
        return this.consmrService.dbCommentFromUser(id);
    }
    dbFKGetUserByLikeId(id) {
        return this.consmrService.dbUserFromLike(id);
    }
    dbFKGetLikeByUserId(id) {
        return this.consmrService.dbLikeFromUser(id);
    }
};
exports.consumerController = consumerController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], consumerController.prototype, "printget", null);
__decorate([
    (0, common_1.Get)("get"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], consumerController.prototype, "getConsumerHello", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "getConsumerID", null);
__decorate([
    (0, common_1.Get)("getname"),
    __param(0, (0, common_1.Query)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], consumerController.prototype, "getQuery", null);
__decorate([
    (0, common_1.Post)("post"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consumer_dto_1.consumerDTO]),
    __metadata("design:returntype", consumer_dto_1.consumerDTO)
], consumerController.prototype, "createConsumer", null);
__decorate([
    (0, common_1.Patch)("patch"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Put)("put"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consumer_dto_1.consumerDTO]),
    __metadata("design:returntype", Object)
], consumerController.prototype, "updateDTO", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "deleteUpload", null);
__decorate([
    (0, common_1.Post)("validate"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consumer_dto_1.consumerDTO]),
    __metadata("design:returntype", Object)
], consumerController.prototype, "validatedData", null);
__decorate([
    (0, common_1.Post)('upload-profile/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new common_1.BadRequestException("File Size more than 2MB or is not an image"), false);
            }
        },
        limits: { fileSize: 2 * 1024 * 1024 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        })
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], consumerController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)("dbcreatequery"),
    __param(0, (0, common_1.Query)("fullName")),
    __param(1, (0, common_1.Query)("age")),
    __param(2, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbCreateConsumerQuery", null);
__decorate([
    (0, common_1.Post)('dbentry'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consumer_entity_1.consumerEntity]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbCreateConsumer", null);
__decorate([
    (0, common_1.Post)('dblikeentry'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consumerLikes_entity_1.consumerLikesEntity]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbCreateLike", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('dbshow'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbGetUsers", null);
__decorate([
    (0, common_1.Get)('dbshowID/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbGetUserById", null);
__decorate([
    (0, common_1.Get)('dbshowName/:name'),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbGetUserByName", null);
__decorate([
    (0, common_1.Get)('dbshowID'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbGetUserByIdQuery", null);
__decorate([
    (0, common_1.Put)("dbupdate/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, consumer_entity_1.consumerEntity]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbUpdateUser", null);
__decorate([
    (0, common_1.Delete)("dbdelete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbDeleteUser", null);
__decorate([
    (0, common_1.Get)("dbinactive"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbInactive", null);
__decorate([
    (0, common_1.Get)("dbolder"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbOlder", null);
__decorate([
    (0, common_1.Post)('like'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consumerLikes_entity_1.consumerLikesEntity]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "createLike", null);
__decorate([
    (0, common_1.Get)('showlikes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "getAllLikes", null);
__decorate([
    (0, common_1.Get)('showlikes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "getLikeById", null);
__decorate([
    (0, common_1.Delete)('deletelikes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "deleteLike", null);
__decorate([
    (0, common_1.Post)('comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consumerComments_entity_1.consumerCommentsEntity]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)('showcomments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "getAllComments", null);
__decorate([
    (0, common_1.Get)("showcomments/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "getCommentById", null);
__decorate([
    (0, common_1.Delete)('deletecomments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('dbuserfromcomment/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbFKGetUserById", null);
__decorate([
    (0, common_1.Get)('dbcommentfromuser/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbFKGetCommentById", null);
__decorate([
    (0, common_1.Get)('dbuserfromlike/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbFKGetUserByLikeId", null);
__decorate([
    (0, common_1.Get)('dblikefromuser/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], consumerController.prototype, "dbFKGetLikeByUserId", null);
exports.consumerController = consumerController = __decorate([
    (0, common_1.Controller)("consumer"),
    __metadata("design:paramtypes", [consumer_service_1.consumerService])
], consumerController);
//# sourceMappingURL=consumer.controller.js.map