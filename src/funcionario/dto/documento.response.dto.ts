import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class DocumentoFuncionarioResponseDto {
  @ApiProperty({ example: 1, description: 'ID do documento na base de dados' })
  id: number;

  @ApiProperty({
    example: 'null',
    nullable: true,
    description: 'Nome do arquivo na base de dados',
  })
  name: string | null;

  @ApiProperty({
    example: 'P',
    description: 'Status do documento (P = Pendente, E = Enviado)',
  })
  status: Status;

  @ApiProperty({
    example: 1,
    description: 'ID identificador do tipo de documento',
  })
  documentTypeId: number;

  @ApiProperty({ example: 1, description: 'ID identificador do funcionário' })
  employeeId: number;
}
