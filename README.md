# 📱 Contacts App - Full Stack Application

Uma aplicação completa de gerenciamento de contatos desenvolvida com **Node.js**, **React**, **TypeScript** e **Prisma Cloud**, seguindo as melhores práticas de engenharia de software.

## 🎯 Visão Geral

Esta aplicação implementa um sistema CRUD completo para gerenciamento de contatos, com interface moderna e API robusta. O projeto foi desenvolvido como resposta ao desafio técnico, focando em **clareza de decisão**, **tipagem rigorosa** e **arquitetura sustentável**.

### ✨ Funcionalidades Implementadas

- ✅ **CRUD Completo**: Criar, listar, atualizar e deletar contatos
- ✅ **Busca Inteligente**: Pesquisa por nome ou email com paginação
- ✅ **Ordenação**: Por nome ou data de criação (ascendente/descendente)
- ✅ **Paginação**: Controle de registros por página (máximo 10)
- ✅ **Validação Robusta**: Frontend e backend com validação em tempo real
- ✅ **Interface Responsiva**: Design moderno com Tailwind CSS
- ✅ **Docker Support**: Containerização completa da aplicação
- ✅ **Prisma Cloud**: Banco de dados gerenciado na nuvem

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose

### 1. Configuração do Banco de Dados

Crie o arquivo `backend/.env` com a URL do Prisma Cloud do banco criado na sua conta:
- Primeiro crie sua conta no prisma cloud 
- Vá em projects e new project
- Crie seu projeto com accelerate
- Clique no projeto criado
- Clique em connect no quadro Connect to your database 
- Procure Configure your database access
- Generate DataBase credentials e coloque essa variável no backend/.env
```env
DATABASE_URL="SUA API LINK"
```

### 2. Executar com Docker (Recomendado)

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd Projeto_Full_Stack_Contacts

# Executar toda a aplicação
docker-compose up --build

# Acessar a aplicação
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```
### 3.Parar o container
```bash
docker-compose down
``` 
### 4.Executar localmente
```bash
# Navegue para o diretório raiz do projeto
cd Projeto_Full_Stack_Contacts

#Agora pro back-end
cd backend
#crie .env que contenha DATABASE_URL="SUA API LINK" e PORT=8080 exemplo
#agora va para o front end
cd ..
cd frontend
cd src
cd components
#va no arquivo useHookAPI e edite const API_PREFIX = "/api"; para http://localhost:8080 se definiu 8080 no back end
#pronto agora vá para a raiz do projeto

# Execução
# Este comando instala TODAS as dependências e roda o seed.
npm run dev-full 

# Acessar a aplicação
# Frontend: http://localhost:5173
# Backend: http://localhost:8082
```
## 📋 API Endpoints
### GET /contacts
Lista contatos com paginação e busca
```bash
GET /contacts?q=ana&page=1&pageSize=10&sort=name&order=asc
```

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "nome": "Ana Silva",
      "email": "ana@exemplo.com",
      "phone": "+55 11 99999-9999",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 42
}
```

### POST /contacts
Cria um novo contato
```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+55 11 88888-8888"
}
```

### PUT /contacts/:id
Atualiza um contato existente

### DELETE /contacts/:id
Remove um contato

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 🐳 Docker

O projeto inclui configuração completa do Docker:

- **Backend**: Node.js 20 com Prisma
- **Frontend**: React com Vite
- **Rede**: Comunicação entre containers
- **Volumes**: Hot-reload para desenvolvimento

---

## 🔧 Spec Engineering

### Assunções Explícitas

1. **Paginação**: Máximo 10 registros por página para performance
2. **Unicidade**: Email e telefone devem ser únicos no sistema
3. **Busca**: Case-insensitive por nome ou email
4. **Ordenação**: Apenas por nome ou data de criação
5. **Validação**: Email deve seguir RFC 5322, nome máximo 100 caracteres

### Perguntas que Faria ao Time

