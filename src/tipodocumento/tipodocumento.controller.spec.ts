import { Test, TestingModule } from '@nestjs/testing';
import { TipodocumentoController } from './tipodocumento.controller';
import { TipodocumentoService } from './tipodocumento.service';

describe('TipodocumentoController', () => {
  let controller: TipodocumentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipodocumentoController],
      providers: [TipodocumentoService],
    }).compile();

    controller = module.get<TipodocumentoController>(TipodocumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
