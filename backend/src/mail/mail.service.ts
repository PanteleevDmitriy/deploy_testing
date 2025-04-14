import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.beget.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendConfirmationEmail(to: string, token: string) {
    const confirmLink = `https://seawindtravel.ru/confirm?token=${token}`;
    try {
      await this.transporter.sendMail({
        from: `"SEAWind travel" <${process.env.MAIL_USER}>`,
        to,
        subject: 'Подтверждение регистрации на сайте seawindtravel.ru',
        html: `
          <p>Здравствуйте!</p>
          <p>Вы зарегистрировались на сайте компании <strong>SEAWind travel</strong>.</p>
          <p>Пожалуйста, чтобы завершить регистрацию, подтвердите свою почту, перейдя по ссылке ниже:</p>
          <p><a href="${confirmLink}">${confirmLink}</a></p>
        `,
      });
    } catch (error) {
      console.error('Ошибка при отправке письма:', error);
      throw new InternalServerErrorException('Не удалось отправить письмо');
    }
  }
}
