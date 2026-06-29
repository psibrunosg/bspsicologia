import React from 'react';

export default function BeckReportPreview({ patientData, scores }) {
  // Classification Logic
  const getBDI = (val) => {
    if (val <= 13) return { label: 'Mínima', color: 'var(--text-color)' };
    if (val <= 19) return { label: 'Leve', color: '#ecc94b' };
    if (val <= 28) return { label: 'Moderada', color: 'var(--warning)' };
    return { label: 'Grave', color: 'var(--danger)' };
  };

  const getBAI = (val) => {
    if (val <= 10) return { label: 'Mínima', color: 'var(--text-color)' };
    if (val <= 19) return { label: 'Leve', color: '#ecc94b' };
    if (val <= 29) return { label: 'Moderada', color: 'var(--warning)' };
    return { label: 'Grave', color: 'var(--danger)' };
  };

  const getBHS = (val) => {
    if (val <= 4) return { label: 'Mínima', color: 'var(--text-color)' };
    if (val <= 8) return { label: 'Leve', color: '#ecc94b' };
    if (val <= 13) return { label: 'Moderada', color: 'var(--warning)' };
    return { label: 'Grave', color: 'var(--danger)' };
  };

  const bdiStatus = getBDI(scores.bdi);
  const baiStatus = getBAI(scores.bai);
  const bhsStatus = getBHS(scores.bhs);

  const generateDynamicText = () => {
    let paragraphs = [];

    // Depression text
    if (scores.bdi > 13) {
      paragraphs.push(
        `A avaliação dos sintomas depressivos (Inventário de Depressão de Beck - BDI) indica uma sintomatologia <strong>${bdiStatus.label.toLowerCase()} (Nota ${scores.bdi})</strong>. Observa-se a presença de distorções cognitivas características do espectro depressivo, como humor rebaixado, perda de energia, pessimismo ou sentimento de culpa, que estão impactando o funcionamento global do paciente.`
      );
    } else {
      paragraphs.push(
        `A avaliação pelo Inventário de Depressão de Beck (BDI) indicou sintomas em nível <strong>Mínimo (Nota ${scores.bdi})</strong>, descartando, no momento, um quadro depressivo clinicamente significativo que demande intervenção aguda isolada.`
      );
    }

    // Anxiety text
    if (scores.bai > 10) {
      paragraphs.push(
        `No que tange aos sintomas de ansiedade (Inventário de Ansiedade de Beck - BAI), os resultados apontam para um nível <strong>${baiStatus.label.toLowerCase()} (Nota ${scores.bai})</strong>. O quadro é marcado por manifestações somáticas e cognitivas de tensão, alerta exacerbado e apreensão constante.`
      );
    } else {
      paragraphs.push(
        `Quanto aos sintomas ansiosos (Inventário de Ansiedade de Beck - BAI), a pontuação encontra-se em grau <strong>Mínimo (Nota ${scores.bai})</strong>, não caracterizando um prejuízo ansioso primário na atual janela de avaliação.`
      );
    }

    // Hopelessness and Suicidal Risk text
    if (scores.bhs > 4) {
      let baseText = `O Inventário de Desesperança de Beck (BHS) revelou um nível <strong>${bhsStatus.label.toLowerCase()} (Nota ${scores.bhs})</strong> de desesperança em relação ao futuro. O paciente manifesta descrença na melhoria de sua situação atual, sugerindo uma visão de túnel cognitivo onde o futuro se apresenta sombrio e imutável.`;
      
      // Critical check for suicide risk
      if (scores.bhs >= 9) {
        baseText += ` <span style="color: var(--danger); font-weight: bold;">CUIDADO CLÍNICO: A pontuação de desesperança atinge um limiar crítico (>= 9), o que constitui um forte preditor de ideação e risco suicida. Recomenda-se monitoramento rigoroso, avaliação qualitativa complementar de risco de vida e estruturação imediata de plano de segurança (safety planning).</span>`;
      }
      paragraphs.push(baseText);
    } else {
      paragraphs.push(
        `A avaliação da desesperança (Inventário de Desesperança de Beck - BHS) demonstrou resultados em nível <strong>Mínimo (Nota ${scores.bhs})</strong>. O paciente mantém uma perspectiva fundamentalmente preservada e realista a respeito de suas possibilidades futuras, configurando-se como um forte fator protetivo e de resiliência clínica.`
      );
    }

    return (
      <div style={{ lineHeight: '1.8' }}>
        {paragraphs.map((p, index) => (
          <p key={index} style={{ marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: p }}></p>
        ))}
      </div>
    );
  };

  return (
    <div className="report-preview">
      {/* Cover Page */}
      <div className="pdf-cover">
        <h1>ESCALAS<br/>BECK</h1>
        <h2>Relatório de Avaliação Cognitiva</h2>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className="data-box" style={{borderLeft: '5px solid var(--primary)'}}>
            <h3>Dados do Avaliado</h3>
            <p><strong>NOME:</strong> {patientData.name}</p>
            <p><strong>NASCIMENTO / IDADE:</strong> {patientData.dob}</p>
            <p><strong>SEXO:</strong> {patientData.sex}</p>
            <p><strong>ESCOLARIDADE:</strong> {patientData.education}</p>
          </div>
          <div className="data-box" style={{borderLeft: '5px solid var(--secondary)'}}>
            <h3>Dados da Avaliação</h3>
            <p><strong>DATA:</strong> {patientData.evalDate}</p>
            <p><strong>PROFISSIONAL RESPONSÁVEL:</strong> {patientData.profName}</p>
            <p><strong>CRP:</strong> {patientData.crp}</p>
          </div>
        </div>
        
        <div style={{marginTop: 'auto', textAlign: 'center', fontSize: '11px', color: '#a0aec0', letterSpacing: '2px', fontWeight: 'bold'}}>
          ESTRITAMENTE CONFIDENCIAL
        </div>
      </div>
      
      {/* Page 2: Textos Dinâmicos */}
      <div className="page-break report-content">
        <div className="pdf-header no-screen">
          <div style={{fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px'}}>AVALIAÇÃO COGNITIVA (ESCALAS BECK)</div>
          <div style={{fontSize: '9px', fontWeight: 600, color: '#718096'}}>Psicologia Clínica</div>
        </div>
        
        <div 
          className="editable-text" 
          contentEditable={true} 
          suppressContentEditableWarning={true} 
          style={{marginBottom: '30px', padding: '10px'}}
        >
          <p>Olá, {patientData.name.split(' ')[0]}</p>
          <p>Este relatório apresenta a análise dos Inventários de Beck (TCC), instrumentos desenvolvidos para mapear a intensidade e a severidade de sintomas cognitivos, afetivos e fisiológicos atuais.</p>
        </div>

        <h2>Síntese Clínica</h2>
        
        <div 
          className="editable-text" 
          contentEditable={true} 
          suppressContentEditableWarning={true} 
          style={{marginBottom: '30px', paddingLeft: '10px'}}
        >
          {generateDynamicText()}
        </div>

        <div 
          className="editable-text" 
          contentEditable={true} 
          suppressContentEditableWarning={true} 
          style={{padding: '10px'}}
        >
          <p><strong>Considerações e Conduta:</strong> Os resultados psicométricos refletem um "fotograma" do funcionamento mental atual e devem sempre ser correlacionados com a história clínica do paciente.</p>
        </div>

        <div className="pdf-footer no-screen">
          <div>
            <strong>{patientData.profName}</strong><br/>
            Psicólogo Clínico - CRP {patientData.crp}
          </div>
          <div style={{textAlign: 'center', fontWeight: 'bold'}}>
            AVALIADO: {patientData.name}
          </div>
        </div>
      </div>

      {/* Page 3: Anexo Clínico P1 */}
      <div className="page-break report-content">
        <div className="pdf-header no-screen">
          <div style={{fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px'}}>AVALIAÇÃO COGNITIVA (ESCALAS BECK)</div>
          <div style={{fontSize: '9px', fontWeight: 600, color: '#718096'}}>Psicologia Clínica</div>
        </div>
        
        <h2>Anexo Clínico: Resultados Numéricos</h2>
        <p style={{fontSize: '13px', marginBottom: '30px'}}>Registro técnico das pontuações totais rastreadas nos Inventários.</p>
        
        <table>
          <thead>
            <tr>
              <th>INVENTÁRIO (BECK)</th>
              <th style={{textAlign: 'center'}}>PONTUAÇÃO OBTIDA</th>
              <th style={{textAlign: 'center'}}>GRAVIDADE CLÍNICA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>BDI</strong> (Depressão)</td>
              <td style={{textAlign: 'center', fontSize: '16px'}}><strong>{scores.bdi}</strong></td>
              <td style={{textAlign: 'center', fontWeight: 'bold', color: bdiStatus.color}}>{bdiStatus.label.toUpperCase()}</td>
            </tr>
            <tr>
              <td><strong>BAI</strong> (Ansiedade)</td>
              <td style={{textAlign: 'center', fontSize: '16px'}}><strong>{scores.bai}</strong></td>
              <td style={{textAlign: 'center', fontWeight: 'bold', color: baiStatus.color}}>{baiStatus.label.toUpperCase()}</td>
            </tr>
            <tr>
              <td><strong>BHS</strong> (Desesperança)</td>
              <td style={{textAlign: 'center', fontSize: '16px'}}><strong>{scores.bhs}</strong></td>
              <td style={{textAlign: 'center', fontWeight: 'bold', color: bhsStatus.color}}>{bhsStatus.label.toUpperCase()}</td>
            </tr>
          </tbody>
        </table>

        <div className="data-box" style={{marginTop: '50px', borderTop: '4px solid var(--secondary)'}}>
          <h3 style={{color: 'var(--primary)', marginBottom: '15px'}}>Tabela de Referência (Pontos de Corte)</h3>
          <ul style={{fontSize: '12px', lineHeight: '1.8', paddingLeft: '15px'}}>
            <li><strong>BDI (Depressão):</strong> Mínima (0-13) | Leve (14-19) | Moderada (20-28) | Grave (29-63)</li>
            <li><strong>BAI (Ansiedade):</strong> Mínima (0-10) | Leve (11-19) | Moderada (20-29) | Grave (30-63)</li>
            <li><strong>BHS (Desesperança):</strong> Mínima (0-4) | Leve (5-8) | Moderada (9-13) | Grave (14-20)</li>
          </ul>
        </div>

        <div className="pdf-footer no-screen">
          <div><strong>{patientData.profName}</strong></div>
          <div>AVALIADO: {patientData.name}</div>
        </div>
      </div>

    </div>
  );
}
