import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDocumentoDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  documentTypeId: number;
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;
}
