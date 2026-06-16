import { mockProviders, mockStakingProducts } from '../data/mockData';
import { Shield, CheckCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

export default function Exchanges() {
  // 특정 거래소가 지원하는 코인 리스트 추출
  const getSupportedAssets = (providerId: string) => {
    return mockStakingProducts
      .filter(p => p.providerId === providerId)
      .map(p => {
        if (p.assetId === 'ethereum') return 'ETH';
        if (p.assetId === 'solana') return 'SOL';
        if (p.assetId === 'cosmos') return 'ATOM';
        if (p.assetId === 'cardano') return 'ADA';
        return p.assetId.toUpperCase();
      });
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title="국내 가상자산 거래소 스테이킹 서비스 신뢰성 비교 | StakingMax" 
        description="업비트, 빗썸, 코인원, 코빗 등 국내 4대 원화 마켓 거래소의 스테이킹 대행 수수료, 지원 코인, ISMS 인증 여부 및 신뢰 평가 지표를 상호 비교해 보세요."
      />

      <section style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>가상자산 거래소 비교</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
          대한민국 금융 당국의 관리 규정을 통과한 국내 대형 CEX(중앙화 거래소)의 스테이킹 서비스 요건 및 리스크 정보를 한눈에 분석합니다.
        </p>
      </section>

      {/* Main Table */}
      <section style={{ marginBottom: '40px' }}>
        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>제공처 명칭</th>
                <th>신뢰 점수</th>
                <th>기본 대행 수수료</th>
                <th>ISMS 인증</th>
                <th>지원 자산</th>
                <th>리스크 수준</th>
                <th>공식 채널</th>
              </tr>
            </thead>
            <tbody>
              {mockProviders.map(provider => {
                const supported = getSupportedAssets(provider.id);
                return (
                  <tr key={provider.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '16px' }}>{provider.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>{provider.country}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary)' }}>
                          {provider.safetyScore.toFixed(1)}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 10</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--sans-outfit)', fontWeight: 500 }}>
                      {(provider.feeRate * 100).toFixed(0)}%
                    </td>
                    <td>
                      {provider.ismsCertified ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '13px' }}>
                          <CheckCircle style={{ width: '16px', height: '16px' }} /> 보유
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>미보유</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {supported.map((sym, idx) => (
                          <span key={idx} className="badge badge-primary" style={{ padding: '2px 6px', fontSize: '10px' }}>
                            {sym}
                          </span>
                        ))}
                        {supported.length === 0 && <span style={{ color: 'var(--text-muted)' }}>없음</span>}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${provider.riskLevel}`}>
                        {provider.riskLevel === 'low' ? '낮음' : provider.riskLevel === 'medium' ? '중간' : '높음'}
                      </span>
                    </td>
                    <td>
                      <a href={provider.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        이동 <ExternalLink style={{ width: '12px', height: '12px' }} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trust Criteria Explained */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="card">
          <Shield style={{ color: 'var(--primary)', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>신뢰 평가 점수(Safety Score) 기준</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            보안사고 여부, 실명입출금계좌 검증, ISMS(정보보호관리체계) 취득 여부, 내부 컴플라이언스 기준 준수 강도를 기준으로 가상자산 전문가들이 10점 만점으로 정밀 평가한 평점입니다.
          </p>
        </div>

        <div className="card">
          <AlertTriangle style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>거래소 수탁 리스크 안내</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            중앙화 거래소의 스테이킹 대행 서비스는 블록체인 네트워크에 직접 서명하는 방식과 달리 수탁(Custody) 형태로 이루어지므로, 거래소 파산 또는 출금 정지 시 위임 원금 전액 손실이 발생할 위험을 포함합니다.
          </p>
        </div>
      </section>

      {/* Global Disclaimer Box */}
      <section className="alert-box">
        <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>중개 배제 고지</strong>
        본 플랫폼은 정보 취합 서비스일 뿐, 특정 거래소의 투자 상품에 대한 대행, 모집, 또는 중개 행위를 수행하지 않습니다. 
        실제 상품 가입 전에 각 가상자산사업자(CEX)의 공식 채널을 통해 변경된 수수료율과 상세 약관을 본인 책임 하에 확인하시기 바랍니다.
      </section>
    </div>
  );
}
