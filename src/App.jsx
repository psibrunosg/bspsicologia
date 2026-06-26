import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import ScoresForm from './components/ScoresForm';
import ReportPreview from './components/ReportPreview';
import Login from './components/Login';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('esquemasAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('esquemasAuth', 'true');
    setIsAuthenticated(true);
  };

  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState({
    name: 'Paciente Exemplo',
    dob: '01/01/1990',
    sex: 'Feminino',
    education: 'Ensino Superior',
    profName: 'Bruno de Souza Gonçalves',
    crp: '07/44472',
    evalDate: '27/06/2026'
  });

  const [scores, setScores] = useState({
    ysq: { abandono: 6.0, negativismo: 6.0, subjugacao: 5.8, desconfianca: 5.8, defectividade: 5.6, autoSacrificio: 5.4, vulnerabilidade: 5.2, isolamento: 5.0, fracasso: 5.0, padroes: 4.8, punitiva: 4.6, autocontrole: 4.2, dependencia: 4.0, inibicao: 4.0, emaranhamento: 3.8, buscaAprovacao: 3.8, arrogo: 3.4, privacao: 2.8 },
    ypiMae: { afeto: 6.0, superprotecao: 6.0, emaranhamento: 6.0, sacrificio: 6.0 },
    ypiPai: { exigencia: 6.0, pessimismo: 6.0, punitivo: 6.0, inibicao: 5.5 },
    smi: { capitulador: 6.0, desligado: 6.0, criancaVulneravel: 5.7, paiExigente: 5.4, criancaZangada: 5.1, paiPunitivo: 4.5, criancaImpulsiva: 3.0, criancaFeliz: 2.5, adultoSaudavel: 1.5, supercompensador: 1.3 },
    yci: { fachada: 6.0, defensividade: 6.0, perfeccionismo: 6.0, independencia: 5.8 },
    yrai: { fuga: 6.0, distracao: 6.0, isolamento: 6.0, somatizacao: 6.0 }
  });

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="no-print">
        <h1>Gerador de Relatórios Clínicos</h1>
        <button onClick={() => { localStorage.removeItem('esquemasAuth'); setIsAuthenticated(false); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#e53e3e', cursor: 'pointer', fontWeight: 'bold' }}>Sair</button>
      </header>

      <div className="wizard-nav no-print">
        <button className={step === 1 ? 'wizard-btn active' : 'wizard-btn'} onClick={() => setStep(1)}>1. Dados</button>
        <button className={step === 2 ? 'wizard-btn active' : 'wizard-btn'} onClick={() => setStep(2)}>2. Pontuações</button>
        <button className={step === 3 ? 'wizard-btn active' : 'wizard-btn'} onClick={() => setStep(3)}>3. Exportar PDF</button>
      </div>

      {step === 1 && <PatientForm data={patientData} setData={setPatientData} setScores={setScores} next={() => setStep(2)} />}
      {step === 2 && <ScoresForm scores={scores} setScores={setScores} next={() => setStep(3)} />}
      {step === 3 && (
        <div>
          <button className="print-btn no-print" onClick={() => window.print()}>🖨️ Imprimir / Salvar PDF</button>
          <ReportPreview patientData={patientData} scores={scores} />
        </div>
      )}
    </div>
  );
}

export default App;
