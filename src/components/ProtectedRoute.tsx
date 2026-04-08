import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// O "export" antes da const permite que o router.tsx o encontre
export const ProtectedRoute: React.FC = () => {
  // Verifica se o usuário está logado no navegador
  const isAuth = localStorage.getItem('isLoggedIn') === 'true';

  // Se estiver logado, mostra o conteúdo (Outlet). Se não, manda para o Login.
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};