import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TuitsService } from './tuits.service';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { UpdateTuitDto } from './dto/update-tuit.dto';
import { FinderTuitDto } from './dto/finder-tuit.dto';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitsService: TuitsService) {}

  @Post()
  create(@Body() createTuitDto: CreateTuitDto) {
    return this.tuitsService.create(createTuitDto);
  }

  @Get()
  findAll(@Query() finderTuitDto: FinderTuitDto) {
    return this.tuitsService.findAll(finderTuitDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tuitsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTuitDto: UpdateTuitDto) {
    return this.tuitsService.update(id, updateTuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tuitsService.remove(id);
  }
}
