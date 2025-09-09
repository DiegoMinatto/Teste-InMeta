import { ApiProperty } from '@nestjs/swagger';
import { DocumentoEmployeeResponseDto } from './documento.employee.response.dto';
import { MetaDto } from 'src/dto';

export class ResponseDocumentoDto {
  @ApiProperty({
    type: [DocumentoEmployeeResponseDto],
    description: 'Conteúdo da resposta',
  })
  content: (DocumentoEmployeeResponseDto)[];

  @ApiProperty({ type: MetaDto, description: 'Informações de paginação' })
  meta: MetaDto;
}
