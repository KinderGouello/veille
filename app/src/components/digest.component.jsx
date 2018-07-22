import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems, addItem, nextItem, prevItem } from '../actions/digest.actions';

import { Loader } from 'semantic-ui-react';
import TweetFromItem from './tweet-from-item.component';
import MediumFromItem from './medium-from-item.component';

import './styles/digest-card.css';
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
      itemLoading,
      onAddItem,
      onNextItem,
      onPrevItem,
    } = this.props;

    if (itemLoading) {
      return (
        <div className="card"><Loader active /></div>
      );
    }

    if (currentItem !== undefined) {
      const Component = cards[currentItem.type];

      return (
        <div className="card">
          <div className="card-information">{<Component item={currentItem} />}</div>
          <div className="card-actions">
            <div onClick={() => onPrevItem()}>Prev</div>
            <div onClick={() => onNextItem()}>Next</div>
            <div className="card-action card-add" onClick={() => onAddItem(digestId, currentItem._id)}>
              <span>
                <i className="fa fa-check fa-2x"></i>
              </span>
            </div>
          </div>
        </div>
      )
    }

    return (<div className="card"></div>);
  }
}

const mapStateToProps = state => {
  console.log({
    digestId: state.digest._id,
    currentItem: (state.digest.items) ? state.digest.items[state.digest.currentItem] : undefined,
    itemLoading: state.digest.itemLoading,
  });
  
  return {
    digestId: state.digest._id,
    currentItem: (state.digest.items) ? state.digest.items[state.digest.currentItem] : undefined,
    itemLoading: state.digest.itemLoading,
  };
  // actionLoading: state.digest.actionLoading,
};
const mapDispatchToProps = dispatch => bindActionCreators({
  onAddItem: addItem,
  onNextItem: nextItem,
  onPrevItem: prevItem,
  fetchItems,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Digest);
