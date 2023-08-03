import { IsString } from 'class-validator';

export class CreateTuitDto {
  @IsString()
  message: string;
}
