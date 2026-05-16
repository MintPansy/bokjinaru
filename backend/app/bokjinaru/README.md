# bokjinaru API

복지나루 프론트엔드용 Spring Boot mock API.

## 실행

IDE에서 `kr.welfareguide.BokjinaruApplication` 실행 → http://localhost:8080

## 주요 API

| 메서드 | 경로 |
|--------|------|
| GET | `/api/health` |
| GET | `/api/v1/meta/filters` |
| GET | `/api/v1/meta/stats` |
| GET | `/api/v1/services` |
| GET | `/api/v1/services/{id}` |
| GET | `/api/v1/organizations` |
| GET | `/api/v1/organizations/{id}` |
| POST | `/api/v1/auth/demo-login` |
| GET | `/api/v1/auth/me` |

## 데모 로그인

```json
{ "username": "demo", "password": "demo1234" }
```
