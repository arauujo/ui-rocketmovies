import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import dayjs from 'dayjs';
import { api } from '../../services/api';
import { Loader } from '../../components/Loader';
import { Header } from '../../components/Header';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Tag } from '../../components/Tag';
import { Rating } from '../../components/Rating';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { Container, Content } from './styles';
import { ToastAlert } from '../../components/SweetAlert';

export function Details() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedData = useRef(false);
  const params = useParams();
  const navigate = useNavigate();
  const formattedDate = dayjs(data.created_at).format('DD/MM/YY [às] HH:mm');

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    try {
      await api.delete(`/movie_notes/${params.id}`);
      ToastAlert({ title: 'Filme removido com sucesso!', icon: 'success' });
      navigate(-1);
    } catch (error) {
      ToastAlert({
        title: `Erro ao deletar o filme: ${error.message}`,
        icon: 'error',
      });
    }
  }

  useEffect(() => {
    if (hasFetchedData.current) return; // Se já buscou os dados não executa novamente
    hasFetchedData.current = true; // Marca que os dados já foram buscados para evitar chamadas futuras
    async function fetchMovies() {
      try {
        const response = await api.get(`/movie_notes/${params.id}`);
        setData(response.data);
        setIsLoading(false); // Atualiza o estado de carregamento para falso quando o componente for montado
      } catch (error) {
        ToastAlert({
          title: `Erro ao buscar os dados: ${error.message}`,
          icon: 'error',
        });
      }
    }

    fetchMovies();
  }, [params.id]);

  if (isLoading) return <Loader />;

  const avatarUrl = data.userData.avatar
    ? `${api.defaults.baseURL}/files/${data.userData.avatar}`
    : avatarPlaceholder;

  return (
    <Container>
      <Header />

      <main>
        <Content>
          <div className="buttons">
            <ButtonText isActive title="Voltar" onClick={handleBack}>
              <FiArrowLeft />
            </ButtonText>
            <Button title="Excluir filme" onClick={handleRemove} />
          </div>

          <header>
            <h1>{data.title}</h1>
            <Rating rating={data.rating} />
          </header>

          <div className="author-info">
            <img src={avatarUrl} alt={`Imagem de ${data.userData.name}`} />
            <span>Por {data.userData.name}</span>
            <FiClock size="16" />
            <span>{formattedDate}</span>
          </div>

          {data.movieTags && (
            <section>
              {data.movieTags.map(movieTag => (
                <Tag key={String(movieTag.id)} title={movieTag.name} />
              ))}
            </section>
          )}

          <p>{data.description}</p>
        </Content>
      </main>
    </Container>
  );
}
