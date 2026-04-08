import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgRegister from '../../../assets/images/4-Tagarelinha_background.png'; // Reutilizando o fundo para manter a identidade

export const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-tico-fullscreen w-full h-screen overflow-hidden relative" 
      style={{ 
        backgroundImage: `url(${bgRegister})`,
        fontFamily: "'Fredoka', sans-serif" 
      }}
    >
      {/* Camada de coordenadas (Overlay) */}
      <div className="absolute inset-0 w-full h-full">
        
        {/* Título da Tela */}
        <h1 
          className="text-[#42A5F5] font-black uppercase tracking-widest"
          style={{
            position: 'absolute',
            left: '500px',
            top: '80px',
            fontSize: '32px'
          }}
        >
          Criar Nova Conta
        </h1>

        
        {/* Botão para Voltar ao Login */}
        <button 
          onClick={() => navigate('/login')}
          className="bg-transparent text-gray-500 font-bold hover:text-blue-500 transition-all border-none outline-none cursor-pointer p-0 underline"
          style={{
            position: 'absolute',
            left: '530px',
            top: '470px',
            fontSize: '16px'
          }}
        >
          Já tem uma conta? Voltar para o login
        </button>

      </div>
    </div>
  );
};