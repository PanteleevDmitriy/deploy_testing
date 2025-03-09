import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Excursion } from './excursions.model';
import { ExcursionService } from './excursions.service';
import { ExcursionController } from './excursions.controller';

@Module({
  controllers: [ExcursionController],
  providers: [ExcursionService],
  imports: [
    SequelizeModule.forFeature([Excursion])
  ],
  exports: [
    ExcursionService
  ]
})
export class ExcursionsModule {}
