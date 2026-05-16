import { XMLParser } from "fast-xml-parser";
import {
  OPEN_API_ERROR_MESSAGES,
  type DisabledFacilityApiError,
  type DisabledFacilityApiResult,
  type DisabledFacilityDetail,
  type DisabledFacilityDetailResponse,
  type DisabledFacilityItem,
  type DisabledFacilityListResponse,
  type DisabledFacilitySearchParams,
} from "./disabledFacility.types";

const LIST_ENDPOINT =
  "http://apis.data.go.kr/B554287/DisabledPersonConvenientFacility/getDisConvFaclList";

const DETAIL_ENDPOINT =
  "http://apis.data.go.kr/B554287/DisabledPersonConvenientFacility/getFacInfoOpenApiJpEvalInfoList";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
  parseTagValue: true,
  isArray: (tagName) =>
    tagName === "servList" || tagName === "item" || tagName === "ServList",
});

function getServiceKey(): string | null {
  const key =
    process.env.DATA_GO_KR_SERVICE_KEY ??
    process.env.ODCLOUD_SERVICE_KEY ??
    "";
  const trimmed = key.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function configError(): DisabledFacilityApiError {
  return {
    ok: false,
    errorType: "config",
    message:
      "공공데이터 API 인증키가 설정되지 않았습니다. DATA_GO_KR_SERVICE_KEY 환경변수를 확인해 주세요.",
  };
}

function isSuccessResultCode(code: string): boolean {
  return code === "0" || code === "00";
}

function resolveOpenApiMessage(code: string, fallback?: string): string {
  const mapped = OPEN_API_ERROR_MESSAGES[code];
  if (mapped) return mapped.message;
  return fallback?.trim() || OPEN_API_ERROR_MESSAGES["99"].message;
}

function toStr(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "object" && "#text" in (value as object)) {
    return String((value as { "#text": unknown })["#text"]).trim();
  }
  return String(value).trim();
}

function toOptionalNumber(value: unknown): number | null {
  const s = toStr(value);
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** 단건·배열 혼용 XML 노드를 배열로 정규화 */
export function normalizeArray<T>(value: unknown): T[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value as T[];
  return [value as T];
}

function pickFirst<T extends Record<string, unknown>>(
  root: unknown,
  keys: string[]
): unknown {
  if (!root || typeof root !== "object") return undefined;
  const queue: unknown[] = [root];
  const seen = new Set<unknown>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || typeof current !== "object" || seen.has(current)) continue;
    seen.add(current);
    const obj = current as Record<string, unknown>;

    for (const key of keys) {
      if (key in obj && obj[key] != null && obj[key] !== "") {
        return obj[key];
      }
    }
    for (const val of Object.values(obj)) {
      if (val && typeof val === "object") queue.push(val);
    }
  }
  return undefined;
}

function extractResultMeta(parsed: unknown): {
  resultCode: string;
  resultMessage: string;
  totalCount: number;
} {
  const resultCode = toStr(
    pickFirst(parsed, ["resultCode", "ResultCode", "resultcode"])
  );
  const resultMessage = toStr(
    pickFirst(parsed, ["resultMessage", "resultMsg", "ResultMsg", "resultmsg"])
  );
  const totalRaw = pickFirst(parsed, ["totalCount", "TotalCount", "totalcount"]);
  const totalCount = Number(toStr(totalRaw)) || 0;

  return { resultCode, resultMessage, totalCount };
}

function extractServListRaw(parsed: unknown): Record<string, unknown>[] {
  const servList = pickFirst(parsed, ["servList", "ServList", "servlist"]);
  const items = normalizeArray<Record<string, unknown>>(servList);

  if (items.length === 1 && !toStr(items[0]?.wfcltId) && !toStr(items[0]?.faclNm)) {
    const nested = normalizeArray<Record<string, unknown>>(
      items[0]?.item ?? items[0]?.row ?? items[0]?.ServList
    );
    if (nested.length > 0) return nested;
  }

  return items.filter(
    (row) => toStr(row.wfcltId) || toStr(row.faclNm) || toStr(row.faclInfId)
  );
}

export function normalizeFacilityItem(
  raw: Record<string, unknown>
): DisabledFacilityItem {
  return {
    estbDate: toStr(raw.estbDate),
    faclInfId: toStr(raw.faclInfId),
    faclLat: toOptionalNumber(raw.faclLat),
    faclLng: toOptionalNumber(raw.faclLng),
    faclNm: toStr(raw.faclNm),
    faclTyCd: toStr(raw.faclTyCd),
    lcMnad: toStr(raw.lcMnad),
    salStaDivCd: toStr(raw.salStaDivCd),
    salStaNm: toStr(raw.salStaNm),
    wfcltDivCd: toStr(raw.wfcltDivCd),
    wfcltId: toStr(raw.wfcltId),
  };
}

