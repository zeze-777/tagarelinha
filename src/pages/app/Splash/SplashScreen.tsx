import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import splashImg from '../../../assets/images/1-Tagarelinha_splash.png';

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Removemos a verificação de login. 
      // Agora o destino é fixo: sempre para a tela de Login.
      navigate("/login");
    }, 5000); // 4 segundos é um tempo bom para apreciar a Splash
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="bg-tico-fullscreen"
      style={{ backgroundImage: `url(${splashImg})` }}
    />
  );
};