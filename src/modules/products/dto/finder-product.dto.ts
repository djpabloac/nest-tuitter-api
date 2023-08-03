import { IsString } from 'class-validator';

export class FinderProductDto {
  @IsString()
  orderBy: string;

  @IsString()
  searchTerm: string;
}
