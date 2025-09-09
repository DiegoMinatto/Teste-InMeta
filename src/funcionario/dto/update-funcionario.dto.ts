import { CreateFuncionarioDto } from './create-funcionario.dto';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { UpdateDocumentosDto } from '.';
import { Type } from 'class-transformer';

export class UpdateFuncionarioDto extends PartialType(CreateFuncionarioDto) {
  @ApiPropertyOptional({
    type: [UpdateDocumentosDto],
    description: 'Documentos do funcionário',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDocumentosDto)
  documentos?: UpdateDocumentosDto[];

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