1. **Performance**: Com 1M+ contatos, devemos implementar cursor-based pagination?
2. **Busca**: Implementar busca full-text com PostgreSQL?
3. **Auditoria**: Precisamos de logs de alterações nos contatos?
4. **Soft Delete**: Manter contatos deletados para recuperação?
5. **Rate Limiting**: Implementar throttling na API?

### Mini-ADRs (Architectural Decision Records)

#### ADR-001: Escolha do Prisma
**Contexto**: Necessidade de ORM com tipagem forte e migrações
**Alternativas**: TypeORM, Knex, Sequelize
**Decisão**: Prisma
**Motivo**: 
- Tipagem automática do TypeScript
- Migrações versionadas integradas
- Cliente gerado automaticamente
- Excelente DX (Developer Experience)
**Consequências**:
- ✅ Tipagem forte em tempo de compilação
- ✅ Migrações automáticas
- ❌ Menor flexibilidade para queries complexas
- ❌ Dependência do Prisma Cloud

#### ADR-002: Validação com Zod
**Contexto**: Necessidade de validação robusta no backend
**Alternativas**: Yup, class-validator, Joi
**Decisão**: Zod
**Motivo**:
- Tipagem TypeScript nativa
- Schema-first approach
- Excelente integração com Prisma
**Consequências**:
- ✅ Validação e tipagem em um só lugar
- ✅ Mensagens de erro customizáveis
- ❌ Bundle size ligeiramente maior

#### ADR-003: Arquitetura de Camadas
**Contexto**: Organização do código backend
**Alternativas**: MVC tradicional, Clean Architecture, Hexagonal
**Decisão**: Controller → Service → Repository (Prisma)
**Motivo**:
- Separação clara de responsabilidades
- Fácil testabilidade
- Padrão conhecido pela equipe
**Consequências**:
- ✅ Código organizado e previsível
- ✅ Fácil manutenção
- ❌ Mais arquivos para gerenciar

---

## 🌐 Context Engineering

### Escalabilidade

**Cenário**: 1 milhão de contatos

**Soluções Implementadas**:
- Paginação com `skip/take` do Prisma
- Índices únicos em `email` e `phone`
- Busca otimizada com `contains` e `mode: insensitive`

### Confiabilidade

**Transações**:
- Validação de unicidade antes de inserção
- Rollback automático em caso de erro
- Tratamento de conflitos de concorrência

**Idempotência**:
- PUT requests são idempotentes
- Validação de dados antes de persistir
- Tratamento de erros específicos (409, 404, 500)

**Observabilidade**:
- Logs estruturados com timestamps
- Tratamento de erros com códigos HTTP apropriados
- Validação de entrada em todas as rotas

### Evolução

**Adicionar Company (1:N)**:
```typescript
// Schema Prisma
model Company {
  id        Int       @id @default(autoincrement())
  name      String
  contacts  Contact[]
}

model Contact {
  id        Int     @id @default(autoincrement())
  companyId Int?
  company   Company? @relation(fields: [companyId], references: [id])
}
```
## 🧠 Prompt Engineering

### Uso de IA no Desenvolvimento

Utilizei **Cursor** como copiloto principal durante o desenvolvimento, seguindo uma abordagem de **revisão crítica** de todas as sugestões.

---
# 🚀 Guia de Revisão de Código e Boas Práticas (Projeto Contacts-APP)

Este documento detalha as correções e boas práticas de engenharia aplicadas ao projeto, focando em problemas comuns de Full Stack (React/Tailwind/Prisma).

As seções a seguir documentam desafios encontrados e como o código foi revisado para garantir a corretude e a eficiência (baseado nas interações de desenvolvimento).

---

## 1. 🔄 Lógica de Paginação em React (Bug de Estado Assíncrono)

### 💬 Meu Prompt (Problema Reportado)

> "O `setPage(page + 1)` não está mudando quando clico, o `page` está chegando errado na função `props.getContacts`."

### ✅ Revisão e Corretude

