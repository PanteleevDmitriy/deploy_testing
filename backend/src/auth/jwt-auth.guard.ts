import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { FastifyRequest } from "fastify";
import { User } from "src/users/users.model";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try {
            const req = context.switchToHttp().getRequest<FastifyRequest>()
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                throw new UnauthorizedException({message: 'Вы не авторизованы!'});
            }
            const token = authHeader.split(" ")[1];
            const decoded_user: User = this.jwtService.verify(token);
            if (decoded_user){
                return true
            }
            throw new UnauthorizedException({message: 'Вы не авторизованы!'});
        }catch (error) {
            throw new UnauthorizedException({message: 'Вы не авторизованы!'})
        }

    }

}