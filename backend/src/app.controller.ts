import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
 
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello()
  }

  @Render('qr_page')
  @Get('/qr')
    getQrPage() {
        return
    }
}