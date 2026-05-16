import { NextRequest, NextResponse } from "next/server";
import {
  fetchDisabledFacilityList,
  isApiError,
} from "@/lib/apis/disabledFacility";
import type { DisabledFacilitySearchParams } from "@/lib/apis/disabledFacility.types";

function parsePositiveInt(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const params: DisabledFacilitySearchParams = {
    pageNo: parsePositiveInt(searchParams.get("pageNo"), 1),
    numOfRows: Math.min(
      parsePositiveInt(searchParams.get("numOfRows"), 20),
      1000
    ),
    faclNm: searchParams.get("faclNm")?.trim() || undefined,
    siDoNm: searchParams.get("siDoNm")?.trim() || undefined,
    cggNm: searchParams.get("cggNm")?.trim() || undefined,
    roadNm: searchParams.get("roadNm")?.trim() || undefined,
    faclTyCd: searchParams.get("faclTyCd")?.trim() || undefined,
  };

  const result = await fetchDisabledFacilityList(params);

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
