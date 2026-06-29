import React from 'react';

export default function PatientForm({ data, setData, setScores, next, module = 'esquemas' }) {
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
    e.target.value = null;
  };

  const parseMDContent = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    let currentSection = '';
    
    let newData = { ...data };
    let newEsquemaScores = { ysq: {}, ypiMae: {}, ypiPai: {}, smi: {}, yci: {}, yrai: {} };
    let newBeckScores = { bdi: 0, bai: 0, bhs: 0 };

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
      } else if (module === 'beck' && currentSection === 'BECK') {
        if (key === 'BDI') newBeckScores.bdi = parseInt(val);
        if (key === 'BAI') newBeckScores.bai = parseInt(val);
        if (key === 'BHS') newBeckScores.bhs = parseInt(val);
      } else if (module === 'esquemas') {
        let stateKey = key.charAt(0).toLowerCase() + key.slice(1);
        const numVal = parseFloat(val);
        
        if (currentSection === 'YSQ') newEsquemaScores.ysq[stateKey] = numVal;
        if (currentSection === 'SMI') newEsquemaScores.smi[stateKey] = numVal;
        if (currentSection === 'YPI_MAE') newEsquemaScores.ypiMae[stateKey] = numVal;
        if (currentSection === 'YPI_PAI') newEsquemaScores.ypiPai[stateKey] = numVal;
        if (currentSection === 'YCI') newEsquemaScores.yci[stateKey] = numVal;
        if (currentSection === 'YRAI') newEsquemaScores.yrai[stateKey] = numVal;
      }
    });

    setData(newData);
    if (module === 'beck') {
      setScores(prev => ({ ...prev, ...newBeckScores }));
    } else {
      setScores(prev => ({
        ysq: { ...prev.ysq, ...newEsquemaScores.ysq },
        ypiMae: { ...prev.ypiMae, ...newEsquemaScores.ypiMae },
        ypiPai: { ...prev.ypiPai, ...newEsquemaScores.ypiPai },
        smi: { ...prev.smi, ...newEsquemaScores.smi },
        yci: { ...prev.yci, ...newEsquemaScores.yci },
        yrai: { ...prev.yrai, ...newEsquemaScores.yrai }
      }));
    }
    
    alert('Dados importados com sucesso!');
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
