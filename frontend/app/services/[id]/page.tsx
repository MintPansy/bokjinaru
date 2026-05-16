import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById } from "../../services/api";

const SUPPORT_LABELS: Record<string, string> = {
  INCOME: "소득지원",
  CARE: "돌봄·활동지원",
  MEDICAL: "의료·재활",
  EMPLOYMENT: "고용·자립",
  EDUCATION: "교육",
  CHILDCARE: "아동양육",
  HOUSING: "주거",
  TRANSPORT: "교통",
};

type Props = { params: Promise<{ id: string }> };

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  let service;
  try {
    service = await getServiceById(id);
  } catch {
    notFound();
  }

  const category =
    service.supportTypes.map((t) => SUPPORT_LABELS[t] ?? t)[0] ?? "복지";

  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="section__eyebrow">{category}</p>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
          {service.updatedAt && (
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              업데이트 {service.updatedAt}
            </p>
          )}
        </div>
      </header>
      <article className="container section" style={{ paddingTop: 0 }}>
        <div className="step-card">
          <h2>지원 내용</h2>
          <p>{service.description}</p>
        </div>
        <div className="step-card" style={{ marginTop: "1rem" }}>
          <h2>지원 대상</h2>
          <p>{service.eligibility}</p>
        </div>
        <section className="step-card" style={{ marginTop: "1rem" }}>
          <h2>신청 방법</h2>
          <p>{service.applicationMethod}</p>
        </section>
        {service.requiredDocuments.length > 0 && (
          <div className="step-card" style={{ marginTop: "1rem" }}>
            <h2>필요 서류</h2>
            <ul>
              {service.requiredDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="step-card" style={{ marginTop: "1rem" }}>
          <h2>담당 기관</h2>
          <p>{service.organizationName}</p>
          {service.organizationId && (
            <p>
              <Link href={`/organizations/${service.organizationId}`}>
                기관 상세 보기
              </Link>
            </p>
          )}
        </div>
        {service.relatedLinks.length > 0 && (
          <div className="step-card" style={{ marginTop: "1rem" }}>
            <h2>관련 링크</h2>
            <ul>
              {service.relatedLinks.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p style={{ marginTop: "2rem" }}>
          <Link href="/search">← 서비스 목록</Link>
        </p>
      </article>
    </>
  );
}
