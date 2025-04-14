import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';  // Импортируем библиотеку для сериализации данных

@Injectable()
export class CaptchaService {
  private readonly secretKey = process.env.RECAPTCHA_SECRET_KEY;

  async verifyToken(token: string): Promise<void> {
    console.log('Received captcha token in verifyToken():', token);

    const url = 'https://www.google.com/recaptcha/api/siteverify';

    try {
      // Сериализуем данные в формате application/x-www-form-urlencoded
      const data = qs.stringify({
        secret: this.secretKey,
        response: token,
      });

      // Отправляем POST запрос с нужным заголовком и сериализованными данными
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseData = response.data;
      console.log('Captcha verification response:', responseData);

      if (!responseData.success) {
        throw new UnauthorizedException('Не удалось подтвердить капчу');
      }

      console.log('✅ Captcha verified successfully');
    } catch (error) {
      console.error('❌ Error verifying captcha:', error.message);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
      }
      throw new UnauthorizedException('Ошибка при проверке капчи');
    }
  }
}
