import React from 'react';

// 1. Adicione o 'id' aqui na interface
interface ActionCardProps {
  id: string; // ✅ Adicione esta linha
  name: string;
  image_url: string;
  audio_url: string;
}

// 2. Garanta que o componente também receba o id nas propriedades
export const ActionCard: React.FC<ActionCardProps> = ({ id, name, image_url, audio_url }) => {
  
  const playAudio = () => {
    if (audio_url) {
      const audio = new Audio(audio_url);
      audio.play().catch(err => console.error("Erro ao tocar áudio:", err));
    }
  };

  return (
    <button 
      onClick={playAudio}
      className="bg-white p-4 rounded-[2.5rem] shadow-xl border-4 border-transparent active:border-orange-400 active:scale-95 transition-all flex flex-col items-center justify-center hover:shadow-2xl"
    >
      <div className="w-32 h-32 flex items-center justify-center mb-2">
        <img 
          src={image_url} 
          alt={name} 
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <span className="text-xl font-black text-blue-600 uppercase tracking-wide">
        {name}
      </span>
    </button>
  );
};