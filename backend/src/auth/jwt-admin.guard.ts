import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { FastifyRequest } from "fastify";
import { User } from "src/users/users.model";

@Injectable()
export class JwtAdminGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try {
            const req = context.switchToHttp().getRequest<FastifyRequest>();
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                throw new UnauthorizedException({message: 'Вы не авторизованы!'});
            };
            const token = authHeader.split(" ")[1];
            const decoded_user: User = this.jwtService.verify(token);
            const result = (decoded_user.status == 'admin')
            if (result){
                return true
            }
            throw new UnauthorizedException({message: 'У вас нет прав администратора!'});
        }catch (error) {
                throw new UnauthorizedException({message: 'У вас нет прав администратора!'});
        };

    };

};