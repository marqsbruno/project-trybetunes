import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameUser: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      nameUser: target.value,
    });
  }

  // then para esperar a promise e setar o valor do loading novo state para direcionar (gambiarra);
  handleClick = () => {
    const { nameUser: user } = this.state;
    this.setState({ loading: true });
    createUser({ name: user }).then(() => {
      this.setState({
        loading: false,
        redirect: true,
      });
    });
    console.log(user);
  }

  render() {
    const { nameUser: userName, loading, redirect } = this.state;
    const minChar = 3; // minimo de caracteres;
    return (
      <div data-testid="page-login">
        { loading ? <p>Carregando...</p>
          : (
            <form>
              <input
                data-testid="login-name-input"
                id="input-name"
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ userName.length < minChar }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          )}
        {redirect ? <Redirect to="/search" /> : ''}
      </div>
    );
  }
}

export default Login;
