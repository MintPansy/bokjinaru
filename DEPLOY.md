# 배포 · 실행

## Frontend — Vercel

### 프로젝트 설정 (중요)

| 항목 | 값 |
|------|-----|
| **Root Directory** | `frontend` |
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` (기본값) |
| **Install Command** | `npm install` (기본값) |
| **Output Directory** | (비움 — Next.js 자동) |

모노레포 루트(`c:\newrepo`)를 연결했다면 **반드시 Root Directory를 `frontend`로 지정**하세요.  
루트에 두면 `package.json`을 찾지 못해 빌드가 실패합니다.

설정 파일: [frontend/vercel.json](frontend/vercel.json) (리전 `icn1` — 서울)

### 환경 변수 (Vercel Dashboard → Settings → Environment Variables)

| 변수 | Production | Preview (선택) |
|------|------------|----------------|
| `NEXT_PUBLIC_API_URL` | Railway 등 **백엔드 공개 URL** | 동일 또는 스테이 API |

예:

```env
NEXT_PUBLIC_API_URL=https://bokjinaru-api.up.railway.app
```

로컬 전용 값(`http://localhost:8080`)은 Production에 넣지 마세요.

### 배포 절차

1. GitHub에 `main` 푸시
2. Vercel이 자동 빌드·배포
3. 배포 URL에서 `/search`, `/organizations` 동작 확인
4. 백엔드 CORS에 Vercel URL 추가 (아래 참고)

### Vercel CLI

```bash
cd frontend
npx vercel login
npx vercel link
npx vercel env add NEXT_PUBLIC_API_URL production
npx vercel --prod
```

### CORS (백엔드)

프론트만 Vercel에 올리면 브라우저에서 API 호출 시 CORS 오류가 납니다.  
백엔드 환경 변수 예:

```env
WELFARE_CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-app-*.vercel.app
```

또는 `backend/app/bokjinaru/src/main/resources/application.yml`의 `welfare.cors.allowed-origins` 수정.

### 트러블슈팅

| 증상 | 해결 |
|------|------|
| Build: `package.json` not found | Root Directory = `frontend` |
| API 연결 실패 | `NEXT_PUBLIC_API_URL` Production 값 확인 |
| CORS error | 백엔드 allowed-origins에 Vercel 도메인 추가 |
| 404 on routes | Next.js App Router — 추가 rewrite 불필요 |

---

## Backend — Railway / Docker

- Dockerfile: `backend/docker/Dockerfile`
- Config: `backend/railway.json`
- 로컬: `backend/compose/docker-compose.yml`
- API: `backend/app/bokjinaru` — `BokjinaruApplication`

## 로컬 개발

1. 백엔드 `http://localhost:8080` — `GET /api/health`
2. 프론트 `http://localhost:3000`

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```
