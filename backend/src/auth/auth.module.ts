import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef( () => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_KEY || 'DEFAULT_JWT_KEY',
      signOptions: {
        expiresIn: '120s'
      } 
    })
  ],
  exports: [
    AuthModule,
    JwtModule
  ]
})
export class AuthModule {}
