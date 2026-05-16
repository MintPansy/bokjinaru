import Link from "next/link";
import { notFound } from "next/navigation";
import { MockDataBanner } from "../../components/MockDataBanner";
import { getOrganizationByIdWithFallback } from "../../services/api-with-fallback";

type Props = { params: Promise<{ id: string }> };

export default async function OrganizationDetailPage({ params }: Props) {
  const { id } = await params;
  const { data: org, source } = await getOrganizationByIdWithFallback(id);

  if (!org) notFound();

  return (
    <>
      {source === "mock" && <MockDataBanner compact />}
      <header className="page-header">
        <div className="container">
          <span className="badge">{org.region}</span>
          <h1>{org.name}</h1>
          <p>{org.description}</p>
        </motion>
      </header>
      <article className="container section" style={{ paddingTop: 0 }}>
        <div className="step-card">
          <h2>연락처</h2>
          <p>
            전화:{" "}
            <a href={`tel:${org.phone.replace(/-/g, "")}`}>{org.phone}</a>
          </p>
          <p>주소: {org.address}</p>
          {org.website && (
            <p>
              웹사이트:{" "}
              <a href={org.website} target="_blank" rel="noopener noreferrer">
                {org.website}
              </a>
            </p>
          )}
        </motion>
        {org.services.length > 0 && (
          <div className="step-card" style={{ marginTop: "1rem" }}>
            <h2>안내 서비스</h2>
            <ul>
              {org.services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.id}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </motion>
        )}
        <p style={{ marginTop: "2rem" }}>
          <Link href="/organizations">← 기관 목록</Link>
        </p>
      </article>
    </>
  );
}
