import { call, put, takeLatest } from 'redux-saga/effects';
import * as authApi from '../../api/authApi';
import { setToken, removeToken } from '../../utils/tokenStorage';
import {
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure,
  getMeRequest, getMeSuccess, getMeFailure,
  logout,
} from './authSlice';

function* logoutSaga() {
  yield call(removeToken);
}

function* loginSaga(action) {
  try {
    const data = yield call(authApi.login, action.payload);
    const responseData = data.data || data;
    const token = responseData.token;
    
    if (token) {
      setToken(token);
      yield put(loginSuccess({ user: responseData, token }));
    } else {
      throw new Error('Token not found in login response');
    }
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || error.message));
  }
}

function* registerSaga(action) {
  try {
    yield call(authApi.register, action.payload);
    yield put(registerSuccess());
  } catch (error) {
    yield put(registerFailure(error.response?.data?.message || error.message));
  }
}

function* getMeSaga() {
  try {
    const data = yield call(authApi.getMe);
    yield put(getMeSuccess(data.data || data.user || data));
  } catch (error) {
    removeToken();
    yield put(getMeFailure(error.response?.data?.message || error.message));
    yield put(logout());
  }
}

export default function* authWatcher() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(getMeRequest.type, getMeSaga);
  yield takeLatest(logout.type, logoutSaga);
}
