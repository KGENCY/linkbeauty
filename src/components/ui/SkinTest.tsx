"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// ==================== 타입 정의 ====================
interface Scores {
  OIL: number;
  DRY: number;
  SEN: number;
  COMB: number;
  ACNE: number;
}

interface Answer {
  text: string;
  scores: Partial<Scores>;
}

interface Question {
  id: number;
  title: string;
  answers: Answer[];
}

interface ResultData {
  key: string;
  name: string;
  description: string;
  cautions: string[];
}

interface Product {
  name: string;
  desc: string;
  priceKRW: number;
  image?: string;
}

interface ProductsByCategory {
  serum: Product[];
  sunscreen: Product[];
  mask: Product[];
}

type ProductCategory = "serum" | "sunscreen" | "mask";

interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  rate: number; // KRW 기준 환율 (1 KRW = X 외화)
  symbol: string;
  format: (n: number) => string;
}

// ==================== 국가 및 환율 데이터 ====================
const countries: Country[] = [
  { code: "KR", name: "한국", flag: "🇰🇷", currency: "KRW", rate: 1, symbol: "₩", format: (n) => `₩${n.toLocaleString()}` },
  { code: "US", name: "미국", flag: "🇺🇸", currency: "USD", rate: 1350, symbol: "$", format: (n) => `$${n.toFixed(2)}` },
  { code: "JP", name: "일본", flag: "🇯🇵", currency: "JPY", rate: 9, symbol: "¥", format: (n) => `¥${n.toFixed(0)}` },
  { code: "CN", name: "중국", flag: "🇨🇳", currency: "CNY", rate: 185, symbol: "CN¥", format: (n) => `CN¥${n.toFixed(0)}` },
  { code: "VN", name: "베트남", flag: "🇻🇳", currency: "VND", rate: 0.054, symbol: "₫", format: (n) => `₫${n.toLocaleString()}` },
  { code: "TH", name: "태국", flag: "🇹🇭", currency: "THB", rate: 38, symbol: "฿", format: (n) => `฿${n.toFixed(0)}` },
  { code: "PH", name: "필리핀", flag: "🇵🇭", currency: "PHP", rate: 24, symbol: "₱", format: (n) => `₱${n.toFixed(0)}` },
  { code: "ID", name: "인도네시아", flag: "🇮🇩", currency: "IDR", rate: 0.085, symbol: "Rp", format: (n) => `Rp${n.toLocaleString()}` },
  { code: "MY", name: "말레이시아", flag: "🇲🇾", currency: "MYR", rate: 285, symbol: "RM", format: (n) => `RM${n.toFixed(2)}` },
  { code: "SG", name: "싱가포르", flag: "🇸🇬", currency: "SGD", rate: 1000, symbol: "S$", format: (n) => `S$${n.toFixed(2)}` },
  { code: "TW", name: "대만", flag: "🇹🇼", currency: "TWD", rate: 42, symbol: "NT$", format: (n) => `NT$${n.toFixed(0)}` },
  { code: "HK", name: "홍콩", flag: "🇭🇰", currency: "HKD", rate: 173, symbol: "HK$", format: (n) => `HK$${n.toFixed(2)}` },
  { code: "IN", name: "인도", flag: "🇮🇳", currency: "INR", rate: 16, symbol: "₹", format: (n) => `₹${n.toFixed(0)}` },
  { code: "AU", name: "호주", flag: "🇦🇺", currency: "AUD", rate: 870, symbol: "A$", format: (n) => `A$${n.toFixed(2)}` },
  { code: "NZ", name: "뉴질랜드", flag: "🇳🇿", currency: "NZD", rate: 800, symbol: "NZ$", format: (n) => `NZ$${n.toFixed(2)}` },
  { code: "GB", name: "영국", flag: "🇬🇧", currency: "GBP", rate: 1700, symbol: "£", format: (n) => `£${n.toFixed(2)}` },
  { code: "DE", name: "독일", flag: "🇩🇪", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "FR", name: "프랑스", flag: "🇫🇷", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "IT", name: "이탈리아", flag: "🇮🇹", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "ES", name: "스페인", flag: "🇪🇸", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "NL", name: "네덜란드", flag: "🇳🇱", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "CA", name: "캐나다", flag: "🇨🇦", currency: "CAD", rate: 980, symbol: "C$", format: (n) => `C$${n.toFixed(2)}` },
  { code: "MX", name: "멕시코", flag: "🇲🇽", currency: "MXN", rate: 78, symbol: "MX$", format: (n) => `MX$${n.toFixed(0)}` },
  { code: "BR", name: "브라질", flag: "🇧🇷", currency: "BRL", rate: 270, symbol: "R$", format: (n) => `R$${n.toFixed(2)}` },
  { code: "RU", name: "러시아", flag: "🇷🇺", currency: "RUB", rate: 15, symbol: "₽", format: (n) => `₽${n.toFixed(0)}` },
  { code: "TR", name: "튀르키예", flag: "🇹🇷", currency: "TRY", rate: 42, symbol: "₺", format: (n) => `₺${n.toFixed(0)}` },
  { code: "AE", name: "아랍에미리트", flag: "🇦🇪", currency: "AED", rate: 368, symbol: "د.إ", format: (n) => `د.إ${n.toFixed(2)}` },
  { code: "SA", name: "사우디아라비아", flag: "🇸🇦", currency: "SAR", rate: 360, symbol: "﷼", format: (n) => `﷼${n.toFixed(2)}` },
  { code: "ZA", name: "남아프리카", flag: "🇿🇦", currency: "ZAR", rate: 73, symbol: "R", format: (n) => `R${n.toFixed(2)}` },
  { code: "PL", name: "폴란드", flag: "🇵🇱", currency: "PLN", rate: 335, symbol: "zł", format: (n) => `${n.toFixed(2)}zł` },
  { code: "SE", name: "스웨덴", flag: "🇸🇪", currency: "SEK", rate: 130, symbol: "kr", format: (n) => `${n.toFixed(0)}kr` },
  { code: "NO", name: "노르웨이", flag: "🇳🇴", currency: "NOK", rate: 125, symbol: "kr", format: (n) => `${n.toFixed(0)}kr` },
  { code: "DK", name: "덴마크", flag: "🇩🇰", currency: "DKK", rate: 195, symbol: "kr", format: (n) => `${n.toFixed(0)}kr` },
  { code: "CH", name: "스위스", flag: "🇨🇭", currency: "CHF", rate: 1520, symbol: "CHF", format: (n) => `CHF${n.toFixed(2)}` },
  { code: "AT", name: "오스트리아", flag: "🇦🇹", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "BE", name: "벨기에", flag: "🇧🇪", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "PT", name: "포르투갈", flag: "🇵🇹", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "GR", name: "그리스", flag: "🇬🇷", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "IE", name: "아일랜드", flag: "🇮🇪", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
  { code: "FI", name: "핀란드", flag: "🇫🇮", currency: "EUR", rate: 1450, symbol: "€", format: (n) => `€${n.toFixed(2)}` },
];

// ==================== 질문 데이터 ====================
const questions: Question[] = [
  {
    id: 1,
    title: "하루가 끝났을 때 내 피부는?",
    answers: [
      { text: "번들거리고 광이 많이 올라온다", scores: { OIL: 2, ACNE: 1 } },
      { text: "그냥 무난하다", scores: {} },
      { text: "당기고 건조하다", scores: { DRY: 2 } },
      { text: "부위마다 다르다 (T존 번들, U존 건조)", scores: { COMB: 2, OIL: 1, DRY: 1 } },
    ],
  },
  {
    id: 2,
    title: "세안 직후 느낌은?",
    answers: [
      { text: "바로 당겨서 뭘 안 바르면 힘들다", scores: { DRY: 2, SEN: 1 } },
      { text: "산뜻하고 괜찮다", scores: {} },
      { text: "금방 다시 기름이 올라온다", scores: { OIL: 2 } },
      { text: "따갑거나 살짝 붉어진다", scores: { SEN: 2 } },
    ],
  },
  {
    id: 3,
    title: "피부 트러블 패턴은?",
    answers: [
      { text: "자주 올라온다", scores: { ACNE: 2, OIL: 1 } },
      { text: "가끔 난다", scores: { ACNE: 1 } },
      { text: "거의 없다", scores: {} },
      { text: "여드름보다 좁쌀/막힘이 많다", scores: { ACNE: 2, OIL: 1 } },
    ],
  },
  {
    id: 4,
    title: "화장 또는 선크림 유지력은?",
    answers: [
      { text: "금방 무너지고 번들거린다", scores: { OIL: 2 } },
      { text: "꽤 오래 잘 유지된다", scores: {} },
      { text: "들뜨거나 갈라진다", scores: { DRY: 2 } },
      { text: "부위마다 다르게 무너진다", scores: { COMB: 2, OIL: 1, DRY: 1 } },
    ],
  },
  {
    id: 5,
    title: "새로운 화장품을 쓰면?",
    answers: [
      { text: "쉽게 뒤집어지고 트러블이 난다", scores: { SEN: 2, ACNE: 1 } },
      { text: "대부분 문제 없다", scores: {} },
      { text: "따갑거나 붉어지는 경우가 있다", scores: { SEN: 2 } },
      { text: "제품마다 반응이 너무 다르다", scores: { SEN: 1, COMB: 1 } },
    ],
  },
  {
    id: 6,
    title: "겨울이나 건조한 날씨에 내 피부는?",
    answers: [
      { text: "엄청 건조하고 각질이 올라온다", scores: { DRY: 2, SEN: 1 } },
      { text: "조금 건조해진다", scores: { DRY: 1 } },
      { text: "별 차이 없다", scores: {} },
      { text: "그래도 기름은 계속 돈다", scores: { OIL: 2, COMB: 1 } },
    ],
  },
];

// ==================== 결과 데이터 ====================
const resultsData: Record<string, ResultData> = {
  oily_acne: {
    key: "oily_acne",
    name: "지성 + 트러블형",
    description: "피지 분비가 많고 모공이 쉽게 막히는 상태입니다.\n유분이 많아 보이지만, 피부 균형이 무너져 트러블이 자주 발생할 수 있습니다.",
    cautions: [
      "과도한 세안은 오히려 피지 분비를 증가시킬 수 있습니다",
      "무거운 오일/크림 제품은 피하는 것이 좋습니다",
      "모공을 막지 않는 제품 선택이 중요합니다",
    ],
  },
  oily_sensitive: {
    key: "oily_sensitive",
    name: "지성 + 민감형",
    description: "유분은 많지만 피부 장벽이 약해 자극에 쉽게 반응하는 상태입니다.\n겉은 번들거리지만 속은 안정적이지 않은 피부입니다.",
    cautions: [
      "강한 성분(각질 제거, 알코올)은 피하는 것이 좋습니다",
      "자극이 적은 순한 제품 위주로 사용하는 것이 중요합니다",
      "유분 제거에만 집중하면 피부가 더 예민해질 수 있습니다",
    ],
  },
  oily_dehydrated: {
    key: "oily_dehydrated",
    name: "지성 + 속건성",
    description: "겉으로는 유분이 많아 보이지만,\n실제로는 피부 속 수분이 부족한 상태입니다.",
    cautions: [
      "유분만 제거하는 케어는 오히려 악화됩니다",
      "수분 중심 케어가 중요합니다",
      "가벼운 제형의 보습 제품을 충분히 사용하는 것이 좋습니다",
    ],
  },
  dry_sensitive: {
    key: "dry_sensitive",
    name: "건성 + 민감형",
    description: "피부가 쉽게 건조해지고 외부 자극에도 민감하게 반응하는 상태입니다.\n피부 장벽이 약해져 있는 경우가 많습니다.",
    cautions: [
      "세안 후 빠른 보습이 필수입니다",
      "향료나 자극적인 성분은 피하는 것이 좋습니다",
      "피부 장벽을 강화하는 제품을 사용하는 것이 중요합니다",
    ],
  },
  dry_dehydrated: {
    key: "dry_dehydrated",
    name: "건성 + 속건성",
    description: "피부 전체적으로 수분이 부족하고 건조함이 쉽게 느껴지는 상태입니다.\n각질이나 당김이 자주 나타날 수 있습니다.",
    cautions: [
      "단순 오일보다 수분 공급이 우선입니다",
      "장시간 보습 유지가 가능한 제품이 필요합니다",
      "과한 각질 제거는 피하는 것이 좋습니다",
    ],
  },
  combo_acne: {
    key: "combo_acne",
    name: "복합성 + 트러블형",
    description: "부위별로 피부 상태가 다르며,\n특정 부위에서는 트러블이 자주 발생하는 상태입니다.",
    cautions: [
      "얼굴 전체에 동일한 제품을 사용하는 것은 비효율적입니다",
      "부위별로 다른 케어가 필요합니다",
      "모공 막힘을 유발하는 제품은 피하는 것이 좋습니다",
    ],
  },
  combo_sensitive: {
    key: "combo_sensitive",
    name: "복합성 + 민감형",
    description: "부위마다 피부 상태가 다르고,\n전체적으로 자극에도 민감하게 반응하는 상태입니다.",
    cautions: [
      "제품을 여러 개 겹쳐 쓰는 것은 자극이 될 수 있습니다",
      "순하고 안정적인 제품을 사용하는 것이 중요합니다",
      "피부 변화에 따라 케어를 유연하게 조절해야 합니다",
    ],
  },
  sensitive: {
    key: "sensitive",
    name: "민감형 피부",
    description: "외부 환경이나 제품 변화에 쉽게 반응하는 상태입니다.\n피부 장벽이 약해져 있을 가능성이 높습니다.",
    cautions: [
      "새로운 제품은 반드시 테스트 후 사용하는 것이 좋습니다",
      "자극적인 성분은 최대한 피해야 합니다",
      "피부 진정과 장벽 강화에 집중하는 것이 중요합니다",
    ],
  },
  acne: {
    key: "acne",
    name: "트러블 집중형 피부",
    description: "피부 타입과 관계없이 트러블 발생이 잦은 상태입니다.\n피부 밸런스가 불안정할 가능성이 높습니다.",
    cautions: [
      "손으로 얼굴을 자주 만지는 습관은 피해야 합니다",
      "과도한 제품 사용은 오히려 트러블을 악화시킬 수 있습니다",
      "피부를 깨끗하게 유지하는 기본 케어가 중요합니다",
    ],
  },
  balanced: {
    key: "balanced",
    name: "균형형 피부",
    description: "유분과 수분의 균형이 잘 잡혀 있어 비교적 안정적인 상태입니다.\n큰 문제 없이 유지되는 건강한 피부입니다.",
    cautions: [
      "과도한 기능성 제품 사용은 오히려 균형을 무너뜨릴 수 있습니다",
      "현재 루틴을 크게 바꾸지 않는 것이 좋습니다",
      "기본적인 보습과 자외선 차단을 꾸준히 유지하는 것이 중요합니다",
    ],
  },
};

// ==================== 제품 데이터 ====================
const productsByResultKey: Record<string, ProductsByCategory> = {
  oily_acne: {
    serum: [
      { name: "비플레인 시카테롤 앰플", desc: "트러블 진정에 강력한 피토스테롤 성분", priceKRW: 20000, image: "/비플레인 시카테롤앰플.png" },
    ],
    sunscreen: [
      { name: "스킨1004 센텔라 에어핏 선크림", desc: "보송한 무기자차", priceKRW: 10000, image: "/스킨1004 선크림.png" },
    ],
    mask: [
      { name: "파파레서피 가지 머드 마스크", desc: "피지 흡착", priceKRW: 10000, image: "/파파레서피 마스크팩.png" },
    ],
  },
  oily_sensitive: {
    serum: [
      { name: "토리든 히알루론산 세럼", desc: "속수분 채움", priceKRW: 10000, image: "/토리든 다이브인 세럼.png" },
    ],
    sunscreen: [
      { name: "라운드랩 자작나무 선크림", desc: "저자극 수분", priceKRW: 20000, image: "/라운드랩 자작나무 수분선크림.png" },
    ],
    mask: [
      { name: "아누아 어성초 마스크", desc: "진정", priceKRW: 20000, image: "/아누아 어성초 마스크팩.png" },
    ],
  },
  oily_dehydrated: {
    serum: [
      { name: "셀리맥스 노니 앰플", desc: "속당김 해결", priceKRW: 20000, image: "/셀리맥스 노니 에너지 앰플 세럼 .png" },
    ],
    sunscreen: [
      { name: "믹순 병풀 선크림", desc: "수분막 형성", priceKRW: 20000, image: "/믹순 병풀 선크림.png" },
    ],
    mask: [
      { name: "메디힐 워터마이드", desc: "수분 강화", priceKRW: 10000, image: "/메디힐 워터마이드 에센셜 마스크팩.png" },
    ],
  },
  dry_sensitive: {
    serum: [
      { name: "메이크프렘 릴리프 에센스", desc: "저자극 수분 진정", priceKRW: 20000, image: "/메이크프램 세이프 미 릴리프 모이스처 에센스.png" },
    ],
    sunscreen: [
      { name: "달바 에센스 선크림", desc: "촉촉한 에센스 타입", priceKRW: 20000, image: "/달바 워터풀 에센스 선크림.png" },
    ],
    mask: [
      { name: "아비브 밀크 마스크", desc: "영양 보습", priceKRW: 30000, image: "/아비브 껌딱지 시트 마스크 밀크스티커.png" },
    ],
  },
  dry_dehydrated: {
    serum: [
      { name: "허스텔러 세럼", desc: "깊은 수분 공급", priceKRW: 20000, image: "/허스텔러 리틀 드롭스 페이스 세럼.png" },
    ],
    sunscreen: [
      { name: "넘버즈인 1번 선크림", desc: "수분광 피부", priceKRW: 20000, image: "/넘버즈인 1번 청초 진정 맑은 물막 선크림.png" },
    ],
    mask: [
      { name: "시오리스 마스크", desc: "집중 보습", priceKRW: 30000, image: "/시오리스 메이크 잇 브라이트 시트 마스크.png" },
    ],
  },
  combo_acne: {
    serum: [
      { name: "AXIS-Y 다크 스팟 세럼", desc: "트러블 자국 케어", priceKRW: 10000, image: "/다크스팟 글로우 세럼.png" },
    ],
    sunscreen: [
      { name: "헤이네이처 어성초 선크림", desc: "진정 선케어", priceKRW: 20000, image: "/헤이네이처 어성초 선크림.png" },
    ],
    mask: [
      { name: "듀이트리 AC 마스크", desc: "트러블 진정", priceKRW: 20000, image: "/듀이트리 컨트롤 딥 마스크.png" },
    ],
  },
  combo_sensitive: {
    serum: [
      { name: "라운드어라운드 그린티 에센스", desc: "밸런싱 수분 케어", priceKRW: 20000, image: "/라운드어라운드 그린티 약산성 에센스 세럼.png" },
    ],
    sunscreen: [
      { name: "식물나라 수분 선젤", desc: "가벼운 수분감", priceKRW: 10000, image: "/식물나라 산소수 수분 선크림.png" },
    ],
    mask: [
      { name: "스킨푸드 미나리 마스크", desc: "순한 진정", priceKRW: 20000, image: "/스킨푸드 판토테닉 워터 파슬리 마스크.png" },
    ],
  },
  balanced: {
    serum: [
      { name: "마녀공장 비피다 앰플", desc: "피부결 정돈", priceKRW: 30000, image: "/마녀공장 비피다 바이옴 콤플렉스 앰플.png" },
    ],
    sunscreen: [
      { name: "조선미녀 쌀 선크림", desc: "자연스러운 톤업", priceKRW: 10000, image: "/조선미녀 맑은쌀선크림.png" },
    ],
    mask: [
      { name: "땡큐파머 쌀 팩", desc: "윤기 부여", priceKRW: 20000, image: "/땡큐파머 강화 교동 쌀 맑은 팩 .png" },
    ],
  },
  sensitive: {
    serum: [
      { name: "에토스 프로폴리스 앰플", desc: "장벽 강화 진정", priceKRW: 30000, image: "/에토스 프로폴리스 앰플.png" },
    ],
    sunscreen: [
      { name: "닥터올가 선크림", desc: "순한 무기자차", priceKRW: 20000, image: "/닥터올가 프리미엄 썬보호 크림.png" },
    ],
    mask: [
      { name: "리얼베리어 크림 마스크", desc: "장벽 집중 케어", priceKRW: 30000, image: "/리얼 베리어 익스트림 크림 마스크.png" },
    ],
  },
  acne: {
    serum: [
      { name: "아이소이 응급 세럼", desc: "급성 트러블 진정", priceKRW: 20000, image: "/아이소이 응급 진정 세럼.png" },
    ],
    sunscreen: [
      { name: "에이프릴스킨 카로틴 선크림", desc: "진정 선케어", priceKRW: 20000, image: "/에이프릴스킨 카로틴 IPMP 즉각 진정 선크림.png" },
    ],
    mask: [
      { name: "메디힐 티트리 마스크", desc: "트러블 케어", priceKRW: 10000, image: "/메디힐 티트리 에센셜 마스크.png" },
    ],
  },
};

// ==================== 로딩 메시지 ====================
const loadingMessages = [
  "답변해주셔서 감사해요!",
  "당신의 피부 타입을 분석 중이에요!",
  "곧 결과를 알려드릴게요!",
];

// ==================== 결과 판정 함수 ====================
function determineResult(scores: Scores): ResultData {
  const { OIL, DRY, SEN, COMB, ACNE } = scores;

  // 1) 지성 + 트러블형
  if (OIL >= 4 && ACNE >= 4) {
    return resultsData.oily_acne;
  }
  // 2) 지성 + 민감형
  if (OIL >= 4 && SEN >= 4 && DRY <= 3 && ACNE <= 3) {
    return resultsData.oily_sensitive;
  }
  // 3) 지성 + 속건성
  if (DRY >= 4 && OIL >= 2) {
    return resultsData.oily_dehydrated;
  }
  // 4) 건성 + 민감형
  if (DRY >= 4 && SEN >= 4 && OIL <= 3) {
    return resultsData.dry_sensitive;
  }
  // 5) 건성 + 속건성
  if (DRY >= 5 && SEN <= 3 && OIL <= 2) {
    return resultsData.dry_dehydrated;
  }
  // 6) 복합성 + 트러블형
  if (COMB >= 3 && ACNE >= 3) {
    return resultsData.combo_acne;
  }
  // 7) 복합성 + 민감형
  if (COMB >= 3 && SEN >= 3) {
    return resultsData.combo_sensitive;
  }
  // 8) 민감형 피부
  if (SEN >= 4 && OIL <= 2 && DRY <= 3 && COMB <= 2 && ACNE <= 2) {
    return resultsData.sensitive;
  }
  // 9) 트러블 집중형 피부
  if (ACNE >= 3 && OIL <= 2 && COMB <= 2) {
    return resultsData.acne;
  }
  // 10) 균형형 피부 (fallback)
  return resultsData.balanced;
}

// ==================== 탭 라벨 ====================
const categoryLabels: Record<ProductCategory, string> = {
  serum: "세럼",
  sunscreen: "선크림",
  mask: "마스크팩",
};

// ==================== 메인 컴포넌트 ====================
interface SkinTestProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "welcome" | "nationality" | "questions" | "loading" | "result" | "instagram" | "complete";

export default function SkinTest({ isOpen, onClose }: SkinTestProps) {
  // 상태 관리
  const [step, setStep] = useState<Step>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({ OIL: 0, DRY: 0, SEN: 0, COMB: 0, ACNE: 0 });
  const [answerHistory, setAnswerHistory] = useState<number[]>([]);
  const [result, setResult] = useState<ResultData | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("serum");
  const [instagramId, setInstagramId] = useState("");
  const [selectedNationality, setSelectedNationality] = useState<Country | null>(null);
  const [countrySearch, setCountrySearch] = useState("");

  // 국가 검색 필터
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // 환율 변환 함수
  const convertPrice = useCallback(
    (priceKRW: number): string => {
      if (!selectedNationality) return `₩${priceKRW.toLocaleString()}`;
      const converted = priceKRW / selectedNationality.rate;
      return selectedNationality.format(converted);
    },
    [selectedNationality]
  );

  // 초기화
  const resetTest = useCallback(() => {
    setStep("welcome");
    setCurrentQuestion(0);
    setScores({ OIL: 0, DRY: 0, SEN: 0, COMB: 0, ACNE: 0 });
    setAnswerHistory([]);
    setResult(null);
    setLoadingMessageIndex(0);
    setSelectedAnswer(null);
    setSelectedCategory("serum");
    setInstagramId("");
    setSelectedNationality(null);
    setCountrySearch("");
  }, []);

  // 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen) {
      resetTest();
    }
  }, [isOpen, resetTest]);

  // 로딩 애니메이션 (6초 = 2초 x 3단계)
  useEffect(() => {
    if (step === "loading") {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => {
          if (prev >= loadingMessages.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              const finalScores = { ...scores };
              if (finalScores.OIL >= 4 && finalScores.DRY >= 4) {
                finalScores.COMB += 1;
              }
              const determinedResult = determineResult(finalScores);
              setResult(determinedResult);
              setStep("result");
            }, 2000);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [step, scores]);

  // 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 뒤로가기 핸들러
  const handleBack = () => {
    if (step === "nationality") {
      setStep("welcome");
    } else if (step === "questions") {
      if (currentQuestion === 0) {
        setStep("nationality");
      } else {
        // 이전 질문으로 돌아가면서 점수 되돌리기
        const prevAnswerIndex = answerHistory[currentQuestion - 1];
        const prevAnswer = questions[currentQuestion - 1].answers[prevAnswerIndex];

        const newScores = { ...scores };
        if (prevAnswer.scores.OIL) newScores.OIL -= prevAnswer.scores.OIL;
        if (prevAnswer.scores.DRY) newScores.DRY -= prevAnswer.scores.DRY;
        if (prevAnswer.scores.SEN) newScores.SEN -= prevAnswer.scores.SEN;
        if (prevAnswer.scores.COMB) newScores.COMB -= prevAnswer.scores.COMB;
        if (prevAnswer.scores.ACNE) newScores.ACNE -= prevAnswer.scores.ACNE;
        setScores(newScores);

        const newHistory = [...answerHistory];
        newHistory.pop();
        setAnswerHistory(newHistory);

        setCurrentQuestion(currentQuestion - 1);
      }
    }
  };

  // 답변 선택 핸들러
  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const answer = questions[currentQuestion].answers[answerIndex];

    const newScores = { ...scores };
    if (answer.scores.OIL) newScores.OIL += answer.scores.OIL;
    if (answer.scores.DRY) newScores.DRY += answer.scores.DRY;
    if (answer.scores.SEN) newScores.SEN += answer.scores.SEN;
    if (answer.scores.COMB) newScores.COMB += answer.scores.COMB;
    if (answer.scores.ACNE) newScores.ACNE += answer.scores.ACNE;
    setScores(newScores);

    // 답변 기록 저장
    const newHistory = [...answerHistory, answerIndex];
    setAnswerHistory(newHistory);

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStep("loading");
      }
    }, 300);
  };

  // 현재 결과에 해당하는 제품 가져오기
  const currentProducts = result ? productsByResultKey[result.key] : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 skin-test-overlay">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7f3] via-[#f9f9f7] to-[#e8f4ee] skin-test-bg" />

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
        aria-label="닫기"
      >
        <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* 뒤로가기 버튼 (국가 선택, 질문 화면에서만 표시) */}
      {(step === "nationality" || step === "questions") && (
        <button
          onClick={handleBack}
          className="fixed top-4 left-4 z-50 flex items-center gap-1 px-3 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all text-[#6b6b6b] hover:text-[#1a1a1a]"
          aria-label="뒤로가기"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">뒤로</span>
        </button>
      )}

      {/* 콘텐츠 컨테이너 */}
      <div className="relative h-full overflow-y-auto">
        {/* ==================== 웰컴 화면 ==================== */}
        {step === "welcome" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="skin-test-welcome-enter max-w-md w-full text-center">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#3d7a5f] to-[#6aaa8e] flex items-center justify-center shadow-lg shadow-[#3d7a5f]/20">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1a1a1a] mb-4">
                피부 타입 테스트
              </h1>

              <p className="text-[#4a4a4a] mb-4 leading-relaxed">
                6개의 간단한 질문에 답하면<br />
                당신의 피부 타입을 알려드릴게요
              </p>

              <p className="text-sm text-[#6b6b6b] mb-10">
                약 30초 소요
              </p>

              <button
                onClick={() => setStep("nationality")}
                className="w-full bg-[#3d7a5f] text-white py-4 px-8 rounded-full font-semibold text-lg shadow-lg shadow-[#3d7a5f]/25 hover:bg-[#2d6a4f] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                시작하기
              </button>
            </div>
          </div>
        )}

        {/* ==================== 국가 선택 화면 ==================== */}
        {step === "nationality" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="skin-test-question-enter max-w-md w-full">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#3d7a5f] to-[#6aaa8e] flex items-center justify-center shadow-lg shadow-[#3d7a5f]/20 mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1a1a1a] mb-3">
                  어디에서 오셨나요?
                </h1>

                <p className="text-[#6b6b6b] text-sm">
                  추천 제품 가격을 당신의 국가 기준으로 보여드릴게요
                </p>
              </div>

              {/* 검색 입력 */}
              <div className="mb-4">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="국가 검색..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#e8e4de] focus:border-[#3d7a5f] focus:outline-none transition-colors bg-white"
                  />
                </div>
              </div>

              {/* 국가 리스트 */}
              <div className="bg-white rounded-2xl border border-[#e8e4de] overflow-hidden max-h-[320px] overflow-y-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedNationality(country)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-[#f0f0f0] last:border-b-0 ${
                      selectedNationality?.code === country.code
                        ? "bg-[#e8f4ee]"
                        : "hover:bg-[#f9f9f7]"
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <span className="flex-1 font-medium text-[#1a1a1a]">{country.name}</span>
                    <span className="text-sm text-[#6b6b6b]">{country.symbol}</span>
                    {selectedNationality?.code === country.code && (
                      <svg className="w-5 h-5 text-[#3d7a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="px-4 py-8 text-center text-[#6b6b6b]">
                    검색 결과가 없습니다
                  </div>
                )}
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={() => setStep("questions")}
                disabled={!selectedNationality}
                className={`w-full mt-6 py-4 px-8 rounded-full font-semibold text-lg transition-all ${
                  selectedNationality
                    ? "bg-[#3d7a5f] text-white shadow-lg shadow-[#3d7a5f]/25 hover:bg-[#2d6a4f] hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-[#e8e4de] text-[#a0a0a0] cursor-not-allowed"
                }`}
              >
                다음
              </button>
            </div>
          </div>
        )}

        {/* ==================== 질문 화면 ==================== */}
        {step === "questions" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#e8e4de] z-40">
              <div
                className="h-full bg-gradient-to-r from-[#3d7a5f] to-[#6aaa8e] transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div key={currentQuestion} className="skin-test-question-enter max-w-md w-full">
              <div className="text-center mb-6">
                <span className="text-sm text-[#3d7a5f] font-medium">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1a1a1a] text-center mb-8 leading-snug">
                {questions[currentQuestion].title}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`skin-test-answer w-full p-4 sm:p-5 text-left rounded-2xl border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? "border-[#3d7a5f] bg-[#e8f4ee] scale-[0.98]"
                        : "border-[#e8e4de] bg-white hover:border-[#3d7a5f]/50 hover:shadow-md"
                    }`}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="text-[#1a1a1a] font-medium leading-snug">{answer.text}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index < currentQuestion
                        ? "bg-[#3d7a5f]"
                        : index === currentQuestion
                          ? "bg-[#3d7a5f] w-6"
                          : "bg-[#e8e4de]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 로딩 화면 ==================== */}
        {step === "loading" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="skin-test-loading-container max-w-md w-full text-center">
              <div className="relative mb-10">
                <div className="w-32 h-32 mx-auto relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[#e8f4ee]" />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#3d7a5f] animate-spin" style={{ animationDuration: "1.5s" }} />
                  <div className="absolute inset-2 rounded-full bg-[#e8f4ee] animate-pulse" />
                  <div className="absolute inset-4 rounded-full bg-[#d4ebe0] animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#3d7a5f] to-[#6aaa8e] flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-0 left-1/4 w-4 h-4 rounded-full bg-[#3d7a5f]/20 skin-test-bubble-1" />
                <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-[#6aaa8e]/30 skin-test-bubble-2" />
                <div className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-[#3d7a5f]/15 skin-test-bubble-3" />
                <div className="absolute bottom-0 right-1/3 w-3 h-3 rounded-full bg-[#6aaa8e]/25 skin-test-bubble-4" />
                <div className="absolute top-1/3 left-1/6 skin-test-sparkle">✦</div>
                <div className="absolute bottom-1/3 right-1/6 skin-test-sparkle" style={{ animationDelay: "0.5s" }}>✦</div>
              </div>

              <div className="h-16 flex items-center justify-center">
                <p key={loadingMessageIndex} className="text-lg sm:text-xl text-[#1a1a1a] font-medium skin-test-loading-text leading-relaxed">
                  {loadingMessages[loadingMessageIndex]}
                </p>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {loadingMessages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index <= loadingMessageIndex ? "bg-[#3d7a5f] scale-100" : "bg-[#e8e4de] scale-75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 결과 화면 ==================== */}
        {step === "result" && result && (
          <div className="min-h-screen py-16 px-4">
            <div className="max-w-lg mx-auto skin-test-results-enter">
              {/* 상단 배지 */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#e8f4ee] text-[#3d7a5f] px-4 py-2 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  분석 완료
                </div>
              </div>

              {/* 제목 */}
              <h1 className="text-lg text-[#6b6b6b] text-center mb-2">당신의 피부 프로필</h1>

              {/* 결과 카드 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#e8e4de] mb-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1a1a1a] mb-2">
                    {result.name}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#3d7a5f] to-[#6aaa8e] rounded-full mx-auto" />
                </div>

                <p className="text-[#4a4a4a] leading-relaxed whitespace-pre-line text-center mb-6">
                  {result.description}
                </p>

                <div className="border-t border-[#e8e4de] pt-6">
                  <h3 className="text-sm text-[#3d7a5f] font-semibold mb-3 text-center">
                    주의해야 할 점
                  </h3>
                  <ul className="space-y-2">
                    {result.cautions.map((caution, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#4a4a4a] text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e8f4ee] flex items-center justify-center text-xs text-[#3d7a5f] font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{caution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 추천 제품 섹션 */}
              {currentProducts && (
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                      추천 제품
                    </h2>
                    <p className="text-sm text-[#6b6b6b]">
                      당신의 피부 타입에 맞는 제품이에요
                    </p>
                    {selectedNationality && selectedNationality.code !== "KR" && (
                      <p className="text-xs text-[#3d7a5f] mt-1">
                        {selectedNationality.flag} {selectedNationality.name} 기준 가격
                      </p>
                    )}
                  </div>

                  {/* 카테고리 탭 */}
                  <div className="flex gap-2 mb-4 bg-[#f0f7f3] p-1 rounded-xl">
                    {(["serum", "sunscreen", "mask"] as ProductCategory[]).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                          selectedCategory === category
                            ? "bg-white text-[#3d7a5f] shadow-sm"
                            : "text-[#6b6b6b] hover:text-[#3d7a5f]"
                        }`}
                      >
                        {categoryLabels[category]}
                      </button>
                    ))}
                  </div>

                  {/* 제품 카드 */}
                  <div className="space-y-3">
                    {currentProducts[selectedCategory].map((product, index) => (
                      <div
                        key={`${selectedCategory}-${index}`}
                        className="bg-white rounded-2xl p-4 border border-[#e8e4de] shadow-sm"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#f0f7f3] to-[#e8f4ee] overflow-hidden relative">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-1"
                                sizes="64px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#3d7a5f]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#1a1a1a] text-sm mb-1">
                              {product.name}
                            </h3>
                            <p className="text-xs text-[#6b6b6b] mb-2">
                              {product.desc}
                            </p>
                            <p className="text-sm font-bold text-[#3d7a5f]">
                              {convertPrice(product.priceKRW)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA 버튼 */}
              <button
                onClick={() => setStep("instagram")}
                className="w-full bg-[#3d7a5f] text-white py-4 px-6 rounded-full font-semibold text-lg shadow-lg shadow-[#3d7a5f]/25 hover:bg-[#2d6a4f] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                무료 제품 받기
              </button>
            </div>
          </div>
        )}

        {/* ==================== 인스타그램 입력 화면 ==================== */}
        {step === "instagram" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="skin-test-welcome-enter max-w-md w-full text-center">
              {/* 아이콘 */}
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#3d7a5f] to-[#6aaa8e] flex items-center justify-center shadow-lg shadow-[#3d7a5f]/20">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1a1a1a] mb-3">
                무료 제품을 받아보세요
              </h1>

              <p className="text-[#6b6b6b] mb-8">
                당첨 시 연락드릴 인스타 아이디를 입력해주세요
              </p>

              {/* 입력 필드 */}
              <div className="mb-6">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] font-medium">
                    @
                  </span>
                  <input
                    type="text"
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value.replace(/^@/, ""))}
                    placeholder="instagram_id"
                    className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-[#e8e4de] focus:border-[#3d7a5f] focus:outline-none transition-colors bg-white text-lg"
                  />
                </div>
              </div>

              {/* 완료 버튼 */}
              <button
                onClick={() => setStep("complete")}
                disabled={!instagramId.trim()}
                className={`w-full py-4 px-8 rounded-full font-semibold text-lg transition-all ${
                  instagramId.trim()
                    ? "bg-[#3d7a5f] text-white shadow-lg shadow-[#3d7a5f]/25 hover:bg-[#2d6a4f] hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-[#e8e4de] text-[#a0a0a0] cursor-not-allowed opacity-50"
                }`}
              >
                완료하기
              </button>

              {/* 스킵 옵션 */}
              <button
                onClick={onClose}
                className="mt-4 text-sm text-[#6b6b6b] hover:text-[#3d7a5f] transition-colors"
              >
                다음에 할게요
              </button>
            </div>
          </div>
        )}

        {/* ==================== 완료 화면 ==================== */}
        {step === "complete" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="skin-test-welcome-enter max-w-md w-full text-center">
              {/* 체크 아이콘 */}
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#3d7a5f] to-[#6aaa8e] flex items-center justify-center shadow-xl shadow-[#3d7a5f]/30">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1a1a1a] mb-3">
                참여가 완료되었습니다
              </h1>

              <p className="text-[#6b6b6b] mb-2">
                당첨 시 입력하신 인스타로 연락드릴게요
              </p>

              <p className="text-sm text-[#3d7a5f] font-medium mb-10">
                @{instagramId}
              </p>

              {/* 버튼들 */}
              <div className="space-y-3">
                <button
                  onClick={onClose}
                  className="w-full bg-[#3d7a5f] text-white py-4 px-8 rounded-full font-semibold text-lg shadow-lg shadow-[#3d7a5f]/25 hover:bg-[#2d6a4f] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  완료
                </button>
                <button
                  onClick={resetTest}
                  className="w-full bg-white text-[#1a1a1a] py-4 px-8 rounded-full font-semibold border-2 border-[#e8e4de] hover:border-[#3d7a5f] transition-all"
                >
                  다시 테스트하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
