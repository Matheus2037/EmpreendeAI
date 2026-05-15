# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão Geral

**EmpreendeAI / OwlCode** — plataforma de aprendizado de programação personalizada com IA. Monorepo com dois projetos:

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
pnpm test               # testes unitários
pnpm test -- --testPathPattern=gpt.service  # teste único
pnpm test:e2e           # testes end-to-end
pnpm lint               # lint + fix
```

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

**Autenticação:** O `FirebaseAuthGuard` (`src/auth/firebase-auth.guard.ts`) lê o cookie `auth_token` de cada requisição e valida o JWT via Firebase Admin SDK. Para proteger um controller, adicione `@UseGuards(FirebaseAuthGuard)`.

**Banco de dados:** Firestore via Firebase Admin SDK. A instância única `db` está em `src/firebase/firebase-admin.ts`. Coleções principais:
- `jornada_bruta` — jornadas de aprendizado geradas pela IA, indexadas por `user_id`
- `exercicios_gerados` — exercícios por jornada/módulo/tópico, com ID composto `{jornadaId}_{moduloId}_{topicoId}`
- `gpt-duvidas` — histórico de perguntas e respostas do chat por jornada/usuário
- `linguagens` — linguagens de programação disponíveis

**Módulos NestJS:**
| Módulo | Responsabilidade |
|---|---|
| `gpt` | Gera roadmaps de aprendizado via `gpt-4-turbo`; retorna JSON estruturado salvo em `jornada_bruta` |
| `gpt-duvidas` | Chat contextual sobre a jornada via `gpt-4o`; mantém histórico no Firestore |
| `exercicio` | Gera e corrige exercícios práticos por tópico via `gpt-4-turbo`; reutiliza exercícios já gerados |
| `jornadas` | CRUD de jornadas; coordena criação chamando `/gpt/perguntar` internamente via axios |
| `jornada-modulos` / `jornada-topicos` | Atualização de progresso (marcar módulo/tópico como concluído) |
| `conteudo-jornada` | Leitura do conteúdo completo de uma jornada |
| `linguagens` | Listagem das linguagens disponíveis |

**Prompts de sistema:** Cada módulo de IA mantém seu próprio arquivo de prompt (`SYSTEM_PROMPT.ts`, `SYSTEM_EXERCICIO.ts`, `SYSTEM_CORRECAO.ts`, `system_prompt_duvidas.ts`).

---

## Frontend (`frontend/`)

### Comandos

```bash
cd frontend

pnpm install
pnpm dev                # desenvolvimento (porta 5173)
pnpm build              # build de produção
pnpm lint               # lint
pnpm fake-server        # json-server na porta 3001 (dados de teste)
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

### Arquitetura

**Autenticação:** O `AuthProvider` (`src/contexts/auth.tsx`) escuta o `onAuthStateChanged` do Firebase, obtém o `idToken` do usuário e o grava no cookie `auth_token`. O `AuthGuard` (`src/routes/guard.tsx`) redireciona rotas privadas para `/login` se não autenticado.

**Comunicação com a API:** Instância única de axios em `src/config/axios.ts` com `baseURL = VITE_API_URL` e `withCredentials: true` (envia o cookie automaticamente).

**Estado do servidor:** TanStack Query com persistência via `@tanstack/react-query-persist-client`.

**Rotas:**
- `/login` e `/registro` — públicas
- `/dashboard` — lista as jornadas do usuário
- `/jornada/:idJornada` — visualização do roadmap + chat da jornada

**Visualização do roadmap:** `@xyflow/react` renderiza módulos e tópicos como nós customizados (`CustomNode`). A transformação dos dados da API para o formato de nós/arestas do ReactFlow fica em `src/app/jornada/components/roadmap/utils/roadmapTransformer.ts`.

**Componentes UI:** Baseados em shadcn/ui (Radix UI + Tailwind CSS v4). Os componentes primitivos estão em `src/components/ui/`. O alias `@/` aponta para `src/`.

**Camadas de serviço:** Cada página tem uma pasta `service/` com funções que chamam a API e os tipos de resposta correspondentes em `service/types/`.
