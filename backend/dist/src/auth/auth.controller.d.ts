import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FastifyReply, FastifyRequest } from "fastify";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto, res: FastifyReply): Promise<any>;
    registration(userDto: CreateUserDto): Promise<any>;
    whoMeFromHeader(authorizationHeader: string): Promise<any>;
    whoMeFromCookies(req: FastifyRequest): Promise<any>;
    getQrPage(): void;
}
