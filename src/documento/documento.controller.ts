import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  DocumentoResponseDto,
  EnviarDocumentoDto,
  QueryDocumentoDto,
  ResponseDocumentoDto,
} from './dto';
import { ErrorResponseDto } from 'src/dto';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @ApiOkResponse({
    description: 'Lista os documentos retornados',
    type: ResponseDocumentoDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Get()
  findAll(@Query() queryDocumentoDto: QueryDocumentoDto) {
    return this.documentoService.findAll(queryDocumentoDto);
  }

  @ApiOkResponse({
    description: 'Entrega um documento',
    type: DocumentoResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Post('enviar')
  enviar(@Body() enviarDocumentoDto: EnviarDocumentoDto) {
    return this.documentoService.enviar(enviarDocumentoDto);
  }
}
