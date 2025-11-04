# 🧘 Yoga Booking System

Sistema de agendamento de aulas de yoga construído com Next.js, Prisma, NextAuth e **pagamentos simulados**.

> 🎓 **Projeto educacional/fictício** - Perfeito para aprendizado! Todos os pagamentos são simulados, nenhuma transação real é processada.

## 🚀 Funcionalidades

- ✅ Autenticação de usuários (Credentials + Google OAuth)
- ✅ Agendamento de aulas
- ✅ Sistema de passes (Drop-in, Pacote de 5, Ilimitado Mensal)
- ✅ **Sistema de pagamento simulado (mock)** - Sem necessidade de Stripe!
- ✅ Painel administrativo para gerenciamento de sessões
- ✅ Sistema de instrutores e tipos de aula
- ✅ Lista de espera automática

## 💳 Sobre os Pagamentos

Este projeto utiliza um **sistema de pagamento completamente simulado**:
- ✨ Nenhum cartão real é cobrado
- ✨ Não precisa configurar Stripe, PayPal ou qualquer gateway
- ✨ Fluxo completo de checkout é simulado
- ✨ Perfeito para demonstração e aprendizado
- ✨ Pode ser facilmente substituído por Stripe real no futuro

## 📋 Pré-requisitos

### Obrigatórios
- Node.js 20+
- PostgreSQL 14+

### Opcional (recursos avançados)
- Conta Google Cloud (para OAuth)
- Conta Resend (para emails)
- Conta Stripe (apenas se quiser pagamentos reais no futuro)

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

### Sistema de Pagamento Simulado

O projeto usa um sistema de pagamento mock em `lib/mock-payment.ts`:

- **Interface realista**: Página de checkout completa com campos de cartão
- **Processamento simulado**: Delay de 1-2 segundos para simular processamento real
- **Taxa de sucesso**: 95% de sucesso, 5% de falha (para simular cenários reais)
- **Dados de teste**: Use qualquer número de cartão, os valores pré-preenchidos funcionam
- **Histórico**: Pagamentos são salvos no banco de dados normalmente

#### Fluxo de pagamento:
1. Usuário seleciona aula → cria Booking (status: PENDING)
2. Clica em "Proceed to payment" → redireciona para `/booking/mock-checkout`
3. Preenche dados (mock) → clica em "Pagar"
4. Sistema simula processamento → Booking atualizado (status: CONFIRMED)
5. Pagamento registrado no banco → Redireciona para `/account`

#### Como migrar para Stripe real (futuro):

Se quiser usar pagamentos reais:
1. Descomente variáveis no `.env`: `STRIPE_SECRET_KEY`, etc
2. Substitua imports de `mock-payment` por `stripe`
3. Atualize `/app/booking/checkout/route.ts` para usar `getStripe()`
4. Configure webhook em `/app/api/webhooks/stripe/route.ts`

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
