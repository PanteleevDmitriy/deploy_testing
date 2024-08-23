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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_model_1 = require("./users.model");
const sequelize_1 = require("@nestjs/sequelize");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createNewUser(dto) {
        const user = await this.userRepository.create(dto);
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
    async getUserById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            return user;
        }
        return `Пользователя с id = ${id} нет в базе`;
    }
    async makeAdmin(dto) {
        const email = dto.email;
        const user = await this.userRepository.findOne({ where: { email } });
        const ban_status = user.banned;
        if (user) {
            if (ban_status != true) {
                user.status = 'admin';
                await user.save();
                return user;
            }
            'Нельзя сделать админом пользователя, если он забанен!';
        }
        return `Пользователя с email = ${email} нет в базе`;
    }
    async deleteUserByEmail(dto) {
        const email = dto.email;
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            const id = user.id;
            const ban_status = user.banned;
            if (ban_status == true) {
                await this.userRepository.destroy({ where: { id } });
                return user;
            }
            return 'Можно удалить пользователя, только если он забанен!';
        }
        return `Пользователя с email = ${email} нет в базе`;
    }
    async banUser(dto) {
        const email = dto.email;
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            if (user.banned == true) {
                return 'Пользователь уже забанен!';
            }
            if (user.status == 'admin') {
                return 'Нельзя забанить админа!';
            }
            user.banned = true;
            user.banReason = dto.banReason;
            await user.save();
            return user;
        }
        return `Пользователя с email = ${email} нет в базе`;
    }
    async unbanUser(dto) {
        const email = dto.email;
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            if (user.banned == false) {
                return 'Пользователь не забанен!';
            }
            user.banned = false;
            user.banReason = null;
            await user.save();
            return user;
        }
        return `Пользователя с email = ${email} нет в базе`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map