import { AppService } from '../app.service';
export declare class TestController {
    private readonly appService;
    constructor(appService: AppService);
    getText(): string;
    getData(): {
        name: string;
        value: string;
    };
}
