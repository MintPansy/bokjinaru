import { NextResponse } from "next/server";

/** OAuth 콜백 — 추후 provider 연동 */
export async function GET() {
  return NextResponse.json(
    { message: "OAuth callback placeholder" },
    { status: 501 }
  );
}
