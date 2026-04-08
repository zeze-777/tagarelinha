import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgNotFound from '../../assets/images/3-Tagarelinha_icones.png'; // Ajustado para .png

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center p-6"
      style={{ backgroundImage: `url(${bgNotFound})` }}
    >
      <div className="bg-white/90 p-12 rounded-[3rem] shadow-2xl text-center border-8 border-orange-100 max-w-md">
        <h1 className="text-6xl font-black text-orange-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Caminho não encontrado!</h2>
        
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all shadow-lg"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};