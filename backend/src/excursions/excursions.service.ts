import { Injectable } from '@nestjs/common';
import { Excursion } from './excursions.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ExcursionService {

    constructor(@InjectModel(Excursion) private excursionRepository: typeof Excursion ) {}

    async getAllExcursions() {
        const excursions = await this.excursionRepository.findAll();
        return excursions;
    }

}
