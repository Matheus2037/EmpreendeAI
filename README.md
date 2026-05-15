# EmpreendeAI — OwlCode

Plataforma de aprendizado de programação personalizada com IA. Gera roadmaps de estudo, exercícios e chat de dúvidas com base no perfil do usuário.

## Estrutura do repositório

```
EmpreendeAI/
├── backend/    # API REST — NestJS + Firebase + OpenAI
└── frontend/   # Interface web — React + Vite + TailwindCSS
```

## Pré-requisitos

- Node.js 20+
- pnpm 9+

## Rodando o back-end

```bash
cd backend
pnpm install
cp .env.example .env   # preencha as variáveis (veja backend/README.md)
pnpm start:dev         # sobe na porta 3000
```

Variáveis necessárias em `backend/.env`:

| Variável | Descrição |
|---|---|
| `GPT_API_KEY` | Chave da API OpenAI |
| `FIREBASE_PROJECT_ID` | ID do projeto Firebase |
| `FIREBASE_PRIVATE_KEY` | Chave privada do service account |
| `FIREBASE_CLIENT_EMAIL` | E-mail do service account |
| `PORT` | Porta (padrão: 3000) |

## Rodando o front-end

```bash
cd frontend
pnpm install
cp .env.example .env   # preencha as variáveis
pnpm dev               # sobe na porta 5173
```

Variáveis necessárias em `frontend/.env`:

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL do back-end (ex: `http://localhost:3000`) |
| `VITE_API_KEY` | Firebase Web API Key |
| `VITE_AUTH_DOMAIN` | Firebase Auth Domain |
| `VITE_PROJECT_ID` | Firebase Project ID |
| `VITE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `VITE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `VITE_APP_ID` | Firebase App ID |
