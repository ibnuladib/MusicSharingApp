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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerLikesEntity = void 0;
const typeorm_1 = require("typeorm");
const consumer_entity_1 = require("./consumer.entity");
const class_validator_1 = require("class-validator");
let consumerLikesEntity = class consumerLikesEntity {
    id;
    songID;
    songName;
    consumerID;
};
exports.consumerLikesEntity = consumerLikesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", unsigned: true }),
    __metadata("design:type", Number)
], consumerLikesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], consumerLikesEntity.prototype, "songID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], consumerLikesEntity.prototype, "songName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ "message": "Consumer ID must be provided" }),
    (0, typeorm_1.OneToOne)(() => consumer_entity_1.consumerEntity, consumer => consumer.consumerLikes),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", consumer_entity_1.consumerEntity)
], consumerLikesEntity.prototype, "consumerID", void 0);
exports.consumerLikesEntity = consumerLikesEntity = __decorate([
    (0, typeorm_1.Entity)("consumerLikes")
], consumerLikesEntity);
//# sourceMappingURL=consumerLikes.entity.js.map