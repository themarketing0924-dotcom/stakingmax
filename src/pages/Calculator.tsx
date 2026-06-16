import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockAssets } from '../data/mockData';
import { Calculator as CalcIcon, Percent, AlertTriangle, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function Calculator() {
  const [searchParams] = useSearchParams();
  const initialCoin = searchParams.get('coin') || 'ethereum';

  const [selectedCoinId, setSelectedCoinId] = useState(initialCoin);
  const [amount, setAmount] = useState<number>(10);
  const [customApy, setCustomApy] = useState<number>(3.4);
  const [useAutoApy, setUseAutoApy] = useState(true);

  const selectedCoin = mockAssets.find(a => a.id === selectedCoinId) || mockAssets[0];

  // 코인 선택 변경 시 해당 코인의 대표 APY로 갱신
  useEffect(() => {
    if (useAutoApy && selectedCoin) {
      setCustomApy(selectedCoin.currentApy);
    }
  }, [selectedCoinId, useAutoApy, selectedCoin]);

  // 계산 로직 (일/월/연 단위 예상 보상 추정치)
  const apyFraction = customApy / 100;
  const yearlyReward = amount * apyFraction;
  const monthlyReward = yearlyReward / 12;
  const dailyReward = yearlyReward / 365;

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title="가상자산 스테이킹 보상률 모의 계산기 | StakingMax" 
        description="이더리움, 솔라나, 에이다 등의 코인 수량을 입력하여 기간별 예상 보상(리워드 추정치)을 실시간으로 시뮬레이션해 보세요. 변동 가능 조건 적용."
      />

      <section style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>스테이킹 리워드 계산기</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
          보유 자산 규모와 예상 스테이킹 보상률을 조합하여 일/월/연간 발생하는 기대 리워드 추정치를 가늠할 수 있습니다.
        </p>
      </section>

      {/* Main Calculation Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        
        {/* Left Side: Inputs */}
        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalcIcon style={{ color: 'var(--primary)' }} /> 입력 옵션 설정
          </h3>

          {/* Asset Selection */}
          <div className="form-group">
            <label className="form-label">대상 가상자산</label>
            <select 
              className="form-select"
              value={selectedCoinId}
              onChange={(e) => setSelectedCoinId(e.target.value)}
            >
              {mockAssets.map(a => (
                <option key={a.id} value={a.id}>{a.nameKo} ({a.symbol})</option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div className="form-group">
            <label className="form-label">위임 예정 코인 수량 ({selectedCoin?.symbol})</label>
            <input 
              type="number" 
              className="form-input" 
              value={amount}
              min={0}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* APY Type Toggle */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={useAutoApy}
                onChange={() => setUseAutoApy(true)}
              />
              대표 보상률 자동 적용
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={!useAutoApy}
                onChange={() => setUseAutoApy(false)}
              />
              사용자 직접 설정
            </label>
          </div>

          {/* Custom APY Input */}
          <div className="form-group">
            <label className="form-label">예상 APY (연 보상률) % <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>(변동 가능)</span></label>
            <input 
              type="number" 
              className="form-input" 
              value={customApy}
              disabled={useAutoApy}
              step={0.1}
              min={0}
              onChange={(e) => setCustomApy(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Right Side: Results Display */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--secondary)' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck style={{ color: 'var(--secondary)' }} /> 리워드 추정 결과
            </h3>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>일별 예상 리워드</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--sans-outfit)' }}>
                  {dailyReward.toFixed(6)} {selectedCoin?.symbol}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>월별 예상 리워드</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--sans-outfit)' }}>
                  {monthlyReward.toFixed(4)} {selectedCoin?.symbol}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>연간 누적 예상 리워드</span>
                <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--secondary)', fontFamily: 'var(--sans-outfit)' }}>
                  {yearlyReward.toFixed(3)} {selectedCoin?.symbol}
                </span>
              </div>

            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <Percent style={{ width: '14px', height: '14px' }} />
              적용된 APY: {customApy.toFixed(1)}% (변동 가능) | 락업 정책: {selectedCoin?.lockupPeriod}
            </div>

            <Link to="/tax-calculator" className="btn btn-primary" style={{ width: '100%', boxSizing: 'border-box' }}>
              세후 수령액 시뮬레이션 해보기 (2027 가상자산 세금)
            </Link>
          </div>
        </div>

      </section>

      {/* Calculator Advisory Notice */}
      <section className="alert-box" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <AlertTriangle style={{ color: 'var(--accent)', flexShrink: 0, width: '24px', height: '24px', marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>계산 결과 유의 고지 (원금 및 수익 보장 없음)</strong>
          본 계산기의 시뮬레이션 결과는 사용자가 기입하거나 선택한 과거 기준 예상 APY 수치를 근거로 산출된 단순 추정치이며 미래의 실제 리워드를 절대 보장하지 않습니다. 
          온체인 블록 생성 상황과 네트워크 검증인 수수료 갱신 및 토큰 가격 등락에 의해 실제 귀속 보상은 큰 오차가 발생할 수 있습니다.
        </div>
      </section>
    </div>
  );
}
