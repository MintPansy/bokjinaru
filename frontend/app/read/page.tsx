"use client";

import { useEffect, useState } from "react";
import { checkHealth } from "../services/api";

export default function ReadPage() {
  const [apiStatus, setApiStatus] = useState<string>("확인 중…");

  useEffect(() => {
    checkHealth()
      .then((ok) => setApiStatus(ok ? "백엔드 연결됨" : "백엔드 응답 없음"))
      .catch(() => setApiStatus("백엔드 연결 실패"));
  }, []);

  return (
    <>
      <h1>서비스 탐색</h1>
      <p>복지 서비스 목록·필터 UI가 들어갈 영역입니다.</p>
      <p>
        API 상태: <strong>{apiStatus}</strong>
      </p>
    </>
  );
}
