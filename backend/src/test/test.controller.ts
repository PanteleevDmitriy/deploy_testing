import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from '../app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('others') 
@Controller('test')
export class TestController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({ summary: 'вывод тестовой строки' })
    @Get()
    getText() {
        return "Text_Test 1234567";
    }

    @ApiOperation({ summary: 'вывод тестового объекта' })
    @Get('/testing')
    getData() {
        return this.appService.getData()
    }

}
