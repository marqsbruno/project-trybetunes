import React from 'react';
import { Link } from 'react-router-dom';

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

export default AlbumCard;
