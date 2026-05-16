import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>복지 서비스 길잡이</h1>
      <p>
        장애 유형, 연령대, 지역, 지원 종류에 맞는 복지 서비스와 기관을
        찾을 수 있습니다.
      </p>
      <nav aria-label="주요 메뉴">
        <ul>
          <li>
            <Link href="/read">서비스 탐색 (read)</Link>
          </li>
          <li>
            <Link href="/login">로그인</Link>
          </li>
          <li>
            <Link href="/mypage">마이페이지</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
