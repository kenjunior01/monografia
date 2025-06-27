# Monografia+ Plataforma

## Visão Geral

Plataforma para gestão de pedidos de monografias e trabalhos acadêmicos.

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Preencha as seguintes variáveis:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# Email (Resend)
RESEND_API_KEY=sua_chave_da_api_resend

# Google AI
GOOGLE_API_KEY=sua_chave_da_api_google
```

### Configurando o Sistema de E-mails

1. Crie uma conta em [resend.com](https://resend.com)
2. Gere uma API Key no painel de controle
3. Copie a chave e adicione à variável `RESEND_API_KEY` no arquivo `.env`
4. O sistema enviará notificações automáticas para edibizmz@gmail.com quando novos pedidos forem criados

## Executando o Projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## Funcionalidades

- Painel de Administração
  - Visualização de estatísticas
  - Lista de pedidos recentes
  - Notificações por e-mail para novos pedidos

## Deployment

O projeto está disponível em:
**[https://vercel.com/numb-moneys-projects/v0-monografia-plataforma](https://vercel.com/numb-moneys-projects/v0-monografia-plataforma)**
