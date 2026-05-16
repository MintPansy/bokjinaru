# 복지 서비스 길잡이 — 모노레포 (초기 scaffold)

장애인·보호자·복지 정보 탐색자를 위한 플랫폼. 현재는 **폴더 구조 + 최소 페이지/문서**만 포함된 가벼운 세팅입니다.

## 구조

```
├── frontend/          # Next.js (Vercel)
├── backend/           # Spring Boot (Railway)
├── docs/              # 아키텍처·논문/개발 메모
├── DEPLOY.md
└── README.md
```

## 로컬 실행 (요약)

**프론트**

```bash
cd frontend
npm install
npm run dev
```

**백엔드** — `backend/app/bokjinaru`에서 `BokjinaruApplication` 실행 (포트 8080)

**Vercel (프론트)** — Root Directory: `frontend`, env: `NEXT_PUBLIC_API_URL`  
→ [DEPLOY.md](./DEPLOY.md) · [frontend/README.md](./frontend/README.md)

## 다음 단계

- `frontend/app/read`, `search` 등 복지 도메인 페이지 연결
- `backend` mock API · PostgreSQL
- 인증(OAuth) 실구현
