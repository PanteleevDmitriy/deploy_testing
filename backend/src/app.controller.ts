import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
const path = require('path')
const fs = require('fs')
 
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'приветствие' })
  @ApiResponse({ status: 200 })
  @Render('qr_page')
    @Get('/qr')
    getQrPage() {
        return
    }
}