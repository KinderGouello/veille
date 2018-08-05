export const DIGEST_GET_FETCH = 'DIGEST_FETCH';
export const DIGEST_GET_FETCH_SUCCESS = 'DIGEST_FETCH_SUCCESS';
export const DIGEST_GET_FETCH_ERROR = 'DIGEST_FETCH_ERROR';
export const DIGEST_ACTION_FETCH = 'DIGEST_ACTION_FETCH';
export const DIGEST_ADD_FETCH_SUCCESS = 'DIGEST_ADD_FETCH_SUCCESS';
export const DIGEST_ADD_FETCH_ERROR = 'DIGEST_ADD_FETCH_ERROR';
export const DIGEST_NEXT = 'DIGEST_NEXT';
export const DIGEST_PREV = 'DIGEST_PREV';

export function fetchItems() {
  return { type: DIGEST_GET_FETCH };
};
export function addItem(digestId, itemId) {
  return {
    type: DIGEST_ACTION_FETCH,
    digestId,
    itemId,
  }
};

export const nextItem = () => ({
  type: DIGEST_NEXT,
});

export const prevItem = () => ({
  type: DIGEST_PREV,
});
