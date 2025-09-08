import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipodocumentoDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
