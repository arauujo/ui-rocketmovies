import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Container, Form, Background } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { ToastAlert, ModalAlert } from '../../components/SweetAlert';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return ModalAlert({
        icon: 'error',
        title: 'Erro!',
        text: 'É necessário preencher todos os campos!',
      });
    }

    api
      .post('/users', { name, email, password })
      .then(() => {
        ToastAlert({
          icon: 'success',
          title: 'Usuário cadastrado com sucesso!',
        });
        navigate('/');
      })
      .catch(error => {
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
            text: 'Não foi possível cadastrar!',
          });
        }
      });
  }

  function handleKeydown(evt) {
    if (evt.key === 'Enter') {
      handleSignUp();
    }
  }

  return (
    <Container>
      <Form>
        <h1>RocketMovies</h1>

        <p>Aplicação para acompanhar tudo que assistir.</p>

        <h2>Crie sua conta</h2>

        <Input
          type="text"
          placeholder="Nome"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="E-mail"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Senha"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeydown}
        />

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">
          <FiArrowLeft />
          <ButtonText isActive title="Voltar para o login" />
        </Link>
      </Form>

      <Background />
    </Container>
  );
}
