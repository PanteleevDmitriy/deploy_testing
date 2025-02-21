import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule, // Подключаем ConfigModule
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY') || 'DEFAULT_JWT_KEY',
        signOptions: { expiresIn: '120s' },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthModule, JwtModule],
})
export class AuthModule {}
