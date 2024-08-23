import { Body, Controller, Headers, Post, Get, UsePipes, Res, Req, Render, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ValidationPipe } from 'pipes/validation-pipe';
import { FastifyReply, FastifyRequest } from "fastify";
import { JwtAuthCookieGuard } from 'src/auth/jwt-auth-cookie.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    
    @ApiOperation({ summary: 'login user' })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: FastifyReply) {
        return this.authService.login(userDto, res);
    }

    @ApiOperation({ summary: 'user registration' })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({ summary: 'кто я (auth header)?', description: 'только для авторизованных пользователей!' })
    @Get('/whome1')
    whoMeFromHeader(@Headers('authorization') authorizationHeader: string): Promise<any>{
        return this.authService.whoMeFromHeader(authorizationHeader);
    }

    @ApiOperation({ summary: 'кто я (auth jwtToken)?', description: 'только для авторизованных пользователей!' })
    @Get('/whome2')
    whoMeFromCookies(@Req() req: FastifyRequest): Promise<any>{
        return this.authService.whoMeFromCookies(req);
    }

    
    @ApiOperation({ summary: 'QR-генератор' })
    @Render('qr_page')
    @Get('/qr')
    getQrPage() {
        return
    }

}
