import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  DocumentoResponseDto,
  EnviarDocumentoDto,
  QueryDocumentoDto,
  ResponseDocumentoDto,
} from './dto';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @ApiOkResponse({
    description: 'Lista os documentos retornados',
    type: ResponseDocumentoDto,
    isArray: true,
  })
  @Get()
  findAll(@Query() queryDocumentoDto: QueryDocumentoDto) {
    return this.documentoService.findAll(queryDocumentoDto);
  }

  @ApiOkResponse({
    description: 'Entrega um documento',
    type: DocumentoResponseDto,
  })
  @Post('enviar')
  enviar(@Body() enviarDocumentoDto: EnviarDocumentoDto) {
    return this.documentoService.enviar(enviarDocumentoDto);
  }
}
