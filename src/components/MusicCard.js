import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
      favSongs: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: { trackId } } = this.props;
    const savedFavSongs = await getFavoriteSongs();
    if (savedFavSongs) {
      this.setState({
        loading: false,
        favSongs: savedFavSongs,
      });
    }
    console.log(savedFavSongs);
    const { favSongs } = this.state;
    const checkFav = favSongs.some((elem) => elem.trackId === trackId); // checa se a track está marcada;
    if (checkFav) this.setState({ checked: true });
  }

  handleFavorite = async () => {
    const data = this.props;
    const { checked } = this.state;
    this.setState({ loading: true });
    const favorite = await addSong(data);
    if (favorite) this.setState({ loading: false });
    if (!checked) {
      this.setState({ checked: true });
    } else {
      removeSong(data);
      this.setState({ checked: false });
    }
  }

  render() {
    const { data: { trackName, previewUrl, trackId } } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        {loading && <Loading />}
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ trackId }
        >
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            onChange={ this.handleFavorite }
            checked={ checked }
          />

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
