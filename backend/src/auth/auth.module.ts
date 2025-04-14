import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CaptchaModule } from 'src/captcha/captcha.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule,
    forwardRef(() => UsersModule),
    CaptchaModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY') || 'DEFAULT_JWT_KEY',
        signOptions: { expiresIn: '180s' },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthModule, JwtModule],
})
export class AuthModule {}
