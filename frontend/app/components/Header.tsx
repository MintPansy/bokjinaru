import Link from "next/link";

export function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "1rem",
        maxWidth: "48rem",
        margin: "0 auto",
      }}
    >
      <nav aria-label="전역">
        <Link href="/" style={{ fontWeight: 700, textDecoration: "none" }}>
          복지 길잡이
        </Link>
        {" · "}
        <Link href="/read">탐색</Link>
        {" · "}
        <Link href="/login">로그인</Link>
      </nav>
    </header>
  );
}
