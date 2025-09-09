import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { CreateDocumentosDto } from './create-documentos.dto';

export class UpdateDocumentosDto extends CreateDocumentosDto {
  @ApiProperty({
    example: 1,
    description:
      'ID identificador do documento, caso não fornecido será tratado como uma inserção, caso fornecido como uma atualização',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id?: number;
}
