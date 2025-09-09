import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TipodocumentoService } from './tipodocumento.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  CreateTipodocumentoDto,
  ResponseTipoDocumentoDto,
  TipoDocumentoResponseDto,
  UpdateTipodocumentoDto,
} from './dto';
import { PaginationDto } from 'src/dto';

@Controller('tipodocumento')
export class TipodocumentoController {
  constructor(private readonly tipodocumentoService: TipodocumentoService) {}

  @ApiOkResponse({
    description: 'Tipo de documento adicionado a base de dados',
    type: TipoDocumentoResponseDto,
  })
  @Post()
  create(@Body() createTipodocumentoDto: CreateTipodocumentoDto) {
    return this.tipodocumentoService.create(createTipodocumentoDto);
  }

  @ApiOkResponse({
    description: 'Lista os tipos de documento retornados',
    type: ResponseTipoDocumentoDto,
    isArray: true,
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tipodocumentoService.findAll(paginationDto);
  }

  @ApiOkResponse({
    description: 'Retorna um tipo de documento',
    type: TipoDocumentoResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipodocumentoService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Retorna o tipo de documento atualizado',
    type: TipoDocumentoResponseDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTipodocumentoDto: UpdateTipodocumentoDto,
  ) {
    return this.tipodocumentoService.update(+id, updateTipodocumentoDto);
  }

  @ApiOkResponse({
    description: 'Retorna o tipo de documento removido',
    type: TipoDocumentoResponseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tipodocumentoService.remove(+id);
  }
}
