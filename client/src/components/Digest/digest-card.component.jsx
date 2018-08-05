import React from 'react';
import AddButton from './add-button.component';

import './digest-card.css';

const DigestCard = ({ body, onClick, isItem }) => {
  return (
    <div className="card">
      <div className="card-information">{body}</div>
      {isItem &&
        <div className="card-actions">
        <AddButton onClick={onClick} saved={(body.props.item) ? body.props.item.saved : false} />
        </div>
      }
    </div>
  )
};

export default DigestCard;