A causa era a natureza **assíncrona** do `useState` do React. A chamada `setPage` apenas agenda a atualização do estado, mas o código seguinte era executado imediatamente, usando o valor **antigo** de `page`.

A correção foi forçar a execução sequencial com o valor calculado antes de atualizar o estado:

| Ação para Corretude | Código Revisado | Objetivo |
| :--- | :--- | :--- |
| **Cálculo Sequencial** | `const nextPage = page + 1;` | Calcula o valor que a API *realmente* precisa. |
| **Chamada com Valor Novo** | `props.getContacts("", nextPage, pageSize);` | Garante que a API filtre para a página correta. |
| **Atualização de Estado** | `setPage(nextPage);` | Atualiza o componente *após* a chamada ser feita, mantendo a UI sincronizada. |

---

## 2. 📐 Design Responsivo: Largura e Elementos de Bloco

### 💬 Meu Prompt (Problema Reportado)

> "Se eu tenho uma div pai com `w-full`, toda e qualquer `div` que vai aparecendo dentro vai ter essa `w-full`?"

### ✅ Revisão e Corretude

A revisão focou em reforçar a **semântica do CSS (`display: block`)** para evitar a adição desnecessária da classe `w-full` e manter o código minimalista.

| Regra Fundamental (Corretude) | O que Ganhamos no Código | Por Que é Mais Correto |
| :--- | :--- | :--- |
| **Padrão de Bloco** | **`<div>`** (sem classes de largura) | Por ser `display: block`, o `<div>` **automaticamente** ocupa 100% da largura do pai, evitando a redundância da classe `w-full`. |
| **Largura de Conteúdo** | Uso de **`w-fit`** | Garante que a largura da `div` se ajuste **exatamente** ao conteúdo interno (`width: fit-content`). |

---

## 3. 💾 Fluxo de Banco de Dados: Gerar Schema e Popular (Seed)

### 💬 Meu Prompt (Problema Reportado)

> "Tenho um *migrate* atual, quero gerar o schema e já usar esse *migrate* atual, o populando com a *seed*."

### ✅ Revisão e Corretude

A solução foi configurar o `package.json` para encadear os comandos do Prisma, automatizando a criação de tabelas (`migrate`), a sincronização do código (`generate`) e a inserção dos dados iniciais (`seed`).

| Ação para Corretude | Comando/Configuração Implementada | Objetivo |
| :--- | :--- | :--- |
| **Ponto Único de Entrada** | Script **`"migrate:seed"`** | Cria um comando único para tarefas de setup do DB. |
| **Ordem de Execução** | `"migrate:seed": "npx prisma migrate dev --name init && npm run prisma:generate"` | Garante a ordem correta: **1. DB Sync** (via `migrate dev`), **2. ORM Sync** (`generate`). O *seeding* é executado automaticamente pelo `migrate dev`. |
| **Definição de Seed** | `package.json` (bloco `prisma`) apontando para `npm run seed` | Garante que o *seeding* seja executado de forma automática e integrada ao fluxo de migração. |
## 🔧 Troubleshooting

### Problemas Comuns

1. **Porta já em uso**: Verifique se as portas 3000 ou 3001 estão livres
2. **Erro de conexão com banco**: Verifique se o arquivo `backend/.env` existe e contém a URL do seu banco em prisma cloud
3. **Prisma não conecta**: Verifique se a `DATABASE_URL` no `.env` está correta e se você tem acesso ao banco de dados
4. **URL inválida**: Certifique-se de que a URL fornecida está completa e no formato correto
5. **Container não inicia**: Execute `docker-compose down` e `docker-compose up --build` para reconstruir

---

## 📝 Conclusão

Este projeto demonstra uma abordagem **engenharia-first** ao desenvolvimento, priorizando:

- **Tipagem rigorosa** em toda a stack
- **Arquitetura sustentável** com separação de responsabilidades
- **Uso inteligente de IA** como copiloto, não substituto
- **Pensamento em escala** considerando cenários futuros
---
