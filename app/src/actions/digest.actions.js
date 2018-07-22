export const DIGEST_GET_FETCH = 'DIGEST_FETCH';
export const DIGEST_GET_FETCH_SUCCESS = 'DIGEST_FETCH_SUCCESS';
export const DIGEST_GET_FETCH_ERROR = 'DIGEST_FETCH_ERROR';
export const DIGEST_ACTION_FETCH = 'DIGEST_ACTION_FETCH';
export const DIGEST_ADD_FETCH_SUCCESS = 'DIGEST_ADD_FETCH_SUCCESS';
export const DIGEST_ADD_FETCH_ERROR = 'DIGEST_ADD_FETCH_ERROR';
export const DIGEST_NEXT = 'DIGEST_NEXT';
export const DIGEST_PREV = 'DIGEST_PREV';

export const fetchItems = () => async dispatch => {
  dispatch({ type: DIGEST_GET_FETCH });

  try {
    const response = await fetch('http://localhost:9000/digest')
    const data = await response.json();

    dispatch({ type: DIGEST_GET_FETCH_SUCCESS, data });
  } catch (e) {
    dispatch({ type: DIGEST_GET_FETCH_ERROR });
  }
}

export const addItem = (digestId, itemId) => async dispatch => {
  dispatch({ type: DIGEST_ACTION_FETCH });

  try {
    const response = await fetch(`http://localhost:9000/digest/${digestId}/add/${itemId}`, {
      method: "POST",
    });
    const data = await response.json();

    dispatch({ type: DIGEST_ADD_FETCH_SUCCESS, data });
  } catch (e) {
    dispatch({ type: DIGEST_ADD_FETCH_ERROR });
  }
}

export const nextItem = () => ({
  type: DIGEST_NEXT,
});

export const prevItem = () => ({
  type: DIGEST_PREV,
});
