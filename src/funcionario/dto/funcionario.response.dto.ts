import { ApiProperty } from '@nestjs/swagger';
import { DocumentoFuncionarioResponseDto } from './documento.response.dto';


export class FuncionarioResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID identificador do documento',
  })
  id: number;
  @ApiProperty({
    example: 'John doe',
    description: 'Nome do funcionário',
  })
  name: string;
  @ApiProperty({
    example: '11111111100',
    description: 'Documento do funcionário, sem mascara',
  })
  document: string;
  @ApiProperty({
    example: '2025-09-10T00:00:00.000Z',
    description:
      'Data de contratação do funcionário, formatado em ISO8601, fuso horário UTC',
  })
  hiredAt: string;

  @ApiProperty({
    type: [DocumentoFuncionarioResponseDto],
    description: 'Documentos do funcionário',
  })
  Documents: DocumentoFuncionarioResponseDto;
}
