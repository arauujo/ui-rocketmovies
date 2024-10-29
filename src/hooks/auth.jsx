import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { ToastAlert, ModalAlert } from '../components/SweetAlert';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password });
      const { user, token } = response.data;

      localStorage.setItem('@rocketmovies:user', JSON.stringify(user));
      localStorage.setItem('@rocketmovies:token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({ user, token });
    } catch (error) {
      if (error.response) {
        ModalAlert({
          icon: 'error',
          title: 'Erro!',
          text: error.response.data.message,
        });
      } else {
        ModalAlert({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível entrar!',
        });
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@rocketmovies:token');
    localStorage.removeItem('@rocketmovies:user');

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append('avatar', avatarFile);

        const response = await api.patch('/users/avatar', fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put('/users', user);
      localStorage.setItem('@rocketmovies:user', JSON.stringify(user));

      setData({ user, token: data.token });
      ToastAlert({ icon: 'success', title: 'Perfil atualizado!' });
    } catch (error) {
      if (error.response) {
        ModalAlert({
          icon: 'error',
          title: 'Erro!',
          text: error.response.data.message,
        });
      } else {
        ModalAlert({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível atualizar o perfil!',
        });
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('@rocketmovies:token');
    const user = localStorage.getItem('@rocketmovies:user');

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, updateProfile, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
