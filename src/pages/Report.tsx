import { useState } from 'react';
import { Mail, Download, CheckCircle, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';

export default function Report() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 24px', maxWidth: '600px' }}>
      <SEO 
        title="가상자산 스테이킹 전문 리서치 보고서 무료 신청 | StakingMax" 
        description="이메일을 등록하시고 국내외 거래소 혜택 비교 리포트 및 온체인 검증인 분석 PDF 가이드를 무료로 다운로드 받아보세요. 마케팅 수신동의 포함."
      />

      <section style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Mail style={{ color: 'var(--primary)', width: '48px', height: '48px', marginBottom: '16px' }} />
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>리서치 보고서 무료 신청</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
          가상자산 리서치 팀이 정기 발간하는 **[2027 국내외 스테이킹 시장 동향 및 수수료 비교 보고서]** PDF 본문을 즉시 이메일로 받아보실 수 있습니다.
        </p>
      </section>

      {!isSubmitted ? (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">이메일 주소</label>
              <input
                type="email"
                className="form-input"
                required
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
              * 신청과 동시에 개인정보 수집 및 이메일 리포트 발송에 동의하시는 것으로 간주됩니다. 스팸 메일은 전송하지 않으며 동의 철회는 언제든 가능합니다.
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              보고서 이메일로 받기
            </button>
          </form>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', borderLeft: '4px solid var(--secondary)' }}>
          <CheckCircle style={{ color: 'var(--secondary)', width: '48px', height: '48px', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>보고서 전송이 완료되었습니다!</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
            입력하신 주소(<strong>{email}</strong>)로 다운로드 링크를 동시 발송했습니다. 아래에서 즉시 보고서를 저장하실 수도 있습니다.
          </p>
          <a
            href="https://assets.stakingmax.com/reports/stakingmax_report_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex', gap: '8px', padding: '10px 20px' }}
            onClick={(e) => {
              e.preventDefault();
              alert('목업 리포트 다운로드가 시작되었습니다. (샘플 가상 파일)');
            }}
          >
            <Download style={{ width: '18px', height: '18px' }} /> 리포트 PDF 즉시 다운로드
          </a>
        </div>
      )}

      {/* Advisory Notice */}
      <section className="alert-box" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginTop: '32px' }}>
        <ShieldAlert style={{ color: 'var(--accent)', flexShrink: 0, width: '24px', height: '24px', marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>리서치 한계 고지 (투자 권유 아님)</strong>
          제공하는 모든 분석 콘텐츠는 시장 동향 요약본으로 개개인의 특정 상황에 맞춘 투자 권고가 아니며, 미래의 온체인 보상률(APY)을 보장하지 않습니다. 실제 투자 가입 여부는 원천 제공자의 최신 공시를 면밀히 재검토하여 자율적으로 결정하십시오.
        </div>
      </section>
    </div>
  );
}
