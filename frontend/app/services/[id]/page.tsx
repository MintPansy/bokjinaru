import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById } from "../../lib/constants";

type Props = { params: Promise<{ id: string }> };

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) notFound();

  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="section__eyebrow">{service.category}</p>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
        </div>
      </header>
      <article className="container section" style={{ paddingTop: 0 }}>
        <div className="step-card">
          <h2>지원 대상</h2>
          <p>{service.target}</p>
        </div>
        <section className="step-card" style={{ marginTop: "1rem" }}>
          <h2>신청 방법</h2>
          <p>{service.application}</p>
        </section>
        <section className="step-card" style={{ marginTop: "1rem" }}>
          <h2>담당 기관</h2>
          <p>{service.provider}</p>
        </section>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/search">← 서비스 목록</Link>
        </p>
      </article>
    </>
  );
}
