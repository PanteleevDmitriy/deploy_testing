import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from "fastify";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto, res: FastifyReply): Promise<any>;
    registration(userDto: CreateUserDto): Promise<any>;
    private generateToken;
    private validateUser;
    whoMeFromHeader(authorizationHeader: string): Promise<any>;
    whoMeFromCookies(req: FastifyRequest): Promise<any>;
}
