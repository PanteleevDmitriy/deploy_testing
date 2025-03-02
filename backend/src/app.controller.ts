import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
 
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'приветствие' })
  @ApiResponse({ status: 200 })
  @Get()
  getHello() {
    return this.appService.getHello()
  }

  @ApiOperation({ summary: 'приветствие' })
  @ApiResponse({ status: 200 })
  @Render('qr_page')
  @Get('/qr')
    getQrPage() {
        return
    }
}