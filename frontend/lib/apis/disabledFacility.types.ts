/** OpenAPI resultCode (공공데이터포털) */
export type OpenApiErrorCode =
  | "0"
  | "00"
  | "04"
  | "10"
  | "12"
  | "20"
  | "22"
  | "30"
  | "31"
  | "99";

export const OPEN_API_ERROR_MESSAGES: Record<
  string,
  { code: OpenApiErrorCode | string; message: string }
> = {
  "0": { code: "0", message: "정상 처리되었습니다." },
  "00": { code: "00", message: "정상 처리되었습니다." },
  "04": { code: "04", message: "HTTP 오류가 발생했습니다." },
  "10": {
    code: "10",
    message: "잘못된 요청 파라미터입니다. 입력값을 확인해 주세요.",
  },
  "12": { code: "12", message: "등록되지 않은 OpenAPI 서비스입니다." },
  "20": { code: "20", message: "서비스 접근이 거부되었습니다." },
  "22": {
    code: "22",
    message: "서비스 요청 횟수 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.",
  },
  "30": {
    code: "30",
    message: "등록되지 않은 서비스 키입니다. 환경변수를 확인해 주세요.",
  },
  "31": { code: "31", message: "서비스 키 사용 기한이 만료되었습니다." },
  "99": { code: "99", message: "알 수 없는 오류가 발생했습니다." },
};

export const FACILITY_TYPE_OPTIONS: readonly string[] = [
  "격리병원",
  "경로당",
  "고등학교",
  "공공도서관",
  "공연장",
  "공장",
  "공중화장실",
  "관광숙박시설",
  "관람장",
  "교도소·구치소",
  "교육원(연수원등)·직업훈련소·학원(자동차학원, 무도학원 제외) 등",
  "국가 또는 지자체 청사",
  "국민건강보험공단 및 지사",
  "국민연금공단 및 지사",
  "근로복지공단 및 지사",
  "금융업소 등 일반업무시설",
  "기숙사",
  "노인복지시설",
  "다세대주택",
  "대피소",
  "대학교",
  "대형마트",
  "도매시장·소매시장",
  "도서관",
  "도시공원",
  "동식물원",
  "목욕장",
  "방송국",
  "병원·치과병원·한방병원·정신병원·요양병원",
  "보건소",
  "봉안당(종교시설에 해당하는 것은 제외)",
  "생활권수련시설",
  "생활숙박시설",
  "수영장",
  "수퍼마켓·일용품 등의 소매점",
  "아동복지시설",
  "아파트",
  "아파트 부대복리시설",
  "안마시술소",
  "야외음악당·야외극장·어린이회관",
  "어린이집",
  "연립주택",
  "우체국",
  "운동장(육상·구기·볼링·수영·스케이트·롤러스케이트·승마·사격·궁도·골프)과 부수되는 건축물",
  "운전학원",
  "유치원",
  "의원·치과의원·한의원·조산소·산후조리원",
  "이외 사회복지시설",
  "이용원·미용원",
  "일반숙박시설",
  "일반음식점",
  "자연공원",
  "자연권수련시설",
  "장례식장",
  "장애인복지시설",
  "전문대학",
  "전시장",
  "전신전화국",
  "종교집회장",
  "종합병원",
  "주차장",
  "중학교",
  "지역아동센터",
  "지역자치센터",
  "집회장",
  "체육관",
  "초등학교",
  "특수학교",
  "파출소, 지구대",
  "한국장애인고용공단 및 지사",
  "화장시설",
  "휴게소",
  "휴게음식점·제과점",
  "휴게음식점·제과점 등",
] as const;

/** 기구표(evalInfo)에 올 수 있는 항목 */
export const EVAL_INFO_LABELS: readonly string[] = [
  "주출입구 접근로",
  "주출입구 높이차이 제거",
  "주출입구(문)",
  "승강기",
  "장애인전용주차구역",
  "장애인사용가능화장실",
  "장애인사용가능객실",
  "유도 및 안내 설비",
] as const;

export type DisabledFacilitySearchParams = {
  pageNo?: number;
  numOfRows?: number;
  faclNm?: string;
  siDoNm?: string;
  cggNm?: string;
  roadNm?: string;
  faclTyCd?: string;
};

export type DisabledFacilityItem = {
  estbDate: string;
  faclInfId: string;
  faclLat: number | null;
  faclLng: number | null;
  faclNm: string;
  faclTyCd: string;
  lcMnad: string;
  salStaDivCd: string;
  salStaNm: string;
  wfcltDivCd: string;
  wfcltId: string;
};

export type DisabledFacilityListResponse = {
  ok: true;
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  resultCode: string;
  resultMessage: string;
  items: DisabledFacilityItem[];
};

export type DisabledFacilityDetail = {
  wfcltId: string;
  faclNm: string;
  evalInfo: string[];
};

export type DisabledFacilityDetailResponse = {
  ok: true;
  resultCode: string;
  resultMessage: string;
  item: DisabledFacilityDetail;
};

export type DisabledFacilityApiError = {
  ok: false;
  errorType: "config" | "network" | "xml" | "openapi";
  resultCode?: string;
  message: string;
};

export type DisabledFacilityApiResult<T> = T | DisabledFacilityApiError;
