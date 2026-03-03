# QLS SaaS Unificada v4

## Subi o banco e rodei Prisma. E agora?

Se os comandos abaixo já funcionaram:

- `npx prisma migrate dev --name init_v4`
- `npx prisma generate`

então o banco **já está sincronizado** e você pode seguir para iniciar os serviços.

## Próximos passos (desenvolvimento local)

### 1) Backend

No diretório `backend`:

```bash
npm install
npm run dev
```

Backend esperado em: `http://localhost:4000`.

### 2) Frontend

Em outro terminal, no diretório `frontend`:

```bash
npm install
npm run dev
```

Frontend esperado em: `http://localhost:3000`.

## Se a porta estiver "desativada" no Jules/Codespaces

Isso normalmente significa que a porta ainda não foi exposta no ambiente.

1. Abra o painel **Ports**.
2. Clique em **Add Port**.
3. Adicione a porta do frontend (`3000`) e do backend (`4000`).
4. Marque visibilidade como `Public` ou `Org` (conforme sua necessidade).
5. Recarregue a aba de preview.

## Verificação rápida

Com backend rodando, teste:

```bash
curl http://localhost:4000/health
```

Se responder (200/JSON), está ok.

---

Resumo: no seu log, Prisma já concluiu com sucesso. Agora é só subir backend/frontend e expor as portas 3000/4000 no ambiente.
