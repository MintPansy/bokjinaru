# 복지나루 Frontend (Next.js)

## 로컬 실행

```bash
npm install
cp .env.local.example .env.local   # Windows: copy .env.local.example .env.local
npm run dev
```

http://localhost:3000

## Vercel 배포

### 1) 대시보드 (권장)

1. [Vercel](https://vercel.com) → **Add New Project** → GitHub 저장소 연결
2. **Root Directory** → `frontend` 선택 (필수)
3. Framework: **Next.js** (자동 감지)
4. **Environment Variables** 추가:

| Name | Value (Production) |
|------|---------------------|
| `NEXT_PUBLIC_API_URL` | 배포된 백엔드 URL (예: `https://xxx.up.railway.app`) |

5. **Deploy**

### 2) Vercel CLI

```bash
npm i -g vercel
cd frontend
vercel
# Production: vercel --prod
```

CLI 사용 시에도 프로젝트 루트는 `frontend` 폴더에서 실행하세요.

### 배포 후 확인

- 홈·검색·기관 목록이 로드되는지 확인
- 백엔드 **CORS**에 Vercel 도메인 추가 필요  
  예: `https://your-app.vercel.app` → `backend`의 `WELFARE_CORS_ALLOWED_ORIGINS`

### 빌드

```bash
npm run build
npm run start
```

자세한 내용: [../DEPLOY.md](../DEPLOY.md)
