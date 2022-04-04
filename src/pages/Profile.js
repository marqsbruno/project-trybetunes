import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const getUserData = await getUser();
    this.setState({
      userData: getUserData,
      loading: false,
    });
  }

  render() {
    const { userData: { name, email, image, description } } = this.state;
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <Loading />}
        <h4>{ name }</h4>
        <p>{ email }</p>
        <img
          data-testid="profile-image"
          src={ image }
          alt="foto do usuário"
        />
        <p>{ description }</p>
        <Link to="/profile/edit"> Editar perfil </Link>
      </div>
    );
  }
}

export default Profile;
