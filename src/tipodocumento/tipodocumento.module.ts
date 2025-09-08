import { Module } from '@nestjs/common';
import { TipodocumentoService } from './tipodocumento.service';
import { TipodocumentoController } from './tipodocumento.controller';

@Module({
  controllers: [TipodocumentoController],
  providers: [TipodocumentoService],
})
export class TipodocumentoModule {}
