export interface Asset {
  id: string;
  symbol: string;
  nameKo: string;
  nameEn: string;
  category: string;
  currentApy: number; // 대표 APY
  rewardToken: string;
  lockupPeriod: string;
  riskLevel: 'low' | 'medium' | 'high';
  marketCap: number;
  stakingMarketCap: number;
  stakingRatio: number;
  description: string;
  updatedAt: string;
}

export interface Provider {
  id: string;
  name: string;
  type: 'exchange' | 'defi' | 'validator';
  country: string;
  website: string;
  riskLevel: 'low' | 'medium' | 'high';
  feeRate: number;
  description: string;
  safetyScore: number; // 10점 만점
  ismsCertified: boolean;
  updatedAt: string;
}

export interface StakingProduct {
  assetId: string;
  providerId: string;
  apy: number;
  minAmount: number;
  lockupDays: number;
  feeRate: number;
  payoutFrequency: string;
  url: string;
  isSponsored: boolean;
  updatedAt: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

export interface RiskDisclosure {
  id: string;
  title: string;
  summary: string;
  content: string;
  relatedAssets: string[];
}

// 1. 코인 자산 데이터 (Assets)
export const mockAssets: Asset[] = [
  {
    id: "ethereum",
    symbol: "ETH",
    nameKo: "이더리움",
    nameEn: "Ethereum",
    category: "PoS",
    currentApy: 3.4,
    rewardToken: "ETH",
    lockupPeriod: "유동적 (대기열에 따름)",
    riskLevel: "low",
    marketCap: 450000000000,
    stakingMarketCap: 128250000000,
    stakingRatio: 0.285,
    description: "이더리움은 스마트 계약 기능을 탑재한 글로벌 분산 컴퓨팅 플랫폼으로, 가상자산 생태계의 기축통화 역할을 합니다.",
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    id: "solana",
    symbol: "SOL",
    nameKo: "솔라나",
    nameEn: "Solana",
    category: "PoS",
    currentApy: 6.8,
    rewardToken: "SOL",
    lockupPeriod: "3일 (1 에포크)",
    riskLevel: "medium",
    marketCap: 72000000000,
    stakingMarketCap: 49104000000,
    stakingRatio: 0.682,
    description: "솔라나는 고성능 트랜잭션 처리 속도를 자랑하는 레이어 1 블록체인 네트워크입니다.",
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    id: "cosmos",
    symbol: "ATOM",
    nameKo: "코스모스",
    nameEn: "Cosmos",
    category: "PoS",
    currentApy: 14.2,
    rewardToken: "ATOM",
    lockupPeriod: "21일",
    riskLevel: "high",
    marketCap: 4200000000,
    stakingMarketCap: 2688000000,
    stakingRatio: 0.64,
    description: "코스모스는 독립된 여러 블록체인들이 서로 상호작용할 수 있도록 지원하는 인터체인 네트워크입니다.",
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    id: "cardano",
    symbol: "ADA",
    nameKo: "에이다",
    nameEn: "Cardano",
    category: "PoS",
    currentApy: 3.1,
    rewardToken: "ADA",
    lockupPeriod: "없음 (즉시 전송 가능)",
    riskLevel: "low",
    marketCap: 16000000000,
    stakingMarketCap: 10400000000,
    stakingRatio: 0.65,
    description: "에이다는 학술 연구 중심의 동료 평가(Peer-review)를 거쳐 설계된 높은 안전성을 추구하는 블록체인입니다.",
    updatedAt: "2026-06-17T00:00:00Z"
  }
];

// 2. 제공처 데이터 (Providers - 국내 4대 거래소 중심)
export const mockProviders: Provider[] = [
  {
    id: "upbit",
    name: "업비트 (Upbit)",
    type: "exchange",
    country: "대한민국",
    website: "https://upbit.com",
    riskLevel: "low",
    feeRate: 0.10, // 10%
    description: "두나무가 운영하는 대한민국 최대 규모의 가상자산 거래소로, ISMS 인증 및 철저한 보안 체계를 제공합니다.",
    safetyScore: 9.5,
    ismsCertified: true,
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    id: "bithumb",
    name: "빗썸 (Bithumb)",
    type: "exchange",
    country: "대한민국",
    website: "https://bithumb.com",
    riskLevel: "low",
    feeRate: 0.10, // 10%
    description: "국내 최장수 가상자산 거래소 중 하나로, 다양한 코인의 정기 스테이킹 및 간편 예치 서비스를 제공합니다.",
    safetyScore: 9.0,
    ismsCertified: true,
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    id: "coinone",
    name: "코인원 (Coinone)",
    type: "exchange",
    country: "대한민국",
    website: "https://coinone.co.kr",
    riskLevel: "medium",
    feeRate: 0.15, // 15%
    description: "플러스(Plus) 스테이킹 및 데일리 예치 등 간편 위임 투자 상품 개발에 장점을 지닌 대한민국 원화 거래소입니다.",
    safetyScore: 8.5,
    ismsCertified: true,
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    id: "korbit",
    name: "코빗 (Korbit)",
    type: "exchange",
    country: "대한민국",
    website: "https://korbit.co.kr",
    riskLevel: "low",
    feeRate: 0.10, // 10%
    description: "국내 최초의 가상자산 거래소로, 신한은행 실명계좌 연계 및 견고한 컴플라이언스 준수 체계를 구축했습니다.",
    safetyScore: 9.2,
    ismsCertified: true,
    updatedAt: "2026-06-17T00:00:00Z"
  }
];

// 3. 스테이킹 상품 정보 (Staking Products)
export const mockStakingProducts: StakingProduct[] = [
  // 이더리움 (ETH) 상품들
  {
    assetId: "ethereum",
    providerId: "upbit",
    apy: 3.1,
    minAmount: 0.01,
    lockupDays: 0,
    feeRate: 0.10,
    payoutFrequency: "매일",
    url: "https://upbit.com/staking/eth",
    isSponsored: true, // 유료 광고 노출 여부
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    assetId: "ethereum",
    providerId: "bithumb",
    apy: 3.2,
    minAmount: 0.02,
    lockupDays: 0,
    feeRate: 0.10,
    payoutFrequency: "매일",
    url: "https://www.bithumb.com/staking",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    assetId: "ethereum",
    providerId: "coinone",
    apy: 3.4,
    minAmount: 0.01,
    lockupDays: 0,
    feeRate: 0.15,
    payoutFrequency: "매주",
    url: "https://coinone.co.kr/plus",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    assetId: "ethereum",
    providerId: "korbit",
    apy: 3.3,
    minAmount: 0.01,
    lockupDays: 0,
    feeRate: 0.10,
    payoutFrequency: "매주",
    url: "https://korbit.co.kr/staking",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  },

  // 솔라나 (SOL) 상품들
  {
    assetId: "solana",
    providerId: "upbit",
    apy: 6.2,
    minAmount: 0.1,
    lockupDays: 3,
    feeRate: 0.10,
    payoutFrequency: "매주 (에포크 종료 시)",
    url: "https://upbit.com/staking/sol",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    assetId: "solana",
    providerId: "bithumb",
    apy: 6.5,
    minAmount: 0.1,
    lockupDays: 3,
    feeRate: 0.10,
    payoutFrequency: "매일",
    url: "https://www.bithumb.com/staking",
    isSponsored: true, // 유료 광고 노출 여부
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    assetId: "solana",
    providerId: "coinone",
    apy: 6.8,
    minAmount: 0.1,
    lockupDays: 3,
    feeRate: 0.15,
    payoutFrequency: "매주",
    url: "https://coinone.co.kr/plus",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  },

  // 코스모스 (ATOM) 상품들
  {
    assetId: "cosmos",
    providerId: "upbit",
    apy: 13.5,
    minAmount: 0.1,
    lockupDays: 21,
    feeRate: 0.10,
    payoutFrequency: "매주",
    url: "https://upbit.com/staking/atom",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    assetId: "cosmos",
    providerId: "coinone",
    apy: 14.2,
    minAmount: 0.1,
    lockupDays: 21,
    feeRate: 0.15,
    payoutFrequency: "매주",
    url: "https://coinone.co.kr/plus",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  },

  // 에이다 (ADA) 상품들
  {
    assetId: "cardano",
    providerId: "bithumb",
    apy: 3.1,
    minAmount: 1,
    lockupDays: 0,
    feeRate: 0.10,
    payoutFrequency: "매일",
    url: "https://www.bithumb.com/staking",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    assetId: "cardano",
    providerId: "korbit",
    apy: 3.0,
    minAmount: 1,
    lockupDays: 0,
    feeRate: 0.10,
    payoutFrequency: "매주",
    url: "https://korbit.co.kr/staking",
    isSponsored: false,
    updatedAt: "2026-06-17T00:00:00Z"
  }
];

// 4. 가이드글 데이터 (Guides)
export const mockGuides: GuideArticle[] = [
  {
    slug: "what-is-staking",
    title: "가상자산 스테이킹이란 무엇인가요?",
    content: `
### 1. 스테이킹의 정의
스테이킹(Staking)은 지분증명(Proof of Stake, PoS) 합의 알고리즘을 사용하는 블록체인 네트워크에서 가상자산을 검증 노드에 묶어두는(위임하는) 행위를 의미합니다. 

이는 해당 블록체인 네트워크의 무결성을 검증하고 원장 기록을 유지하는 역할을 보조하는 것에 대한 보답으로 신규 발행되는 가상자산 및 네트워크 수수료의 일부를 **스테이킹 보상(리워드)**으로 수령하는 원리입니다.

### 2. 예금과의 차이점
기본적으로 시중 은행의 원화 예적금과 달리 **원금을 보증하지 않으며**, 네트워크 보안 검증에 동참하여 발생하는 프로토콜 기반의 리워드입니다. 따라서 **"이자"가 아니며, "스테이킹 보상률" 혹은 "예상 APY"**로 칭하는 것이 정확합니다.

### 3. 주요 장점
- **보유 자산의 극대화**: 유휴 상태의 가상자산을 보유하는 동안 복리 리워드를 취득하여 보유 개수를 늘릴 수 있습니다.
- **네트워크 기여**: 본인이 믿고 지지하는 블록체인 네트워크의 보안과 탈중앙화에 직접 참여하게 됩니다.
    `,
    seoTitle: "가상자산 스테이킹 입문 가이드 | StakingMax",
    seoDescription: "스테이킹의 기본 정의와 블록체인 네트워크 보상 지급 원리에 대해 쉽게 설명해 드립니다.",
    updatedAt: "2026-06-17T00:00:00Z"
  },
  {
    slug: "staking-risk",
    title: "스테이킹 투자 시 반드시 알아야 할 주요 리스크",
    content: `
### 1. 시세 변동성 리스크 (Market Volatility)
스테이킹 참여 기간 중 코인 개수가 증가하더라도 해당 코인의 원화 가격 자체가 하락할 경우 투자 원금의 심각한 손실이 발생할 수 있습니다. 

### 2. 락업(Lock-up) 및 언스테이킹 지연 리스크
스테이킹된 코인을 회수(Unstaking)하는 데 수일에서 수십일(예: 이더리움은 대기 상황에 따라 상이, 코스모스는 21일)이 소요됩니다. 이 락업 기간 중에는 시장 급변 시 코인을 매도하여 대처하는 것이 불가능합니다.

### 3. 슬래싱(Slashing) 리스크
사용자가 자산을 위임한 검증인(Validator)이 이중 서명을 하거나 오프라인 상태를 오랫동안 방치하면, 네트워크 규정에 의해 검증인의 지분과 위임자의 자산 중 일부가 패널티로 삭감(영구 소실)될 수 있습니다.

### 4. 수탁자(CEX) 리스크
국내외 중앙화 거래소를 통해 스테이킹 서비스를 이용할 경우, 해당 기업의 해킹, 유동성 위기, 혹은 영업정지 등으로 인해 자산 출금이 전면 차단될 위험이 잠재해 있습니다.
    `,
    seoTitle: "가상자산 스테이킹 리스크 가이드 | StakingMax",
    seoDescription: "락업 기간, 슬래싱, 시세 변동, 수탁인 파산 리스크 등 스테이킹 참여 전 반드시 알아야 할 위험을 경고합니다.",
    updatedAt: "2026-06-17T00:00:00Z"
  }
];

// 5. 정밀 리스크 고지 데이터 (Risk Disclosures)
export const mockRiskDisclosures: RiskDisclosure[] = [
  {
    id: "volatility",
    title: "가상자산의 가격 변동 리스크",
    summary: "가상자산은 단기간에 심각한 가격 등락을 보이며, 획득한 보상 가치가 가격 하락분보다 작을 수 있습니다.",
    content: "스테이킹 리워드로 확보하는 코인의 수량이 늘어나더라도, 시장 하락 시 원화 가치 기준 투자 평가 금액은 크게 감소할 수 있어 실질적 원금 손실이 동반될 수 있습니다.",
    relatedAssets: ["ethereum", "solana", "cosmos", "cardano"]
  },
  {
    id: "lockup",
    title: "해제 대기 기간(Lock-up) 리스크",
    summary: "스테이킹을 해제하여 거래 가능한 자산으로 전환할 때까지 일정 대기 기간(예: 3일~21일) 동안 매도가 금지됩니다.",
    content: "언스테이킹 대기 기간 중에는 급격한 시세 하락세가 지속되더라도 해당 가상자산을 거래소로 즉시 전송하거나 청산하는 대응이 불가능하므로 사전에 락업 해제 지연 조건을 필히 숙지해야 합니다.",
    relatedAssets: ["solana", "cosmos"]
  },
  {
    id: "slashing",
    title: "온체인 삭감(Slashing) 및 검증인 위험",
    summary: "네트워크 규칙 위반이나 장애 발생 시 지분 일부가 영구 삭감되어 소실될 위험이 존재합니다.",
    content: "위임한 노드(Validator)의 보안 사고, 고장, 또는 합의 규칙의 오작동 등으로 인해 스테이킹했던 자산의 일정 비율이 영구 차압당할 수 있으며, 이 손실은 프로토콜 수준에서 결정되어 위임자에게 전가됩니다.",
    relatedAssets: ["ethereum", "solana", "cosmos"]
  }
];
