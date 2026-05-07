import React from 'react';
import { useNavigate } from 'react-router-dom';

import imgComunicacao from '../../../assets/images/Comunicacao_categoria.png';
import imgDiversao from '../../../assets/images/Diversao_categoria.jpg';
import imgRotina from '../../../assets/images/Rotina_categoria.png';
import imgSentimento from '../../../assets/images/Sentimento_categoria.png';
import bgImage from '../../../assets/images/4-Tagarelinha_background.png';

export const Categories: React.FC = () => {
  const navigate = useNavigate();

  const categorias = [
    { id: 'comunicacao', name: 'Comunicação', img: imgComunicacao },
    { id: 'diversao', name: 'Diversão', img: imgDiversao },
    { id: 'rotina', name: 'Rotina', img: imgRotina },
    { id: 'sentimento', name: 'Sentimento', img: imgSentimento },
  ];

  return (
    <div
      className="w-full min-h-[100dvh] flex flex-col items-center justify-start bg-blue-100 px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: "'Fredoka One', cursive",
      }}
    >
      {/* Botão voltar e perfil */}
      <div className="w-full max-w-md flex justify-between items-center mt-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-[#409B8C] text-[#FFF] hover:bg-blue-600 rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={() => navigate("/app/profile")}
          className="bg-[#409B8C] text-[#FFF] hover:bg-[#2e7d6e] rounded-full shadow-lg px-4 h-10 flex items-center justify-center font-bold transition-colors"
        >
          PERFIL
        </button>
      </div>

      {/* Título */}
      <h1
        className="mt-6 text-center text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter"
        style={{
          color: '#2a68cc',
          fontWeight: 'bold',
        }}
      >
        ESCOLHA UM TEMA
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-y-24 gap-x-8 sm:gap-20 w-full max-w-2xl mt-10 justify-items-center">
  {categorias.map((cat) => (
    <div
      key={cat.id}
      className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[300px]"
    >
      <span className="text-[#409B8C] text-base sm:text-lg font-bold uppercase tracking-wide text-center">
        {cat.name}
      </span>

      <div className="w-full mt-8 sm:mt-12 rounded-[20px] overflow-hidden shadow-lg">
        <img
          src={cat.img}
          alt={cat.name}
          className="w-full h-36 sm:h-44 md:h-52 object-cover cursor-pointer transition-transform active:scale-95 hover:scale-105"
          onClick={() => navigate(`/app/categories/${cat.id}/actions`)}
        />
      </div>
    </div>
  ))}
</div>
    </div>
  );
};