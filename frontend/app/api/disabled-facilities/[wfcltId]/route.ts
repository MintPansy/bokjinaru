import { NextRequest, NextResponse } from "next/server";
import {
  fetchDisabledFacilityDetail,
  isApiError,
} from "@/lib/apis/disabledFacility";

type RouteContext = { params: Promise<{ wfcltId: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { wfcltId } = await context.params;
  const decoded = decodeURIComponent(wfcltId ?? "").trim();

  if (!decoded) {
    return NextResponse.json(
      {
        ok: false,
        errorType: "openapi",
        message: "시설 ID(wfcltId)가 필요합니다.",
      },
      { status: 400 }
    );
  }

  const result = await fetchDisabledFacilityDetail(decoded);

  if (isApiError(result)) {
    const status =
      result.errorType === "config"
        ? 503
        : result.errorType === "network"
          ? 502
          : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
