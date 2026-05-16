import { HOTLINES, SITE_NAME } from "../lib/constants";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <h2>{SITE_NAME}</h2>
          <p>
            장애인, 가족, 그리고 모든 시민이 자신에게 맞는 복지 서비스를 빠르고
            정확하게 찾을 수 있도록 돕는 공공 정보 안내 플랫폼입니다.
          </p>
        </div>
        <div>
          <h2>긴급·상담 전화</h2>
          <ul>
            {HOTLINES.map((h) => (
              <li key={h.tel}>
                {h.label}{" "}
                <a href={`tel:${h.tel.replace(/-/g, "")}`}>{h.tel}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container site-footer__note">
        <p>
          <strong>정보 출처</strong> — 본 사이트에 게시된 모든 정보는 각 부처와
          공공기관의 공식 자료를 기반으로 안내 목적으로 정리한 예시이며, 신청 전
          반드시 해당 기관에서 최신 내용을 확인해 주시기 바랍니다.
        </p>
        <p>
          © 2026 {SITE_NAME} 안내 서비스 · 본 페이지는 공공정보 안내를 위한
          예시 화면입니다.
        </p>
      </div>
    </footer>
  );
}
