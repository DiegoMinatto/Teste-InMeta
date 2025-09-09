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
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuncionarioDto {
  @ApiProperty({
    example: 'John doe',
    description: 'Nome do funcionário',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '111.111.111-00',
    description: 'Documento do funcionário',
  })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    example: '2025-09-09',
    description: 'Data de contratação do funcionário, formato YYY-MM-DD',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  hiredAt: string;

  @ApiProperty({
    type: [CreateDocumentosDto],
    description: 'Documentos do funcionário',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentosDto)
  documentos?: CreateDocumentosDto[];
}
