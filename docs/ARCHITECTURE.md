# 아키텍처 (초안)

```
Browser → Next.js (frontend/) → Spring Boot (backend/app/paperdot/)
```

| 레이어 | 역할 |
|--------|------|
| `frontend/app/*` | UI·라우팅 |
| `frontend/app/services` | API 클라이언트 |
| `frontend/app/store` | Zustand |
| `frontend/app/api` | OAuth 콜백 등 Route Handlers |
| `backend` | REST API, 도메인 (추후 DB) |

**확장**: PostgreSQL → `repository` 교체, 인증·즐겨찾기·관리자 API 추가.
