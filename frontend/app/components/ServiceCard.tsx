import Link from "next/link";
import type { WelfareServiceItem } from "../lib/constants";

type Props = { service: WelfareServiceItem };

export function ServiceCard({ service }: Props) {
  return (
    <article className="service-card">
      <section className="service-card__meta">
        {service.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
        <span>{service.provider}</span>
      </section>
      <h3>
        <Link href={`/services/${service.id}`}>{service.title}</Link>
      </h3>
      <p className="service-card__summary">{service.summary}</p>
      <dl className="service-card__facts">
        <dt>대상</dt>
        <dd>{service.target}</dd>
        <dt>신청</dt>
        <dd>{service.application}</dd>
      </dl>
      <footer className="service-card__footer">
        <span>업데이트 {service.updatedAt}</span>
        <Link href={`/services/${service.id}`} className="service-card__link">
          자세히 보기 →
        </Link>
      </footer>
    </article>
  );
}
