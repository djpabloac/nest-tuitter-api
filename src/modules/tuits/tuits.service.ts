import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateTuitDto } from './dto/create-tuit.dto';
import { UpdateTuitDto } from './dto/update-tuit.dto';
import { FinderTuitDto } from './dto/finder-tuit.dto';
import { TUIT_REPOSITORY, TuitRepository } from './entities/tuit.repository';

@Injectable()
export class TuitsService {
  constructor(
    @Inject(TUIT_REPOSITORY) private readonly tuitRepository: TuitRepository,
  ) {}

  async create(createTuitDto: CreateTuitDto) {
    return this.tuitRepository.create(createTuitDto);
  }

  async findAll(finderTuitDto: FinderTuitDto) {
    return this.tuitRepository.findAll(finderTuitDto);
  }

  async findById(id: string) {
    const tuit = await this.tuitRepository.findById(id);

    if (!tuit) throw new NotFoundException('tuit not found');

    return tuit;
  }

  async update(id: string, updateTuitDto: UpdateTuitDto) {
    const tuit = await this.tuitRepository.update(id, updateTuitDto);

    if (!tuit) throw new NotFoundException('tuit not found');

    return tuit;
  }

  async remove(id: string) {
    const tuit = await this.tuitRepository.remove(id);

    if (!tuit) throw new NotFoundException('tuit not found');

    return 'Successful deleted!';
  }
}
