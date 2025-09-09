import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from 'src/dto';
import { FuncionarioResponseDto } from './funcionario.response.dto';

export class ResponseFuncionarioDto {
  @ApiProperty({
    type: [FuncionarioResponseDto],
    description: 'Conteúdo da resposta',
  })
  content: FuncionarioResponseDto[];

  @ApiProperty({ type: MetaDto, description: 'Informações de paginação' })
  meta: MetaDto;
}
