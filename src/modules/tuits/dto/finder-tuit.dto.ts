import { IsString } from 'class-validator';
export class FinderTuitDto {
  @IsString()
  orderBy: string;

  @IsString()
  searchTerm: string;
}
