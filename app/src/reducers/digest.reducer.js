import {
  DIGEST_GET_FETCH,
  DIGEST_GET_FETCH_SUCCESS,
  DIGEST_ADD_FETCH_SUCCESS,
  DIGEST_NEXT,
  DIGEST_PREV,
} from '../actions/digest.actions';

const initialState = {
  itemLoading: false,
  currentItem: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DIGEST_GET_FETCH:
      return {
        ...state,
        ...{ itemLoading: true },
      };
    case DIGEST_GET_FETCH_SUCCESS:
    case DIGEST_ADD_FETCH_SUCCESS:
      return {
        ...state,
        ...action.data,
        ...{ itemLoading: false },
      };
    case DIGEST_NEXT:
      return {
        ...state,
        ...{ currentItem: state.currentItem + 1 },
      };
    case DIGEST_PREV:
      return {
        ...state,
        ...{ currentItem: state.currentItem - 1 },
      };
    default:
      return state;
  };
}
