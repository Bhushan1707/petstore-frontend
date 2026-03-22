import { call, put, takeLatest } from 'redux-saga/effects';
import * as adoptionApi from '../../api/adoptionApi';
import {
  applyForAdoptionRequest, applyForAdoptionSuccess, applyForAdoptionFailure,
  fetchMyApplicationsRequest, fetchMyApplicationsSuccess, fetchMyApplicationsFailure,
  fetchAllApplicationsRequest, fetchAllApplicationsSuccess, fetchAllApplicationsFailure,
  approveRequest, approveSuccess, approveFailure,
  rejectRequest, rejectSuccess, rejectFailure,
} from './adoptionSlice';

function* applyForAdoptionSaga(action) {
  try {
    const data = yield call(adoptionApi.applyForAdoption, action.payload);
    yield put(applyForAdoptionSuccess(data));
  } catch (err) {
    yield put(applyForAdoptionFailure(err.response?.data?.message || err.message));
  }
}

function* fetchMyApplicationsSaga() {
  try {
    const data = yield call(adoptionApi.getMyApplications);
    yield put(fetchMyApplicationsSuccess(data));
  } catch (err) {
    yield put(fetchMyApplicationsFailure(err.response?.data?.message || err.message));
  }
}

function* fetchAllApplicationsSaga() {
  try {
    const data = yield call(adoptionApi.getAllApplications);
    yield put(fetchAllApplicationsSuccess(data));
  } catch (err) {
    yield put(fetchAllApplicationsFailure(err.response?.data?.message || err.message));
  }
}

function* approveSaga(action) {
  try {
    const data = yield call(adoptionApi.approveApplication, action.payload);
    yield put(approveSuccess(data));
  } catch (err) {
    yield put(approveFailure(err.response?.data?.message || err.message));
  }
}

function* rejectSaga(action) {
  try {
    const data = yield call(adoptionApi.rejectApplication, action.payload);
    yield put(rejectSuccess(data));
  } catch (err) {
    yield put(rejectFailure(err.response?.data?.message || err.message));
  }
}

export default function* adoptionWatcher() {
  yield takeLatest(applyForAdoptionRequest.type, applyForAdoptionSaga);
  yield takeLatest(fetchMyApplicationsRequest.type, fetchMyApplicationsSaga);
  yield takeLatest(fetchAllApplicationsRequest.type, fetchAllApplicationsSaga);
  yield takeLatest(approveRequest.type, approveSaga);
  yield takeLatest(rejectRequest.type, rejectSaga);
}
