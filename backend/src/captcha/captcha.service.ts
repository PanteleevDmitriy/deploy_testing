import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CaptchaService {
  constructor(private readonly httpService: HttpService) {}

  async verifyToken(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

    try {
      const response = await lastValueFrom(this.httpService.post(url));
      return response.data.success;
    } catch (error) {
      console.error('Ошибка при проверке капчи:', error);
      return false;
    }
  }
}
