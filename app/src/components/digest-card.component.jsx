import React from 'react';
import TweetFromItem from './tweet-from-item.component';
import MediumFromItem from './medium-from-item.component';

import './styles/digest-card.css';

const cards = {
  tweet: TweetFromItem,
  medium: MediumFromItem,
};

const DigestCard = ({ item }) => {
  const Component = cards[item.type];

  return (
    <div className="card">
      <div className="card-information">{<Component item={item} />}</div>
      <div className="card-actions">
        <div className="card-action card-remove" onClick={() => console.log('remove')}>
          <span>
            <i className="fa fa-times fa-2x"></i>
          </span>
        </div>
        <div className="card-action card-add" onClick={() => console.log('add')}>
          <span>
            <i className="fa fa-check fa-2x"></i>
          </span>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({ currentItem: state.digest.currentItem });
const mapDispatchToProps = dispatch => bindActionCreators({ addItem, removeItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DigestCard);
