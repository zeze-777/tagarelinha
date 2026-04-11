import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgLogin from '../../../assets/images/2-Tagarelinha_login.png';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/app/categories');
  };

  return (
    <div 
      className="bg-tico-fullscreen w-full h-screen overflow-hidden relative" 
      style={{ 
        backgroundImage: `url(${bgLogin})`,
        fontFamily: "'Fredoka', sans-serif" 
      }}
    >
      {/* Container Relativo para os elementos fixos */}
      <div className="absolute inset-0 w-full h-full">
        
        {/* Campo USUÁRIO / EMAIL */}
        <input 
          type="text" 
          placeholder="USUÁRIO / EMAIL"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none border-none focus:ring-2 focus:ring-blue-200"
          style={{
            position: 'absolute',
            left: '680px', // Ajuste este X para o valor exato do seu design
            top: '200px',  // Ajuste este Y para o valor exato do seu design
            width: '500px',
            height: '45px'
          }}
        />

        {/* Campo SENHA */}
        <input 
          type="password" 
          placeholder="SENHA"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none border-none focus:ring-2 focus:ring-blue-200"
          style={{
            position: 'absolute',
            left: '680px', // Mesmo X do usuário para alinhar verticalmente
            top: '255px',  // Y um pouco abaixo
            width: '500px',
            height: '45px'
          }}
        />

        {/* Botão ENTRAR (conforme solicitado anteriormente) */}
        <button 
          onClick={handleLogin}
          className="bg-[#128298] text-[#FFFFFF] hover:bg-blue-600 text-white font-bold rounded-full shadow-lg flex items-center justify-center uppercase"
          style={{ 
            position: 'absolute',
            left: '690px',
            top: '310px',
            width: '100px', 
            height: '25px',
            fontSize: '11px'
          }}
        >
          ENTRAR
        </button>

  {/* Link ESQUECI MINHA SENHA */}
<button 
  onClick={() => navigate('/forgot-password')}
  className="bg-transparent text-[#128298] font-bold hover:underline transition-all border-none outline-none appearance-none cursor-pointer"
  style={{
    position: 'absolute',
    left: '1030px', 
    top: '310px',  
    fontSize: '12px',
    padding: 0
  }}
>
  Esqueci minha senha
</button>

{/* Link CADASTRE-SE */}
<button 
  onClick={() => navigate('/register')} // Altere para a rota correta do seu projeto
  className="bg-transparent text-[#128298] font-black hover:text-blue-700 transition-colors border-none outline-none cursor-pointer p-0"
  style={{
    position: 'absolute',
    left: '700px', // Mesmo X do esqueci minha senha para alinhar na vertical
    top: '500px',  // Um pouco abaixo do esqueci minha senha (que está em 310px)
    fontSize: '16px',
    fontFamily: "'Fredoka', sans-serif",
    textDecoration: 'underline'
  }}
>
  Não tem conta? Cadastre-se aqui!
</button>
      </div>
    </div>
  );
};