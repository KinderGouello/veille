import React from 'react';

import './styles/tweet.css';

const TweetFromItem = ({ item }) => (
  <div className="tweet">
    <div className="tweet--user">
      <img className="tweet--user-avatar" src={item.additionnalInformations.user.image} alt="" />
      <div className="tweet--user-name">
        {item.additionnalInformations.user.screen_name}
        <span>{item.additionnalInformations.user.name}</span>
      </div>
      <p className="tweet--body">{item.name}</p>
    </div>
    <div className="tweet--time">{item.date}</div>
    <div className="tweet--actions">
      <span>{item.additionnalInformations.retweet_count}</span>
      <i className="fa fa-retweet"></i>
      <span>{item.additionnalInformations.favorite_count}</span>
      <i className="fa fa-heart"></i>
    </div>
  </div>
);

export default TweetFromItem;
