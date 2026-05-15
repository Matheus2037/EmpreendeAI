# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão Geral

**EmpreendeAI** — plataforma de aprendizado para empreendedores, com trilhas personalizadas geradas por IA, exercícios práticos e chat de dúvidas. Monorepo com dois projetos:

- `backend/` — API REST (NestJS + Firebase + OpenAI)
- `frontend/` — Interface web (React 19 + Vite + Tailwind CSS v4)

Ambos usam **pnpm** como gerenciador de pacotes.

---

## Backend (`backend/`)

### Comandos

```bash
cd backend

pnpm install
pnpm start:dev          # desenvolvimento com hot-reload (porta 3000)
pnpm build              # build de produção
pnpm test               # testes unitários (jest)
pnpm test -- --testPathPattern=gpt.service  # um único arquivo de teste
pnpm test:e2e           # testes end-to-end
pnpm lint               # lint + fix
```

Há também um `seed.ts` na raiz do `backend/` para popular o Firestore com dados iniciais (ex.: coleção `linguagens`).

### Variáveis de ambiente

Crie `backend/.env`:

```
PORT=3000
GPT_API_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

### Arquitetura

O backend roda na porta 3000 e aceita CORS de `localhost:3000` e `localhost:5173`.

**Autenticação:** `FirebaseAuthGuard` (`src/auth/firebase-auth.guard.ts`) lê o cookie `auth_token` e valida o JWT via Firebase Admin SDK. Adicione `@UseGuards(FirebaseAuthGuard)` em qualquer controller que precise de autenticação.

**Banco de dados:** Firestore via Firebase Admin SDK. A instância singleton `db` fica em `src/firebase/firebase-admin.ts`. Coleções principais:

| Coleção | Descrição |
|---|---|
| `jornada_bruta` | Jornadas geradas pela IA; cada doc tem `user_id`, `linguagem` (sigla), `resposta` (array de módulos com tópicos), `progresso_percent` |
| `exercicios_gerados` | Exercícios por jornada/módulo/tópico; ID composto `{jornadaId}_{moduloId}_{topicoId}` |
| `gpt-duvidas` | Histórico do chat por jornada/usuário |
| `linguagens` | Linguagens/áreas disponíveis — `sigla`, `nome`, `cor`, `url` |

**Estrutura de `jornada_bruta.resposta`:** array de módulos, onde cada módulo tem `modulo_id` (number), `title`, `concluido` e `topicos` (array com `topico_id`, `title`, `finalizado`, `conteudo`). O progresso é recalculado a cada atualização de tópico/módulo e salvo em `progresso_percent`.

**Módulos NestJS:**

| Módulo | Responsabilidade |
|---|---|
| `gpt` | Gera roadmaps via `gpt-4-turbo`; retorna JSON estruturado que é salvo em `jornada_bruta` |
| `gpt-duvidas` | Chat contextual sobre a jornada via `gpt-4o`; mantém histórico no Firestore |
| `exercicio` | Gera e corrige exercícios via `gpt-4-turbo`; reutiliza exercícios já gerados pelo ID composto |
| `jornadas` | CRUD de jornadas; ao criar, chama internamente `POST /gpt/perguntar` via axios (repassando o cookie `auth_token`) e salva a resposta no Firestore |
| `jornada-modulos` / `jornada-topicos` | Atualização de progresso — marcar módulo/tópico como concluído (toggle) |
| `conteudo-jornada` | Leitura do conteúdo completo de uma jornada |
| `linguagens` | Listagem das linguagens/áreas disponíveis |

**Fluxo de criação de jornada:** `POST /jornadas` → `JornadasService.criarJornada` monta um texto personalizado com os dados do DTO → chama `POST /gpt/perguntar` internamente → salva a resposta gerada em `jornada_bruta`.

**Prompts de sistema:** cada módulo de IA mantém seu próprio arquivo (`SYSTEM_PROMPT.ts`, `SYSTEM_EXERCICIO.ts`, `SYSTEM_CORRECAO.ts`, `system_prompt_duvidas.ts`).

---

## Frontend (`frontend/`)

### Comandos

```bash
cd frontend

pnpm install
pnpm dev                # desenvolvimento (porta 5173)
pnpm build              # build de produção (tsc + vite)
pnpm lint               # lint
pnpm fake-server        # json-server na porta 3001 (src/fakeApi/db.json)
```

### Variáveis de ambiente

Copie `frontend/.env.example` para `frontend/.env` e preencha:

```
VITE_API_URL=http://localhost:3000
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

**Modo mock (desenvolvimento offline):** defina `VITE_MOCK_AUTH=true` no `.env`. Isso bypassa completamente o Firebase — o `AuthProvider` usa `USUARIO_MOCK` (`src/mocks/usuario.ts`) e as páginas consomem dados estáticos de `src/mocks/` (trilhas, conteúdos, notícias, notificações, exercícios). Nenhuma chamada de API real é feita nesse modo.

### Arquitetura

**Autenticação:** `AuthProvider` (`src/contexts/auth.tsx`) escuta `onAuthStateChanged` do Firebase, obtém o `idToken` e grava no cookie `auth_token`. O `AuthGuard` (`src/routes/guard.tsx`) redireciona rotas privadas para `/login` se não autenticado.

**Comunicação com a API:** instância única de axios em `src/config/axios.ts` com `baseURL = VITE_API_URL` e `withCredentials: true` (envia o cookie automaticamente).

**Estado do servidor:** TanStack Query com persistência via `@tanstack/react-query-persist-client`.

**Layout privado:** `PrivateLayout` (`src/components/layout/privateLayout.tsx`) — header fixo com navegação principal e dropdown de notificações. Todas as rotas privadas são renderizadas como `<Outlet />` dentro dele.

**Rotas:**

| Rota | Descrição |
|---|---|
| `/login`, `/registro` | Públicas |
| `/home` | Feed principal (home do usuário autenticado) |
| `/dashboard` | Lista de trilhas de aprendizado do usuário |
| `/noticias` | Feed de notícias |
| `/conteudos` | Biblioteca de conteúdos |
| `/trilha/:idJornada` | Roadmap interativo + chat de dúvidas da jornada |

**Visualização do roadmap:** `@xyflow/react` renderiza módulos como nós à esquerda e subtópicos à direita, conectados por arestas. A transformação de `ConteudoJornadaResponse` para nós/arestas do ReactFlow fica em `src/app/jornada/components/roadmap/utils/roadmapTransformer.ts`. Cada nó recebe handlers de atualização de progresso (`moduleUpdateHandler`, `topicUpdateHandler`) e um `loadingMap` para mostrar estados de carregamento individuais.

**Tipo central da trilha (`ConteudoJornadaResponse`):**
```ts
{ uid, jornada: JornadaResponse, roadmap: Array<{ uid, title, concluido, subtopicos: Array<{ uid, title, concluido, conteudo: { topico, detalhes, anexos, exemplos } }> }> }
```

**Mocks (`src/mocks/`):** dados estáticos usados quando `VITE_MOCK_AUTH=true`. `trilhas.ts` exporta `TRILHAS_CARDS` (lista do dashboard) e `TRILHAS_CONTEUDO` (conteúdo completo por ID de trilha), que são o formato de referência para os dados reais da API.

**Componentes UI:** baseados em shadcn/ui (Radix UI + Tailwind CSS v4). Componentes primitivos em `src/components/ui/`. O alias `@/` aponta para `src/`.

**Camadas de serviço:** cada página tem uma pasta `service/` com funções axios e tipos de resposta em `service/types/`.
