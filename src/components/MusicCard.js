import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  /*   componentDidMount() {
    this.handleFavorite();
  } */

  handleFavorite = async () => {
    const data = this.props;
    const { checked } = this.state;
    this.setState({ loading: true });
    const favorite = await addSong(data);
    if (favorite) this.setState({ loading: false });
    if (!checked) {
      this.setState({ checked: true });
    } else { this.setState({ checked: false }); }
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
