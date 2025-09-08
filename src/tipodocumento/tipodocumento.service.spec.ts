import { Test, TestingModule } from '@nestjs/testing';
import { TipodocumentoService } from './tipodocumento.service';

describe('TipodocumentoService', () => {
  let service: TipodocumentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipodocumentoService],
    }).compile();

    service = module.get<TipodocumentoService>(TipodocumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
