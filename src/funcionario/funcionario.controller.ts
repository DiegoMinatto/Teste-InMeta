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
import { FuncionarioService } from './funcionario.service';
import {
  CreateFuncionarioDto,
  FuncionarioResponseDto,
  ResponseFuncionarioDto,
  UpdateFuncionarioDto,
} from './dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto, PaginationDto } from 'src/dto';

@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @ApiOkResponse({
    description: 'Entrega um documento',
    type: FuncionarioResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @ApiOkResponse({
    description: 'Entrega um documento',
    type: ResponseFuncionarioDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.funcionarioService.findAll(paginationDto);
  }

  @ApiOkResponse({
    description: 'Recupera um documento via ID',
    type: FuncionarioResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.funcionarioService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Retorna o funcionário atualizado',
    type: FuncionarioResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.update(+id, updateFuncionarioDto);
  }

  @ApiOkResponse({
    description: 'Retorna o funcionário removido',
    type: FuncionarioResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(+id);
  }
}
