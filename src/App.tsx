import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Menu, X, ShieldAlert } from 'lucide-react';

// 페이지 컴포넌트 임포트
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

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 600,
    color: isActive ? '#3b82f6' : '#9ca3af',
    transition: 'all 0.2s ease',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
  });

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Top Announcement Bar */}
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', padding: '8px 16px', fontSize: '13px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <ShieldAlert style={{ color: '#ef4444', width: '16px', height: '16px' }} />
          <span>가상자산 스테이킹은 확정 수익 예금이 아니며, 원금 보장 대상이 아닙니다.</span>
          <Link to="/risk" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'underline' }}>위험고지 보기</Link>
        </div>

        {/* Global Navigation Header */}
        <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
            
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--sans-outfit)', background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                StakingMax
              </span>
              <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', fontWeight: 700 }}>MVP</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <NavLink to="/" style={navLinkStyle}>홈</NavLink>
              <NavLink to="/assets" style={navLinkStyle}>코인 비교</NavLink>
              <NavLink to="/exchanges" style={navLinkStyle}>거래소 비교</NavLink>
              <NavLink to="/calculator" style={navLinkStyle}>수익 계산기</NavLink>
              <NavLink to="/tax-calculator" style={navLinkStyle}>세금 계산기</NavLink>
              <NavLink to="/guides" style={navLinkStyle}>가이드</NavLink>
              <NavLink to="/methodology" style={navLinkStyle}>방법론</NavLink>
              <NavLink to="/report" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px', marginLeft: '8px' }}>
                무료 리포트
              </NavLink>
            </nav>

            {/* Mobile Menu Trigger Button */}
            <button className="mobile-only" onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}>
              {isMobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
            </button>

          </div>

          {/* Mobile Navigation Panel */}
          {isMobileMenuOpen && (
            <div className="mobile-only" style={{ position: 'absolute', top: '72px', left: 0, right: 0, backgroundColor: 'rgba(9, 13, 22, 0.95)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/" onClick={closeMobileMenu} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', padding: '8px 0' }}>홈</Link>
              <Link to="/assets" onClick={closeMobileMenu} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', padding: '8px 0' }}>코인 비교</Link>
              <Link to="/exchanges" onClick={closeMobileMenu} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', padding: '8px 0' }}>거래소 비교</Link>
              <Link to="/calculator" onClick={closeMobileMenu} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', padding: '8px 0' }}>수익 계산기</Link>
              <Link to="/tax-calculator" onClick={closeMobileMenu} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', padding: '8px 0' }}>세금 계산기</Link>
              <Link to="/guides" onClick={closeMobileMenu} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', padding: '8px 0' }}>가이드</Link>
              <Link to="/methodology" onClick={closeMobileMenu} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px', padding: '8px 0' }}>방법론</Link>
              <Link to="/report" onClick={closeMobileMenu} className="btn btn-primary" style={{ width: '100%', boxSizing: 'border-box', padding: '12px', textAlign: 'center' }}>
                무료 리포트 신청
              </Link>
            </div>
          )}
        </header>

        {/* Global Page Content Layout */}
        <main style={{ flex: 1, position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/:slug" element={<AssetDetail />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/tax-calculator" element={<TaxCalculator />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/risk" element={<Risk />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </main>

        {/* Global Footer (Strict Compliance Disclaimers Built-In) */}
        <footer style={{ backgroundColor: '#06090f', borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '40px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <div className="container">
            
            {/* Regulatory Disclaimer Text */}
            <div style={{ padding: '20px 24px', backgroundColor: 'rgba(13, 20, 35, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', lineHeight: 1.7, marginBottom: '32px' }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert style={{ color: 'var(--accent)', width: '16px', height: '16px' }} /> 법적 면책 고지
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                본 사이트의 정보는 가상자산 스테이킹 및 온체인 보상률에 대한 일반 정보 제공을 목적으로 하며, 투자 권유 또는 금융상품 판매·중개를 목적으로 하지 않습니다.
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                표시된 APY, APR, 보상률은 네트워크 상황, 검증인 성과, 수수료, 토큰 가격, 정책 변경 등에 따라 변동될 수 있으며, 원금 또는 수익을 보장하지 않습니다.
              </p>
              <p style={{ margin: 0 }}>
                가상자산은 높은 변동성과 손실 위험이 있으며, 이용자는 각 제공업체의 공식 약관과 위험 고지를 직접 확인한 후 스스로 판단해야 합니다.
              </p>
            </div>

            {/* Sitemap & Copyrights */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'var(--sans-outfit)' }}>StakingMax</span>
                <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '12px' }}>
                  © {new Date().getFullYear()} StakingMax. All rights reserved. (투자 권유 아님)
                </p>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/risk" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>위험고지</Link>
                <Link to="/methodology" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>방법론</Link>
                <Link to="/guides" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>이용안내</Link>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
