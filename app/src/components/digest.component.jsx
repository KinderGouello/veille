import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems, addItem, nextItem, prevItem } from '../actions/digest.actions';

import { Loader } from 'semantic-ui-react';
import TweetFromItem from './tweet-from-item.component';
import MediumFromItem from './medium-from-item.component';
import DigestCard from './Digest/digest-card.component';
import NavButton from './Digest/nav-button.component';

import './styles/digest.css';
import 'semantic-ui-css/semantic.min.css';

const cards = {
  tweet: TweetFromItem,
  medium: MediumFromItem,
};

class Digest extends Component {
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    const {
      digestId,
      currentItem,
      isFirstItem,
      isLastItem,
      onAddItem,
      onNextItem,
      onPrevItem,
    } = this.props;

    const Component = (currentItem) ? cards[currentItem.type] : false;

    return (
      <div className="digest">
        <div className="digest-left"><NavButton onClick={!isFirstItem && (() => onPrevItem())} icon={!isFirstItem && "arrow-left"} /></div>
        <div className="digest-center">
          {isLastItem ? (
            <DigestCard
              body={<p style={{textAlign: 'center'}}>Finished !</p>}
              onClick=''
              isItem={false}
            />
          ) : (!Component ? (
            <DigestCard
              body={<Loader active />}
              onClick=''
              isItem={false}
            />
          ) : ( 
            <DigestCard
              body={<Component item={currentItem} />}
              onClick={() => onAddItem(digestId, currentItem._id)}
              isItem={true}
            />
          ))}
        </div>
        <div className="digest-right"><NavButton onClick={!isLastItem && (() => onNextItem())} icon={!isLastItem && "arrow-right"} /></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  digestId: state.digest._id,
  isFirstItem: state.digest.currentItem === 0,
  isLastItem: (state.digest.items !== undefined) ? state.digest.currentItem === state.digest.items.length : false,
  currentItem: (state.digest.items) ? state.digest.items[state.digest.currentItem] : undefined,
  // actionLoading: state.digest.actionLoading,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  onAddItem: addItem,
  onNextItem: nextItem,
  onPrevItem: prevItem,
  fetchItems,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Digest);
