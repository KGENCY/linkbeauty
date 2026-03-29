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

// ==================== 환율 데이터 ====================
interface CurrencyInfo {
  symbol: string;
  rate: number; // KRW 기준 환율 (1 외화 = X KRW)
  code: string;
  format: (amount: number) => string;
}

const currencyByCountry: Record<string, CurrencyInfo> = {
  // 아시아
  KR: { symbol: "₩", rate: 1, code: "KRW", format: (n) => `₩${n.toLocaleString()}` },
  JP: { symbol: "¥", rate: 10, code: "JPY", format: (n) => `¥${Math.round(n).toLocaleString()}` },
  CN: { symbol: "¥", rate: 190, code: "CNY", format: (n) => `¥${n.toFixed(0)}` },
  TW: { symbol: "NT$", rate: 42, code: "TWD", format: (n) => `NT$${Math.round(n).toLocaleString()}` },
  HK: { symbol: "HK$", rate: 170, code: "HKD", format: (n) => `HK$${n.toFixed(0)}` },
  TH: { symbol: "฿", rate: 38, code: "THB", format: (n) => `฿${Math.round(n).toLocaleString()}` },
  VN: { symbol: "₫", rate: 0.054, code: "VND", format: (n) => `${Math.round(n).toLocaleString()}₫` },
  ID: { symbol: "Rp", rate: 0.085, code: "IDR", format: (n) => `Rp${Math.round(n).toLocaleString()}` },
  PH: { symbol: "₱", rate: 24, code: "PHP", format: (n) => `₱${Math.round(n).toLocaleString()}` },
  MY: { symbol: "RM", rate: 290, code: "MYR", format: (n) => `RM${n.toFixed(0)}` },
  SG: { symbol: "S$", rate: 980, code: "SGD", format: (n) => `S$${n.toFixed(2)}` },
  IN: { symbol: "₹", rate: 16, code: "INR", format: (n) => `₹${Math.round(n).toLocaleString()}` },

  // 북미/오세아니아
  US: { symbol: "$", rate: 1300, code: "USD", format: (n) => `$${n.toFixed(2)}` },
  CA: { symbol: "C$", rate: 970, code: "CAD", format: (n) => `C$${n.toFixed(2)}` },
  AU: { symbol: "A$", rate: 860, code: "AUD", format: (n) => `A$${n.toFixed(2)}` },
  NZ: { symbol: "NZ$", rate: 800, code: "NZD", format: (n) => `NZ$${n.toFixed(2)}` },

  // 유럽
  GB: { symbol: "£", rate: 1650, code: "GBP", format: (n) => `£${n.toFixed(2)}` },
  DE: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  FR: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  IT: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  ES: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  NL: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  BE: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  AT: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  PT: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  GR: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  IE: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  FI: { symbol: "€", rate: 1420, code: "EUR", format: (n) => `€${n.toFixed(2)}` },
  CH: { symbol: "CHF", rate: 1480, code: "CHF", format: (n) => `CHF ${n.toFixed(2)}` },
  SE: { symbol: "kr", rate: 125, code: "SEK", format: (n) => `${Math.round(n)} kr` },
  NO: { symbol: "kr", rate: 120, code: "NOK", format: (n) => `${Math.round(n)} kr` },
  DK: { symbol: "kr", rate: 190, code: "DKK", format: (n) => `${Math.round(n)} kr` },
  PL: { symbol: "zł", rate: 330, code: "PLN", format: (n) => `${n.toFixed(0)} zł` },
  CZ: { symbol: "Kč", rate: 57, code: "CZK", format: (n) => `${Math.round(n)} Kč` },
  HU: { symbol: "Ft", rate: 3.6, code: "HUF", format: (n) => `${Math.round(n).toLocaleString()} Ft` },
  RO: { symbol: "lei", rate: 285, code: "RON", format: (n) => `${n.toFixed(0)} lei` },

  // 기타
  RU: { symbol: "₽", rate: 14.5, code: "RUB", format: (n) => `${Math.round(n).toLocaleString()} ₽` },
  UA: { symbol: "₴", rate: 35, code: "UAH", format: (n) => `${Math.round(n)} ₴` },
  TR: { symbol: "₺", rate: 40, code: "TRY", format: (n) => `${n.toFixed(0)} ₺` },
  IL: { symbol: "₪", rate: 360, code: "ILS", format: (n) => `₪${n.toFixed(0)}` },
  SA: { symbol: "﷼", rate: 347, code: "SAR", format: (n) => `${n.toFixed(0)} ﷼` },
  AE: { symbol: "د.إ", rate: 354, code: "AED", format: (n) => `${n.toFixed(0)} د.إ` },
  BR: { symbol: "R$", rate: 265, code: "BRL", format: (n) => `R$${n.toFixed(2)}` },
  MX: { symbol: "$", rate: 76, code: "MXN", format: (n) => `$${n.toFixed(0)} MXN` },
  AR: { symbol: "$", rate: 1.5, code: "ARS", format: (n) => `$${Math.round(n).toLocaleString()} ARS` },
  CL: { symbol: "$", rate: 1.4, code: "CLP", format: (n) => `$${Math.round(n).toLocaleString()} CLP` },
  CO: { symbol: "$", rate: 0.33, code: "COP", format: (n) => `$${Math.round(n).toLocaleString()} COP` },
  PE: { symbol: "S/", rate: 350, code: "PEN", format: (n) => `S/${n.toFixed(0)}` },
  ZA: { symbol: "R", rate: 72, code: "ZAR", format: (n) => `R${n.toFixed(0)}` },
  EG: { symbol: "E£", rate: 27, code: "EGP", format: (n) => `E£${Math.round(n)}` },
  NG: { symbol: "₦", rate: 0.87, code: "NGN", format: (n) => `₦${Math.round(n).toLocaleString()}` },
  KE: { symbol: "KSh", rate: 10, code: "KES", format: (n) => `KSh${Math.round(n).toLocaleString()}` },
  PK: { symbol: "Rs", rate: 4.7, code: "PKR", format: (n) => `Rs${Math.round(n).toLocaleString()}` },
  BD: { symbol: "৳", rate: 12, code: "BDT", format: (n) => `৳${Math.round(n).toLocaleString()}` },
  MM: { symbol: "K", rate: 0.62, code: "MMK", format: (n) => `${Math.round(n).toLocaleString()} K` },
  KH: { symbol: "$", rate: 0.32, code: "KHR", format: (n) => `$${(n / 4100).toFixed(2)}` },
  LA: { symbol: "₭", rate: 0.065, code: "LAK", format: (n) => `${Math.round(n).toLocaleString()} ₭` },
  MO: { symbol: "MOP$", rate: 162, code: "MOP", format: (n) => `MOP$${n.toFixed(0)}` },
};

