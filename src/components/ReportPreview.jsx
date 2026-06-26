import React from 'react';

export default function ReportPreview({ patientData, scores }) {
  const highSchemas = Object.entries(scores.ysq).filter(([k, v]) => v >= 5.0).map(([k, v]) => k);
  
  const generateDynamicSchemas = () => {
    const high = Object.entries(scores.ysq).filter(([k,v]) => v >= 5.0);
    if (high.length === 0) return <p>Não foram identificados esquemas iniciais com pontuação clinicamente significativa (acima de 5.0).</p>;

    const dict = {
      abandono: `um desespero e medo constante de ser deixada ou trocada (Nota ${scores.ysq.abandono.toFixed(1)})`,
      defectividade: `uma sensação dolorosa e secreta de ser "falha" por dentro (Nota ${scores.ysq.defectividade.toFixed(1)})`,
      desconfianca: `uma expectativa crônica de que as pessoas vão machucar ou tirar vantagem (Nota ${scores.ysq.desconfianca.toFixed(1)})`,
      privacao: `um vazio emocional e a crença de que nunca será compreendida ou acolhida (Nota ${scores.ysq.privacao.toFixed(1)})`,
      isolamento: `a sensação de estar desconectada do mundo e não pertencer a lugar algum (Nota ${scores.ysq.isolamento.toFixed(1)})`,
      
      dependencia: `uma forte insegurança sobre a própria capacidade de tomar decisões (Nota ${scores.ysq.dependencia.toFixed(1)})`,
      vulnerabilidade: `o medo exagerado de que uma catástrofe iminente está prestes a acontecer (Nota ${scores.ysq.vulnerabilidade.toFixed(1)})`,
      emaranhamento: `uma fusão emocional exagerada com figuras importantes (Nota ${scores.ysq.emaranhamento.toFixed(1)})`,
      fracasso: `a crença de que inevitavelmente irá fracassar perante os outros (Nota ${scores.ysq.fracasso.toFixed(1)})`,
      
      arrogo: `uma postura de exigir privilégios especiais (Nota ${scores.ysq.arrogo.toFixed(1)})`,
      autocontrole: `extrema dificuldade em tolerar frustrações ou restringir impulsos (Nota ${scores.ysq.autocontrole.toFixed(1)})`,
      
      subjugacao: `um hábito automático de engolir vontades e ceder aos outros para manter a paz (Nota ${scores.ysq.subjugacao.toFixed(1)})`,
      autoSacrificio: `um foco excessivo nas necessidades alheias em detrimento das próprias, gerando exaustão (Nota ${scores.ysq.autoSacrificio.toFixed(1)})`,
      buscaAprovacao: `uma necessidade enorme de ganhar o reconhecimento dos outros à custa do próprio eu (Nota ${scores.ysq.buscaAprovacao.toFixed(1)})`,
      
      negativismo: `uma mente sempre esperando pelo pior e focando nos aspectos negativos da vida (Nota ${scores.ysq.negativismo.toFixed(1)})`,
      inibicao: `o bloqueio excessivo da expressão de sentimentos e da espontaneidade (Nota ${scores.ysq.inibicao.toFixed(1)})`,
      padroes: `a busca implacável por atingir metas altíssimas, internalizando regras rígidas de perfeição (Nota ${scores.ysq.padroes.toFixed(1)})`,
      punitiva: `uma intolerância rígida, acreditando que erros (seus ou dos outros) devem ser severamente punidos (Nota ${scores.ysq.punitiva.toFixed(1)})`
    };

    const desconexao = ['abandono', 'defectividade', 'desconfianca', 'privacao', 'isolamento'].filter(k => scores.ysq[k] >= 5.0);
    const autonomia = ['dependencia', 'vulnerabilidade', 'emaranhamento', 'fracasso'].filter(k => scores.ysq[k] >= 5.0);
    const limites = ['arrogo', 'autocontrole'].filter(k => scores.ysq[k] >= 5.0);
    const outro = ['subjugacao', 'autoSacrificio', 'buscaAprovacao'].filter(k => scores.ysq[k] >= 5.0);
    const supervigilancia = ['negativismo', 'inibicao', 'padroes', 'punitiva'].filter(k => scores.ysq[k] >= 5.0);

    const joiner = (arr) => arr.map((k, i) => i === 0 ? dict[k] : (i === arr.length - 1 ? ` e ${dict[k]}` : `, ${dict[k]}`)).join('');

    return (
      <div style={{ lineHeight: '1.8' }}>
        {desconexao.length > 0 && (
          <p style={{marginBottom: '15px'}}>
            <strong>Domínio da Desconexão e Rejeição:</strong> No campo das relações mais profundas, a avaliação mostra cicatrizes que dificultam a segurança emocional. 
            É possível observar {joiner(desconexao)}. Essas feridas tornam muito difícil acreditar que o amor e a proteção dos outros são reais e duradouros.
          </p>
        )}
        {autonomia.length > 0 && (
          <p style={{marginBottom: '15px'}}>
            <strong>Domínio da Autonomia Prejudicada:</strong> Em relação à visão de si mesmo diante do mundo, evidencia-se {joiner(autonomia)}.
          </p>
        )}
        {limites.length > 0 && (
          <p style={{marginBottom: '15px'}}>
            <strong>Domínio de Limites Prejudicados:</strong> O funcionamento apresenta {joiner(limites)}.
          </p>
        )}
        {outro.length > 0 && (
          <p style={{marginBottom: '15px'}}>
            <strong>Domínio de Direcionamento para o Outro:</strong> A forma como lida com as próprias necessidades é fortemente anulada, destacando-se {joiner(outro)}. Isso cria um padrão constante de deixar o "próprio eu" em segundo plano para priorizar quem está ao redor.
          </p>
        )}
        {supervigilancia.length > 0 && (
          <p style={{marginBottom: '15px'}}>
            <strong>Domínio da Supervigilância e Inibição:</strong> O clima mental atual é altamente tensionado, evidenciando {joiner(supervigilancia)}. Existe um peso constante e dificuldade em relaxar.
          </p>
        )}
      </div>
    );
  };

  const generateDynamicModes = () => {
    const activeModes = Object.entries(scores.smi).filter(([k,v]) => v >= 4.0).map(([k,v]) => k);
    
    const hasPunitivo = activeModes.includes('paiPunitivo');
    const hasExigente = activeModes.includes('paiExigente');
    const hasVulneravel = activeModes.includes('criancaVulneravel');
    const hasZangada = activeModes.includes('criancaZangada');
    const hasDesligado = activeModes.includes('desligado');
    const hasCapitulador = activeModes.includes('capitulador');
    const hasSupercompensador = activeModes.includes('supercompensador');

    let paragraphs = [];

    if (hasPunitivo || hasExigente) {
      paragraphs.push(
        `No "Teatro da Mente", existe uma figura internalizada muito crítica. ` +
        (hasPunitivo ? `Uma <strong>Voz Punitiva (Nota ${scores.smi.paiPunitivo.toFixed(1)})</strong> ataca e culpa constantemente diante de qualquer imperfeição, provocando sentimentos de que é uma pessoa falha ou "ruim". ` : '') +
        (hasExigente ? `Isso se soma a uma <strong>Voz Exigente (Nota ${scores.smi.paiExigente.toFixed(1)})</strong> que dita regras rígidas de produtividade, fazendo sentir que nada nunca está bom o suficiente. ` : '')
      );
    }

    if (hasVulneravel || hasZangada) {
      paragraphs.push(
        `Como alvo dessas cobranças e das feridas do passado, existe ` +
        (hasVulneravel ? `uma <strong>Criança Vulnerável (Nota ${scores.smi.criancaVulneravel.toFixed(1)})</strong> que carrega enorme solidão, sentindo-se desamparada e apavorada com a rejeição. ` : 'uma Criança Interior que sofre com o peso do julgamento. ') +
        (hasZangada ? `Simultaneamente, há uma <strong>Criança Zangada (Nota ${scores.smi.criancaZangada.toFixed(1)})</strong> que guarda fúria contida por não ter suas necessidades básicas de afeto e segurança atendidas de forma justa.` : '')
      );
    }

    if (hasDesligado || hasCapitulador || hasSupercompensador) {
      let armaduras = [];
      if (hasDesligado) armaduras.push(`ao <strong>Protetor Desligado (Nota ${scores.smi.desligado.toFixed(1)})</strong>, que bloqueia os sentimentos e anestesia a mente (frequentemente através de isolamento, telas ou comida) para não sentir tanta dor`);
      if (hasCapitulador) armaduras.push(`ao <strong>Capitulador Complacente (Nota ${scores.smi.capitulador.toFixed(1)})</strong>, que abaixa a cabeça e anula as próprias vontades para evitar confrontos ou abandono`);
      if (hasSupercompensador) armaduras.push(`ao <strong>Supercompensador (Nota ${scores.smi.supercompensador.toFixed(1)})</strong>, que tenta controlar tudo e contra-atacar para nunca mais se mostrar vulnerável`);

      paragraphs.push(
        `Para conseguir sobreviver a esse turbilhão interno, foram desenvolvidas estratégias de defesa (Armaduras). Atualmente, o funcionamento recorre fortemente ` +
        armaduras.join('; e ') + 
        `. Essas defesas, embora tenham sido salva-vidas no passado, hoje bloqueiam a vivência de conexões autênticas e saudáveis.`
      );
    }

    if (scores.smi.adultoSaudavel < 4.0) {
      paragraphs.push(
        `Ressalta-se que o modo <strong>Adulto Saudável (Nota ${scores.smi.adultoSaudavel.toFixed(1)})</strong> encontra-se enfraquecido ou inativo, o que justifica a atual dificuldade em calar as vozes críticas e proteger a própria Criança Vulnerável sem recorrer às armaduras de evitação.`
      );
    }

    if (paragraphs.length === 0) paragraphs.push("Os modos não apresentam ativação clínica patológica neste momento.");

    return (
      <div style={{ lineHeight: '1.8' }}>
        {paragraphs.map((p, index) => (
          <p key={index} style={{ marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: p }}></p>
        ))}
      </div>
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
        
        <div 
          className="editable-text" 
          contentEditable={true} 
          suppressContentEditableWarning={true} 
          style={{marginBottom: '30px', padding: '10px'}}
        >
          <p>Olá, {patientData.name.split(' ')[0]}</p>
          <p>Este relatório não é um laudo frio, mas sim um espelho. Nós juntamos as peças dos questionários da Terapia do Esquema para desenhar o mapa do seu mundo emocional interno.</p>
        </div>

        <h2>1. As Suas Feridas Emocionais</h2>
        <p>Os esquemas são cicatrizes emocionais da nossa história. Baseado nos seus resultados, os principais gatilhos que geram sofrimento hoje são:</p>
        <div 
          className="editable-text" 
          contentEditable={true} 
          suppressContentEditableWarning={true} 
          style={{marginBottom: '30px', paddingLeft: '10px'}}
        >
          {generateDynamicSchemas()}
        </div>

        <h2>2. O Teatro da Mente (Seus Modos)</h2>
        <p>A nossa mente funciona em "partes". Dependendo da situação, uma voz ou armadura diferente assume o controle. Aqui estão as vozes internas mais ativas no seu funcionamento atual:</p>
        <div 
          className="editable-text" 
          contentEditable={true} 
          suppressContentEditableWarning={true} 
          style={{marginBottom: '30px', paddingLeft: '10px'}}
        >
          {generateDynamicModes()}
        </div>

        <h2>3. O Processo Terapêutico</h2>
        <div 
          className="editable-text" 
          contentEditable={true} 
          suppressContentEditableWarning={true} 
          style={{padding: '10px'}}
        >
          <p>Você não está desajustada, não é falha e nem é uma pessoa ruim. Você é apenas alguém que precisou vestir uma armadura para proteger uma criança ferida das vozes cruéis que moram na própria cabeça.</p>
          <p>O trabalho da terapia, a partir de agora, é calar essas vozes punitivas, acolher sua criança interior com muito afeto e ensinar as suas armaduras que elas já podem descansar, pois não estamos mais naquele perigo original.</p>
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
