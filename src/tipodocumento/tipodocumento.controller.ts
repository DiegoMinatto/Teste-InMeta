import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipodocumentoService } from './tipodocumento.service';
import { CreateTipodocumentoDto } from './dto/create-tipodocumento.dto';
import { UpdateTipodocumentoDto } from './dto/update-tipodocumento.dto';

@Controller('tipodocumento')
export class TipodocumentoController {
  constructor(private readonly tipodocumentoService: TipodocumentoService) {}

  @Post()
  create(@Body() createTipodocumentoDto: CreateTipodocumentoDto) {
    return this.tipodocumentoService.create(createTipodocumentoDto);
  }

  @Get()
  findAll() {
    return this.tipodocumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipodocumentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipodocumentoDto: UpdateTipodocumentoDto) {
    return this.tipodocumentoService.update(+id, updateTipodocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipodocumentoService.remove(+id);
  }
}
