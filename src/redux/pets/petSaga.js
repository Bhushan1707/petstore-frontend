import { call, put, takeLatest } from 'redux-saga/effects';
import * as petApi from '../../api/petApi';
import {
  fetchPetsRequest, fetchPetsSuccess, fetchPetsFailure,
  fetchPetByIdRequest, fetchPetByIdSuccess, fetchPetByIdFailure,
  createPetRequest, createPetSuccess, createPetFailure,
  updatePetRequest, updatePetSuccess, updatePetFailure,
  deletePetRequest, deletePetSuccess, deletePetFailure,
} from './petSlice';

function* fetchPetsSaga(action) {
  try {
    const data = yield call(petApi.getPets, action.payload);
    yield put(fetchPetsSuccess(data));
  } catch (err) {
    yield put(fetchPetsFailure(err.response?.data?.message || err.message));
  }
}

function* fetchPetByIdSaga(action) {
  try {
    const data = yield call(petApi.getPetById, action.payload);
    yield put(fetchPetByIdSuccess(data));
  } catch (err) {
    yield put(fetchPetByIdFailure(err.response?.data?.message || err.message));
  }
}

function* createPetSaga(action) {
  try {
    const data = yield call(petApi.createPet, action.payload);
    yield put(createPetSuccess(data));
  } catch (err) {
    yield put(createPetFailure(err.response?.data?.message || err.message));
  }
}

function* updatePetSaga(action) {
  try {
    const data = yield call(petApi.updatePet, action.payload);
    yield put(updatePetSuccess(data));
  } catch (err) {
    yield put(updatePetFailure(err.response?.data?.message || err.message));
  }
}

function* deletePetSaga(action) {
  try {
    yield call(petApi.deletePet, action.payload);
    yield put(deletePetSuccess(action.payload));
  } catch (err) {
    yield put(deletePetFailure(err.response?.data?.message || err.message));
  }
}

export default function* petWatcher() {
  yield takeLatest(fetchPetsRequest.type, fetchPetsSaga);
  yield takeLatest(fetchPetByIdRequest.type, fetchPetByIdSaga);
  yield takeLatest(createPetRequest.type, createPetSaga);
  yield takeLatest(updatePetRequest.type, updatePetSaga);
  yield takeLatest(deletePetRequest.type, deletePetSaga);
}
