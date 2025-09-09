import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({ example: 2, description: "Total de ítens encontrados base de dados" })
  total: number;

  @ApiProperty({ example: 10, description: "Quantidade de ítens por página" })
  perPage: number;

  @ApiProperty({ example: 1, required: false, description: "Página atual dentro da paginação" })
  currentPage?: number;
}