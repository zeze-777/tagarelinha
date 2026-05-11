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
        const response = await api.get('/api/search-user');

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
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('pt-BR');
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

        await api.put(
          `/api/update-children/${editingChildId}`,
          {
            name: childName,
            birth_date: childBirthDate + 'T00:00:00.000Z'
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      } else {

        await api.post(
          '/api/register-children',
          {
            name: childName,
            birth_date: childBirthDate + 'T00:00:00.000Z'
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      const res = await api.get('/api/search-user');
      setUser(res.data);

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

    const date = new Date(child.birth_date);
    if (!isNaN(date.getTime())) {
      setChildBirthDate(date.toISOString().split('T')[0]);
    } else {
      setChildBirthDate('');
    }

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
        `/api/del-children/${childId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const res = await api.get('/api/search-user');
      setUser(res.data);

    } catch (err) {

      let msg = 'Erro ao excluir conta';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { status?: number; data?: { mensagem?: string } } };
        msg = axiosErr.response?.data?.mensagem || `Erro ${axiosErr.response?.status}`;
      }
      console.error(err);
      alert(msg);
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

    if (!user?.id) {
      setUserError('Usuário não encontrado');
      return;
    }

    setSavingUser(true);
    setUserError('');

    try {

      const token = localStorage.getItem('token');

      const body: Record<string, string> = {};
      if (userName) body.name = userName;
      if (userEmail) body.email = userEmail;

      const url = `/api/update-user`;
      await api.put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const res = await api.get('/api/search-user');
      setUser(res.data);

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
      user?.children?.length
        ? 'Sua conta possui dependentes vinculados. Eles também serão excluídos. Tem certeza?'
        : 'Tem certeza que deseja excluir sua conta?'
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (user?.children?.length) {
        for (const child of user.children) {
          await api.delete(`/api/del-children/${child.id}`, { headers });
        }
      }

      await api.delete('/api/del-user', { headers });

      localStorage.removeItem('token');

      navigate('/login');

    } catch (err) {

      let msg = 'Erro ao excluir conta';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { status?: number; data?: { mensagem?: string } } };
        msg = axiosErr.response?.data?.mensagem || `Erro ${axiosErr.response?.status}`;
      }
      console.error(err);
      alert(msg);
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
    <div className="w-full min-h-[100vh] font-['Fredoka',_sans-serif] relative">
      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-6">
        <div className="w-full h-auto max-w-md flex mb-4">
          <button
            onClick={() => navigate('/app/categories')}
            className="bg-[#409B8C] text-[#FFF] hover:bg-[#2e7d6e] rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 px-[28px] py-[4px] mt-[8px] ml-[8px] text-sm font-bold"
          >
            ← voltar
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter font-bold mb-8 text-[#2a68cc]">
          Meu Perfil
        </h1>
      </div>
      <div style={{ width: '100%', maxWidth: '72rem', margin: '0 auto' }}>
        {error && (
          <div style={{ backgroundColor: '#fee', border: '1px solid #f88', color: '#c00', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', width: '100%' }}>
            {error}
          </div>
        )}
        {user && (
          <div style={{ display: 'flex', gap: 24, width: '100%' }}>
            <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 16, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: 20 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#409B8C', letterSpacing: '0.05em', marginBottom: 16 }}>
                Dados do Usuário
              </h2>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ color: '#666', fontWeight: 'bold', fontSize: 14 }}>
                    Nome: <span style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>{user.name}</span>
                  </span>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ color: '#666', fontWeight: 'bold', fontSize: 14 }}>
                    Email: <span style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>{user.email}</span>
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, paddingTop: 24 }}>
                <button onClick={handleEditUser}
                  style={{ padding: '8px 16px', borderRadius: 9999, backgroundColor: '#2a68cc', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={handleDeleteUser}
                  style={{ padding: '8px 16px', borderRadius: 9999, backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  Excluir
                </button>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 16, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: 20 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#409B8C', letterSpacing: '0.05em', marginBottom: 16 }}>
                Dependente(s) ({user.children?.length ?? 0})
              </h2>
              {!user.children || user.children.length === 0 ? (
                <div>
                  <p style={{ color: '#999', textAlign: 'center', padding: '16px 0' }}>
                    Nenhum dependente cadastrado
                  </p>
                  <button onClick={() => { setIsEditing(false); setEditingChildId(null); setChildName(''); setChildBirthDate(''); setIsModalOpen(true); }}
                    style={{ color: '#2a68cc', fontWeight: 'bold', textDecoration: 'underline', width: '100%', textAlign: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
                    adicione uma criança
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 300, overflowY: 'auto' }}>
                    {user.children.map((child) => (
                      <div key={child.id} style={{ backgroundColor: 'rgba(64,155,140,0.1)', borderRadius: 12, padding: 16, border: '1px solid rgba(64,155,140,0.2)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingLeft: 4 }}>
                          <div>
                            <p style={{ fontWeight: 'bold', color: '#333' }}>{child.name}</p>
                            <p style={{ fontSize: 14, color: '#666' }}>Nascimento: {formatDate(child.birth_date)}</p>
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => handleEditChild(child)}
                              style={{ padding: '8px 16px', borderRadius: 9999, backgroundColor: '#2a68cc', color: '#fff', border: 'none', cursor: 'pointer' }}>
                              Editar
                            </button>
                            <button onClick={() => handleDeleteChild(child.id)}
                              style={{ padding: '8px 16px', borderRadius: 9999, backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}>
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setIsEditing(false); setEditingChildId(null); setChildName(''); setChildBirthDate(''); setIsModalOpen(true); }}
                    style={{ color: '#2a68cc', fontWeight: 'bold', textDecoration: 'underline', width: '100%', textAlign: 'center', marginTop: 16, background: 'none', border: 'none', cursor: 'pointer' }}>
                    adicione uma criança
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFF', width: '90%', maxWidth: '28rem', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#409B8C', marginBottom: '1.5rem', textAlign: 'left' }}>
              {isEditing ? 'Editar Criança' : 'Adicionar Criança'}
            </h2>
            {saveError && (
              <div style={{ backgroundColor: '#fee', border: '1px solid #f88', color: '#c00', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', width: '100%' }}>
                {saveError}
              </div>
            )}
            <div style={{ width: '100%', marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#444', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome da criança</label>
              <input id="childName" type="text" value={childName} onChange={(e) => setChildName(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '0.5rem', outline: 'none', boxSizing: 'border-box' }} placeholder="Digite o nome" autoFocus />
            </div>
            <div style={{ width: '100%', marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#444', fontWeight: 'bold', marginBottom: '0.5rem' }}>Data de Nascimento</label>
              <input id="childBirthDate" type="date" value={childBirthDate} onChange={(e) => setChildBirthDate(e.target.value)} aria-label="Data de Nascimento"
                style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '0.5rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              <button onClick={() => { setIsModalOpen(false); setChildName(''); setChildBirthDate(''); setSaveError(''); setEditingChildId(null); setIsEditing(false); }}
                style={{ flex: 1, backgroundColor: '#409B8C', color: '#fff', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleSaveChild} disabled={saving}
                style={{ flex: 1, backgroundColor: saving ? '#999' : '#2a68cc', color: '#fff', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isUserModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFF', width: '90%', maxWidth: '28rem', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#409B8C', marginBottom: '1.5rem' }}>Editar Usuário</h2>
            {userError && (
              <div style={{ backgroundColor: '#fee', border: '1px solid #f88', color: '#c00', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>{userError}</div>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome</label>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} aria-label="Nome"
                style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '0.5rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Email</label>
              <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} aria-label="Email"
                style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '0.5rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => { setIsUserModalOpen(false); setUserError(''); }}
                style={{ flex: 1, backgroundColor: '#409B8C', color: '#fff', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleSaveUser} disabled={savingUser}
                style={{ flex: 1, backgroundColor: savingUser ? '#999' : '#2a68cc', color: '#fff', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold', border: 'none', cursor: savingUser ? 'not-allowed' : 'pointer' }}>
                {savingUser ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};