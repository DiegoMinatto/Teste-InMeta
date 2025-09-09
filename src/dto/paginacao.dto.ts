import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Define a pagina da paginação',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number;
  @ApiPropertyOptional({
    description: 'Define quantidade de resultados por página',
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  perPage: number;
}
