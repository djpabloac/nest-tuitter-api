import { Test, TestingModule } from '@nestjs/testing';
import { TuitsService } from './tuits.service';
import { TUIT_REPOSITORY } from './entities/tuit.repository';

describe('TuitsService', () => {
  let service: TuitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<TuitsService>(TuitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
