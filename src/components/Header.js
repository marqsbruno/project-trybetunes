import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  render() {
    const usuario = getUser;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">testando header</p>
      </header>
    );
  }
}

export default Header;
