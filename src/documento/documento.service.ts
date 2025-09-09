import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnviarDocumentoDto } from './dto';
import { Status } from '@prisma/client';
import { QueryDocumentoDto } from './dto/query.dto';

@Injectable()
export class DocumentoService {
  constructor(private prisma: PrismaService) {}

  async findAll(queryDocumentoDto: QueryDocumentoDto) {
    const rowPerPage = queryDocumentoDto.perPage ?? 10;

    var paginate = {};

    if (queryDocumentoDto.page) {
      paginate = {
        take: rowPerPage,
        skip: (queryDocumentoDto.page - 1) * rowPerPage,
      };
    }

    var filter = {};
    if (queryDocumentoDto.documentTypeId)
      filter = { ...filter, documentTypeId: queryDocumentoDto.documentTypeId };

    if (queryDocumentoDto.employeeId)
      filter = { ...filter, employeeId: queryDocumentoDto.employeeId };

    if (queryDocumentoDto.status)
      filter = { ...filter, status: queryDocumentoDto.status };

    const promotionCount = await this.prisma.documents.count();

    const documents = await this.prisma.documents.findMany({
      ...paginate,
      include: { employee: true },
      where: filter,
    });

    return {
      content: documents,

      meta: {
        total: promotionCount,
        currentPage: queryDocumentoDto.page,
        perPage: rowPerPage,
      },
    };
  }

  async enviar(enviarDocumentoDto: EnviarDocumentoDto) {
    const employee = await this.prisma.employees.findUnique({
      where: { id: enviarDocumentoDto.employeeId },
      include: { Documents: true },
    });

    if (!employee) throw new BadRequestException(`Empregado não encontrado!`);

    const hasDocument = employee.Documents.filter(
      (el) => el.documentTypeId === enviarDocumentoDto.documentTypeId,
    );

    if (hasDocument.length === 0)
      throw new BadRequestException(`Empregado não possui o documento!`);

    if (hasDocument[0].status === Status.E)
      throw new BadRequestException(`O documento já foi entregue!`);

    return this.prisma.documents.update({
      where: { id: hasDocument[0].id },
      data: { name: enviarDocumentoDto.name, status: Status.E },
    });
  }
}
