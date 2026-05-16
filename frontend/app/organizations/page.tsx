import Link from "next/link";
import { getOrganizations } from "../services/api";

export default async function OrganizationsPage() {
  let items: Awaited<ReturnType<typeof getOrganizations>>["items"] = [];
  let error = false;

  try {
    const res = await getOrganizations();
    items = res.items;
  } catch {
    error = true;
  }

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>지원 기관</h1>
          <p>복지 서비스를 운영·연계하는 기관을 지역별로 찾을 수 있습니다.</p>
        </div>
      </header>
      <section className="container section" style={{ paddingTop: 0 }}>
        {error && (
          <p role="alert">기관 목록을 불러오지 못했습니다. 백엔드를 확인해 주세요.</p>
        )}
        <ul className="card-grid" style={{ listStyle: "none", padding: 0 }}>
          {items.map((org) => (
            <li key={org.id} className="service-card">
              <span className="badge">{org.regionLabel ?? org.region}</span>
              <h3>
                <Link href={`/organizations/${org.id}`}>{org.name}</Link>
              </h3>
              <p className="service-card__summary">{org.phone}</p>
              <Link href={`tel:${org.phone.replace(/-/g, "")}`}>전화 문의</Link>
            </li>
          ))}
        </ul>
        {!error && items.length === 0 && <p>등록된 기관이 없습니다.</p>}
        <p style={{ marginTop: "2rem" }}>
          <Link href="/">← 홈으로</Link>
        </p>
      </section>
    </>
  );
}
