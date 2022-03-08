import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  // ideia do componentDidMount da mentoria, usadando o then assim como no login // a funcao retorna NAME e não USER;
  componentDidMount() {
    this.setState({ loading: true });
    getUser().then(({ name }) => {
      this.setState({
        userName: name,
        loading: false,
      });
      console.log(getUser());
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{ userName }</p>}
      </header>
    );
  }
}

export default Header;
