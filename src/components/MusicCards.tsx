import { SongType } from '../types';

type MusicCardPropsTypes = {
  music: SongType,
};

function MusicCard({ music } : MusicCardPropsTypes) {
  const { trackName, previewUrl } = music;
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}

export default MusicCard;
