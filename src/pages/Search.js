import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      inputSearch: target.value,
    });
  }

  render() {
    const { inputSearch } = this.state;
    const minChar = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            placeholder="nome da banda"
          />
          <button
            data-testid="search-artist-button"
            disabled={ inputSearch.length < minChar }
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
