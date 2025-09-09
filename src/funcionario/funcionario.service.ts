import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateTime } from 'luxon';
import {
  CreateDocumentosDto,
  CreateFuncionarioDto,
  UpdateDocumentosDto,
  UpdateFuncionarioDto,
} from './dto';
import { PaginationDto } from 'src/dto';

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

    const hiredAt = DateTime.fromISO(createFuncionarioDto.hiredAt, {
      zone: 'UTC',
    }).toJSDate();

    if (
      createFuncionarioDto.documentos &&
      createFuncionarioDto.documentos.length > 0
    ) {
      const seen = new Set<number>();
      for (const doc of createFuncionarioDto.documentos) {
        if (seen.has(doc.documentTypeId)) {
          throw new BadRequestException(
            'Você deve fornecer apenas um documento por tipo!',
          );
        }
        seen.add(doc.documentTypeId);
      }
    }

    return this.prisma.employees.create({
      data: {
        name: createFuncionarioDto.name,
        document: normalizedDocument,
        hiredAt: hiredAt,
        Documents: {
          createMany: { data: createFuncionarioDto.documentos ?? [] },
        },
      },
      include: { Documents: true },
    });
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

    const count = await this.prisma.employees.count();

    const employees = await this.prisma.employees.findMany({
      ...paginate,
    });

    return {
      content: employees,

      meta: {
        total: count,
        currentPage: paginationDto.page,
        perPage: rowPerPage,
      },
    };
  }

  findOne(id: number) {
    return this.prisma.employees.findUnique({ where: { id: id } });
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    const employee = await this.prisma.employees.findUnique({
      where: { id: id },
      include: { Documents: true },
    });

    var normalizedDocument: string | undefined = undefined;
    if (updateFuncionarioDto.document)
      normalizedDocument = updateFuncionarioDto.document.replace(/\D/g, '');

    if (!employee) throw new BadRequestException(`Empregado não encontrado!`);

    const employeeDocumentsType = employee.Documents.flatMap(
      (doc) => doc.documentTypeId,
    );

    const employeeDocumentsId = employee.Documents.flatMap((doc) => doc.id);

    var documentsInclude: UpdateDocumentosDto[] = [];

    if (updateFuncionarioDto.documentos)
      documentsInclude = updateFuncionarioDto.documentos?.filter(
        (doc) => !doc.id,
      );

    const documentsUpdate = updateFuncionarioDto.documentos?.filter(
      (doc) => !!doc.id,
    );

    const documentsUpdateWithType = documentsUpdate?.filter(
      (el) => !!el.documentTypeId,
    );

    //Documento já existe para outro funcionário ?
    if (updateFuncionarioDto.document) {
      const hasDocument = await this.prisma.employees.findFirst({
        where: { id: { not: id }, document: normalizedDocument },
      });

      if (hasDocument)
        throw new BadRequestException(
          `Documento ${updateFuncionarioDto.document} já vinculado a outro funcionário!`,
        );
    }

    //existem tipos de documento duplicados na inserção ?
    if (documentsInclude && documentsInclude.length > 0) {
      const seen = new Set<number>();
      for (const doc of documentsInclude) {
        if (seen.has(doc.documentTypeId!)) {
          throw new BadRequestException(
            'Você deve fornecer apenas um documento por tipo!',
          );
        }

        seen.add(doc.documentTypeId!);
      }
    }

    //Existe algum documento a ser atualizado onde o ID não existe ?
    if (documentsUpdate && documentsUpdate.length > 0) {
      const allowedSet = new Set(employeeDocumentsId);
      for (const doc of documentsUpdate) {
        if (!allowedSet.has(doc.id!)) {
          throw new BadRequestException(
            `Documento com o id ${doc.id} não encontrado!`,
          );
        }
      }
    }

    //Existe algum documento a ser atualizado onde o tipo já existe em outro ?
    if (documentsUpdate && documentsUpdate.length > 0) {
      const notAllowedSet = new Set(employeeDocumentsType);

      for (const doc of documentsUpdate) {
        if (
          notAllowedSet.has(doc.documentTypeId!) &&
          !(
            doc.id ===
            employee.Documents.filter(
              (el) => el.documentTypeId === doc.documentTypeId!,
            )![0].id
          )
        ) {
          throw new BadRequestException(
            `Documento com o tipo ${doc.documentTypeId} já vinculado ao funcionário!`,
          );
        }
      }
    }

    //Existe algum documento sendo incluido que já está vinculado ao empregado ?
    if (documentsInclude && documentsInclude.length > 0) {
      const notAllowedSet = new Set(employeeDocumentsType);
      for (const doc of documentsInclude) {
        if (
          notAllowedSet.has(doc.documentTypeId!) &&
          !(
            updateFuncionarioDto.documents_remove &&
            updateFuncionarioDto.documents_remove.length > 0 &&
            updateFuncionarioDto.documents_remove.includes(
              employee.Documents.filter(
                (el) => el.documentTypeId === doc.documentTypeId,
              )[0].id,
            )
          )
        ) {
          throw new BadRequestException(
            `Documento com o tipo ${doc.documentTypeId} já vinculado ao funcionário!`,
          );
        }
      }
    }

    //Existe algum documento sendo desvinculado que não existe ?
    if (
      updateFuncionarioDto.documents_remove &&
      updateFuncionarioDto.documents_remove.length > 0
    ) {
      const allowedSet = new Set(employee.Documents.flatMap((doc) => doc.id));
      for (const doc of updateFuncionarioDto.documents_remove) {
        if (!allowedSet.has(doc)) {
          throw new BadRequestException(
            `Documento ${doc} não pode ser removido pois não existe!`,
          );
        }
      }
    }

    //Os tipos de documento na inserção existem ?
    if (documentsInclude && documentsInclude.length > 0) {
      const documentTypeIds = documentsInclude.map(
        (doc) => doc.documentTypeId!,
      );

      const existingDocumentTypes = await this.prisma.documentTypes.findMany({
        where: {
          id: { in: documentTypeIds },
        },
        select: { id: true },
      });

      const existingIds = existingDocumentTypes.map((dt) => dt.id);

      const invalidIds = documentTypeIds.filter(
        (id) => !existingIds.includes(id),
      );

      if (invalidIds.length > 0) {
        throw new BadRequestException(
          `Os seguintes tipos de documento não existem: ${invalidIds.join(', ')}`,
        );
      }
    }

    //Os tipos de documento na atualização existem ?

    if (documentsUpdateWithType && documentsUpdateWithType.length > 0) {
      const documentTypeIds = documentsUpdateWithType.map(
        (doc) => doc.documentTypeId!,
      );

      const existingDocumentTypes = await this.prisma.documentTypes.findMany({
        where: {
          id: { in: documentTypeIds },
        },
        select: { id: true },
      });

      const existingIds = existingDocumentTypes.map((dt) => dt.id);

      const invalidIds = documentTypeIds.filter(
        (id) => !existingIds.includes(id),
      );

      if (invalidIds.length > 0) {
        throw new BadRequestException(
          `Os seguintes tipos de documento não existem: ${invalidIds.join(', ')}`,
        );
      }
    }

    await this.prisma.$transaction(async (prisma) => {
      if (documentsUpdate)
        await documentsUpdate.map(
          async (update) =>
            await prisma.documents.update({
              where: { id: update.id },
              data: update,
            }),
        );

      if (
        updateFuncionarioDto.documents_remove &&
        updateFuncionarioDto.documents_remove.length > 0
      )
        await prisma.documents.deleteMany({
          where: {
            id: {
              in: updateFuncionarioDto.documents_remove,
            },
          },
        });

      var hiredAt = undefined;
      if (updateFuncionarioDto.hiredAt)
        hiredAt = DateTime.fromISO(updateFuncionarioDto.hiredAt, {
          zone: 'UTC',
        }).toJSDate();

      await prisma.employees.update({
        where: { id: id },
        data: {
          name: updateFuncionarioDto.name,
          hiredAt: hiredAt,
          document: normalizedDocument,
          Documents: {
            createMany: { data: documentsInclude as CreateDocumentosDto[] },
          },
        },
      });
    });

    return this.prisma.employees.findUnique({
      where: { id: id },
      include: { Documents: true },
    });
  }

  remove(id: number) {
    return this.prisma.employees.delete({ where: { id: id } });
  }
}
