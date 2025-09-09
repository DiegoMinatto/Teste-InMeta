import { ApiProperty } from '@nestjs/swagger';

export class TipoDocumentoResponseDto {
  @ApiProperty({ example: 1, description: "ID do tipo de documento na base de dados"  })
  id: number;

  @ApiProperty({ example: 'CPF', description: "Descrição do documento na base de dados" })
  name: string;
}