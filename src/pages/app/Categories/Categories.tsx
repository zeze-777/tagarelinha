// ... imports anteriores mantidos ...

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importação dos cards
import imgComunicacao from '../../../assets/images/Comunicacao_categoria.png';
import imgDiversao from '../../../assets/images/Diversao_categoria.jpg';
import imgRotina from '../../../assets/images/Rotina_categoria.png';
import imgSentimento from '../../../assets/images/Sentimento_categoria.png';
export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const nomeArquivoFundo = "3-Tagarelinha_background.png"; 

  const categorias = [
    { id: 'comunicacao', name: 'Comunicação', img: imgComunicacao, x: '300px', y: '130px', w: '350px', h: '200px' },
    { id: 'diversao', name: 'Diversão', img: imgDiversao, x: '700px', y: '130px', w: '350px', h: '200px' },
    { id: 'rotina', name: 'Rotina', img: imgRotina, x: '300px', y: '400px', w: '350px', h: '200px' },
    { id: 'sentimento', name: 'Sentimento', img: imgSentimento, x: '700px', y: '400px', w: '350px', h: '200px' },
  ];

  return (
    <div 
      className="w-full h-screen relative overflow-hidden bg-blue-100"
      style={{ 
        backgroundImage: `url(/src/assets/images/${nomeArquivoFundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Aplicando Fredoka One como base
        fontFamily: "'Fredoka One', cursive" 
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Título com Fredoka One */}
        <h1 
  className="absolute top-8 w-full text-center text-4xl uppercase tracking-tighter"
  style={{ 
    color: '#2a68cc', 
    fontFamily: "'Fredoka One', cursive",
    fontWeight: 'bold' 
  }}
>
  ESCOLHA UM TEMA
</h1>

        {categorias.map((cat) => (
          <div 
            key={cat.id}
            style={{ 
              position: 'absolute',
              left: cat.x,
              top: cat.y,
              width: cat.w,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {/* Legenda com Fredoka One */}
            <span 
              style={{ 
                color: '#409B8C', 
                fontSize: '16px', 
                fontFamily: "'Fredoka One', cursive", // Aqui garantimos a fonte exata
                fontWeight: 'bold', // Força o negrito no navegador
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {cat.name}
            </span>

            <button
              onClick={() => navigate(`/app/categories/${cat.id}/actions`)}
              className="border-none outline-none cursor-pointer transition-all active:scale-95 hover:brightness-110 bg-transparent p-0 rounded-[20px] overflow-hidden shadow-2xl w-full"
              style={{ 
                height: cat.h,
                backgroundImage: `url(${cat.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <span className="sr-only">{cat.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};