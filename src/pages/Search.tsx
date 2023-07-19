import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import Loading from '../components/Loading';

function Search() {
  const [artist, setArtist] = useState<string>('');
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [loading, setLoading] = useState(false);
  const [make, setMake] = useState(false);
  const [nameArtist, setNameArtist] = useState('');

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setArtist(value);
    setNameArtist(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setArtist('');
    setLoading(true);

    const data = await searchAlbumsAPI(artist);

    setMake(data.length === 0);

    setTimeout(() => {
      setAlbums(data);
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="artistName"
        value={ artist }
        data-testid="search-artist-input"
        onChange={ handleChange }
      />
      <button
        data-testid="search-artist-button"
        disabled={ artist.length < 2 }
      >
        Pesquisar
      </button>
      {loading && <Loading />}
      {albums.length > 0 && (
        <>
          <p>
            Resultado de álbuns de:
            {' '}
            {nameArtist}
          </p>
          {albums.map(({ collectionId,
            artworkUrl100, artistName, collectionName }) => (
              <Link
                to={ `/album/${collectionId}` }
                key={ artworkUrl100 }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img src={ artworkUrl100 } alt="" />
                <h2>{artistName}</h2>
                <p>{collectionName}</p>
              </Link>
          ))}
        </>
      )}
      {make && <p>Nenhum álbum foi encontrado</p>}
    </form>
  );
}

export default Search;
