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
exports.loginDTO = exports.consumerDTO = void 0;
const class_validator_1 = require("class-validator");
class consumerDTO {
    fullname;
    email;
    password;
    NID;
}
exports.consumerDTO = consumerDTO;
__decorate([
    (0, class_validator_1.Matches)(/^(?:[A-Za-z]+)$/, { message: "Name cannot contain numbers or symbols" }),
    __metadata("design:type", String)
], consumerDTO.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], consumerDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], consumerDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.Length)(10),
    __metadata("design:type", Number)
], consumerDTO.prototype, "NID", void 0);
class loginDTO {
    email;
    password;
}
exports.loginDTO = loginDTO;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], loginDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], loginDTO.prototype, "password", void 0);
//# sourceMappingURL=consumer.dto.js.map