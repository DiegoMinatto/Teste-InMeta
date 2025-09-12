import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTipodocumentoDto, UpdateTipodocumentoDto } from './dto';
import { PaginationDto } from 'src/dto';

@Injectable()
export class TipodocumentoService {
  constructor(private prisma: PrismaService) {}

  create(createTipodocumentoDto: CreateTipodocumentoDto) {
    return this.prisma.documentTypes.create({ data: createTipodocumentoDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const rowPerPage = paginationDto.perPage ?? 10;

    var paginate = {};

    if (paginationDto.page) {
      paginate = {
        take: rowPerPage,
        skip: (paginationDto.page - 1) * rowPerPage,
      };
    }

    const count = await this.prisma.documentTypes.count();

    const documentTypes = await this.prisma.documentTypes.findMany({
      ...paginate,
    });

    return {
      content: documentTypes,

      meta: {
        total: count,
        currentPage: paginationDto.page,
        perPage: rowPerPage,
      },
    };
  }

  findOne(id: number) {
    return this.prisma.documentTypes.findUnique({ where: { id: id } });
  }

  async update(id: number, updateTipodocumentoDto: UpdateTipodocumentoDto) {
    const documentType = await this.prisma.documentTypes.findUnique({
      where: { id: id },
    });

    if (!documentType)
      throw new BadRequestException(`Tipo de documento não encontrado!`);

    return this.prisma.documentTypes.update({
      where: { id: id },
      data: updateTipodocumentoDto,
    });
  }

  async remove(id: number) {
    const documentType = await this.prisma.documentTypes.findUnique({
      where: { id: id },
    });
    if (!documentType)
      throw new BadRequestException(`Tipo de documento não encontrado!`);

    return this.prisma.documentTypes.delete({ where: { id: id } });
  }
}
