import React from 'react';

export default function PatientForm({ data, setData, setScores, next }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      parseMDContent(content);
    };
    reader.readAsText(file);
    // Reset input so the same file can be uploaded again if needed
    e.target.value = null;
  };

  const parseMDContent = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    let currentSection = '';
    
    let newData = { ...data };
    let newScores = { ysq: {}, ypiMae: {}, ypiPai: {}, smi: {}, yci: {}, yrai: {} };

    lines.forEach(line => {
      if (line.startsWith('[')) {
        currentSection = line.replace('[', '').replace(']', '');
        return;
      }
      
      const parts = line.split(':');
      if (parts.length < 2) return;
      
      const key = parts[0].trim();
      const val = parts[1].trim();

      if (currentSection === 'DADOS') {
        if (key === 'Nome') newData.name = val;
        if (key === 'Nascimento') newData.dob = val;
        if (key === 'Sexo') newData.sex = val;
        if (key === 'Escolaridade') newData.education = val;
        if (key === 'Profissional') newData.profName = val;
        if (key === 'CRP') newData.crp = val;
        if (key === 'Data') newData.evalDate = val;
      } else {
        let stateKey = key.charAt(0).toLowerCase() + key.slice(1);
        const numVal = parseFloat(val);
        
        if (currentSection === 'YSQ') newScores.ysq[stateKey] = numVal;
        if (currentSection === 'SMI') newScores.smi[stateKey] = numVal;
        if (currentSection === 'YPI_MAE') newScores.ypiMae[stateKey] = numVal;
        if (currentSection === 'YPI_PAI') newScores.ypiPai[stateKey] = numVal;
        if (currentSection === 'YCI') newScores.yci[stateKey] = numVal;
        if (currentSection === 'YRAI') newScores.yrai[stateKey] = numVal;
      }
    });

    setData(newData);
    setScores(prev => ({
      ysq: { ...prev.ysq, ...newScores.ysq },
      ypiMae: { ...prev.ypiMae, ...newScores.ypiMae },
      ypiPai: { ...prev.ypiPai, ...newScores.ypiPai },
      smi: { ...prev.smi, ...newScores.smi },
      yci: { ...prev.yci, ...newScores.yci },
      yrai: { ...prev.yrai, ...newScores.yrai }
    }));
    
    alert('Dados e Pontuações importados com sucesso!');
  };

  return (
    <div className="form-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
        <h2 style={{ borderBottom: 'none', margin: 0, padding: 0 }}>Dados do Avaliado e do Profissional</h2>
        <label style={{ cursor: 'pointer', backgroundColor: 'var(--primary)', color: 'white', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold' }}>
          📄 Importar Arquivo .MD
          <input type="file" accept=".md,.txt" style={{ display: 'none' }} onChange={handleFileUpload} />
        </label>
      </div>
      
      <p style={{marginBottom: '20px', color: '#718096'}}>Você pode digitar os dados manualmente abaixo ou importar um arquivo .md preenchido pelo paciente.</p>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Dados do Paciente</h3>
          <div className="input-group">
            <label>Nome Completo</label>
            <input name="name" value={data.name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Nascimento / Idade</label>
            <input name="dob" value={data.dob} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Sexo</label>
            <select name="sex" value={data.sex} onChange={handleChange}>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="input-group">
            <label>Escolaridade</label>
            <input name="education" value={data.education} onChange={handleChange} />
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h3>Dados da Avaliação</h3>
          <div className="input-group">
            <label>Profissional Responsável</label>
            <input name="profName" value={data.profName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>CRP</label>
            <input name="crp" value={data.crp} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Data da Avaliação</label>
            <input name="evalDate" value={data.evalDate} onChange={handleChange} />
          </div>
        </div>
      </div>
      <button className="btn-next" onClick={next}>Próximo: Pontuações ➔</button>
    </div>
  );
}
