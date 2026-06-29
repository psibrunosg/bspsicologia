import React from 'react';

export default function BeckScoresForm({ scores, setScores, next }) {
  const handleChange = (e) => {
    setScores({ ...scores, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  return (
    <div className="form-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
        <h2 style={{ borderBottom: 'none', margin: 0, padding: 0 }}>Pontuações das Escalas Beck</h2>
      </div>

      <p style={{marginBottom: '20px', color: '#718096'}}>Insira a <strong>Soma Total</strong> de cada inventário abaixo.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <div className="input-group">
          <label>BDI (Depressão)</label>
          <input type="number" name="bdi" value={scores.bdi} onChange={handleChange} min="0" max="63" />
        </div>
        
        <div className="input-group">
          <label>BAI (Ansiedade)</label>
          <input type="number" name="bai" value={scores.bai} onChange={handleChange} min="0" max="63" />
        </div>
        
        <div className="input-group">
          <label>BHS (Desesperança)</label>
          <input type="number" name="bhs" value={scores.bhs} onChange={handleChange} min="0" max="20" />
        </div>
      </div>

      <button className="btn-next" onClick={next}>Próximo: Gerar Relatório ➔</button>
    </div>
  );
}
