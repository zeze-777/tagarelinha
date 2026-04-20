import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import bgRegister from '../../../assets/images/4-Tagarelinha_background.png';

export const ResetPassword: React.FC = () => {
  const { token } = useParams();  // ← mudar para useParams
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [validToken, setValidToken] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // Validar token ao carregar a página
  useEffect(() => {
    if (!token) {
      setValidToken(false);
      return;
    }

    const validateToken = async () => {
      try {
        await api.get(`/api/validate/${token}`);
        setValidToken(true);
      } catch (error) {
        console.error('Token inválido:', error);
        setValidToken(false);
      }
    };
    
    validateToken();
  }, [token]);

  const handleReset = async () => {
    if (!senha || !confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }
    
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    if (senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // ✅ Rota correta do backend
      await api.put(`/api/new-password/${token}`, {
        newPassword: senha  // ← campo esperado pelo backend
      });
      
      alert('Senha redefinida com sucesso!');
      navigate('/login');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || 'Erro ao enviar o email';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // Token inválido
  if (validToken === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Token inválido ou expirado</h1>
        <button 
          onClick={() => navigate('/forgot-password')} 
          className="bg-[#128298] text-white px-6 py-2 rounded-full"
        >
          Solicitar novo link
        </button>
      </div>
    );
  }

  // Carregando validação
  if (validToken === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl">Validando token...</h1>
      </div>
    );
  }

  // Token válido - mostrar formulário
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgRegister})` }}>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8">Redefinir Senha</h1>

        <input
          type="password"
          placeholder="Nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none"
          style={{
            position: 'absolute',
            left: '580px',
            top: '350px',
            width: '260px',
            height: '35px'
          }}
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none"
          style={{
            position: 'absolute',
            left: '580px',
            top: '404px',
            width: '260px',
            height: '35px'
          }}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="bg-[#128298] text-white font-bold rounded-full shadow-lg uppercase"
          style={{ 
            position: 'absolute',
            left: '625px',
            top: '459px',
            width: '70px', 
            height: '25px',
            fontSize: '11px'
          }}
        >
          {loading ? '...' : 'Enviar'}
        </button>

        <button
          onClick={() => navigate('/login')}
          className="bg-[#128298] text-white font-bold rounded-full shadow-lg uppercase"
          style={{ 
            position: 'absolute',
            left: '720px',
            top: '459px',
            width: '70px', 
            height: '25px',
            fontSize: '12px'
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};