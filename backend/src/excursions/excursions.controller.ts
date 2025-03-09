import { Controller, Get} from '@nestjs/common';
import { ExcursionService } from './excursions.service';

@Controller('excursions')
export class ExcursionController {

    constructor(private readonly excursionService: ExcursionService) {}

    @Get()
    getAllExcursions() {
        return this.excursionService.getAllExcursions();
    }

}
