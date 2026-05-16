import Link from "next/link";

const ITEMS = [
  {
    title: "색 대비",
    desc: "본문과 배경은 4.5:1 이상 대비를 유지합니다. 링크는 색과 밑줄로 구분합니다.",
  },
  {
    title: "키보드 접근",
    desc: "Tab으로 모든 메뉴·버튼에 접근할 수 있으며, 포커스 링을 명확히 표시합니다.",
  },
  {
    title: "스크린리더",
    desc: "제목 계층, 랜드마크, aria-live로 검색 결과와 상태 변화를 읽을 수 있습니다.",
  },
  {
    title: "모션 절제",
    desc: "prefers-reduced-motion 설정 시 애니메이션을 최소화합니다.",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>접근성 안내</h1>
          <p>복지나루는 읽기 쉽고, 찾기 쉽고, 조작하기 쉬운 UI를 목표로 합니다.</p>
        </div>
      </header>
      <section className="container section" style={{ paddingTop: 0 }}>
        <ul className="steps" style={{ listStyle: "none" }}>
          {ITEMS.map((item) => (
            <li key={item.title} className="step-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← 홈으로</Link>
        </p>
      </section>
    </>
  );
}
