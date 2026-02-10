# NLW Journey API — Backend

Backend da aplicação **FlyPlan**, desenvolvido durante o NLW da Rocketseat, com melhorias estruturais, validações e tratamento de erros além da proposta original.

A API gerencia viagens em grupo, permitindo criar trips, convidar participantes, adicionar atividades, links úteis e acompanhar todos os detalhes da viagem.

---

## Introdução

Este projeto foi construído com foco em práticar conhecimentos de backend e implementar boas práticas modernas na melhoria contínua:

- Validação de dados
- Tipagem forte em tempo de desenvolvimento
- Organização modular de rotas
- Tratamento global de erros

A aplicação foi preparada para integração direta com o frontend em React.
Link do Repositório: [Linkdo repositório].

---

## Tecnologias e Ferramentas

| Tecnologia | Finalidade |
|------------|------------|
| Node.js | Ambiente de execução |
| TypeScript | Tipagem estática |
| Fastify | Framework HTTP de alta performance |
| Zod | Validação de schemas |
| Fastify Type Provider Zod | Integração de tipagem com Fastify |
| Prisma ORM | Mapeamento objeto-relacional |
| SQLite (better-sqlite3) | Banco de dados |
| Dayjs | Manipulação de datas |
| Error Handler | Padronização de erros |

---

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
DATABASE_URL="file:./dev.db"
API_BASE_URL="http://localhost:3333"
WEB_BASE_URL="http://localhost:5173"
PORT="3333"
```

---

## Instalação do Projeto

```bash
npm install
```

---

## Configuração do Banco de Dados

Execute as migrations para criar o banco local:

```bash
npx prisma migrate dev
```

Para visualizar os dados:

```bash
npx prisma studio
```

---

## Execução da Aplicação

```bash
npm run dev
```

A aplicação estará disponível em:

http://localhost:3333

---

## Rotas da API

### Criar viagem

**POST /trips**

**Payload esperado:**

```json
{
  "destination": "string",
  "starts_at": "YYYY-MM-DD HH:mm:ss",
  "ends_at": "YYYY-MM-DD HH:mm:ss",
  "owner_name": "string",
  "owner_email": "email@dominio.com",
  "emails_to_invite": ["email@dominio.com"]
}
```

---

### Confirmar viagem

**GET /trips/:tripId/confirm**

---

### Confirmar participante

**GET /participants/:participantId/confirm**

---

### Atualizar viagem

**PUT /trips/:tripId**

**Payload opcional:**

```json
{
  "destination": "string",
  "starts_at": "YYYY-MM-DD HH:mm:ss",
  "ends_at": "YYYY-MM-DD HH:mm:ss"
}
```

---

### Detalhes da viagem

**GET /trips/:tripId**

---

### Listar participantes

**GET /trips/:tripId/participants**

---

### Buscar participante

**GET /participants/:participantId**

---

### Criar atividade

**POST /trips/:tripId/activities**

**Payload esperado:**

```json
{
  "title": "string",
  "occurs_at": "YYYY-MM-DD HH:mm:ss"
}
```

---

### Listar atividades

**GET /trips/:tripId/activities**

---

### Criar link útil

**POST /trips/:tripId/links**

**Payload esperado:**

```json
{
  "title": "string",
  "url": "https://dominio.com/recurso"
}
```

---

### Listar links

**GET /trips/:tripId/links**

---

### Convidar participante

**POST /trips/:tripId/invites**

**Payload esperado:**

```json
{
  "email": "email@dominio.com"
}
```

---

## Validações e Tratamento de Erros

Todas as rotas utilizam schemas Zod para validação de entrada e saída.
O projeto possui um error handler global responsável por padronizar as respostas de erro da API.

---

## Autor

José Cássios Costa Torres
Estudante de Ciência da Computação e desenvolvedor de software com foco em backend.
