import Link from "next/link";

const ORGS = [
  {
    id: "1",
    name: "서울시립 발달장애인종합지원센터",
    region: "서울",
    phone: "02-2133-3691",
    services: 3,
  },
  {
    id: "2",
    name: "경기도장애인복지종합지원센터",
    region: "경기",
    phone: "031-249-9114",
    services: 4,
  },
  {
    id: "3",
    name: "부산시 장애인일자리지원센터",
    region: "부산",
    phone: "051-888-1200",
    services: 2,
  },
  {
    id: "4",
    name: "대한시각장애인연합회",
    region: "전국",
    phone: "02-717-1004",
    services: 2,
  },
];

export default function OrganizationsPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>지원 기관</h1>
          <p>복지 서비스를 운영·연계하는 기관을 지역별로 찾을 수 있습니다.</p>
        </div>
      </header>
      <section className="container section" style={{ paddingTop: 0 }}>
        <ul className="card-grid" style={{ listStyle: "none", padding: 0 }}>
          {ORGS.map((org) => (
            <li key={org.id} className="service-card">
              <span className="badge">{org.region}</span>
              <h3>{org.name}</h3>
              <p className="service-card__summary">
                안내 서비스 {org.services}건 · {org.phone}
              </p>
              <Link href={`tel:${org.phone.replace(/-/g, "")}`}>전화 문의</Link>
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
