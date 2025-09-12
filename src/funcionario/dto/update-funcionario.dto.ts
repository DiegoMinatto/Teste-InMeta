import { CreateFuncionarioDto } from './create-funcionario.dto';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDocumentosDto } from '.';
import { Type } from 'class-transformer';

export class UpdateFuncionarioDto extends PartialType(CreateFuncionarioDto) {
  @ApiPropertyOptional({
    type: [CreateDocumentosDto],
    description: 'Documentos do funcionário',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentosDto)
  documentos?: CreateDocumentosDto[];

  @ApiPropertyOptional({
    type: [Number],
    description: 'IDs dos documentos a serem removidos',
    example: [1],
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  documents_remove?: number[];
}
