## Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **NestJS**: Um framework Node.js progressivo para a construção de aplicações server-side eficientes e escaláveis.
- **Prisma**: Um ORM (Object-Relational Mapping) de última geração para Node.js e TypeScript, que facilita a interação com o banco de dados de forma segura e com tipagem forte.
- **SQLite**: Um motor de banco de dados leve e sem servidor, ideal para desenvolvimento local, pois não requer configuração adicional.
- **Swagger**: Ferramenta para documentação interativa da API.
- **PactumJS**: Ferramenta para testes da api.

## Como rodar o projeto

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** ou **Yarn** instalados em sua máquina.


2. Navegue até o diretório do projeto e instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

### Banco de Dados

Este projeto utiliza **SQLite**, o que elimina a necessidade de configurar um servidor de banco de dados. O Prisma se encarrega de criar o arquivo `.db` automaticamente.

Para rodar as migrações e configurar o banco de dados, execute o seguinte comando:
```bash
npx prisma migrate dev
```

### Executando a Aplicação

Após a instalação e as migrações, inicie a aplicação em modo de desenvolvimento:
```bash
npm run start:dev
# ou
yarn start:dev
```

## Documentação da API (Swagger)

A documentação interativa da API, gerada com Swagger, está disponível em:

[http://localhost:3000/api](http://localhost:3000/api)

## Testes

### Testes E2E (End-to-End)

Para rodar os testes de ponta a ponta, utilize o seguinte comando:
```bash
npm run test:e2e
# ou
yarn test:e2e
```

**Observação**: O script de testes foi modificado para reiniciar e reaplicar as migrações do banco de dados a cada execução, garantindo um ambiente de teste limpo e consistente.

## Funcionalidades e Fluxos

### Vínculo de Colaborador e Documentos

- O vínculo e desvinculação de tipos de documentos com um colaborador são gerenciados a partir da entidade do funcionário.
- Um colaborador pode ser criado com ou sem documentos associados.
- O endpoint de edição (PATCH) permite o envio de documentos posteriormente, garantindo flexibilidade para o frontend. É possível atualizar apenas os documentos sem a necessidade de enviar o formulário completo do funcionário.