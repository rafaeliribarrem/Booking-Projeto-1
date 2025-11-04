# 🚀 Setup Rápido - Yoga Booking

Guia rápido para colocar o projeto funcionando em 5 minutos!

## 📋 Pré-requisitos

- Node.js 20+ instalado
- Git instalado

## ⚡ Passos de Configuração

### 1. Clone e instale dependências

```bash
# Se ainda não clonou
git clone <url-do-seu-repo>
cd Booking-Projeto-1

# Instale as dependências
npm install
```

### 2. Configuração já está pronta! ✅

O arquivo `.env` já está configurado com:
- ✅ Conexão com Supabase
- ✅ NEXTAUTH_SECRET gerado
- ✅ Sistema de pagamento simulado

Você NÃO precisa configurar Stripe, Google OAuth ou outros serviços!

### 3. Configure o banco de dados

```bash
# Gera o Prisma Client
npx prisma generate

# Cria as tabelas no Supabase
npx prisma db push

# (Opcional) Popula com dados de exemplo
npx tsx prisma/seed.ts
```

### 4. Execute o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🎯 Primeira vez usando o sistema

1. Acesse http://localhost:3000
2. Clique em "Sign Up" para criar uma conta
3. Faça login
4. Veja as aulas disponíveis em "Schedule"
5. Clique em uma aula para reservar
6. Complete o "pagamento" simulado (use qualquer número de cartão!)
7. Veja sua reserva em "Account"

## 🧪 Dados de Teste

O sistema de pagamento é **completamente simulado**:

**Número do cartão**: `4242 4242 4242 4242` (ou qualquer outro)
**Validade**: `12/25` (ou qualquer data futura)
**CVV**: `123` (ou qualquer número)
**Nome**: Qualquer nome

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm start

# Testes
npm test

# Ver banco de dados
npx prisma studio
```

## 🐛 Problemas Comuns

### Erro: "Can't reach database server"
- Verifique se a URL do Supabase está correta no `.env`
- Teste a conexão no dashboard do Supabase

### Erro: "NEXTAUTH_SECRET is not defined"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Certifique-se de que não tem espaços antes/depois do `=`

### Porta 3000 já está em uso
```bash
# Use outra porta
PORT=3001 npm run dev
```

## 📚 Próximos Passos

Depois que estiver funcionando, você pode:

1. **Explorar o código**: Comece por `app/page.tsx`
2. **Adicionar funcionalidades**: Sistema de passes, avaliações, etc
3. **Customizar o design**: Edite `app/globals.css`
4. **Migrar para Stripe real**: Siga o guia no README.md
5. **Deploy**: Vercel, Netlify, Railway

## 💡 Dicas

- Use `npx prisma studio` para visualizar/editar o banco de dados
- O painel admin está em `/admin/sessions` (após criar conta)
- Logs de erro aparecem no terminal onde rodou `npm run dev`

## 🆘 Precisa de Ajuda?

Abra uma issue no GitHub ou consulte o README.md completo!

---

**Projeto educacional - Perfeito para aprender Next.js, Prisma e sistemas de booking!** 🎓
