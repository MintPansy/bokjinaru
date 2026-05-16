import Link from "next/link";
import { ServiceCard } from "./components/ServiceCard";
import { toServiceCardItem } from "./lib/mappers";
import { DISABILITY_TYPES, STEPS, SUPPORT_FIELDS } from "./lib/constants";
import { getServices, getStats } from "./services/api";

export default async function HomePage() {
  let featured: ReturnType<typeof toServiceCardItem>[] = [];
  let statItems = [
    { value: "—", label: "안내 중인 복지 서비스" },
    { value: "—", label: "전국 시·도 단위 지역 정보" },
    { value: "—", label: "장애유형별 맞춤 분류" },
  ];
  let apiError = false;

  try {
    const [services, stats] = await Promise.all([getServices(), getStats()]);
    featured = services.items.slice(0, 3).map(toServiceCardItem);
    statItems = [
      { value: `${stats.serviceCount}+`, label: "안내 중인 복지 서비스" },
      { value: String(stats.regionCount), label: "전국 시·도 단위 지역 정보" },
      {
        value: String(stats.disabilityTypeCount),
        label: "장애유형별 맞춤 분류",
      },
    ];
  } catch {
    apiError = true;
  }

  return (
    <>
      {apiError && (
        <p className="container" role="alert" style={{ paddingTop: "1rem" }}>
          백엔드에 연결할 수 없습니다.{" "}
          <code>backend/app/bokjinaru</code>에서 API를 실행해 주세요 (포트 8080).
        </p>
      )}
      <section className="hero">
        <div className="container">
          <span className="hero__badge">장애인 복지서비스 통합 안내</span>
          <h1>
            필요한 복지 지원을,
            <br />
            헷갈리지 않게 찾을 수 있도록.
          </h1>
          <p className="hero__lead">
            장애유형, 연령, 지역, 지원 분야를 선택하면 신청할 수 있는 공공
            복지서비스와 담당 기관을 한 번에 확인할 수 있습니다.
          </p>
          <div className="hero__actions">
            <Link href="/search" className="btn btn--primary">
              서비스 찾기 시작
            </Link>
            <Link href="/accessibility" className="btn btn--outline">
              접근성 안내 보기
            </Link>
          </div>
          <p className="hero__hotline">
            상담이 급하신 경우 보건복지상담센터{" "}
            <a href="tel:129">129</a> · 평일 09:00–18:00
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section__eyebrow">빠른 시작</p>
          <h2>어떤 분께 필요하신가요?</h2>
          <div className="chip-group">
            <p className="chip-group__label">장애유형</p>
            <div className="chip-row">
              {DISABILITY_TYPES.map((d) => (
                <Link
                  key={d.code}
                  href={`/search?disabilityType=${d.code}`}
                  className="chip"
                >
                  {d.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="chip-group">
            <p className="chip-group__label">지원 분야</p>
            <div className="chip-row">
              {SUPPORT_FIELDS.map((s) => (
                <Link
                  key={s.code}
                  href={`/search?supportType=${s.code}`}
                  className="chip"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/search" className="btn btn--ghost">
            전체 조건으로 자세히 찾기
          </Link>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <p className="section__eyebrow">이용 안내</p>
          <h2>세 단계로 충분합니다</h2>
          <p className="section__desc">
            어려운 정책 용어 대신, 일상 언어로 안내합니다.
          </p>
          <ol className="steps">
            {STEPS.map((step) => (
              <li key={step.num} className="step-card">
                <span className="step-card__num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="section__eyebrow">자주 찾는 서비스</p>
              <h2>많은 분들이 먼저 확인하는 지원</h2>
            </div>
            <Link href="/search" className="text-link">
              모든 서비스 보기 →
            </Link>
          </div>
          {featured.length > 0 ? (
            <div className="card-grid">
              {featured.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          ) : (
            <p>표시할 서비스가 없습니다.</p>
          )}
          <div className="stats" aria-label="서비스 통계">
            {statItems.map((stat) => (
              <div key={stat.label}>
                <div className="stat__value">{stat.value}</div>
                <div className="stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="cta-box">
            <h3>현장 상담이 필요하신가요?</h3>
            <p>
              읍·면·동 행정복지센터 또는 가까운 장애인복지관에서 대면 상담을 받을
              수 있습니다.
            </p>
            <Link href="/organizations" className="btn btn--primary">
              지원 기관 찾기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
