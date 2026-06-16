import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Calculator, ChevronRight, ArrowRight, Star, CheckCircle, AlertTriangle } from 'lucide-react';
import { mockAssets, mockStakingProducts, mockProviders } from '../data/mockData';
import SEO from '../components/SEO';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockAssets.filter(a =>
    a.nameKo.includes(searchTerm) || a.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMaxApy = (assetId: string) => {
    const prods = mockStakingProducts.filter(p => p.assetId === assetId);
    if (!prods.length) return 0;
    return Math.max(...prods.map(p => p.apy));
  };

  const stats = [
    { label: '비교 가능 코인', value: '4+', unit: '종' },
    { label: '국내 제휴 거래소', value: '4', unit: '개' },
    { label: '최고 예상 APY', value: '14.2', unit: '%' },
    { label: '데이터 갱신 주기', value: '24', unit: '시간' },
  ];

  const features = [
    { icon: <TrendingUp size={22} color="#3182f6" />, title: '실시간 보상률 비교', desc: '업비트·빗썸·코인원·코빗의 스테이킹 예상 APY를 한눈에 대조합니다.' },
    { icon: <Calculator size={22} color="#05c072" />, title: '리워드 계산기', desc: '보유 코인 수량을 입력하면 일·월·연 예상 리워드 추정치를 즉시 계산합니다.' },
    { icon: <Shield size={22} color="#f04452" />, title: '거래소 신뢰도 분석', desc: 'ISMS 인증·보안사고 이력·안전성 지표를 종합한 신뢰 점수를 제공합니다.' },
  ];

  return (
    <>
      <SEO
        title="국내 코인 스테이킹 보상률 비교 플랫폼"
        description="업비트·빗썸·코인원·코빗의 코인 스테이킹 예상 APY·수수료·락업기간을 투명하게 비교하세요. 투자 권유가 아닌 데이터 기반 정보 제공 플랫폼입니다."
      />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #f0f5ff 0%, #ffffff 55%, #f0fff8 100%)',
        borderBottom: '1px solid var(--color-border)',
        padding: '80px 0 72px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-80px',
          width: '480px', height: '480px',
          background: 'radial-gradient(circle, rgba(49,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-60px',
          width: '320px', height: '320px',
          background: 'radial-gradient(circle, rgba(5,192,114,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container">
          <div className="anim-fade-up" style={{ maxWidth: '640px' }}>
            {/* Pill badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'var(--color-blue-bg)', border: '1px solid var(--color-blue-border)',
              borderRadius: '100px', padding: '6px 14px',
              fontSize: '13px', fontWeight: 600, color: 'var(--color-blue)',
              marginBottom: '24px',
            }}>
              <Star size={13} fill="currentColor" />
              데이터 기반 · 투자 권유 아님
            </div>

            <h1 style={{ fontSize: '52px', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: '20px', color: 'var(--color-navy)' }}>
              국내 거래소<br />
              <span style={{ color: 'var(--color-blue)' }}>스테이킹 보상률</span>을<br />
              한눈에
            </h1>

            <p style={{ fontSize: '18px', color: 'var(--color-gray)', lineHeight: 1.65, marginBottom: '36px', maxWidth: '480px' }}>
              업비트·빗썸·코인원·코빗의 예상 APY, 수수료, 락업 기간, 거래소 신뢰도를 투명하게 비교해 드립니다.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link to="/assets" className="btn btn-primary btn-lg" style={{ gap: '8px' }}>
                코인 비교 시작하기 <ArrowRight size={18} />
              </Link>
              <Link to="/calculator" className="btn btn-outline btn-lg">
                리워드 계산하기
              </Link>
            </div>

            {/* Mini stats row */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-navy)', letterSpacing: '-0.5px', lineHeight: 1 }}>
                    {s.value}<span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-gray)', marginLeft: '2px' }}>{s.unit}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-gray-light)', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Search + APY Table ───────────────────────── */}
      <section style={{ padding: '64px 0 0' }}>
        <div className="container">
          <div className="anim-fade-up delay-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>코인별 예상 APY 비교</h2>
              <p style={{ fontSize: '14px', color: 'var(--color-gray)' }}>모든 수치는 과거 기준 추정치이며 실제 보상률은 변동 가능합니다.</p>
            </div>
            <Link to="/assets" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-blue)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              전체 보기 <ChevronRight size={16} />
            </Link>
          </div>

          {/* Search */}
          <div className="anim-fade-up delay-2" style={{ marginBottom: '16px', position: 'relative' }}>
            <input
              className="form-input"
              placeholder="코인명 또는 심볼 검색 (예: ETH, 이더리움)"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ maxWidth: '380px', paddingLeft: '16px' }}
            />
          </div>

          <div className="anim-fade-up delay-3 table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>코인</th>
                  <th>분류</th>
                  <th>최고 예상 APY ↑</th>
                  <th>락업 해제</th>
                  <th>리스크</th>
                  <th>스테이킹 비율</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(asset => {
                  const maxApy = getMaxApy(asset.id);
                  return (
                    <tr key={asset.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px', height: '36px',
                            background: 'var(--color-blue-bg)',
                            borderRadius: '10px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '13px', fontWeight: 700, color: 'var(--color-blue)',
                            flexShrink: 0,
                          }}>
                            {asset.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-navy)' }}>{asset.nameKo}</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-gray-light)' }}>{asset.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-primary">{asset.category}</span></td>
                      <td>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-green)', letterSpacing: '-0.3px' }}>
                          {maxApy > 0 ? maxApy.toFixed(1) : '-'}%
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--color-gray-light)', marginLeft: '4px' }}>변동 가능</span>
                      </td>
                      <td style={{ fontSize: '13px', color: 'var(--color-gray)' }}>{asset.lockupPeriod}</td>
                      <td>
                        <span className={`badge badge-${asset.riskLevel}`}>
                          {asset.riskLevel === 'low' ? '낮음' : asset.riskLevel === 'medium' ? '중간' : '높음'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            height: '6px', width: '80px', background: 'var(--color-border)',
                            borderRadius: '3px', overflow: 'hidden',
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${asset.stakingRatio * 100}%`,
                              background: 'linear-gradient(90deg, var(--color-blue), var(--color-green))',
                              borderRadius: '3px',
                            }} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-navy-mid)' }}>
                            {(asset.stakingRatio * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <Link to={`/assets/${asset.id}`} className="btn btn-secondary" style={{ gap: '2px' }}>
                          상세 <ChevronRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: 'var(--color-gray-light)' }}>
                      일치하는 코인이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Feature Cards ──────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="anim-fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>스테이킹맥스가 다른 이유</h2>
            <p style={{ fontSize: '16px', color: 'var(--color-gray)', maxWidth: '480px', margin: '0 auto' }}>
              국내 규제 환경에 맞춘 투명한 데이터와 리스크 안내를 제공합니다.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {features.map((f, i) => (
              <div key={i} className={`card anim-fade-up delay-${i + 1}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: 'var(--color-surface-2)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-gray)', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Exchange Quick Preview ──────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="anim-fade-up" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px' }}>거래소 신뢰도 요약</h2>
            <Link to="/exchanges" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              전체 비교 <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {mockProviders.map((p, i) => (
              <div key={p.id} className={`card-flat anim-fade-up delay-${i + 1}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>{p.name}</span>
                  <span className={`badge badge-${p.riskLevel}`}>
                    {p.riskLevel === 'low' ? '안전' : p.riskLevel === 'medium' ? '보통' : '주의'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-blue)', letterSpacing: '-0.5px' }}>
                      {p.safetyScore.toFixed(1)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-gray-light)' }}>신뢰 점수 / 10</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700 }}>
                      {(p.feeRate * 100).toFixed(0)}%
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-gray-light)' }}>수수료율</div>
                  </div>
                </div>
                {p.ismsCertified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-green)', fontWeight: 600 }}>
                    <CheckCircle size={13} /> ISMS 인증
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─────────────────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="anim-fade-up" style={{
            background: 'linear-gradient(135deg, #1a4490 0%, #2563eb 50%, #0d9488 100%)',
            borderRadius: '24px', padding: '56px 48px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '24px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-80px', right: '120px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                무료 리서치 리포트
              </p>
              <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.8px', marginBottom: '12px', lineHeight: 1.2 }}>
                거래소별 스테이킹 비교<br />리포트를 이메일로 받아보세요
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                업비트·빗썸·코인원·코빗 비교 분석 + 리스크 가이드를<br />한 번에 정리한 PDF 리포트를 무료로 제공합니다.
              </p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' }}>
              <Link to="/report" style={{
                background: '#ffffff', color: 'var(--color-blue)',
                borderRadius: '14px', padding: '16px 32px',
                fontWeight: 800, fontSize: '16px', textDecoration: 'none',
                textAlign: 'center', letterSpacing: '-0.3px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'var(--transition)',
                display: 'block',
              }}>
                무료로 받기 →
              </Link>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', margin: 0 }}>
                투자 권유 아님 · 개인정보 보호
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Compliance Disclaimer ──────────────────────────── */}
      <section style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div className="alert-box" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '4px', color: '#92400e' }}>
                투자 유의사항 (투자 권유 아님)
              </strong>
              본 사이트는 가상자산 스테이킹 정보를 제공하는 독립적 데이터 플랫폼입니다. 표시된 APY·보상률은 변동 가능한 추정치이며, 원금 또는 수익을 보장하지 않습니다. 각 거래소 공식 안내를 직접 확인 후 본인 책임 하에 판단하시기 바랍니다.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
