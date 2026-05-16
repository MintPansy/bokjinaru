# 배포 · 실행

## Frontend (Vercel)

- Root directory: `frontend`
- Env: `NEXT_PUBLIC_API_URL` = 백엔드 URL

## Backend (Railway / Docker)

- Dockerfile: `backend/docker/Dockerfile`
- Config: `backend/railway.json`
- 로컬: `backend/compose/docker-compose.yml`

## 로컬 개발

1. 백엔드 `http://localhost:8080` — `GET /api/health`
2. 프론트 `http://localhost:3000` — `.env.local`에 API URL 설정

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```
