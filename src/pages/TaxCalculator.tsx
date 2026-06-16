import { useState } from 'react';
import { ShieldAlert, Award, Calculator } from 'lucide-react';
import SEO from '../components/SEO';

export default function TaxCalculator() {
  const [revenueKrw, setRevenueKrw] = useState<number>(5000000); // 500만원 디폴트
  const [deductionLimit, setDeductionLimit] = useState<number>(2500000); // 250만원 기본 공제액

  // 과세표준 = 연간수익 - 공제액 (0 이하인 경우 0)
  const taxableIncome = Math.max(0, revenueKrw - deductionLimit);
  // 세율 22% (지방소득세 2% 포함)
  const taxRate = 0.22;
  const estimatedTax = taxableIncome * taxRate;
  const netRevenue = revenueKrw - estimatedTax;

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title="2027년 개정안 기준 가상자산 세금 시뮬레이터 | StakingMax" 
        description="2027년 시행 예정인 대한민국 가상자산 과세 요건에 따라, 가상자산 스테이킹 리워드 및 매매 소득 발생 시 납부할 세금과 세후 실질 수익률을 모의 계산해 보세요."
      />

      <section style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>가상자산 세금 계산기 (2027년 대비)</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
          가상자산 과세 법안을 근거로 가상자산 소득세율(지방세 포함 22%)을 선반영한 가상 과세 시뮬레이션을 제공합니다.
        </p>
      </section>

      {/* Calculator Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        
        {/* Parameters Form */}
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator style={{ color: 'var(--primary)' }} /> 세제 변수 설정
          </h3>

          {/* Revenue Input */}
          <div className="form-group">
            <label className="form-label">연간 가상자산 예상 소득 (원화 환산 KRW)</label>
            <input 
              type="number" 
              className="form-input" 
              value={revenueKrw}
              min={0}
              step={100000}
              onChange={(e) => setRevenueKrw(Number(e.target.value))}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              * 스테이킹 보상 취득액 및 가상자산 매매 차익금의 연간 총합
            </span>
          </div>

          {/* Deduction Limit Options */}
          <div className="form-group">
            <label className="form-label">기본 소득 공제액 기준</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                <input 
                  type="radio" 
                  checked={deductionLimit === 2500000}
                  onChange={() => setDeductionLimit(2500000)}
                />
                250만 원 공제 (현행 기본 개정안)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                <input 
                  type="radio" 
                  checked={deductionLimit === 50000000}
                  onChange={() => setDeductionLimit(50000000)}
                />
                5,000만 원 공제 (금융투자소득세 완화 준용 한도)
              </label>
            </div>
          </div>
        </div>

        {/* Tax Results Display */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--danger)' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award style={{ color: 'var(--danger)' }} /> 세후 실질 소득 예측
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>총 신고 대상 금액</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--sans-outfit)' }}>
                  {revenueKrw.toLocaleString()} 원
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>기본 공제액 차감</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--sans-outfit)' }}>
                  - {deductionLimit.toLocaleString()} 원
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>과세 표준 금액</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--sans-outfit)' }}>
                  {taxableIncome.toLocaleString()} 원
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>예상 납부 세액 (소득세 20% + 지방세 2%)</span>
                <span style={{ fontWeight: 700, color: 'var(--danger)', fontFamily: 'var(--sans-outfit)' }}>
                  {estimatedTax.toLocaleString()} 원
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>세후 실질 순수익</span>
                <span style={{ fontWeight: 800, fontSize: '20px', color: 'var(--secondary)', fontFamily: 'var(--sans-outfit)' }}>
                  {netRevenue.toLocaleString()} 원
                </span>
              </div>

            </div>
          </div>

          <div style={{ marginTop: '24px', fontSize: '11px', color: 'var(--text-muted)' }}>
            * 본 계산은 법 개정 유예 및 조세 특례 한도 규정에 따라 법 개정 시점의 실제 납세액과 상이할 수 있으므로, 단순 투자 참고용 시뮬레이션 지표로만 활용해 주십시오.
          </div>
        </div>

      </section>

      {/* Tax Advisory Notice Box */}
      <section className="alert-box" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <ShieldAlert style={{ color: 'var(--accent)', flexShrink: 0, width: '24px', height: '24px', marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>세무 신고 책임 고지 (투자 권유 아님)</strong>
          본 가상자산 세금 계산 시뮬레이션은 관계 법령 해석의 불확실성을 포함하고 있습니다. 가상자산 취득 가액 증빙 방식 및 납세 신고 절차는 국세청 고시안 및 세무 대리인을 통해 정식으로 검증하셔야 하며, 당사는 계산 결과의 부정확성에 대하여 어떠한 법적 손해배상 책임도 지지 않습니다.
        </div>
      </section>
    </div>
  );
}
