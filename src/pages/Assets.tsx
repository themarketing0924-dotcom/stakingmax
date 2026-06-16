import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockAssets, mockStakingProducts } from '../data/mockData';
import { HelpCircle, ChevronRight, SlidersHorizontal } from 'lucide-react';
import SEO from '../components/SEO';

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // 데이터 가공: 각 자산별 최저/최고 APY 및 상품 개수 산정
  const processedAssets = mockAssets.map(asset => {
    const products = mockStakingProducts.filter(p => p.assetId === asset.id);
    const apys = products.map(p => p.apy);
    const minApy = apys.length > 0 ? Math.min(...apys) : 0;
    const maxApy = apys.length > 0 ? Math.max(...apys) : 0;
    
    return {
      ...asset,
      minApy,
      maxApy,
      productCount: products.length
    };
  });

  // 검색 및 필터링
  const filteredAssets = processedAssets.filter(asset => {
    const matchesSearch = 
      asset.nameKo.includes(searchTerm) || 
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || asset.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title="코인별 스테이킹 보상률 및 예상 APY 순위 비교 | StakingMax" 
        description="이더리움, 솔라나, 에이다, 코스모스 등 주요 가상자산(PoS)의 최고 및 최저 예상 APY 보상률을 확인하고 락업 해제 기간과 리스크 수준을 정밀 비교해 보세요."
      />

      <section style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>코인별 스테이킹 비교</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
          각 블록체인 프로토콜 기반의 예상 보상률(APY) 범위와 락업 요구사항을 상호 비교 분석합니다.
        </p>
      </section>

      {/* Search & Filter Controls */}
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="자산명 또는 심볼 검색..."
            style={{ width: '100%', boxSizing: 'border-box' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <SlidersHorizontal style={{ color: 'var(--text-muted)', width: '18px', height: '18px' }} />
          <select 
            className="form-select" 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">모든 자산 분류</option>
            <option value="PoS">지분증명 (PoS)</option>
            <option value="LSD">유동성 스테이킹 (LSD)</option>
          </select>
        </div>
      </section>

      {/* Main Table */}
      <section style={{ marginBottom: '40px' }}>
        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>코인 / 심볼</th>
                <th>자산 분류</th>
                <th>예상 APY 범위</th>
                <th>제공업체 개수</th>
                <th>해제 소요 기간</th>
                <th>리스크 수준</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map(asset => (
                <tr key={asset.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>{asset.nameKo}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{asset.symbol}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary">{asset.category}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--sans-outfit)', fontWeight: 600 }}>
                    {asset.minApy > 0 ? (
                      <span style={{ color: 'var(--secondary)' }}>
                        {asset.minApy.toFixed(1)}% ~ {asset.maxApy.toFixed(1)}%
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>정보 없음</span>
                    )}
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px', fontWeight: 'normal' }}>
                      (변동 가능)
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>{asset.productCount}개</td>
                  <td>{asset.lockupPeriod}</td>
                  <td>
                    <span className={`badge badge-${asset.riskLevel}`}>
                      {asset.riskLevel === 'low' ? '낮음' : asset.riskLevel === 'medium' ? '중간' : '높음'}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/assets/${asset.id}`} 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                    >
                      상세비교 <ChevronRight style={{ width: '14px', height: '14px' }} />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    일치하는 가상자산이 존재하지 않습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Link / Quick Guide Card */}
      <section className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <HelpCircle style={{ color: 'var(--primary)', flexShrink: 0, width: '32px', height: '32px' }} />
        <div>
          <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600 }}>보상률(APY)이 수시로 변경되는 이유는 무엇인가요?</h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
            스테이킹 보상률은 온체인 전체 스테이킹 참여 수량, 블록 타임 속도, 그리고 각 거래소의 운영 수수료 차감 정책에 따라 상시 변동됩니다. 당사의 데이터는 실시간 추정 정보로 실제 가입 조건과 차이가 날 수 있습니다.
          </p>
        </div>
      </section>

      {/* Global Notice Box */}
      <section className="alert-box">
        <strong>면책 고지</strong>: 가상자산은 예금자보호법의 대상이 아닙니다. 표시된 보상률(APY)은 미래의 확정 수익률이 아니며, 시세 급등락에 따른 투자 손실 리스크가 매우 큽니다.
      </section>
    </div>
  );
}
