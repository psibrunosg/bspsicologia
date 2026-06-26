import React from 'react';

export default function ScoresForm({ scores, setScores, next }) {
  const handleScore = (category, field, value) => {
    setScores({
      ...scores,
      [category]: { ...scores[category], [field]: parseFloat(value) || 0 }
    });
  };

  const renderInputs = (category, obj) => {
    return (
      <div className="scores-grid">
        {Object.keys(obj).map(key => (
          <div className="input-group" key={key}>
            <label style={{textTransform: 'capitalize'}}>{key}</label>
            <input 
              type="number" 
              step="0.1"
              min="1" max="6"
              value={scores[category][key]} 
              onChange={(e) => handleScore(category, key, e.target.value)} 
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="form-section">
      <h2>Inserção de Resultados</h2>
      <p style={{marginBottom: '20px', color: '#718096'}}>Insira as médias obtidas nos testes clínicos (Escala de 1 a 6).</p>
      
      <h3>1. YSQ - Esquemas Iniciais</h3>
      {renderInputs('ysq', scores.ysq)}

      <hr style={{margin: '20px 0', border: '1px solid #e2e8f0'}}/>
      
      <h3>2. SMI - Modos de Esquema</h3>
      {renderInputs('smi', scores.smi)}

      <hr style={{margin: '20px 0', border: '1px solid #e2e8f0'}}/>

      <h3>3. YPI - Estilos Parentais</h3>
      <h4 style={{marginTop: '10px', color: '#4a5568'}}>Mãe</h4>
      {renderInputs('ypiMae', scores.ypiMae)}
      <h4 style={{marginTop: '10px', color: '#4a5568'}}>Pai</h4>
      {renderInputs('ypiPai', scores.ypiPai)}

      <hr style={{margin: '20px 0', border: '1px solid #e2e8f0'}}/>

      <h3>4. YCI - Supercompensação</h3>
      {renderInputs('yci', scores.yci)}

      <hr style={{margin: '20px 0', border: '1px solid #e2e8f0'}}/>

      <h3>5. YRAI - Evitação</h3>
      {renderInputs('yrai', scores.yrai)}

      <button className="btn-next" onClick={next}>Gerar Relatório Final ➔</button>
    </div>
  );
}
