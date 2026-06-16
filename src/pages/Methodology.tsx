import { Shield, Eye, Calendar, Award, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function Methodology() {
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title="데이터 검증 기준 및 스폰서 정책 | StakingMax" 
        description="StakingMax의 스테이킹 보상률(APY) 데이터 검증 방식, 거래소 신뢰 평가 점수 산정 방법론 및 유료 광고 상품 노출 기준을 상세 투명하게 고지합니다."
      />

      <section style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>데이터 방법론 및 광고 정책</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
          StakingMax는 왜곡 없는 정보 제공과 투명한 상업적 운영을 위해 자산 분석 표준 지표 및 제휴 정책을 공개합니다.
        </p>
      </section>

      {/* Grid of standards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* APY Calculation */}
        <div className="card">
          <Award style={{ color: 'var(--secondary)', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>APY 데이터 산정 기준</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            각 거래소 및 온체인 프로토콜이 제시하는 기본 연 보상률에서, 운영 주체가 공제하는 수수료율(Fee Rate)을 감안한 실질 보상 비율을 역산합니다. 단, 네트워크 트래픽 등락에 따라 실제 수령 보상은 실시간으로 변동되므로 <strong>"변동 가능"</strong> 조건이 기본 수반됩니다.
          </p>
        </div>

        {/* Safety Score Calculation */}
        <div className="card">
          <Shield style={{ color: 'var(--primary)', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>제공업체 신뢰도 점수 기준</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            가상자산사업자(VASP) 신고 취득 여부, ISMS(정보보호관리체계) 획득 여부, 자산 커스터디 사고 유무, 국내 실명계좌 연계 여부 및 자본금 건전성 총 5대 축을 바탕으로 리서치 팀이 10점 만점 단위로 월간 갱신 평가합니다.
          </p>
        </div>

        {/* Risk Level Criteria */}
        <div className="card">
          <Shield style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>리스크 레벨 기준</h4>
          <ul style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, paddingLeft: '20px', margin: 0 }}>
            <li><strong>낮음 (Low)</strong>: 원화 신뢰 계좌 연계 대형 CEX 및 대형 온체인 연동</li>
            <li><strong>중간 (Medium)</strong>: 중소형 원화 거래소 또는 유동성 락업 해제 지연이 있는 자산</li>
            <li><strong>높음 (High)</strong>: 락업 해제 대기 20일 초과 자산 또는 역사적 슬래싱 이력이 있는 노드</li>
          </ul>
        </div>

        {/* Sponsored Policy */}
        <div className="card">
          <Eye style={{ color: '#a855f7', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>스폰서 노출 및 광고 정책</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            수익 다각화를 위해 일부 배너 노출, 제휴 링크 연결, 혹은 특정 거래소 제휴 프로필 등록 등의 광고 상품을 제공합니다. 사용자의 오인을 차단하기 위해 유료 계약에 기반한 노출은 테이블 상에서 보라색 <strong>"AD/스폰서"</strong> 또는 <strong>"추천"</strong> 배지를 명확히 표시하여 일반 정렬 순위와 엄밀하게 구별합니다.
          </p>
        </div>

      </section>

      {/* Update Frequency & Reporting Error */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <Calendar style={{ color: 'var(--primary)', flexShrink: 0, width: '24px', height: '24px' }} />
          <div>
            <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 600 }}>데이터 업데이트 주기</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
              비교 테이블 데이터는 매일 오전 9시 기준 자동/반자동 갱신되며, 특이 시장 동향 발생 시 비정기 수동 업데이트를 병행하여 가격 등락의 불일치를 최소화합니다.
            </p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <Mail style={{ color: 'var(--secondary)', flexShrink: 0, width: '24px', height: '24px' }} />
          <div>
            <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 600 }}>정보 오류 제보 방법</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
              제시된 수수료율이나 사이트 가입 링크 등 기재 오류를 발견하셨다면 리서치 파트 이메일(<strong>contact@stakingmax.com</strong>)로 제보 부탁드립니다. 영업일 기준 24시간 이내 검증 후 정정하겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Footnote Compliance Banner */}
      <section className="alert-box">
        <strong>법적 책임 부인</strong>: StakingMax는 어떠한 가상자산 위탁 거래도 직접 중개하거나 금전을 수령하지 않습니다. 당사에서 가공하여 고시하는 평점과 광고성 플레스먼트는 해당 가상자산사업자의 신인도를 완벽히 보증하지 못하므로, 본인 판단하에 투자 리스크를 철저히 검토하시기 바랍니다.
      </section>
    </div>
  );
}
