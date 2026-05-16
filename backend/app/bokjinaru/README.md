# bokjinaru API

복지나루 프론트엔드용 Spring Boot API.

## 실행

IDE에서 `kr.welfareguide.BokjinaruApplication` 실행 → http://localhost:8080

환경 변수는 `backend/app/.env` 또는 실행 구성에 설정합니다.

## 공공데이터 연동 (한국사회보장정보원 복지서비스정보)

[공공데이터포털](https://www.data.go.kr/data/15083323/fileData.do)에서 **오픈API 활용신청** 후 인증키를 발급받아 설정합니다.

| 변수 | 설명 |
|------|------|
| `ODCLOUD_SERVICE_KEY` | api.odcloud.kr `serviceKey` (필수, 있으면 공공 API 로드) |

- 데이터셋: `한국사회보장정보원_복지서비스정보_20240722`
- 엔드포인트: `https://api.odcloud.kr/api/15083323/v1/uddi:48d6c839-ce02-4546-901e-e9ad9bae8e0d`
- 키가 없거나 API 실패 시 `data/seed.json` 샘플 8건으로 폴백

확인: `GET /api/health` → `"dataSource":"odcloud"` 또는 `"seed"`

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
