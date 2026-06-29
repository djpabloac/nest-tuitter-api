import { Test, TestingModule } from '@nestjs/testing';
import { TuitsController } from './tuits.controller';
import { TuitsService } from './tuits.service';
import { TUIT_REPOSITORY } from './entities/tuit.repository';

describe('TuitsController', () => {
  let controller: TuitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuitsController],
      providers: [
        TuitsService,
        {
          provide: TUIT_REPOSITORY,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TuitsController>(TuitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
