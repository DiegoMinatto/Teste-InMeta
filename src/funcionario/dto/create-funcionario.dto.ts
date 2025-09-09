import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateDocumentosDto } from './create-documentos.dto';

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  hiredAt: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentosDto)
  documentos?: CreateDocumentosDto[];
}