// 기본 환율 (매핑되지 않은 국가용)
const defaultCurrency: CurrencyInfo = { symbol: "$", rate: 1300, code: "USD", format: (n) => `$${n.toFixed(2)}` };

// 가격 변환 함수
function convertPrice(priceKRW: number, countryCode: string | null): string {
  const currency = countryCode ? currencyByCountry[countryCode] || defaultCurrency : defaultCurrency;
  const convertedPrice = priceKRW / currency.rate;
  return currency.format(convertedPrice);
}

// ==================== 국가 데이터 ====================
const popularCountries = [
  { code: "US", name: "미국", flag: "🇺🇸" },
  { code: "JP", name: "일본", flag: "🇯🇵" },
  { code: "CN", name: "중국", flag: "🇨🇳" },
  { code: "TW", name: "대만", flag: "🇹🇼" },
  { code: "TH", name: "태국", flag: "🇹🇭" },
  { code: "VN", name: "베트남", flag: "🇻🇳" },
  { code: "ID", name: "인도네시아", flag: "🇮🇩" },
  { code: "PH", name: "필리핀", flag: "🇵🇭" },
  { code: "MY", name: "말레이시아", flag: "🇲🇾" },
  { code: "SG", name: "싱가포르", flag: "🇸🇬" },
  { code: "AU", name: "호주", flag: "🇦🇺" },
  { code: "CA", name: "캐나다", flag: "🇨🇦" },
  { code: "GB", name: "영국", flag: "🇬🇧" },
  { code: "DE", name: "독일", flag: "🇩🇪" },
  { code: "FR", name: "프랑스", flag: "🇫🇷" },
];

