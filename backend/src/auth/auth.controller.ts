import { Body, Controller, Headers, Post, Get, UsePipes, Res, Req, Render, UseGuards } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ValidationPipe } from 'pipes/validation-pipe';
import { FastifyReply, FastifyRequest } from "fastify";
import { JwtAuthCookieGuard } from 'src/auth/jwt-auth-cookie.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: FastifyReply) {
        return this.authService.login(userDto, res);
    }
    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @Get('/whome1')
    whoMeFromHeader(@Headers('authorization') authorizationHeader: string): Promise<any>{
        return this.authService.whoMeFromHeader(authorizationHeader);
    }

    @Get('/whome2')
    whoMeFromCookies(@Req() req: FastifyRequest): Promise<any>{
        return this.authService.whoMeFromCookies(req);
    }

    @Render('qr_page')
    @Get('/qr')
    getQrPage() {
        return
    }
    
}
