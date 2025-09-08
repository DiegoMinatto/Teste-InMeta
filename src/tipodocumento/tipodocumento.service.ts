import { Injectable } from '@nestjs/common';
import { CreateTipodocumentoDto } from './dto/create-tipodocumento.dto';
import { UpdateTipodocumentoDto } from './dto/update-tipodocumento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TipodocumentoService {
  constructor(private prisma: PrismaService) {}

  create(createTipodocumentoDto: CreateTipodocumentoDto) {
    return this.prisma.documentTypes.create({ data: createTipodocumentoDto });
  }

  findAll() {
    return `This action returns all tipodocumento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipodocumento`;
  }

  update(id: number, updateTipodocumentoDto: UpdateTipodocumentoDto) {
    return `This action updates a #${id} tipodocumento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipodocumento`;
  }
}
