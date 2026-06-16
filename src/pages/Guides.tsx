import { useState } from 'react';
import { mockGuides } from '../data/mockData';
import { BookOpen, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';

export default function Guides() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // 첫 가이드 펼쳐둠

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title="가상자산 스테이킹 초보 가이드 및 사전 | StakingMax" 
        description="가상자산 스테이킹의 기본 개념, 온체인 지분증명 보상 원리부터 락업 동결, 슬래싱 등 투자 전 반드시 짚어봐야 할 핵심 리스크를 정밀 설명해 드립니다."
      />

      <section style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>스테이킹 입문 가이드</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
          가상자산 투자자가 갖추어야 할 기본 합의 알고리즘 메커니즘과 온체인 보상 획득 구조를 명쾌하게 학습할 수 있는 공간입니다.
        </p>
      </section>

      {/* Accordion Layout for Guides */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {mockGuides.map((guide, idx) => (
          <div 
            key={guide.slug} 
            className="card" 
            style={{ 
              padding: '0', 
              overflow: 'hidden', 
              borderColor: openIndex === idx ? 'var(--primary)' : 'var(--border-color)' 
            }}
          >
            {/* Header Trigger */}
            <div 
              onClick={() => toggleAccordion(idx)}
              style={{ 
                padding: '20px 24px', 
                cursor: 'pointer', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: openIndex === idx ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BookOpen style={{ color: openIndex === idx ? 'var(--primary)' : 'var(--text-secondary)' }} />
                <span style={{ fontWeight: 600, fontSize: '17px', color: openIndex === idx ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {guide.title}
                </span>
              </div>
              {openIndex === idx ? <ChevronUp style={{ color: 'var(--text-muted)' }} /> : <ChevronDown style={{ color: 'var(--text-muted)' }} />}
            </div>

            {/* Content Body */}
            {openIndex === idx && (
              <div 
                style={{ 
                  padding: '24px', 
                  borderTop: '1px solid var(--border-color)', 
                  lineHeight: 1.8, 
                  fontSize: '15px', 
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-line' 
                }}
              >
                {guide.content.trim()}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Learning Risks Advisory Notice */}
      <section className="alert-box" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <AlertTriangle style={{ color: 'var(--accent)', flexShrink: 0, width: '24px', height: '24px', marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>금융소비자 주의 고지 (투자 권유 아님)</strong>
          블록체인 스테이킹은 확정 수익 예적금이 아닙니다. 지분 위임의 주체인 검증노드의 기술적 실패 또는 코인 자체의 가격 급락 시 중대한 손실이 즉각 유발될 수 있음을 사전 인지하시기 바랍니다.
        </div>
      </section>
    </div>
  );
}
