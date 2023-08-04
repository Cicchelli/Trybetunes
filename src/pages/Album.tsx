import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCards';

function Album() {
  const [loading, setLoading] = useState<boolean>(true);
  const [colection, setColection] = useState<AlbumType>();
  const [musicData, setMusicData] = useState<SongType[]>();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data = await getMusics(id);
        setColection(data[0]);
        const musics = data.filter((item, index) => index !== 0);
        setMusicData(musics as SongType[]);
      }
      setLoading(false);
    };
    getData();
  }, [id]);
  return (
    <>
      {loading && (<Loading />)}
      <h1 data-testid="album-name">{colection?.collectionName}</h1>
      <h2 data-testid="artist-name">{colection?.artistName}</h2>
      {musicData?.map((music) => (
        <MusicCard music={ music } key={ music.trackId } />
      ))}
    </>
  );
}

export default Album;
