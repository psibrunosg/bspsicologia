import React from 'react';

export default function ReportPreview({ patientData, scores }) {
  const highSchemas = Object.entries(scores.ysq).filter(([k, v]) => v >= 5.0).map(([k, v]) => k);
  
  const renderSchemas = () => {
    if (highSchemas.length === 0) return <p>Não foram identificados esquemas iniciais com pontuação clinicamente significativa.</p>;
    
    return highSchemas.map(s => {
      if (s === 'abandono') return <li key={s}><strong>Abandono (Nota {scores.ysq.abandono}):</strong> O desespero e o medo constante de ser deixada ou trocada pelas pessoas que ama. Essa ferida cria uma ansiedade latente nas relações.</li>;
      if (s === 'defectividade') return <li key={s}><strong>Defectividade e Vergonha (Nota {scores.ysq.defectividade}):</strong> Uma sensação dolorosa e secreta de ser "falha" por dentro. A crença de que, se alguém conhecer a verdadeira essência, não conseguirá amá-la.</li>;
      if (s === 'subjugacao') return <li key={s}><strong>Subjugação (Nota {scores.ysq.subjugacao}):</strong> O hábito automático de engolir vontades, ceder para os outros e tentar manter a paz a qualquer custo.</li>;
      if (s === 'negativismo') return <li key={s}><strong>Negativismo/Pessimismo (Nota {scores.ysq.negativismo}):</strong> A mente sempre esperando pelo pior.</li>;
      if (s === 'autoSacrificio') return <li key={s}><strong>Auto-Sacrifício (Nota {scores.ysq.autoSacrificio}):</strong> Foco excessivo nas necessidades alheias em detrimento das próprias, resultando em exaustão.</li>;
      if (s === 'desconfianca') return <li key={s}><strong>Desconfiança/Abuso (Nota {scores.ysq.desconfianca}):</strong> A expectativa crônica de que as pessoas vão machucar ou tirar vantagem, gerando constante hipervigilância.</li>;
      if (s === 'vulnerabilidade') return <li key={s}><strong>Vulnerabilidade (Nota {scores.ysq.vulnerabilidade}):</strong> O medo exagerado de que uma catástrofe está prestes a acontecer a qualquer momento.</li>;
      return <li key={s} style={{textTransform: 'capitalize'}}><strong>{s} (Nota {scores.ysq[s]}):</strong> Padrão emocional com impacto significativo.</li>;
    });
  };

  const renderModes = () => {
    return (
      <>
        {scores.smi.paiPunitivo >= 4.0 && (
          <li><strong>Voz Punitiva (Nota {scores.smi.paiPunitivo}):</strong> Uma cobrança interna severa que ataca, culpa e pune mentalmente diante de qualquer erro.</li>
        )}
        {scores.smi.paiExigente >= 4.0 && (
          <li><strong>Voz Exigente (Nota {scores.smi.paiExigente}):</strong> A sensação constante de que "nunca está bom o suficiente", impondo padrões altíssimos de perfeição.</li>
        )}
        {scores.smi.criancaVulneravel >= 4.0 && (
          <li><strong>A Criança Vulnerável (Nota {scores.smi.criancaVulneravel}):</strong> A parte interna que carrega a solidão, o medo agudo do abandono e a dor de não se sentir acolhida no mundo.</li>
        )}
        {scores.smi.criancaZangada >= 4.0 && (
          <li><strong>A Criança Zangada (Nota {scores.smi.criancaZangada}):</strong> A parte que guarda muita fúria contida por não ser ouvida e pelas necessidades emocionais não atendidas.</li>
        )}
        {scores.smi.desligado >= 4.0 && (
          <li><strong>O Protetor Desligado (Nota {scores.smi.desligado}):</strong> A armadura de fuga. Quando a dor ameaça transbordar, ocorre um "desligamento" (fuga, isolamento, anestesia com telas ou comida).</li>
        )}
        {scores.smi.capitulador >= 4.0 && (
          <li><strong>O Capitulador Complacente (Nota {scores.smi.capitulador}):</strong> O modo sobrevivente que abaixa a cabeça, anula as próprias vontades e concorda com tudo apenas para evitar o abandono.</li>
        )}
      </>
    );
  };

  const statusColor = (val) => {
    return val >= 5 ? 'var(--danger)' : val >= 4 ? 'var(--warning)' : 'var(--text-color)';
  };
  const statusLabel = (val) => {
    return val >= 5.5 ? 'Extremo' : val >= 5 ? 'Alto' : val >= 4 ? 'Moderado' : 'Baixo';
  };

  return (
    <div className="report-preview">
      {/* Cover Page */}
      <div className="pdf-cover">
        <h1>MAPA DE<br/>ESQUEMAS</h1>
        <h2>Relatório de Avaliação Psicológica</h2>
        
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
          <div style={{fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px'}}>MAPEAMENTO DE ESQUEMAS E MODOS</div>
          <div style={{fontSize: '9px', fontWeight: 600, color: '#718096'}}>Psicologia Clínica</div>
        </div>
        
        <div style={{marginBottom: '30px'}}>
          <p>Olá, {patientData.name.split(' ')[0]}</p>
          <p>Este relatório não é um laudo frio, mas sim um espelho. Nós juntamos as peças dos questionários da Terapia do Esquema para desenhar o mapa do seu mundo emocional interno.</p>
        </div>

        <h2>1. As Suas Feridas Emocionais</h2>
        <p>Os esquemas são cicatrizes emocionais da nossa história. Baseado nos seus resultados, os principais gatilhos que geram sofrimento hoje são:</p>
        <ul style={{marginBottom: '30px', paddingLeft: '20px'}}>
          {renderSchemas()}
        </ul>

        <h2>2. O Teatro da Mente (Seus Modos)</h2>
        <p>A nossa mente funciona em "partes". Dependendo da situação, uma voz ou armadura diferente assume o controle. Aqui estão as vozes internas mais ativas no seu funcionamento atual:</p>
        <ul style={{marginBottom: '30px', paddingLeft: '20px'}}>
          {renderModes()}
        </ul>

        <h2>3. O Processo Terapêutico</h2>
        <p>Você não está desajustada, não é falha e nem é uma pessoa ruim. Você é apenas alguém que precisou vestir uma armadura para proteger uma criança ferida das vozes cruéis que moram na própria cabeça.</p>
        <p>O trabalho da terapia, a partir de agora, é calar essas vozes punitivas, acolher sua criança interior com muito afeto e ensinar as suas armaduras que elas já podem descansar, pois não estamos mais naquele perigo original.</p>

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
          <div style={{fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px'}}>MAPEAMENTO DE ESQUEMAS E MODOS</div>
          <div style={{fontSize: '9px', fontWeight: 600, color: '#718096'}}>Psicologia Clínica</div>
        </div>
        
        <h2>Anexo Clínico: Resultados Numéricos</h2>
        <p style={{fontSize: '13px'}}>Registro técnico das pontuações médias (1 a 6).</p>
        
        <h3>1. YSQ-S3 (Esquemas)</h3>
        <table>
          <thead>
            <tr>
              <th>ESQUEMA</th>
              <th style={{textAlign: 'center'}}>PONTUAÇÃO</th>
              <th style={{textAlign: 'center'}}>STATUS CLÍNICO</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(scores.ysq).sort((a,b)=>b[1]-a[1]).map(([key, val]) => (
              <tr key={key}>
                <td style={{textTransform: 'capitalize'}}>{key}</td>
                <td style={{textAlign: 'center'}}><strong>{val.toFixed(1)}</strong></td>
                <td style={{textAlign: 'center', fontWeight: 'bold', color: statusColor(val)}}>{statusLabel(val)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pdf-footer no-screen">
          <div><strong>{patientData.profName}</strong></div>
          <div>AVALIADO: {patientData.name}</div>
        </div>
      </div>

      {/* Page 4: Anexo Clínico P2 */}
      <div className="page-break report-content">
        <div className="pdf-header no-screen">
          <div style={{fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px'}}>MAPEAMENTO DE ESQUEMAS E MODOS</div>
          <div style={{fontSize: '9px', fontWeight: 600, color: '#718096'}}>Psicologia Clínica</div>
        </div>
        
        <h3>2. SMI (Modos de Esquemas)</h3>
        <table>
          <thead>
            <tr>
              <th>MODO INTERNO</th>
              <th style={{textAlign: 'center'}}>PONTUAÇÃO</th>
              <th style={{textAlign: 'center'}}>STATUS CLÍNICO</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(scores.smi).sort((a,b)=>b[1]-a[1]).map(([key, val]) => (
              <tr key={key}>
                <td style={{textTransform: 'capitalize'}}>{key}</td>
                <td style={{textAlign: 'center'}}><strong>{val.toFixed(1)}</strong></td>
                <td style={{textAlign: 'center', fontWeight: 'bold', color: statusColor(val)}}>{statusLabel(val)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{display: 'flex', gap: '20px'}}>
          <div style={{flex: 1}}>
            <h3>3. YPI (Parentalidade)</h3>
            <div className="data-box" style={{borderTop: '4px solid var(--secondary)', background: '#f7fafc', padding: '15px'}}>
              <strong style={{color: 'var(--primary)'}}>MÃE:</strong>
              <ul style={{fontSize: '12px', paddingLeft: '15px', marginBottom: '10px'}}>
                {Object.entries(scores.ypiMae).sort((a,b)=>b[1]-a[1]).map(([k,v]) => <li key={k} style={{textTransform: 'capitalize'}}>{k}: {v.toFixed(1)}</li>)}
              </ul>
              <strong style={{color: 'var(--primary)'}}>PAI:</strong>
              <ul style={{fontSize: '12px', paddingLeft: '15px'}}>
                {Object.entries(scores.ypiPai).sort((a,b)=>b[1]-a[1]).map(([k,v]) => <li key={k} style={{textTransform: 'capitalize'}}>{k}: {v.toFixed(1)}</li>)}
              </ul>
            </div>
          </div>
          
          <div style={{flex: 1}}>
            <h3>4. Armaduras (YCI / YRAI)</h3>
            <div className="data-box" style={{borderTop: '4px solid var(--primary)', background: '#f7fafc', padding: '15px'}}>
              <strong style={{color: 'var(--primary)'}}>YCI (SUPERCOMPENSAÇÃO):</strong>
              <ul style={{fontSize: '12px', paddingLeft: '15px', marginBottom: '10px'}}>
                {Object.entries(scores.yci).sort((a,b)=>b[1]-a[1]).map(([k,v]) => <li key={k} style={{textTransform: 'capitalize'}}>{k}: {v.toFixed(1)}</li>)}
              </ul>
              <strong style={{color: 'var(--primary)'}}>YRAI (EVITAÇÃO):</strong>
              <ul style={{fontSize: '12px', paddingLeft: '15px'}}>
                {Object.entries(scores.yrai).sort((a,b)=>b[1]-a[1]).map(([k,v]) => <li key={k} style={{textTransform: 'capitalize'}}>{k}: {v.toFixed(1)}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="pdf-footer no-screen">
          <div><strong>{patientData.profName}</strong></div>
          <div>AVALIADO: {patientData.name}</div>
        </div>
      </div>

    </div>
  );
}
