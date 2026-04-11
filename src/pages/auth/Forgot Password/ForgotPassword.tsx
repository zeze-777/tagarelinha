import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgRegister from '../../../assets/images/4-Tagarelinha_background.png';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha || !confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    alert('Senha redefinida com sucesso!');
    navigate('/login');
  };

  return (
    <div
      className="w-full h-screen relative"
      style={{ backgroundImage: `url(${bgRegister})` }}
    >
      <div className="absolute inset-0">

        <h1 style={{ position: 'absolute', left: '500px', top: '100px' }}>
          Recuperar Senha
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            position: 'absolute',
            left: '500px',
            top: '190px',
            width: '400px',
            height: '30px'
          }}
        />

        {/* Nova Senha */}
        <input
          type="password"
          placeholder="Nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            position: 'absolute',
            left: '500px',
            top: '240px',
            width: '400px',
            height: '30px'
          }}
        />

        {/* Confirmar Senha */}
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          style={{
            position: 'absolute',
            left: '500px',
            top: '290px',
            width: '400px',
            height: '30px'
          }}
        />

        {/* Botão */}
        <button
          onClick={handleRecover}
          style={{
            position: 'absolute',
            left: '500px',
            top: '340px'
          }}
        >
          Enviar
        </button>

        {/* Voltar */}
        <button
          onClick={() => navigate('/login')}
          style={{
            position: 'absolute',
            left: '500px',
            top: '400px'
          }}
        >
          Voltar
        </button>

      </div>
    </div>
  );
};