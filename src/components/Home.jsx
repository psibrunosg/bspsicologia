import React from 'react';

export default function Home({ onSelectModule }) {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '28px' }}>Selecione o Módulo</h2>
      <p style={{ color: '#718096', marginBottom: '40px', fontSize: '16px' }}>Qual tipo de relatório psicológico você deseja gerar hoje?</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Card Esquemas */}
        <div 
          onClick={() => onSelectModule('esquemas')}
          style={{ 
            backgroundColor: 'white', padding: '30px', borderRadius: '12px', cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '2px solid transparent',
            transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🧠</div>
          <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Terapia do Esquema</h3>
          <p style={{ color: '#718096', fontSize: '14px', lineHeight: '1.5' }}>
            Mapa completo de Esquemas e Modos (YSQ, SMI, YPI, YCI, YRAI).
          </p>
        </div>

        {/* Card Beck */}
        <div 
          onClick={() => onSelectModule('beck')}
          style={{ 
            backgroundColor: 'white', padding: '30px', borderRadius: '12px', cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '2px solid transparent',
            transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
          <h3 style={{ color: 'var(--primary-light)', marginBottom: '10px' }}>Escalas Beck (TCC)</h3>
          <p style={{ color: '#718096', fontSize: '14px', lineHeight: '1.5' }}>
            Inventários de Depressão (BDI), Ansiedade (BAI) e Desesperança (BHS).
          </p>
        </div>

      </div>
    </div>
  );
}
