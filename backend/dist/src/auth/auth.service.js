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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(userDto, res) {
        const user = await this.validateUser(userDto);
        if (user) {
            const jwtToken = await this.generateToken(user);
            res.setCookie('jwt', ('Bearer ' + jwtToken.token));
            return await this.generateToken(user);
        }
        throw new common_1.UnauthorizedException({ message: 'Неправильный email или пароль!' });
    }
    async registration(userDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('пользователь с таким email уже существует!', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPass = await bcrypt.hash(userDto.password, 7);
        const user = await this.userService.createNewUser({ ...userDto, password: hashPass });
        return user;
    }
    async generateToken(user) {
        const payload = { email: user.email, id: user.id, password: user.password, status: user.status };
        return {
            token: this.jwtService.sign(payload)
        };
    }
    async validateUser(userDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user;
            }
        }
        return;
    }
    async whoMeFromHeader(authorizationHeader) {
        try {
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
                throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!' });
            }
            const token = authorizationHeader.split(" ")[1];
            const decoded_user = this.jwtService.verify(token);
            if (decoded_user) {
                return decoded_user;
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!!' });
        }
        throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!!!' });
    }
    async whoMeFromCookies(req) {
        try {
            const jwtToken = req.cookies.jwt;
            console.log(req.cookies);
            if (!jwtToken || !jwtToken.startsWith('Bearer')) {
                throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!' });
            }
            const token = jwtToken.split(" ")[1];
            const decoded_user = this.jwtService.verify(token);
            if (decoded_user) {
                return decoded_user;
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!!' });
        }
        throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!!!' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map