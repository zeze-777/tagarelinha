import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { ActionCard } from '../../../components/ActionCard';

// 1. Definição da Interface (Note que aqui é no SINGULAR: Action)
interface Action {
  id: string;
  name: string;
  image_url: string;
  audio_url: string;
}

// 2. O Componente (Aqui é no PLURAL: Actions)
export const Actions: React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [actionList, setActionList] = useState<Action[]>([]); // Mudei o nome do estado para evitar conflitos

  useEffect(() => {
    // Chamada à API
    api.get(`/categories/${categoryId}`).then(res => {
      setActionList(res.data);
    }).catch(err => {
      console.error("Erro ao buscar ações:", err);
    });
  }, [categoryId]);

  return (
    <div className="p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="bg-white p-4 rounded-full shadow-md mb-8 font-bold text-blue-600 hover:bg-blue-50 transition-all"
      >
        ⬅ Voltar
      </button>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {actionList.map(item => (
          <ActionCard 
            key={item.id} 
            id={item.id}
            name={item.name} 
            image_url={item.image_url} 
            audio_url={item.audio_url} 
          />
        ))}
      </div>
    </div>
  );
};