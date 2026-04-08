import React from 'react';
import { Outlet } from 'react-router-dom';
// Verifique se o nome é EXATAMENTE esse na pasta!
import bgGeneral from '../assets/images/4-Tagarelinha_background.png';

export const MainLayout: React.FC = () => {
  return (
    <div 
      className="bg-tico-fullscreen flex flex-col" // Usando a classe nova e flex
      style={{ backgroundImage: `url(${bgGeneral})` }}
    >
      {/* Container principal das páginas */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};