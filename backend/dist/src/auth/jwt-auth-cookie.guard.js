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
exports.JwtAuthCookieGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtAuthCookieGuard = class JwtAuthCookieGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        try {
            const req = context.switchToHttp().getRequest();
            const jwtToken = req.cookies.jwt;
            console.log(req.cookies);
            if (!jwtToken || !jwtToken.startsWith('Bearer')) {
                throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!' });
            }
            const token = jwtToken.split(" ")[1];
            const decoded_user = this.jwtService.verify(token);
            if (decoded_user) {
                return true;
            }
            throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!' });
        }
        catch (error) {
            throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы!' });
        }
    }
};
exports.JwtAuthCookieGuard = JwtAuthCookieGuard;
exports.JwtAuthCookieGuard = JwtAuthCookieGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthCookieGuard);
//# sourceMappingURL=jwt-auth-cookie.guard.js.map