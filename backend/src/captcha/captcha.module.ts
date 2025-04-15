// captcha.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // <-- ВАЖНО
import { CaptchaService } from './captcha.service';

@Module({
  imports: [HttpModule], // <-- Добавляем сюда
  providers: [CaptchaService],
  exports: [CaptchaService], // опционально
})
export class CaptchaModule {}
