import Link from "next/link";
import { DemoLoginForm } from "../components/auth/DemoLoginForm";

export default function LoginPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>로그인</h1>
          <p>데모 계정으로 로그인해 마이페이지 기능을 이용해 보세요.</p>
        </div>
      </header>
      <section className="container section" style={{ paddingTop: 0 }}>
        <DemoLoginForm />
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/">← 홈으로</Link>
        </p>
      </section>
    </>
  );
}
