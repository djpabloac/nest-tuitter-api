import { CreateTuitDto } from '../dto/create-tuit.dto';
import { FinderTuitDto } from '../dto/finder-tuit.dto';
import { UpdateTuitDto } from '../dto/update-tuit.dto';
import { Tuit } from './tuit.entity';

export const TUIT_REPOSITORY = 'TuitRepository';

export interface TuitRepository {
  create(createTuitDto: CreateTuitDto): Promise<Tuit>;
  findAll(finderTuitDto: FinderTuitDto): Promise<Tuit[]>;
  findById(id: string): Promise<Tuit | null>;
  update(id: string, updateTuitDto: UpdateTuitDto): Promise<Tuit | null>;
  remove(id: string): Promise<Tuit | null>;
}
