import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'bruno2026') {
      onLogin();
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Acesso Restrito</h2>
        <p style={{ color: '#718096', marginBottom: '30px', fontSize: '14px' }}>Gerador de Parecer Psicológico</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Senha de Acesso</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e0', borderRadius: '4px', fontSize: '16px' }}
              placeholder="Digite a senha..."
            />
            {error && <div style={{ color: 'var(--danger)', fontSize: '13px', marginTop: '5px' }}>{error}</div>}
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
