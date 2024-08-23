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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const swagger_1 = require("@nestjs/swagger");
let TestController = class TestController {
    constructor(appService) {
        this.appService = appService;
    }
    getText() {
        return "Text_Test 1234567";
    }
    getData() {
        return this.appService.getData();
    }
};
exports.TestController = TestController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'вывод тестовой строки' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getText", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'вывод тестового объекта' }),
    (0, common_1.Get)('/testing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getData", null);
exports.TestController = TestController = __decorate([
    (0, swagger_1.ApiTags)('others'),
    (0, common_1.Controller)('test'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], TestController);
//# sourceMappingURL=test.controller.js.map