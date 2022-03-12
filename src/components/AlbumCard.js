import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { data } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = data;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img
            src={ artworkUrl100 }
            alt="Capa do album"
          />
          <p>{ collectionName }</p>
          <p>{ artistName }</p>
        </Link>
      </div>

    );
  }
}

AlbumCard.propTypes = {
  data: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