const allCountries = [
  ...popularCountries,
  { code: "KR", name: "한국", flag: "🇰🇷" },
  { code: "IN", name: "인도", flag: "🇮🇳" },
  { code: "BR", name: "브라질", flag: "🇧🇷" },
  { code: "MX", name: "멕시코", flag: "🇲🇽" },
  { code: "ES", name: "스페인", flag: "🇪🇸" },
  { code: "IT", name: "이탈리아", flag: "🇮🇹" },
  { code: "NL", name: "네덜란드", flag: "🇳🇱" },
  { code: "SE", name: "스웨덴", flag: "🇸🇪" },
  { code: "NO", name: "노르웨이", flag: "🇳🇴" },
  { code: "DK", name: "덴마크", flag: "🇩🇰" },
  { code: "FI", name: "핀란드", flag: "🇫🇮" },
  { code: "CH", name: "스위스", flag: "🇨🇭" },
  { code: "AT", name: "오스트리아", flag: "🇦🇹" },
  { code: "BE", name: "벨기에", flag: "🇧🇪" },
  { code: "PL", name: "폴란드", flag: "🇵🇱" },
  { code: "RU", name: "러시아", flag: "🇷🇺" },
  { code: "UA", name: "우크라이나", flag: "🇺🇦" },
  { code: "TR", name: "튀르키예", flag: "🇹🇷" },
  { code: "SA", name: "사우디아라비아", flag: "🇸🇦" },
  { code: "AE", name: "아랍에미리트", flag: "🇦🇪" },
  { code: "NZ", name: "뉴질랜드", flag: "🇳🇿" },
  { code: "ZA", name: "남아프리카공화국", flag: "🇿🇦" },
  { code: "AR", name: "아르헨티나", flag: "🇦🇷" },
  { code: "CL", name: "칠레", flag: "🇨🇱" },
  { code: "CO", name: "콜롬비아", flag: "🇨🇴" },
  { code: "PE", name: "페루", flag: "🇵🇪" },
  { code: "EG", name: "이집트", flag: "🇪🇬" },
  { code: "NG", name: "나이지리아", flag: "🇳🇬" },
  { code: "KE", name: "케냐", flag: "🇰🇪" },
  { code: "PK", name: "파키스탄", flag: "🇵🇰" },
  { code: "BD", name: "방글라데시", flag: "🇧🇩" },
  { code: "MM", name: "미얀마", flag: "🇲🇲" },
  { code: "KH", name: "캄보디아", flag: "🇰🇭" },
  { code: "LA", name: "라오스", flag: "🇱🇦" },
  { code: "HK", name: "홍콩", flag: "🇭🇰" },
  { code: "MO", name: "마카오", flag: "🇲🇴" },
  { code: "PT", name: "포르투갈", flag: "🇵🇹" },
  { code: "GR", name: "그리스", flag: "🇬🇷" },
  { code: "CZ", name: "체코", flag: "🇨🇿" },
  { code: "HU", name: "헝가리", flag: "🇭🇺" },
  { code: "RO", name: "루마니아", flag: "🇷🇴" },
  { code: "IL", name: "이스라엘", flag: "🇮🇱" },
  { code: "IE", name: "아일랜드", flag: "🇮🇪" },
];

// ==================== 로딩 메시지 ====================
const loadingMessages = [
  "답변해주셔서 감사해요!",
  "당신의 피부 타입을 분석 중이에요!",
  "곧 당신의 피부 타입과 꼭 맞는 K-뷰티 제품까지 알려줄게요!",
];

