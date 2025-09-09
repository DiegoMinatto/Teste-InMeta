import { ApiProperty } from '@nestjs/swagger';

import { TipoDocumentoResponseDto } from './tipodocumento.response.dto';
import { MetaDto } from 'src/dto';

export class ResponseTipoDocumentoDto {
  @ApiProperty({
    type: [TipoDocumentoResponseDto],
    description: 'Conteúdo da resposta',
  })
  content: TipoDocumentoResponseDto[];

  @ApiProperty({ type: MetaDto, description: 'Informações de paginação' })
  meta: MetaDto;
}
