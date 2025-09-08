import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class DocumentoService {
  constructor(private prisma: PrismaService) {}

  async create(createDocumentoDto: CreateDocumentoDto) {
    const employee = await this.prisma.employees.findUnique({
      where: { id: createDocumentoDto.employeeId },
    });
    const documentType = await this.prisma.documentTypes.findUnique({
      where: { id: createDocumentoDto.documentTypeId },
    });

    if (!employee) throw new BadRequestException(`Funcionário não encontrado!`);

    if (!documentType)
      throw new BadRequestException(`Tipo de documento não encontrado!`);

    return this.prisma.documents.create({
      data: {
        name: createDocumentoDto.name,
        employee: { connect: employee },
        documentType: { connect: documentType },
        status: Status.PENDING
      },
    });
  }

  findAll() {
    return `This action returns all documento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documento`;
  }

  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return `This action updates a #${id} documento`;
  }

  remove(id: number) {
    return `This action removes a #${id} documento`;
  }
}
