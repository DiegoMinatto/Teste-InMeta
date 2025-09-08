import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateTime } from 'luxon';

@Injectable()
export class FuncionarioService {
  constructor(private prisma: PrismaService) {}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const normalizedDocument = createFuncionarioDto.document.replace(/\D/g, '');

    const hasEmpoyee = await this.prisma.employees.findUnique({
      where: { document: normalizedDocument },
    });

    if (hasEmpoyee)
      throw new BadRequestException(
        `Já existe um funcionário com este documento cadastrado!`,
      );

    const dt = DateTime.fromISO(createFuncionarioDto.hiredAt, {
      zone: 'UTC',
    }).toJSDate();

    return this.prisma.employees.create({
      data: {
        name: createFuncionarioDto.name,
        document: normalizedDocument,
        hiredAt: dt,
      },
    });
  }

  findAll() {
    return `This action returns all funcionario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} funcionario`;
  }

  update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    return `This action updates a #${id} funcionario`;
  }

  remove(id: number) {
    return `This action removes a #${id} funcionario`;
  }
}
