import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, AlertTriangle } from 'lucide-react';

import Home from './pages/Home';
import Assets from './pages/Assets';
import AssetDetail from './pages/AssetDetail';
import Exchanges from './pages/Exchanges';
import Calculator from './pages/Calculator';
import TaxCalculator from './pages/TaxCalculator';
import Guides from './pages/Guides';
import Methodology from './pages/Methodology';
import Risk from './pages/Risk';
import Report from './pages/Report';

import './App.css';

/* ── Scroll to top on route change ── */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: isActive ? 700 : 500,
    color: isActive ? 'var(--color-blue)' : 'var(--color-navy-mid)',
    padding: '6px 12px',
    borderRadius: '8px',
    background: isActive ? 'var(--color-blue-bg)' : 'transparent',
    transition: 'var(--transition)',
    letterSpacing: '-0.2px',
  });

  const mobileNavStyle: React.CSSProperties = {
    textDecoration: 'none',
    fontSize: '17px',
    fontWeight: 600,
    color: 'var(--color-navy)',
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)',
    display: 'block',
    letterSpacing: '-0.3px',
  };

  return (
    <Router>
      <ScrollReset />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* ── Risk Ticker Bar ── */}
        <div style={{
          background: '#fffbeb',
          borderBottom: '1px solid #fde68a',
          padding: '9px 20px',
          fontSize: '12px',
          color: '#92400e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontWeight: 500,
        }}>
          <AlertTriangle size={13} color="#d97706" />
          <span>가상자산 스테이킹은 확정 수익 예금이 아니며, 원금 보장 대상이 아닙니다. 모든 APY는 변동 가능합니다.</span>
          <Link to="/risk" style={{ color: '#b45309', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '2px' }}>위험고지 →</Link>
        </div>

        {/* ── Sticky Navigation ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: scrolled ? 'rgba(255,255,255,0.92)' : '#ffffff',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          transition: 'all 0.3s ease',
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>

            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'linear-gradient(135deg, #3182f6 0%, #05c072 100%)',
                borderRadius: '9px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: 900 }}>S</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-navy)', letterSpacing: '-0.7px' }}>
                스테이킹맥스
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="desktop-only" style={{ alignItems: 'center', gap: '2px' }}>
              <NavLink to="/" style={navLinkStyle} end>홈</NavLink>
              <NavLink to="/assets" style={navLinkStyle}>코인 비교</NavLink>
              <NavLink to="/exchanges" style={navLinkStyle}>거래소 비교</NavLink>
              <NavLink to="/calculator" style={navLinkStyle}>수익 계산기</NavLink>
              <NavLink to="/tax-calculator" style={navLinkStyle}>세금 계산기</NavLink>
              <NavLink to="/guides" style={navLinkStyle}>가이드</NavLink>
            </nav>

            {/* Desktop CTA */}
            <div className="desktop-only" style={{ alignItems: 'center', gap: '10px' }}>
              <Link to="/report" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '14px', borderRadius: '10px' }}>
                무료 리포트
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="mobile-only"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--color-navy)', lineHeight: 0 }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileOpen && (
            <div className="mobile-only" style={{
              position: 'absolute', top: '64px', left: 0, right: 0,
              background: '#ffffff',
              borderTop: '1px solid var(--color-border)',
              borderBottom: '1px solid var(--color-border)',
              padding: '16px 24px 24px',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <Link to="/"              onClick={() => setMobileOpen(false)} style={mobileNavStyle}>홈</Link>
              <Link to="/assets"        onClick={() => setMobileOpen(false)} style={mobileNavStyle}>코인 비교</Link>
              <Link to="/exchanges"     onClick={() => setMobileOpen(false)} style={mobileNavStyle}>거래소 비교</Link>
              <Link to="/calculator"    onClick={() => setMobileOpen(false)} style={mobileNavStyle}>수익 계산기</Link>
              <Link to="/tax-calculator" onClick={() => setMobileOpen(false)} style={mobileNavStyle}>세금 계산기</Link>
              <Link to="/guides"        onClick={() => setMobileOpen(false)} style={mobileNavStyle}>가이드</Link>
              <Link to="/risk"          onClick={() => setMobileOpen(false)} style={{ ...mobileNavStyle, borderBottom: 'none' }}>위험고지</Link>
              <Link to="/report" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ width: '100%', boxSizing: 'border-box', marginTop: '20px', borderRadius: '12px', padding: '15px' }}>
                무료 리포트 신청
              </Link>
            </div>
          )}
        </header>

        {/* ── Page Routes ── */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/assets"          element={<Assets />} />
            <Route path="/assets/:slug"    element={<AssetDetail />} />
            <Route path="/exchanges"       element={<Exchanges />} />
            <Route path="/calculator"      element={<Calculator />} />
            <Route path="/tax-calculator"  element={<TaxCalculator />} />
            <Route path="/guides"          element={<Guides />} />
            <Route path="/methodology"     element={<Methodology />} />
            <Route path="/risk"            element={<Risk />} />
            <Route path="/report"          element={<Report />} />
          </Routes>
        </main>

        {/* ── Footer ── */}
        <footer style={{ background: 'var(--color-navy)', color: 'rgba(255,255,255,0.6)', padding: '48px 0 32px' }}>
          <div className="container">

            {/* Disclaimer */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '22px 24px',
              fontSize: '12px', lineHeight: 1.7,
              marginBottom: '40px',
              color: 'rgba(255,255,255,0.5)',
            }}>
              <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>투자 위험 고지 </span>
              본 사이트는 가상자산 스테이킹 정보를 제공하는 데이터 플랫폼으로, 투자 권유 또는 금융상품 판매·중개를 목적으로 하지 않습니다.
              표시된 APY, 보상률은 네트워크 상황·검증인 성과·수수료·정책 변경 등에 따라 수시로 변동될 수 있으며, 원금 또는 수익을 보장하지 않습니다.
              가상자산 투자는 원금 손실 가능성이 있으며, 이용자는 각 제공업체의 공식 약관을 직접 확인 후 스스로 판단해야 합니다.
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg,#3182f6,#05c072)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 900 }}>S</span>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '15px', letterSpacing: '-0.4px' }}>스테이킹맥스</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>
                  독립적 가상자산 스테이킹 데이터 정보제공 플랫폼
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
                  © {new Date().getFullYear()} StakingMax. All rights reserved.
                </p>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>서비스</span>
                  <Link to="/assets"    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>코인 비교</Link>
                  <Link to="/exchanges" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>거래소 비교</Link>
                  <Link to="/calculator" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>수익 계산기</Link>
                  <Link to="/tax-calculator" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>세금 계산기</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>정보</span>
                  <Link to="/guides"      style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>스테이킹 가이드</Link>
                  <Link to="/methodology" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>데이터 방법론</Link>
                  <Link to="/risk"        style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>위험고지</Link>
                  <Link to="/report"      style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>무료 리포트</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
