import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from '../../dto/paginacao.dto';
import { Transform } from 'class-transformer';
import { Status } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryDocumentoDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: Status,
    description: 'Filtrar resultados por status (P = Pendente, E = Enviado)',
    example: Status.P,
  })
  @IsOptional()
  @IsEnum(Status, {
    message: 'Status deve ser P (Pendente) ou E (Enviado)',
  })
  status?: Status;

  @ApiPropertyOptional({
    description: 'Filtro tipo de documento',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  documentTypeId?: number;

  @ApiPropertyOptional({
    description: 'Filtro por funcionário ',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  employeeId?: number;
}
