import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_CANCEL,
} from '../store/login/action'

// import { loginAPI } from '../API'

export function* authorize({ username, password }) {
  try {
    const response = yield call(null, {
      username,
      password,
    })
    yield put({
      type: LOGIN_SUCCESS,
      response,
    })
  } catch (error) {
    yield put({
      type: LOGIN_ERROR,
      error,
    })
  }
}

export function* loginFlow(action) {
  const task = yield fork(authorize, {
    username: action.username,
    password: action.password,
  })
  yield take(LOGIN_CANCEL)
  yield cancel(task)
}

export function* watchRequestLogin() {
  yield takeEvery(LOGIN_REQUEST, loginFlow)
}
