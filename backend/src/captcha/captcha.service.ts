import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CaptchaService {
  private readonly secretKey = process.env.RECAPTCHA_SECRET_KEY;

  async verifyToken(token: string): Promise<void> {
    const url = 'https://www.google.com/recaptcha/api/siteverify';

    const response = await axios.post(
      url,
      null,
      {
        params: {
          secret: this.secretKey,
          response: token,
        },
      },
    );

    const data = response.data;

    if (!data.success) {
      throw new UnauthorizedException('Не удалось подтвердить капчу');
    }
  }
}
