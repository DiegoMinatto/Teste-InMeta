import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateTipodocumentoDto } from 'src/tipodocumento/dto';
import { CreateFuncionarioDto } from 'src/funcionario/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.limpaDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Tipo de documento', () => {
    describe('Inserção', () => {
      it('Deve falhar ao enviar sem nome', () => {
        return pactum
          .spec()
          .post('/tipodocumento')
          .withBody({})
          .expectStatus(400);
      });

      it('Deve inserir', () => {
        const createTipoDocumento: CreateTipodocumentoDto = {
          name: 'CPF',
        };

        return pactum
          .spec()
          .post('/tipodocumento')
          .withBody(createTipoDocumento)
          .expectStatus(201)
          .stores('tipoDocumentoId', 'id');
      });
    });
    describe('Edição', () => {
      const createTipoDocumento: CreateTipodocumentoDto = {
        name: 'CTPS',
      };

      it('Deve falhar ao enviar sem ID', () => {
        return pactum
          .spec()
          .patch('/tipodocumento')
          .withBody(createTipoDocumento)
          .expectStatus(404);
      });

      it('Deve falhar ao enviar com ID inexistente', () => {
        return pactum
          .spec()
          .patch('/tipodocumento/99999999')
          .withBody(createTipoDocumento)
          .expectStatus(400);
      });

      it('Deve editar', () => {
        return pactum
          .spec()
          .patch('/tipodocumento/{id}')
          .withBody(createTipoDocumento)
          .withPathParams('id', '$S{tipoDocumentoId}')
          .expectStatus(200);
      });
    });
    describe('Remoção', () => {
      it('Deve falhar ao enviar sem ID', () => {
        return pactum.spec().delete('/tipodocumento').expectStatus(404);
      });

      it('Deve falhar ao enviar com ID inexistente', () => {
        return pactum
          .spec()
          .delete('/tipodocumento/999999999')
          .withBody({})
          .expectStatus(400);
      });

      it('Deve remover', () => {
        return pactum
          .spec()
          .delete('/tipodocumento/{id}')
          .withPathParams('id', '$S{tipoDocumentoId}')
          .expectStatus(200);
      });
    });

    it('Deve inserir CPF', () => {
      const createTipoDocumento: CreateTipodocumentoDto = {
        name: 'CPF',
      };

      return pactum
        .spec()
        .post('/tipodocumento')
        .withBody(createTipoDocumento)
        .expectStatus(201)
        .stores('tipoDocumentoIdCPF', 'id');
    });

    it('Deve inserir CTPS', () => {
      const createTipoDocumento: CreateTipodocumentoDto = {
        name: 'CTPS',
      };

      return pactum
        .spec()
        .post('/tipodocumento')
        .withBody(createTipoDocumento)
        .expectStatus(201)
        .stores('tipoDocumentoIdCTPS', 'id');
    });

    it('Deve inserir RG', () => {
      const createTipoDocumento: CreateTipodocumentoDto = {
        name: 'RG',
      };

      return pactum
        .spec()
        .post('/tipodocumento')
        .withBody(createTipoDocumento)
        .expectStatus(201)
        .stores('tipoDocumentoIdRG', 'id');
    });

    describe('Busca', () => {
      it('deve buscar', () => {
        return pactum.spec().get('/tipodocumento').expectStatus(200);
      });

      it('deve buscar por id', () => {
        return pactum
          .spec()
          .get('/tipodocumento/{id}')
          .withPathParams('id', '$S{tipoDocumentoIdCPF}')
          .expectStatus(200);
      });
    });
  });

  describe('Funcionário', () => {
    describe('Inserção', () => {
      const createTipoDocumento = {
        name: 'John Doe',
        document: '111.111.111-11',
        hiredAt: '2025-09-10',
        documentos: [
          {
            documentTypeId: '$S{tipoDocumentoIdCPF}',
          },
        ],
      };

      it('Deve falhar ao enviar sem nome', () => {
        const { name, ...tempMock } = createTipoDocumento;

        return pactum
          .spec()
          .post('/funcionario')
          .withJson(tempMock)
          .expectStatus(400);
      });

      it('Deve falhar ao enviar sem documento', () => {
        const { document, ...tempMock } = createTipoDocumento;
        return pactum
          .spec()
          .post('/funcionario')
          .withJson(tempMock)
          .expectStatus(400);
      });

      it('Deve falhar ao enviar data em formato errado', () => {
        return pactum
          .spec()
          .post('/funcionario')
          .withJson({ ...createTipoDocumento, hiredAt: '10/10/2025' })
          .expectStatus(400);
      });

      it('Deve inserir John', () => {
        return pactum
          .spec()
          .post('/funcionario')
          .withJson(createTipoDocumento)
          .expectStatus(201)
          .stores('funcionarioIdJohn', 'id');
      });

      it('Deve inserir Jane', () => {
        return pactum
          .spec()
          .post('/funcionario')
          .withJson({
            ...createTipoDocumento,
            name: 'Jane',
            document: '222.222.222-22',
          })
          .expectStatus(201)
          .stores('funcionarioIdJane', 'id');
      });
      it('Deve falhar ao enviar mesmo documento para mais de um funcionario', () => {
        return pactum
          .spec()
          .post('/funcionario')
          .withJson(createTipoDocumento)
          .expectStatus(400)
          .stores('funcionarioId', 'id');
      });
      it('Deve falhar ao enviar mais de um documento por tipo', () => {
        return pactum
          .spec()
          .post('/funcionario')
          .withJson({
            name: 'Jane Doe',
            document: '111.111.111-22',
            hiredAt: '2025-09-10',
            documentos: [
              {
                documentTypeId: '$S{tipoDocumentoIdCPF}',
              },
              {
                documentTypeId: '$S{tipoDocumentoIdCPF}',
              },
            ],
          })
          .expectStatus(400)
          .stores('funcionarioId', 'id');
      });
    });
    describe('Edição', () => {
      it('Falha ao atualizar empregado inexistente', () => {
        return pactum
          .spec()
          .patch('/funcionario/9999999')
          .withBody({
            hiredAt: '2025-09-10',
          })
          .expectStatus(400);
      });
      it('Falha ao tentar atualizar documento do empregrado para um documento em uso que não seja o proprio', () => {
        return pactum
          .spec()
          .patch('/funcionario/{id}')
          .withBody({ document: '222.222.222-22' })
          .withPathParams('id', '$S{funcionarioIdJohn}')
          .expectStatus(400);
      });
      it('Falha ao enviar documento duplicado na inserção', () => {
        return pactum
          .spec()
          .patch('/funcionario/{id}')
          .withBody({
            documentos: [
              { documentTypeId: '$S{tipoDocumentoIdCTPS}' },
              { documentTypeId: '$S{tipoDocumentoIdCTPS}' },
            ],
          })
          .withPathParams('id', '$S{funcionarioIdJohn}')
          .expectStatus(400);
      });
      it('Falha ao tentar incluir um documento já vinculado ao empregado', () => {
        return pactum
          .spec()
          .patch('/funcionario/{id}')
          .withBody({
            documentos: [
              { documentTypeId: '$S{tipoDocumentoIdCPF}' },
              { documentTypeId: '$S{tipoDocumentoIdCPF}' },
            ],
          })
          .withPathParams('id', '$S{funcionarioIdJohn}')
          .expectStatus(400);
      });
      it('Falha ao tentar desvincular documento inexistente', () => {
        return pactum
          .spec()
          .patch('/funcionario/{id}')
          .withBody({
            documents_remove: [9999],
          })
          .withPathParams('id', '$S{funcionarioIdJohn}')
          .expectStatus(400);
      });
      it('Falha ao vincular um documento inexistente', () => {
        return pactum
          .spec()
          .patch('/funcionario/{id}')
          .withBody({
            documentos: [{ documentTypeId: 9999999999999 }],
          })
          .withPathParams('id', '$S{funcionarioIdJohn}')
          .expectStatus(400);
      });
      it('Deve editar', () => {
        return pactum
          .spec()
          .patch('/funcionario/{id}')
          .withBody({
            documentos: [{ documentTypeId: '$S{tipoDocumentoIdCTPS}' }],
          })
          .withPathParams('id', '$S{funcionarioIdJohn}')
          .expectStatus(200);
      });
    });
    describe('Remoção', () => {
      it('Deve falhar ao tentar remover id inexistente', () => {
        return pactum.spec().delete('/funcionario/-1').expectStatus(400);
      });
      it('Deve remover', () => {
        return pactum
          .spec()
          .delete('/funcionario/{id}')
          .withPathParams('id', '$S{funcionarioIdJohn}')
          .expectStatus(200);
      });
    });
    describe('Busca geral', () => {
      it('Deve buscar', () => {
        return pactum.spec().get('/funcionario').expectStatus(200);
      });
    });
    describe('Busca por ID', () => {
      it('Deve buscar', () => {
        return pactum
          .spec()
          .get('/funcionario/{id}')
          .withPathParams('id', '$S{funcionarioIdJane}')
          .expectStatus(200);
      });
    });
  });

  describe('Documento', () => {
    it('Enviar', () => {
      return pactum
        .spec()
        .post('/documento/enviar')
        .withBody({
          name: 'CPF.pdf',
          documentTypeId: '$S{tipoDocumentoIdCPF}',
          employeeId: '$S{funcionarioIdJane}',
        })
        .expectStatus(201);
    });

    it('Deve recuperar', () => {
      return pactum
        .spec()
        .get('/documento')
        .withPathParams('id', '$S{tipoDocumentoIdCPF}')
        .expectStatus(200);
    });
  });

  it.todo('Deve passar');
});
