import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EnviarDocumentoDto {
  @ApiProperty({
    description: 'Nome do documento',
    example: 'CPF.png',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'ID identificador do tipo de documento',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  documentTypeId: number;
  @ApiProperty({
    description: 'ID identificador do funcionário',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;
}
