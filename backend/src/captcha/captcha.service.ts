import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import qs from 'qs';

@Injectable()
export class CaptchaService {
  private readonly secretKey = process.env.RECAPTCHA_SECRET_KEY;

  async verifyToken(token: string): Promise<void> {
    console.log('Received captcha token in verifyToken():', token);

    const url = 'https://www.google.com/recaptcha/api/siteverify';

    const postData = qs.stringify({
      secret: this.secretKey,
      response: token,
    });

    try {
      const response = await axios.post(url, postData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // важно!
        },
      });

      const data = response.data;
      console.log('Captcha verification response:', data);

      if (!data.success) {
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
