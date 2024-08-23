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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const ban_user_dto_1 = require("./dto/ban-user.dto");
const unban_user_dto_1 = require("./dto/unban-user.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const delete_user_dto_1 = require("./dto/delete-user.dto");
const jwt_admin_guard_1 = require("../auth/jwt-admin.guard");
const make_admin_dto_1 = require("./dto/make-admin.dto");
const validation_pipe_1 = require("../../pipes/validation-pipe");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    makeAdmin(dto) {
        return this.userService.makeAdmin(dto);
    }
    banUser(dto) {
        return this.userService.banUser(dto);
    }
    unbanUser(dto) {
        return this.userService.unbanUser(dto);
    }
    deleteUserByEmail(dto) {
        return this.userService.deleteUserByEmail(dto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'get all users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/get/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'get user by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'make admin', description: 'только для авторизованных пользователей!' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Patch)('/admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [make_admin_dto_1.MakeAdminDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "makeAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'ban user', description: 'только для админов!' }),
    (0, common_1.UseGuards)(jwt_admin_guard_1.JwtAdminGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Patch)('/ban'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ban_user_dto_1.BanUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "banUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'unban user', description: 'только для админов!' }),
    (0, common_1.UseGuards)(jwt_admin_guard_1.JwtAdminGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Patch)('/unban'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unban_user_dto_1.UnbanUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "unbanUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'delete user by email', description: 'только для админов!' }),
    (0, common_1.UseGuards)(jwt_admin_guard_1.JwtAdminGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_user_dto_1.DeleteUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUserByEmail", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map