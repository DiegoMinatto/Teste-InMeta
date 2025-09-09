import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDocumentosDto {
  @ApiProperty({
    example: 1,
    description: 'ID identificador do tipo de documento',
  })
  @IsNumber()
  @IsNotEmpty()
  documentTypeId: number;
}
