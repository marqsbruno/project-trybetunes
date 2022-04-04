import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const getUserData = await getUser();
    this.setState({
      name: getUserData.name,
      email: getUserData.email,
      image: getUserData.image,
      description: getUserData.description,
      loading: false,
    });
  }

  handleChange = (elem) => {
    const { name, value } = elem.target;
    this.setState({
      [name]: value,
    });
  }

  checkIsValid = () => {
    const { name, email, image, description } = this.state;
    const checkName = name.length > 0;
    const checkEmail = email.length > 0;
    const checkImage = image.length > 0;
    const checkDescription = description.length > 0;

    if (
      checkName
      && checkEmail
      && checkImage
      && checkDescription) {
      return false;
    } return true;
  }

  handleClick = async () => {
    this.setState({ loading: true });
    const { name, email, image, description } = this.state;
    const updateData = {
      name,
      email,
      image,
      description,
    };
    await updateUser(updateData);
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const { name, email, image, description } = this.state;
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <Loading />}
        <form>
          <input
            data-testid="edit-input-name"
            type="text"
            name="name"
            onChange={ this.handleChange }
            value={ name }
          />
          <input
            data-testid="edit-input-email"
            type="email"
            name="email"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            data-testid="edit-input-description"
            type="text"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
          <input
            data-testid="edit-input-image"
            type="text"
            name="image"
            onChange={ this.handleChange }
            value={ image }
          />
          <button
            data-testid="edit-button-save"
            type="button"
            disabled={ this.checkIsValid() }
            onClick={ this.handleClick }
          >
            Atualizar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default ProfileEdit;
