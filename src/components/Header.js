import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  // ideia do componentDidMount da mentoria, usando o then assim como no login // a funcao retorna NAME e não USER;
  componentDidMount() {
    this.setState({ loading: true });
    getUser().then(({ name }) => {
      this.setState({
        userName: name,
        loading: false,
      });
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <p>Carregando...</p>
          : (
            <div>
              <p data-testid="header-user-name">{ userName }</p>
              <Link data-testid="link-to-search" to="/search">
                Search
              </Link>
              <Link data-testid="link-to-favorites" to="/favorites">
                Favorites
              </Link>
              <Link data-testid="link-to-profile" to="/profile">
                Profile
              </Link>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
