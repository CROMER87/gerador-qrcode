# Configuração do Firebase

## Passos para configurar o Firebase:

### 1. Criar projeto no Firebase Console
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em "Criar projeto"
3. Digite o nome do projeto (ex: "gerador-qrcode")
4. Siga os passos de configuração

### 2. Ativar Authentication com Google
1. No console do Firebase, vá em "Authentication"
2. Clique em "Get started"
3. Vá na aba "Sign-in method"
4. Ative o provedor "Google"
5. Configure o nome do projeto e email de suporte

### 3. Obter as credenciais
1. No console do Firebase, clique na engrenagem (⚙️) ao lado de "Project Overview"
2. Selecione "Project settings"
3. Role até "Your apps" e clique em "Add app" > "Web"
4. Registre o app e copie as credenciais

### 4. Atualizar o environment.ts
Substitua as credenciais no arquivo `src/environments/environment.ts`:

```typescript
firebase: {
  apiKey: "SUA_API_KEY_REAL",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
}
```

### 5. Testar
Após configurar, o login com Google deve funcionar corretamente!

## Observações:
- As credenciais atuais são apenas placeholders
- Nunca commite credenciais reais no Git
- Use variáveis de ambiente em produção 