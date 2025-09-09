import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DocumentoModule } from './documento/documento.module';
import { TipodocumentoModule } from './tipodocumento/tipodocumento.module';
import { FuncionarioModule } from './funcionario/funcionario.module';

@Module({
  imports: [PrismaModule, DocumentoModule, TipodocumentoModule, FuncionarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
