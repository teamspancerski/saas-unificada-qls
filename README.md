# QLS SaaS Unificada v4

## ✅ Prisma concluiu. O que fazer agora?

Se estes comandos já rodaram sem erro:

- `npx prisma migrate dev --name init_v4`
- `npx prisma generate`

então o banco está sincronizado e o próximo passo é iniciar backend + frontend.

---

## Comandos **sem falha** (de qualquer pasta)

Use caminhos absolutos para evitar erro de `README.md: No such file or directory`:

```bash
cd /workspaces/saas-unificada-qls
nl -ba README.md | sed -n '1,220p'
git status --short && git log -1 --oneline
```

Se estiver dentro de `backend` ou `frontend`, o README da raiz é:

```bash
nl -ba ../README.md | sed -n '1,220p'
```

---

## Subir localmente

### 1) Backend

```bash
cd /workspaces/saas-unificada-qls/backend
npm install
npm run dev
```

Backend esperado em: `http://localhost:4000`

### 2) Frontend

```bash
cd /workspaces/saas-unificada-qls/frontend
npm install
npm run dev
```

Frontend esperado em: `http://localhost:3000`

---

## Porta “desativada” no Codespaces/Jules

1. Abra a aba **Ports**.
2. Adicione as portas `3000` e `4000`.
3. Defina visibilidade (Public/Org, conforme necessário).
4. Atualize o preview.

Teste rápido backend:

```bash
curl http://localhost:4000/health
```

---

## Render: checklist para erro de deploy

Quando o deploy falha no Render, valide estes pontos:

1. **Serviço backend**
   - Build Command: `cd backend && npm install && npx prisma generate && npm run build`
   - Start Command: `cd backend && npm run start`

2. **Variáveis obrigatórias (backend)**
   - `DATABASE_URL`
   - `JWT_SECRET`

3. **Serviço frontend**
   - Build Command: `cd frontend && npm install && npm run build`
   - Start Command: `cd frontend && npm run start`
   - `NEXT_PUBLIC_API_URL` deve apontar para a URL pública do backend no Render.

4. **Node version**
   - Use Node 18+ (ideal Node 20).

5. **Se aparecer só texto de commits/log no lugar do erro**
   - Abra o painel de logs do deploy e copie as linhas com `Error`, `Failed`, `Cannot find`, `Prisma`, `TS`, ou `npm ERR!`.

---

## Se o README aparecer diferente (ex.: "Cole: ...")

Você provavelmente está em branch/estado antigo. Rode:

```bash
cd /workspaces/saas-unificada-qls
git fetch --all
git status
```

Depois confirme o conteúdo do README novamente com:

```bash
nl -ba README.md | sed -n '1,220p'
```
