import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
import timezone from 'dayjs/plugin/timezone.js';
import { api } from '../../services/api';
import { Header } from '../../components/Header';
import { ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Section } from '../../components/Section';
import { MovieTag } from '../../components/MovieTag';
import { Button } from '../../components/Button';
import { Container, Form } from './styles';

dayjs.extend(utc);
dayjs.extend(timezone);

export function New() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [movieTags, setMovieTags] = useState([]);
  const [newMovieTag, setNewMovieTag] = useState('');
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddTag() {
    setMovieTags(prevState => [...prevState, newMovieTag]);
    setNewMovieTag('');
  }

  function handleRemoveTag(deleted) {
    setMovieTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewMovie() {
    try {
      if (!title) {
        return alert('Digite o título do filme.');
      }
  
      if (newMovieTag) {
        return alert(
          'Existe um marcador preenchido. Adicione-o antes ou deixe o campo vazio.'
        );
      }

      const createdAt = dayjs().tz('America/Sao_Paulo').format();
      const updatedAt = dayjs().tz('America/Sao_Paulo').format();
  
      await api.post('/movie_notes', {
        title,
        description,
        rating,
        movie_tags: movieTags,
        created_at: createdAt,
        updated_at: updatedAt,
      });
  
      alert('Filme adicionado com sucesso!');  
      navigate(-1);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Não foi possível adicionar o filme!');
      }
    }
  }

  function handleRatingChange(e) {
    const value = e.target.value;
    if (/^\d*$/.test(value) && (value === '' || parseInt(value) <= 5)) {
      setRating(value);
    }
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <ButtonText title="Voltar" isActive onClick={handleBack}>
              <FiArrowLeft />
            </ButtonText>
            <h1>Novo filme</h1>
          </header>

          <div>
            <Input
              type="text"
              placeholder="Título"
              onChange={e => setTitle(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Sua nota (de 0 a 5)"
              value={rating}
              onChange={handleRatingChange}
            />
          </div>
          <Textarea
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Marcadores">
            <div className="tags">
              {movieTags.map((movie_tag, index) => (
                <MovieTag
                  key={String(index)}
                  value={movie_tag}
                  onClick={() => handleRemoveTag(movie_tag)}
                />
              ))}

              <MovieTag
                isNew
                placeholder="Novo marcador"
                onChange={e => setNewMovieTag(e.target.value)}
                value={newMovieTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <div className="buttons">
            <Button
              className="secondary"
              title="Excluir filme"
              onClick={handleBack}
            />
            <Button title="Salvar alterações" onClick={handleNewMovie} />
          </div>
        </Form>
      </main>
    </Container>
  );
}
