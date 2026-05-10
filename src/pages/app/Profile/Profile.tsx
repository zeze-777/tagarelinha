import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import bgImage from '../../../assets/images/4-Tagarelinha_background.png';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  children: {
    id: string;
    name: string;
    birth_date: string;
    user_id: string;
    created_on: string;
  }[];
}

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);

  // =========================
  // USER STATES
  // =========================

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [savingUser, setSavingUser] = useState(false);
  const [userError, setUserError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('api/search-user');

        setUser(response.data);

      } catch (err: unknown) {

        let errorMessage = 'Erro ao carregar dados';

        if (err instanceof Error) {
          errorMessage = err.message;
        }

        if (
          typeof err === 'object' &&
          err !== null &&
          'response' in err
        ) {
          const axiosError = err as {
            response?: {
              data?: {
                mensagem?: string;
              };
            };
          };

          errorMessage =
            axiosError.response?.data?.mensagem || errorMessage;
        }

        setError(errorMessage);

      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // =========================
  // CHILD FUNCTIONS
  // =========================

  const handleSaveChild = async () => {

    if (!childName || !childBirthDate) {
      setSaveError('Preencha todos os campos');
      return;
    }

    setSaving(true);
    setSaveError('');

    try {

      const token = localStorage.getItem('token');

      if (isEditing && editingChildId) {

        const response = await api.put(
          `api/update-children/${editingChildId}`,
          {
            name: childName,
            birth_date: new Date(childBirthDate).toISOString()
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(prev => {
          if (!prev) return prev;

          return {
            ...prev,
            children: prev.children.map(child =>
              child.id === editingChildId
                ? response.data
                : child
            )
          };
        });

      } else {

        const response = await api.post(
          'api/register-children',
          {
            name: childName,
            birth_date: new Date(childBirthDate).toISOString()
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(prev => {
          if (!prev) return prev;

          return {
            ...prev,
            children: [...prev.children, response.data]
          };
        });
      }

      setChildName('');
      setChildBirthDate('');
      setEditingChildId(null);
      setIsEditing(false);
      setIsModalOpen(false);

    } catch (err: unknown) {

      let errorMessage = 'Erro ao salvar';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err
      ) {
        const axiosError = err as {
          response?: {
            data?: {
              mensagem?: string;
            };
          };
        };

        errorMessage =
          axiosError.response?.data?.mensagem || errorMessage;
      }

      setSaveError(errorMessage);

    } finally {
      setSaving(false);
    }
  };

  const handleEditChild = (
    child: UserProfile['children'][0]
  ) => {

    setChildName(child.name);

    setChildBirthDate(
      child.birth_date.split('T')[0]
    );

    setEditingChildId(child.id);

    setIsEditing(true);

    setIsModalOpen(true);
  };

  const handleDeleteChild = async (
    childId: string
  ) => {

    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta criança?'
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem('token');

      await api.delete(
        `api/delete-children/${childId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(prev => {

        if (!prev) return prev;

        return {
          ...prev,
          children: prev.children.filter(
            child => child.id !== childId
          )
        };
      });

    } catch (err) {

      console.error(err);

      alert('Erro ao excluir criança');
    }
  };

  // =========================
  // USER FUNCTIONS
  // =========================

  const handleEditUser = () => {

    if (!user) return;

    setUserName(user.name);
    setUserEmail(user.email);

    setIsUserModalOpen(true);
  };

  const handleSaveUser = async () => {

    if (!userName || !userEmail) {
      setUserError('Preencha todos os campos');
      return;
    }

    setSavingUser(true);
    setUserError('');

    try {

      const token = localStorage.getItem('token');

      const response = await api.put(
        `api/update-user/${user?.id}`,
        {
          name: userName,
          email: userEmail
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(response.data);

      setIsUserModalOpen(false);

    } catch (err) {

      console.error(err);

      setUserError('Erro ao atualizar usuário');

    } finally {

      setSavingUser(false);
    }
  };

  const handleDeleteUser = async () => {

    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir sua conta?'
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem('token');

      await api.delete(
        `api/delete-user/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.removeItem('token');

      navigate('/login');

    } catch (err) {

      console.error(err);

      alert('Erro ao excluir usuário');
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center font-['Fredoka',_sans-serif] relative">

        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="text-[#409B8C] text-xl font-bold relative z-10">
          Carregando...
        </div>

      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] font-['Fredoka',_sans-serif] relative">

      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-6">

        <div className="w-full h-auto max-w-md flex justify-start mb-4">

          <button
            onClick={() => navigate('/app/categories')}
            className="bg-[#409B8C] text-[#FFF] hover:bg-[#2e7d6e] rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 px-8 py-4 mt-2 ml-2"
          >
            ← voltar
          </button>

        </div>

        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6">

          <h1 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter font-bold mb-8 text-[#2a68cc]">
            Meu Perfil
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
              {error}
            </div>
          )}

          {user && (

            <div className="w-full max-w-2xl space-y-6">

              {/* USER */}

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">

                <h2 className="text-xl font-bold text-[#409B8C] tracking-wider mb-4">
                  Dados do Usuário
                </h2>

                <div className="space-y-3">

                  <div>
                    <span className="text-gray-600 font-bold text-sm">
                      Nome:
                    </span>

                    <p className="text-lg font-semibold text-gray-800">
                      {user.name}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-600 text-sm">
                      Email:
                    </span>

                    <p className="text-lg font-semibold text-gray-800">
                      {user.email}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4">

                    <button
                      onClick={handleEditUser}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      Editar
                    </button>

                    <button
                      onClick={handleDeleteUser}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      Excluir
                    </button>

                  </div>

                </div>

              </div>

              {/* CHILDREN */}

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">

                <h2 className="text-xl font-bold text-[#409B8C] mb-4">
                  Dependentes ({user.children.length})
                </h2>

                {user.children.length === 0 ? (

                  <div>

                    <p className="text-gray-500 text-center py-4">
                      Nenhum dependente cadastrado
                    </p>

                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditingChildId(null);
                        setChildName('');
                        setChildBirthDate('');
                        setIsModalOpen(true);
                      }}
                      className="text-[#2a68cc] hover:text-[#1a4d9c] font-bold underline w-full text-center"
                    >
                      adicione uma criança
                    </button>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {user.children.map((child) => (

                      <div
                        key={child.id}
                        className="bg-[#409B8C]/10 rounded-xl p-4 border border-[#409B8C]/20"
                      >

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                          <div>

                            <p className="font-bold text-gray-800">
                              {child.name}
                            </p>

                            <p className="text-sm text-gray-600">
                              Nascimento: {formatDate(child.birth_date)}
                            </p>

                          </div>

                          <div className="flex gap-2">

                            <button
                              onClick={() => handleEditChild(child)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => handleDeleteChild(child.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                              Excluir
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditingChildId(null);
                        setChildName('');
                        setChildBirthDate('');
                        setIsModalOpen(true);
                      }}
                      className="text-[#2a68cc] hover:text-[#1a4d9c] font-bold underline w-full text-center mt-4"
                    >
                      adicione uma criança
                    </button>

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

        {/* CHILD MODAL */}

        {isModalOpen && (

          <div className="fixed inset-0 bg-black/50 flex justify-center pt-20 z-[9999]">

            <div className="bg-white w-[90%] max-w-md rounded-3xl p-6 shadow-2xl flex flex-col">

              <h2 className="text-2xl font-bold text-[#409B8C] mb-6 text-left">
                {isEditing ? 'Editar Criança' : 'Adicionar Criança'}
              </h2>

              {saveError && (
                <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded-lg mb-4 w-full">
                  {saveError}
                </div>
              )}

              <div className="w-full mb-4">

                <label
                  htmlFor="childName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nome da criança
                </label>

                <input
                  id="childName"
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                  placeholder="Digite o nome"
                  autoFocus
                />

              </div>

              <div className="w-full mb-6">

                <label
                  htmlFor="childBirthDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Data de Nascimento
                </label>

                <input
                  id="childBirthDate"
                  type="date"
                  value={childBirthDate}
                  onChange={(e) =>
                    setChildBirthDate(e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                />

              </div>

              <div className="flex gap-4 w-full">

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setChildName('');
                    setChildBirthDate('');
                    setSaveError('');
                    setEditingChildId(null);
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-[#409B8C] hover:bg-gray-400 px-4 py-2 rounded-full font-bold text-[#fff] transition-colors"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleSaveChild}
                  disabled={saving}
                  className={`flex-1 px-4 py-2 rounded-full font-bold text-[#fff] transition-colors ${
                    saving
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#409B8C] hover:bg-[#2e7d6e]'
                  }`}
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>

              </div>

            </div>

          </div>

        )}

        {/* USER MODAL */}

        {isUserModalOpen && (

          <div className="fixed inset-0 bg-black/50 flex justify-center pt-20 z-[9999]">

            <div className="bg-white w-[90%] max-w-md rounded-3xl p-6 shadow-2xl flex flex-col">

              <h2 className="text-2xl font-bold text-[#409B8C] mb-6">
                Editar Usuário
              </h2>

              {userError && (
                <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded-lg mb-4">
                  {userError}
                </div>
              )}

              <div className="mb-4">

                <label className="block font-bold mb-2">
                  Nome
                </label>

                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />

              </div>

              <div className="mb-6">

                <label className="block font-bold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />

              </div>

              <div className="flex gap-4">

                <button
                  onClick={() => {
                    setIsUserModalOpen(false);
                    setUserError('');
                  }}
                  className="flex-1 bg-[#409B8C] hover:bg-gray-500 text-[#fff] py-2 rounded-full"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleSaveUser}
                  disabled={savingUser}
                  className="flex-1 bg-[#409B8C] hover:bg-[#2e7d6e] text-[#fff] py-2 rounded-full"
                >
                  {savingUser ? 'Salvando...' : 'Salvar'}
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};