import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TipodocumentoService } from './tipodocumento.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateTipodocumentoDto,
  ResponseTipoDocumentoDto,
  TipoDocumentoResponseDto,
  UpdateTipodocumentoDto,
} from './dto';
import { ErrorResponseDto, PaginationDto } from 'src/dto';

@Controller('tipodocumento')
export class TipodocumentoController {
  constructor(private readonly tipodocumentoService: TipodocumentoService) {}

  @ApiOkResponse({
    description: 'Tipo de documento adicionado a base de dados',
    type: TipoDocumentoResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Post()
  create(@Body() createTipodocumentoDto: CreateTipodocumentoDto) {
    return this.tipodocumentoService.create(createTipodocumentoDto);
  }

  @ApiOkResponse({
    description: 'Lista os tipos de documento retornados',
    type: ResponseTipoDocumentoDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tipodocumentoService.findAll(paginationDto);
  }

  @ApiOkResponse({
    description: 'Retorna um tipo de documento',
    type: TipoDocumentoResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tipodocumentoService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Retorna o tipo de documento atualizado',
    type: TipoDocumentoResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTipodocumentoDto: UpdateTipodocumentoDto,
  ) {
    return this.tipodocumentoService.update(+id, updateTipodocumentoDto);
  }

  @ApiOkResponse({
    description: 'Retorna o tipo de documento removido',
    type: TipoDocumentoResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipodocumentoService.remove(+id);
  }
}
