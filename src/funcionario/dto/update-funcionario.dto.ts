import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionarioDto } from './create-funcionario.dto';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UpdateDocumentosDto } from './update-documentos.dto';

export class UpdateFuncionarioDto{

  @IsString()
  @IsOptional()
  name?: string;

  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsString()
  @IsOptional()
  document?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  hiredAt?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDocumentosDto)
  documentos?: UpdateDocumentosDto[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  documents_remove?: number[];
  
}
