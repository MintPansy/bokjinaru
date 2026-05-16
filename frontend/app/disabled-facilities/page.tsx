import Link from "next/link";
import { DisabledFacilitySearch } from "../components/disabled-facility-search";

export const metadata = {
  title: "장애인 편의시설 찾기 — 복지나루",
  description:
    "한국사회보장정보원 공공데이터를 활용해 장애인 편의시설을 검색하고 기구표 상세정보를 확인합니다.",
};

export default function DisabledFacilitiesPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="section__eyebrow">공공데이터 연동</p>
          <h1>장애인 편의시설 찾기</h1>
          <p>
            한국사회보장정보원「장애인편의시설 현황」OpenAPI로 시설을 검색하고,
            선택한 시설의 기구표(편의시설 평가 항목)를 확인할 수 있습니다.
          </p>
        </div>
      </header>

      <section className="container section" style={{ paddingTop: 0 }}>
        <DisabledFacilitySearch />
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← 홈으로</Link>
        </p>
      </section>
    </>
  );
}
