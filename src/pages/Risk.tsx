import { ShieldAlert, FileText, Lock, Users, Server } from 'lucide-react';
import SEO from '../components/SEO';

export default function Risk() {
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <SEO 
        title="가상자산 스테이킹 서비스 종합 위험 유의고지 | StakingMax" 
        description="가상자산이용자보호법 및 관계 법령에 의거, 스테이킹 참여 전 반드시 주의해야 할 가격 변동 위험, 락업 해제 제한, 슬래싱 패널티 리스크를 안내합니다."
      />

      <section style={{ marginBottom: '32px', textAlign: 'center' }}>
        <ShieldAlert style={{ color: 'var(--danger)', width: '64px', height: '64px', marginBottom: '16px' }} />
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>가상자산 스테이킹 위험 고지</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          본 고지서는 가상자산이용자보호법 및 표시광고법의 권장 요건을 준수하며 가상자산 검증 참여(스테이킹)의 주요 위험 요인을 정밀하게 고지합니다.
        </p>
      </section>

      {/* Main Core Disclaimers Panel */}
      <section className="card" style={{ borderLeft: '4px solid var(--danger)', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--danger)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText /> 4대 핵심 필수 유의사항
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', lineHeight: 1.7, color: 'var(--text-primary)' }}>
          <div>
            <strong>1. 투자 권유 아님 (Non-Solicitation)</strong>
            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
              StakingMax 내 모든 비교 분석표 및 시뮬레이션 수치는 정보 큐레이션 목적에 국한되며, 특정 가상자산 취득이나 특정 거래소 위임 상품 가입을 촉구하는 금융 투자 권유에 해당하지 않습니다.
            </p>
          </div>

          <div>
            <strong>2. 원금 보장 아님 (No Capital Guarantee)</strong>
            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
              스테이킹 자산은 예금자보호법 또는 금융위원회 투자예탁금 보호 대상이 아닙니다. 블록체인 노드 사고나 거래소 파산 시 <strong>예치한 가상자산 원금의 전부 또는 상당 부분의 손실</strong>이 야기될 수 있습니다.
            </p>
          </div>

          <div>
            <strong>3. 보상률 변동 가능 (Variable Staking Yields)</strong>
            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
              웹사이트 내 기재된 모든 예상 APY(연 보상률)는 고정 금리 이자가 아니며, 네트워크 참여 총 지분율, 가스 수수료 추이 및 해당 제공 업체의 마케팅 수수료 인상에 따라 수시로 변동됩니다.
            </p>
          </div>

          <div>
            <strong>4. 각 제공업체 공식 정보 확인 필요 (Due Diligence Required)</strong>
            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
              각 가상자산사업자(업비트, 빗썸, 코인원, 코빗 등)는 자체적인 위임 규정과 신청/해제 패널티 및 대행 약관을 운영 중이므로, 실제 전송 전 반드시 원천 제공사의 공시 규정을 확인해야 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Technical Risks */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        
        <div className="card">
          <Lock style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>유동성 동결 (Lock-up) 위험</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            블록체인 네트워크 프로토콜에 따라 언스테이킹 시 최소 3일에서 21일 이상의 락업 대기 기간이 강제 적용됩니다. 이 기간 동안 자산의 출금 및 타 지갑 이동, 시장 매도가 완전히 동결되므로 시장 변화에 기민하게 대처할 수 없습니다.
          </p>
        </div>

        <div className="card">
          <Server style={{ color: 'var(--danger)', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>노드 오작동 및 슬래싱</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            온체인 직접 위임 시, 선택한 검증 노드(Validator)의 보안 침해, 하드웨어 중단 또는 악의적 블록 위조 이력이 적발될 경우 합의 프로토콜 규칙에 의거하여 위임 금액의 일부가 즉시 삭감(Slashing) 소실됩니다.
          </p>
        </div>

        <div className="card">
          <Users style={{ color: 'var(--primary)', width: '28px', height: '28px', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>제3자 신용(수탁자) 위험</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            중앙화된 가상자산사업자(CEX)를 거치는 경우, 제공업체 자체의 내부 횡령, 배임, 해킹 공격, 정부 규제 철퇴로 인한 계정 거래 제한 등의 플랫폼 차원 신용 리스크가 전면 가중됩니다.
          </p>
        </div>

      </section>
    </div>
  );
}
