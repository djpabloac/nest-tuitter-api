import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TuitRepository } from '../entities/tuit.repository';
import { CreateTuitDto } from '../dto/create-tuit.dto';
import { FinderTuitDto } from '../dto/finder-tuit.dto';
import { UpdateTuitDto } from '../dto/update-tuit.dto';
import { Tuit } from '../entities/tuit.entity';
import { TuitDocument, TuitModel } from '../schemas/tuit.schema';

@Injectable()
export class TuitMongoRepository implements TuitRepository {
  constructor(@InjectModel(Tuit.name) private tuitModel: TuitModel) {}

  private mapToUser(rawTuit: TuitDocument) {
    const tuit = new Tuit();

    tuit.id = rawTuit._id.toString();
    tuit.message = rawTuit.message;
    tuit.createdAt = rawTuit.createdAt;
    tuit.updatedAt = rawTuit.updatedAt;

    return tuit;
  }

  async create(createTuitDto: CreateTuitDto): Promise<Tuit> {
    const tuitCreated = await this.tuitModel.create(createTuitDto);

    return this.mapToUser(tuitCreated);
  }

  async findAll(finderTuitDto: FinderTuitDto): Promise<Tuit[]> {
    const tuits = await this.tuitModel
      .find({
        message: {
          $regex: finderTuitDto.searchTerm,
          $options: 'i',
        },
      })
      .lean();

    return tuits.map((tuit) => this.mapToUser(tuit));
  }

  async findById(id: string): Promise<Tuit | null> {
    const tuit = await this.tuitModel.findById(id).lean();

    if (!tuit) return null;

    return this.mapToUser(tuit);
  }

  async update(id: string, updateTuitDto: UpdateTuitDto): Promise<Tuit | null> {
    const tuitUpdated = await this.tuitModel.findByIdAndUpdate(id, {
      $set: {
        message: updateTuitDto.message,
      },
    });

    if (!tuitUpdated) return null;

    return this.mapToUser(tuitUpdated);
  }

  async remove(id: string): Promise<Tuit | null> {
    const tuitDeleted = await this.tuitModel.findByIdAndRemove(id).lean();

    if (!tuitDeleted) return null;

    return this.mapToUser(tuitDeleted);
  }
}
