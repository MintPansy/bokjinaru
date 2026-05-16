# Railway 백엔드 배포 가이드

## 실패 원인 (기존 설정)

1. `Dockerfile`이 **`app/paperdot`** 을 빌드 → 실제 API는 **`app/bokjinaru`**
2. Gradle wrapper 없음 → `gradlew` 조건문만 있어 **JAR 미생성** 후 컨테이너 기동 실패
3. Railway **Root Directory**가 `backend`가 아니면 Dockerfile 경로 불일치

## Railway 프로젝트 설정 (필수)

| 설정 | 값 |
|------|-----|
| **Root Directory** | `backend` |
| **Builder** | Dockerfile |
| **Dockerfile Path** | `docker/Dockerfile` (또는 `railway.json` 자동 인식) |

> 저장소 루트(`bokjinaru`)만 연결하고 Root Directory를 비우면 빌드가 실패합니다.

## 환경 변수 (Variables)

| 변수 | 예시 | 설명 |
|------|------|------|
| `PORT` | (Railway 자동 주입) | 수동 설정 불필요 |
| `WELFARE_CORS_ALLOWED_ORIGINS` | `https://bokjinaru.vercel.app,http://localhost:3000` | 프론트 도메인 |

## 배포 후 확인

1. Railway → 서비스 → **Settings** → **Networking** → **Generate Domain**
2. 브라우저: `https://<your-domain>/api/health` → `{"status":"ok"}`
3. Vercel `NEXT_PUBLIC_API_URL`에 위 도메인 설정 (https 포함)

## 로컬 Docker 테스트

```bash
cd backend
docker build -f docker/Dockerfile -t bokjinaru-api .
docker run -p 8080:8080 -e WELFARE_CORS_ALLOWED_ORIGINS=http://localhost:3000 bokjinaru-api
curl http://localhost:8080/api/health
```

## 트러블슈팅

| 증상 | 조치 |
|------|------|
| Build failed: paperdot / gradlew | 최신 `main` pull — Dockerfile이 bokjinaru + Gradle 이미지 사용 |
| Healthcheck failed | 배포 로그에서 `Started BokjinaruApplication` 확인, `/api/health` 수동 호출 |
| CORS error (Vercel) | `WELFARE_CORS_ALLOWED_ORIGINS`에 Vercel URL 추가 후 재배포 |
| 502 / Connection refused | `PORT`는 Railway가 넣음 — `server.port=${PORT}` 적용됨 |

## 재배포

Git push → Railway 자동 빌드. 수동: Railway 대시보드 **Redeploy**.
