import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateDocumentosDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id?: number;
  @IsString()
  @IsOptional()
  name?: string;
  @IsNumber()
  @IsOptional()
  documentTypeId?: number;
}
