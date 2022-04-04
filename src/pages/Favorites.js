import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favSongs: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const savedSongs = await getFavoriteSongs();
    this.setState({
      favSongs: savedSongs,
      loading: false,
    });
  }

  render() {
    const { loading, favSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading />
          : (favSongs.map((elem) => (
            <MusicCard
              key={ elem.trackId }
              data={ elem }
            />)))}
        <p>testando</p>
      </div>
    );
  }
}

export default Favorites;
