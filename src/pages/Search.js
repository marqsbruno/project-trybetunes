import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      loading: false,
      albumsArr: [],
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      inputSearch: target.value,
    });
  }
  // async await ao invés de usar o then(), menos complicado;

  handleClick = async () => {
    const { inputSearch } = this.state;
    this.setState({ loading: true });
    const albums = await searchAlbumsAPI(inputSearch);
    this.setState({
      prevInput: inputSearch,
      inputSearch: '',
      albumsArr: albums,
      loading: false,
    });
  }

  render() {
    const { inputSearch, loading, albumsArr, prevInput } = this.state;
    const minChar = 2;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <form>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  onChange={ this.handleChange }
                  placeholder="nome da banda"
                  value={ inputSearch }
                />
                <button
                  data-testid="search-artist-button"
                  disabled={ inputSearch.length < minChar }
                  onClick={ this.handleClick }
                  type="button"
                >
                  Pesquisar
                </button>
              </form>
              {loading ? <Loading />
                : (
                  <p>{`Resultado de álbuns de: ${prevInput}`}</p>
                )}
              {albumsArr.length ? (
                albumsArr.map((elem) => (<AlbumCard
                  key={ elem.collectionId }
                  data={ elem }
                />))
              )
                : <p>Nenhum álbum foi encontrado</p>}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
