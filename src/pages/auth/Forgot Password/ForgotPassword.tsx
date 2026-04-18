import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgRegister from '../../../assets/images/4-Tagarelinha_background.png';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('Digite seu e-mail!');
      return;
    }

    
    alert('Verifique seu e-mail para redefinir a senha.');
    navigate('/login');
  };

  return (
    <div
  className="w-full h-screen relative bg-cover bg-center"
  style={{ backgroundImage: `url(${bgRegister})` }}
>
  <div
  className="w-full h-screen relative bg-cover bg-center"
  style={{ backgroundImage: `url(${bgRegister})` }}
>
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold mb-8 text-center">
      Recuperar Senha
    </h1>

    {/* Email */}
    <input
      type="email"
      placeholder="Digite seu e-mail"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="mb-6 p-3 w-96 border rounded text-lg"
    />

    {/* Botões */}
    <div className="flex gap-6">
      <button
        onClick={handleRecover}
        className="px-6 py-3 bg-blue-600 text-white rounded text-lg"
      >
        Enviar
      </button>
      <button
        onClick={() => navigate('/login')}
        className="px-8 py-4 bg-gray-500 text-black rounded text-lg"
      >
        Voltar
      </button>
    </div>
  </div>
</div>
</div>
  );
};