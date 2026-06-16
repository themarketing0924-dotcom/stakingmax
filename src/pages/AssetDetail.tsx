import { useParams, Link } from 'react-router-dom';
import { mockAssets, mockStakingProducts, mockProviders } from '../data/mockData';
import { ChevronLeft, ExternalLink, Calculator, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';

export default function AssetDetail() {
  const { slug } = useParams<{ slug: string }>();

  // 자산 조회
  const asset = mockAssets.find(a => a.id === slug);

  if (!asset) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger)' }}>요청하신 코인 데이터를 찾을 수 없습니다.</h2>
        <Link to="/assets" className="btn btn-secondary" style={{ marginTop: '20px' }}>
          코인 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  // 이 코인과 매핑된 스테이킹 상품들 조회
  const products = mockStakingProducts.filter(p => p.assetId === asset.id);

  // 시가총액 포맷터 (억/조 단위 간략화)
  const formatCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `$${(val / 1000000000).toFixed(1)}B (USD)`;
    }
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title={`${asset.nameKo}(${asset.symbol}) 스테이킹 보상률 및 거래소 혜택 비교 | StakingMax`} 
        description={`${asset.nameKo}(${asset.symbol})의 실시간 스테이킹 예상 APY, 대행 수수료, 국내 4대 거래소(업비트, 빗썸, 코인원 등) 비교 및 온체인 지표 보고서.`}
      />

      {/* Back Button */}
      <div style={{ marginBottom: '24px' }}>
        <Link to="/assets" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
          <ChevronLeft style={{ width: '16px', height: '16px' }} /> 코인 목록으로
        </Link>
      </div>

      {/* Header Info Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <h1 style={{ fontSize: '38px', fontWeight: 800, margin: 0 }}>{asset.nameKo}</h1>
            <span style={{ fontSize: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>{asset.symbol}</span>
            <span className="badge badge-primary">{asset.category}</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
            {asset.description}
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className={`badge badge-${asset.riskLevel}`}>
              위험성: {asset.riskLevel === 'low' ? '낮음' : asset.riskLevel === 'medium' ? '중간' : '높음'}
            </span>
          </div>
        </div>

        {/* Key Stats Card */}
        <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>시가 총액</div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--sans-outfit)' }}>{formatCurrency(asset.marketCap)}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>총 스테이킹 자산 (TVL)</div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--sans-outfit)' }}>{formatCurrency(asset.stakingMarketCap)}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>스테이킹 참여율</div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--sans-outfit)', color: 'var(--primary)' }}>
              {(asset.stakingRatio * 100).toFixed(1)}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>락업 해제 소요 시간</div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>{asset.lockupPeriod}</div>
          </div>
        </div>
      </section>

      {/* Calculator Route Link Card */}
      <section className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Calculator style={{ color: 'var(--primary)', width: '28px', height: '28px' }} />
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600 }}>{asset.nameKo} 예상 리워드 시뮬레이션</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px' }}>보유 수량 및 2027년 세제 요건을 반영해 세후 수익률 추정치를 구해보세요.</p>
          </div>
        </div>
        <Link to={`/calculator?coin=${asset.id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
          수익 계산하기
        </Link>
      </section>

      {/* Staking Products Comparison Table */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>지원 업체별 리워드 상품 대조</h3>
        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>제공처</th>
                <th>예상 APY (변동 가능)</th>
                <th>최소 위임 한도</th>
                <th>플랫폼 수수료율</th>
                <th>리워드 분배 주기</th>
                <th>상품 바로가기</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, idx) => {
                const provider = mockProviders.find(p => p.id === prod.providerId);
                if (!provider) return null;
                
                return (
                  <tr key={idx} style={{ borderLeft: prod.isSponsored ? '3px solid #a855f7' : 'none' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ fontWeight: 600 }}>{provider.name}</div>
                        {prod.isSponsored && <span className="badge badge-sponsored">추천</span>}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--secondary)', fontFamily: 'var(--sans-outfit)' }}>
                      {prod.apy.toFixed(1)}% <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal' }}>(변동 가능)</span>
                    </td>
                    <td>{prod.minAmount} {asset.symbol}</td>
                    <td>{(prod.feeRate * 100).toFixed(0)}%</td>
                    <td>{prod.payoutFrequency}</td>
                    <td>
                      <a href={prod.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        이동 <ExternalLink style={{ width: '12px', height: '12px' }} />
                      </a>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    현재 비교 가능한 등록된 대행 상품이 존재하지 않습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Slashing Risk Details Box */}
      <section className="alert-box" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '32px' }}>
        <ShieldAlert style={{ color: 'var(--accent)', flexShrink: 0, width: '24px', height: '24px', marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>온체인 리스크 인지 고지 (투자 권유 아님)</strong>
          {asset.nameKo} 온체인 위임 시 검증 노드의 결함(오프라인, 중복 블록 검증 등)에 따라 원금 중 일부가 영구 삭감(Slashing)될 수 있습니다. 
          제공된 정보는 각 블록체인 노드 데이터를 추정한 참고 자료에 불과하며, 투자 결과에 대한 책임은 지지 않습니다.
        </div>
      </section>
    </div>
  );
}
