import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TuitsService } from './tuits.service';
import { TuitsController } from './tuits.controller';
import { Tuit, TuitSchema } from './schemas/tuit.schema';
import { TUIT_REPOSITORY } from './entities/tuit.repository';
import { TuitMongoRepository } from './repositories/tuis.mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tuit.name,
        schema: TuitSchema,
      },
    ]),
  ],
  controllers: [TuitsController],
  providers: [
    TuitsService,
    {
      provide: TUIT_REPOSITORY,
      useClass: TuitMongoRepository,
    },
  ],
})
export class TuitsModule {}
