import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('test')
export class TestController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getText() {
        return "Text_Test 1234567";
    }

    @Get('/testing')
    getData() {
        return this.appService.getData()
    }

    @Render('qr_page')
    @Get('/qr')
    getQrPage() {
        return
    }

}
