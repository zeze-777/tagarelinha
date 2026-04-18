import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import bgRegister from '../../../assets/images/4-Tagarelinha_background.png';

export const ResetPassword: React.FC = () => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token'); // vem do link enviado por e-mail

  const handleReset = async () => {
    if (!senha || !confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, senha })
    });

    if (response.ok) {
      alert('Senha redefinida com sucesso!');
      navigate('/login');
    } else {
      alert('Token inválido ou expirado.');
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgRegister})` }}
    >
      {/* Card centralizado */}
      <div className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none">
        <h1 className="text-2xl font-bold mb-6">Redefinir Senha</h1>

        {/* Nova Senha */}
        <input
          type="password"
          placeholder="Nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mb-4 p-2 w-full border rounded"
        />

        {/* Confirmar Senha */}
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="mb-6 p-2 w-full border rounded"
        />

        {/* Botões com espaçamento */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={handleReset}
            className="p-2 bg-blue-600 text-white rounded"
          >
            Enviar
          </button>

          <button
            onClick={() => navigate('/login')}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};