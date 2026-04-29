import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgRegister from '../../../assets/images/4-Tagarelinha_background.png'; // Reutilizando o fundo para manter a identidade

export const Register: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 dados cadastrais
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }

    alert('Usuário criado com sucesso!');
    navigate('/login');
  };

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

          {/*FORMULÁRIO*/}
        
        {/* NOME */}
        <input 
          type="text"
          placeholder="NOME"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none"
          style={{
            position: 'absolute',
            left: '470px',
            top: '200px',
            width: '400px',
            height: '45px'
          }}
        />

        {/* EMAIL */}
        <input 
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none"
          style={{
            position: 'absolute',
            left: '470px',
            top: '260px',
            width: '400px',
            height: '45px'
          }}
        />

        {/* SENHA */}
        <input 
          type="password"
          placeholder="SENHA"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none"
          style={{
            position: 'absolute',
            left: '470px',
            top: '320px',
            width: '400px',
            height: '45px'
          }}
        />

        {/* CONFIRMAR SENHA */}
        <input 
          type="password"
          placeholder="CONFIRMAR SENHA"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="bg-white rounded-full px-6 font-bold text-gray-500 shadow-md outline-none"
          style={{
            position: 'absolute',
            left: '470px',
            top: '380px',
            width: '400px',
            height: '45px'
          }}
        />

        {/* BOTÃO CADASTRAR */}
        <button 
          onClick={handleRegister}
          className="bg-[#128298] text-[#FFFFFF] hover:bg-blue-600 text-white font-bold rounded-full shadow-lg flex items-center justify-center uppercase"
          style={{ 
            position: 'absolute',
            left: '630px',
            top: '438px',
            width: '100px', 
            height: '25px',
            fontSize: '12px'
          }}
        >
          CADASTRAR
        </button>

        
        {/* Botão para Voltar ao Login */}
<button 
  onClick={() => navigate('/login')}
  className="bg-transparent text-[#040303] font-extrabold hover:text-blue-500 transition-all border-none outline-none cursor-pointer p-0 underline"
  style={{
    position: 'absolute',
    left: '520px',
    top: '470px',
    fontSize: '19px'
  }}
>
  Já tem uma conta? Voltar para o login
</button>


      </div>
    </div>
  );
};