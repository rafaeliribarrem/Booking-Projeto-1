# Yoga Booking System

Sistema de agendamento de aulas de yoga construído com Next.js, Prisma, NextAuth e Stripe.

## 🚀 Funcionalidades

- ✅ Autenticação de usuários (Credentials + Google OAuth)
- ✅ Agendamento de aulas
- ✅ Sistema de passes (Drop-in, Pacote de 5, Ilimitado Mensal)
- ✅ Integração com Stripe para pagamentos
- ✅ Painel administrativo para gerenciamento de sessões
- ✅ Sistema de instrutores e tipos de aula
- ✅ Lista de espera automática

## 📋 Pré-requisitos

- Node.js 20+
- PostgreSQL 14+
- Conta Stripe (para pagamentos)
- Conta Google Cloud (opcional, para OAuth)
- Conta Resend (opcional, para emails)

## 🛠️ Configuração do Projeto

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd Booking-Projeto-1
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as seguintes variáveis:

#### Banco de Dados
```env
DATABASE_URL="postgresql://user:password@localhost:5432/yoga_booking"
```

#### NextAuth
```env
# Gere um secret com: openssl rand -base64 32
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

#### Stripe (obrigatório)
1. Crie uma conta em https://stripe.com
2. Acesse https://dashboard.stripe.com/apikeys
3. Copie suas chaves de teste
4. Crie um produto e preço em https://dashboard.stripe.com/products
5. Configure o webhook em https://dashboard.stripe.com/webhooks

```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_DROPIN="price_..."
```

#### Google OAuth (opcional)
1. Acesse https://console.cloud.google.com
2. Crie um novo projeto
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Adicione `http://localhost:3000/api/auth/callback/google` como redirect URI

```env
GOOGLE_CLIENT_ID="seu-client-id"
GOOGLE_CLIENT_SECRET="seu-client-secret"
```

#### Resend (opcional)
1. Crie uma conta em https://resend.com
2. Gere uma API key

```env
RESEND_API_KEY="re_..."
```

### 4. Configure o banco de dados

```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrations
npx prisma migrate dev

# (Opcional) Popule o banco com dados de exemplo
npx tsx prisma/seed.ts
```

### 5. Execute o projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

Acesse http://localhost:3000

## 📁 Estrutura do Projeto

```
├── app/                    # App Router do Next.js
│   ├── (marketing)/       # Páginas públicas
│   ├── admin/             # Painel administrativo
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   └── booking/           # Fluxo de reserva
├── components/            # Componentes React
│   ├── admin/            # Componentes admin
│   ├── schedule/         # Componentes de agenda
│   ├── site/             # Componentes do site
│   └── ui/               # Componentes UI (shadcn)
├── lib/                   # Bibliotecas e utilitários
│   ├── generated/        # Prisma Client gerado
│   ├── auth.ts           # Configuração NextAuth
│   ├── prisma.ts         # Cliente Prisma
│   └── stripe.ts         # Cliente Stripe
└── prisma/               # Schema e migrations
```

## 🧪 Testes

```bash
npm run test
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint
- `npm test` - Executa testes

## 📝 Notas Importantes

### Webhook do Stripe

Para testar webhooks localmente, use o Stripe CLI:

```bash
# Instale o Stripe CLI
brew install stripe/stripe-cli/stripe

# Faça login
stripe login

# Encaminhe webhooks para localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Prisma

O Prisma está configurado para gerar o cliente em `lib/generated/prisma`. Após alterar o schema:

```bash
npx prisma generate
npx prisma migrate dev
```

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
