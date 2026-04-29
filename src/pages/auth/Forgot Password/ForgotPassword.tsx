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
      className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none"
      style={{
            position: 'absolute',
            left: '480px',
            top: '355px',
            width: '500px',
            height: '45px'
          }}
    />

    {/* Botões */}
    <div className="flex gap-6">
      <button
        onClick={handleRecover}
        className="bg-[#128298] text-[#FFFFFF] hover:bg-blue-600 text-white font-bold rounded-full shadow-lg flex items-center justify-center uppercase"
        style={{
            position: 'absolute',
            left: '630px',
            top: '410px',
            width: '70px',
            height: '25px'
          }}
      >
        Enviar
      </button>
      <button
        onClick={() => navigate('/login')}
        className="bg-[#128298] text-[#FFFFFF] hover:bg-blue-600 text-white font-bold rounded-full shadow-lg flex items-center justify-center uppercase"
        style={{
            position: 'absolute',
            left: '720px',
            top: '410px',
            width: '70px',
            height: '25px'
          }}
      >
        Voltar
      </button>
    </div>
  </div>
</div>
</div>
  );
};