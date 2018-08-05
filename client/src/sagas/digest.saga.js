import axios from 'axios';
import * as actions from '../actions/digest.actions';
import { all, takeEvery, call, put } from "redux-saga/effects";

function* fetchItems() {
  try {
    const response = yield call(axios.get, 'http://localhost:9000/digest');
    
    yield put({ type: "DIGEST_FETCH_SUCCESS", payload: response.data });
  } catch (e) {
    // yield put(fetchFailed(e));
    // return;
  }
}

function* addItem(actions) {
  try {
    const response = yield call(axios.post, `http://localhost:9000/digest/${actions.digestId}/add/${actions.itemId}`);

    yield put({ type: "DIGEST_ADD_FETCH_SUCCESS", payload: response.data });
  } catch (e) {
    // yield put(fetchFailed(e));
    // return;
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.DIGEST_GET_FETCH, fetchItems),
    yield takeEvery(actions.DIGEST_ACTION_FETCH, addItem),
  ]);
}