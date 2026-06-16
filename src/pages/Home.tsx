import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calculator, ArrowUpRight, ShieldAlert, Award, Star } from 'lucide-react';
import { mockAssets, mockStakingProducts, mockProviders } from '../data/mockData';
import SEO from '../components/SEO';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 스폰서 상품 조회
  const sponsoredProducts = mockStakingProducts.filter(p => p.isSponsored);

  // 검색 필터 적용된 자산 목록
  const filteredAssets = mockAssets.filter(asset => 
    asset.nameKo.includes(searchTerm) || 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 자산별 데이터 조합 헬퍼
  const getAssetDetails = (assetId: string) => {
    const asset = mockAssets.find(a => a.id === assetId);
    const products = mockStakingProducts.filter(p => p.assetId === assetId);
    
    let maxApy = 0;
    if (products.length > 0) {
      maxApy = Math.max(...products.map(p => p.apy));
    }
    
    return {
      asset,
      maxApy
    };
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title="대한민국 1등 코인 스테이킹 보상률 비교 | StakingMax" 
        description="업비트, 빗썸, 코인원, 코빗 및 탈중앙화 디파이의 실시간 코인 스테이킹 보상률과 APY 데이터를 비교하고 계산해 보세요. 투자 권유가 아닙니다."
      />

      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '48px', padding: '40px 0' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '16px', background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          스마트한 가상자산 리워드의 시작
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          국내 주요 거래소 및 글로벌 네트워크의 검증된 스테이킹 보상률 데이터를 투명하게 대조해 드립니다.
        </p>

        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', width: '20px', height: '20px' }} />
          <input
            type="text"
            className="form-input"
            placeholder="코인명 또는 티커 검색 (예: ETH, 이더리움)..."
            style={{ width: '100%', paddingLeft: '48px', boxSizing: 'border-box', height: '52px', fontSize: '16px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Sponsored Ad Section */}
      {sponsoredProducts.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Award style={{ color: '#a855f7', width: '20px', height: '20px' }} />
            <h3 style={{ margin: 0, fontSize: '18px', fontFamily: 'var(--sans-outfit)' }}>추천 제휴 상품</h3>
            <span className="badge badge-sponsored">AD / 스폰서</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {sponsoredProducts.map((prod, idx) => {
              const asset = mockAssets.find(a => a.id === prod.assetId);
              const provider = mockProviders.find(p => p.id === prod.providerId);
              if (!asset || !provider) return null;

              return (
                <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '3px solid #a855f7' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="badge badge-primary">{asset.symbol}</span>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{provider.name} 제공</span>
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                      {asset.nameKo} ({asset.symbol}) 스테이킹
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '12px 0' }}>
                      <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--secondary)', fontFamily: 'var(--sans-outfit)' }}>
                        {prod.apy.toFixed(1)}%
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>예상 APY (변동 가능)</span>
                    </div>
                  </div>
                  <a href={prod.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', padding: '8px', fontSize: '13px', marginTop: '12px' }}>
                    공식 링크 바로가기 <ArrowUpRight style={{ width: '14px', height: '14px' }} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Assets Table */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>코인별 스테이킹 보상률</h2>
          <Link to="/assets" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600 }}>
            전체 보기 <ArrowUpRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>

        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>코인</th>
                <th>카테고리</th>
                <th>최고 예상 APY (변동 가능)</th>
                <th>락업 해제 기간</th>
                <th>리스크 레벨</th>
                <th>스테이킹 비율</th>
                <th>상세 보기</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.slice(0, 5).map(asset => {
                const details = getAssetDetails(asset.id);
                return (
                  <tr key={asset.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontWeight: 600, fontSize: '16px' }}>{asset.nameKo}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{asset.symbol}</div>
                      </div>
                    </td>
                    <td><span className="badge badge-primary">{asset.category}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--secondary)', fontFamily: 'var(--sans-outfit)', fontSize: '16px' }}>
                      {details.maxApy > 0 ? `${details.maxApy.toFixed(1)}%` : '정보 없음'}
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px', fontWeight: 'normal' }}>(변동 가능)</span>
                    </td>
                    <td>{asset.lockupPeriod}</td>
                    <td>
                      <span className={`badge badge-${asset.riskLevel}`}>
                        {asset.riskLevel === 'low' ? '낮음' : asset.riskLevel === 'medium' ? '중간' : '높음'}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--sans-outfit)' }}>{(asset.stakingRatio * 100).toFixed(1)}%</td>
                    <td>
                      <Link to={`/assets/${asset.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        자세히
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    일치하는 코인이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Floating Risk Notice Box */}
      <section className="alert-box" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '48px' }}>
        <ShieldAlert style={{ color: 'var(--accent)', flexShrink: 0, width: '24px', height: '24px', marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>투자 유의사항 고지 (투자 권유 아님)</strong>
          본 사이트의 정보는 가상자산 스테이킹 및 온체인 보상률에 대한 일반 정보 제공을 목적으로 하며, 투자 권유 또는 금융상품 판매·중개를 목적으로 하지 않습니다. 
          표시된 APY, APR, 보상률은 네트워크 상황, 검증인 성과, 수수료, 토큰 가격, 정책 변경 등에 따라 변동될 수 있으며, 원금 또는 수익을 보장하지 않습니다. 
          가상자산은 높은 변동성과 손실 위험이 있으며, 이용자는 각 제공업체의 공식 약관과 위험 고지를 직접 확인한 후 스스로 판단해야 합니다.
        </div>
      </section>

      {/* Quick Utility Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div className="card">
          <Calculator style={{ color: 'var(--primary)', width: '32px', height: '32px', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>리워드 계산기</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, marginBottom: '16px' }}>
            보유 수량에 맞춰 매주 혹은 매년 수령할 수 있는 예상 리워드 추정치를 간편하게 계산해 드립니다.
          </p>
          <Link to="/calculator" className="btn btn-primary" style={{ width: '100%', boxSizing: 'border-box' }}>
            계산기 사용하기
          </Link>
        </div>

        <div className="card">
          <Star style={{ color: 'var(--accent)', width: '32px', height: '32px', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>거래소 비교</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, marginBottom: '16px' }}>
            국내 4대 원화 마켓 거래소(업비트, 빗썸, 코인원, 코빗)의 수수료 체계와 신뢰 평가 점수를 요약 대조합니다.
          </p>
          <Link to="/exchanges" className="btn btn-primary" style={{ width: '100%', boxSizing: 'border-box' }}>
            거래소 비교하기
          </Link>
        </div>
      </section>
    </div>
  );
}
