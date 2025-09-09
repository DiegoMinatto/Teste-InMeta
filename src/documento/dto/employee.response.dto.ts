import { ApiProperty } from '@nestjs/swagger';

export class EmployeeResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID do funcionário dentro da base de dados',
  })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Nome do funcionário' })
  name: string;

  @ApiProperty({
    example: '11111111113',
    description: 'Documento do funcionário',
  })
  document: string;

  @ApiProperty({
    example: '2025-09-10T00:00:00.000Z',
    description:
      'Data de contratação do funcionário, formatado em ISO8601, fuso horário UTC',
  })
  hiredAt: Date;
}