// ==================== 결과 판정 함수 ====================
function determineResult(scores: Scores): ResultData {
  const { OIL, DRY, SEN, COMB, ACNE } = scores;

  // 우선순위 순서대로 체크
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

type Step = "welcome" | "nationality" | "questions" | "loading" | "result";

export default function SkinTest({ isOpen, onClose }: SkinTestProps) {
  // 상태 관리
  const [step, setStep] = useState<Step>("welcome");
  const [selectedNationality, setSelectedNationality] = useState<string | null>(null);
  const [nationalitySearch, setNationalitySearch] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({ OIL: 0, DRY: 0, SEN: 0, COMB: 0, ACNE: 0 });
  const [result, setResult] = useState<ResultData | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("serum");

  // 초기화
  const resetTest = useCallback(() => {
    setStep("welcome");
    setSelectedNationality(null);
    setNationalitySearch("");
    setCurrentQuestion(0);
    setScores({ OIL: 0, DRY: 0, SEN: 0, COMB: 0, ACNE: 0 });
    setResult(null);
    setLoadingMessageIndex(0);
    setSelectedAnswer(null);
    setSelectedCategory("serum");
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

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStep("loading");
      }
    }, 300);
  };

  // 국가 필터링
  const filteredCountries = nationalitySearch
    ? allCountries.filter(
        (c) =>
          c.name.toLowerCase().includes(nationalitySearch.toLowerCase()) ||
          c.code.toLowerCase().includes(nationalitySearch.toLowerCase())
      )
    : popularCountries;

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
                피부 타입 매칭 테스트
              </h1>

              <p className="text-[#4a4a4a] mb-4 leading-relaxed">
                몇 가지 간단한 질문에 답하면<br />
                당신의 피부 성향에 맞는<br />
                K-뷰티 제품 방향을 찾아드릴게요.
              </p>

              <p className="text-sm text-[#6b6b6b] mb-10 bg-[#f0f7f3] rounded-2xl px-4 py-3">
                피부 지식이 없어도 괜찮아요.<br />
                평소 피부가 어떻게 느껴지는지만 답해주면 됩니다.
              </p>

              <button
                onClick={() => setStep("nationality")}
                className="w-full bg-[#3d7a5f] text-white py-4 px-8 rounded-full font-semibold text-lg shadow-lg shadow-[#3d7a5f]/25 hover:bg-[#2d6a4f] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                테스트 시작하기
              </button>
            </div>
          </div>
        )}

        {/* ==================== 국적 선택 화면 ==================== */}
        {step === "nationality" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="skin-test-question-enter max-w-md w-full">
              <div className="mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-sm text-[#3d7a5f] font-medium">Step 1 / 7</span>
                </div>
                <div className="h-1.5 bg-[#e8e4de] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3d7a5f] to-[#6aaa8e] rounded-full transition-all duration-500" style={{ width: `${(1 / 7) * 100}%` }} />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1a1a1a] text-center mb-2">
                어디에서 오셨나요?
              </h2>
              <p className="text-sm text-[#6b6b6b] text-center mb-6">
                이 정보는 나중에 더 잘 맞는 제품과<br />
                크리에이터를 추천하는 데 활용돼요.
              </p>

              <div className="relative mb-4">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="국가 검색..."
                  value={nationalitySearch}
                  onChange={(e) => setNationalitySearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-[#e8e4de] focus:border-[#3d7a5f] focus:outline-none transition-colors bg-white"
                />
              </div>

              <div className="bg-white rounded-3xl border border-[#e8e4de] shadow-sm overflow-hidden mb-6 max-h-[300px] overflow-y-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedNationality(country.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f9f9f7] transition-colors border-b border-[#f0f0ee] last:border-b-0 ${
                      selectedNationality === country.code ? "bg-[#e8f4ee]" : ""
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-[#1a1a1a] font-medium">{country.name}</span>
                    {selectedNationality === country.code && (
                      <svg className="w-5 h-5 text-[#3d7a5f] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

              <button
                onClick={() => setStep("questions")}
                disabled={!selectedNationality}
                className={`w-full py-4 px-8 rounded-full font-semibold text-lg transition-all ${
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
                style={{ width: `${((currentQuestion + 2) / 7) * 100}%` }}
              />
            </div>

            <div key={currentQuestion} className="skin-test-question-enter max-w-md w-full">
              <div className="text-center mb-6">
                <span className="text-sm text-[#3d7a5f] font-medium">
                  Step {currentQuestion + 2} / 7
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#e8f4ee] text-[#3d7a5f] font-bold">
                  Q{currentQuestion + 1}
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
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f9f9f7] flex items-center justify-center text-sm font-bold text-[#6b6b6b]">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-[#1a1a1a] font-medium leading-snug">{answer.text}</span>
                    </div>
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

              <div className="h-20 flex items-center justify-center">
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

              <div className="mt-8 max-w-xs mx-auto">
                <div className="h-2 bg-[#e8e4de] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3d7a5f] to-[#6aaa8e] rounded-full transition-all duration-[2000ms] ease-linear"
                    style={{ width: `${((loadingMessageIndex + 1) / loadingMessages.length) * 100}%` }}
                  />
                </div>
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

                <div className="mb-6">
                  <h3 className="text-sm text-[#3d7a5f] font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    설명
                  </h3>
                  <p className="text-[#4a4a4a] leading-relaxed whitespace-pre-line">
                    {result.description}
                  </p>
                </div>

                <div className="border-t border-[#e8e4de] my-6" />

                <div>
                  <h3 className="text-sm text-[#3d7a5f] font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    주의해야 할 점
                  </h3>
                  <ul className="space-y-2">
                    {result.cautions.map((caution, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#4a4a4a]">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e8f4ee] flex items-center justify-center text-xs text-[#3d7a5f] font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{caution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ==================== 추천 제품 섹션 ==================== */}
              {currentProducts && (
                <div className="mb-6 skin-test-products-enter">
                  {/* 섹션 헤더 */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1a1a1a] mb-2">
                      당신에게 딱 맞는 K-뷰티 제품
                    </h2>
                    <p className="text-sm text-[#6b6b6b]">
                      당신의 피부 타입에 맞춰 선별된 제품이에요
                    </p>
                  </div>

                  {/* 카테고리 탭 */}
                  <div className="flex gap-2 mb-6 bg-[#f0f7f3] p-1.5 rounded-2xl">
                    {(["serum", "sunscreen", "mask"] as ProductCategory[]).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                          selectedCategory === category
                            ? "bg-white text-[#3d7a5f] shadow-md"
                            : "text-[#6b6b6b] hover:text-[#3d7a5f]"
                        }`}
                      >
                        {categoryLabels[category]}
                      </button>
                    ))}
                  </div>

                  {/* 제품 리스트 */}
                  <div className="space-y-4">
                    {currentProducts[selectedCategory].map((product, index) => (
                      <div
                        key={`${selectedCategory}-${index}`}
                        className="skin-test-product-card bg-white rounded-2xl p-4 border border-[#e8e4de] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          {/* 제품 이미지 */}
                          <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-[#f0f7f3] to-[#e8f4ee] overflow-hidden relative">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-1"
                                sizes="(max-width: 640px) 80px, 96px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#3d7a5f]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* 제품 정보 */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#1a1a1a] mb-1 leading-snug">
                              {product.name}
                            </h3>
                            <p className="text-sm text-[#6b6b6b] mb-2 line-clamp-1">
                              {product.desc}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-[#3d7a5f]">
                                {convertPrice(product.priceKRW, selectedNationality)}
                              </span>
                              {/* 구매 버튼 자리 (추후 확장용) */}
                              <button
                                disabled
                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#e8e4de] text-[#a0a0a0] cursor-not-allowed"
                              >
                                곧 오픈
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 추가 안내 */}
                  <p className="text-center text-xs text-[#6b6b6b] mt-4">
                    💡 더 많은 추천 제품이 곧 추가될 예정이에요
                  </p>
                </div>
              )}

              {/* CTA 버튼들 */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    // 추후 제품 추천 페이지로 연결
                  }}
                  className="w-full bg-[#3d7a5f] text-white py-4 px-6 rounded-full font-semibold text-lg shadow-lg shadow-[#3d7a5f]/25 hover:bg-[#2d6a4f] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  나에게 맞는 제품 보기
                </button>
                <button
                  onClick={resetTest}
                  className="w-full bg-white text-[#1a1a1a] py-4 px-6 rounded-full font-semibold border-2 border-[#e8e4de] hover:border-[#3d7a5f] transition-all"
                >
                  다시 테스트하기
                </button>
              </div>

              {/* 결과 키 (개발용) */}
              <p className="text-center text-xs text-[#a0a0a0] mt-6">
                결과 키: <span className="font-mono">{result.key}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
