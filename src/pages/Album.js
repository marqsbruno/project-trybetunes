import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumTracks = await getMusics(id);
    this.setState({
      tracks: albumTracks,
      artistName: albumTracks[0].artistName,
      collectionName: albumTracks[0].collectionName,
    });
    const { tracks } = this.state;
    console.log(tracks); // array [0] não contem as músicas;
  }

  render() {
    const { tracks, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        { tracks.filter((elem, index) => (index !== 0))
          .map((elem) => (<MusicCard key={ elem.trackId } data={ elem } />))}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