export function normalizeFacilityList(
  parsed: unknown,
  pageNo: number,
  numOfRows: number
): DisabledFacilityApiResult<DisabledFacilityListResponse> {
  const { resultCode, resultMessage, totalCount } = extractResultMeta(parsed);

  if (resultCode && !isSuccessResultCode(resultCode)) {
    return {
      ok: false,
      errorType: "openapi",
      resultCode,
      message: resolveOpenApiMessage(resultCode, resultMessage),
    };
  }

  const items = extractServListRaw(parsed).map((row) =>
    normalizeFacilityItem(row)
  );

  return {
    ok: true,
    totalCount: totalCount || items.length,
    pageNo,
    numOfRows,
    resultCode: resultCode || "00",
    resultMessage: resultMessage || "정상",
    items,
  };
}

export function parseEvalInfo(evalInfo: unknown): string[] {
  const raw = toStr(evalInfo);
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function normalizeFacilityDetail(
  parsed: unknown
): DisabledFacilityApiResult<DisabledFacilityDetailResponse> {
  const { resultCode, resultMessage } = extractResultMeta(parsed);

  if (resultCode && !isSuccessResultCode(resultCode)) {
    return {
      ok: false,
      errorType: "openapi",
      resultCode,
      message: resolveOpenApiMessage(resultCode, resultMessage),
    };
  }

  const rows = extractServListRaw(parsed);
  const raw = rows[0] ?? (pickFirst(parsed, ["servList"]) as Record<string, unknown>);

  if (!raw || typeof raw !== "object") {
    return {
      ok: false,
      errorType: "openapi",
      message: "시설 상세 정보를 찾을 수 없습니다.",
    };
  }

  const wfcltId = toStr(raw.wfcltId);
  const faclNm = toStr(raw.faclNm);

  const item: DisabledFacilityDetail = {
    wfcltId,
    faclNm,
    evalInfo: parseEvalInfo(raw.evalInfo),
  };

  return {
    ok: true,
    resultCode: resultCode || "00",
    resultMessage: resultMessage || "정상",
    item,
  };
}

function buildQuery(
  base: URL,
  params: Record<string, string | number | undefined>
): URL {
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    base.searchParams.set(key, String(value));
  }
  return base;
}

async function fetchAndParseXml(
  url: URL
): Promise<unknown | DisabledFacilityApiError> {
  const serviceKey = getServiceKey();
  if (!serviceKey) return configError();

  url.searchParams.set("serviceKey", serviceKey);

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/xml, text/xml, */*" },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return {
        ok: false,
        errorType: "network",
        message: `공공 API HTTP 오류 (${res.status})`,
      };
    }

    const xml = await res.text();
    if (!xml.trim()) {
      return {
        ok: false,
        errorType: "xml",
        message: "공공 API 응답 본문이 비어 있습니다.",
      };
    }

    try {
      return xmlParser.parse(xml) as unknown;
    } catch {
      return {
        ok: false,
        errorType: "xml",
        message: "XML 응답을 해석하지 못했습니다.",
      };
    }
  } catch {
    return {
      ok: false,
      errorType: "network",
      message: "공공 API 서버에 연결할 수 없습니다. 네트워크를 확인해 주세요.",
    };
  }
}

export async function fetchDisabledFacilityList(
  params: DisabledFacilitySearchParams
): Promise<DisabledFacilityApiResult<DisabledFacilityListResponse>> {
  const pageNo = params.pageNo ?? 1;
  const numOfRows = Math.min(params.numOfRows ?? 20, 1000);

  const url = buildQuery(new URL(LIST_ENDPOINT), {
    pageNo,
    numOfRows,
    faclNm: params.faclNm,
    siDoNm: params.siDoNm,
    cggNm: params.cggNm,
    roadNm: params.roadNm,
    faclTyCd: params.faclTyCd,
  });

  const parsed = await fetchAndParseXml(url);
  if (isApiError(parsed)) {
    return parsed;
  }

  return normalizeFacilityList(parsed, pageNo, numOfRows);
}

export async function fetchDisabledFacilityDetail(
  wfcltId: string
): Promise<DisabledFacilityApiResult<DisabledFacilityDetailResponse>> {
  const id = wfcltId.trim();
  if (!id) {
    return {
      ok: false,
      errorType: "openapi",
      message: "시설 ID(wfcltId)가 필요합니다.",
    };
  }

  const url = buildQuery(new URL(DETAIL_ENDPOINT), { wfcltId: id });
  const parsed = await fetchAndParseXml(url);
  if (isApiError(parsed)) {
    return parsed;
  }

  return normalizeFacilityDetail(parsed);
}

export function isApiError(
  result: unknown
): result is DisabledFacilityApiError {
  return (
    typeof result === "object" &&
    result !== null &&
    "ok" in result &&
    (result as DisabledFacilityApiError).ok === false
  );
}
