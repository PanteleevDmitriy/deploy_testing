import { HttpException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from "fastify";
@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto, res: FastifyReply): Promise<any> {
        const user = await this.validateUser(userDto);
        if (user) {
            const jwtToken = await this.generateToken(user);
            res.setCookie('jwt', ('Bearer ' + jwtToken.token))
            return await this.generateToken(user);
        }
        throw new UnauthorizedException({message: 'Неправильный email или пароль!'});
                    
    }

    async registration(userDto: CreateUserDto): Promise<any> {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('пользователь с таким email уже существует!', HttpStatus.BAD_REQUEST);
        }
        const hashPass = await bcrypt.hash(userDto.password, 7);
        const user = await this.userService.createNewUser({...userDto, password: hashPass});
        return user;
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, password: user.password, status: user.status};
        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateUser(userDto: CreateUserDto): Promise<any> {
        const user = await this.userService.getUserByEmail(userDto.email)
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user;
            }
        }
        return;
    }

    async whoMeFromHeader(authorizationHeader: string): Promise<any> {
        try {
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
                throw new UnauthorizedException({message: 'Вы не авторизованы!'});
            }
            const token = authorizationHeader.split(" ")[1];
            const decoded_user: User = this.jwtService.verify(token);
            if (decoded_user) {
                return decoded_user;
            }
        } catch (error) {
            throw new UnauthorizedException({message: 'Вы не авторизованы!!'});
        }
        throw new UnauthorizedException({message: 'Вы не авторизованы!!!'});
    }

    async whoMeFromCookies(req: FastifyRequest): Promise<any> {
        try {
            const jwtToken = req.cookies.jwt
            console.log(req.cookies)
            if (!jwtToken || !jwtToken.startsWith('Bearer')) {
                throw new UnauthorizedException({message: 'Вы не авторизованы!'});
            }
            const token = jwtToken.split(" ")[1];
            const decoded_user: User = this.jwtService.verify(token);
            if (decoded_user) {
                return decoded_user;
            }
        } catch (error) {
            throw new UnauthorizedException({message: 'Вы не авторизованы!!'});
        }
        throw new UnauthorizedException({message: 'Вы не авторизованы!!!'});
    }
}
