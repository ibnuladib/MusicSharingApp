"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerModule = void 0;
const common_1 = require("@nestjs/common");
const consumer_service_1 = require("./consumer.service");
const consumer_entity_1 = require("./consumer.entity");
const consumer_controller_1 = require("./consumer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const consumerLikes_entity_1 = require("./consumerLikes.entity");
const consumerComments_entity_1 = require("./consumerComments.entity");
let consumerModule = class consumerModule {
};
exports.consumerModule = consumerModule;
exports.consumerModule = consumerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([consumer_entity_1.consumerEntity, consumerLikes_entity_1.consumerLikesEntity, consumerComments_entity_1.consumerCommentsEntity])],
        controllers: [consumer_controller_1.consumerController],
        providers: [consumer_service_1.consumerService],
        exports: [consumer_service_1.consumerService]
    })
], consumerModule);
//# sourceMappingURL=consumer.module.js.map