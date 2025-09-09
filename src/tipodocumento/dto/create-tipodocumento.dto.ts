import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipodocumentoDto {
  @ApiProperty({ example: 'CPF', description: "Descrição do tipo de documento" })
  @IsString()
  @IsNotEmpty()
  name: string;
}
