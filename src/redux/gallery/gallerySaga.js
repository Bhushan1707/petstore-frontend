import { call, put, takeLatest } from 'redux-saga/effects';
import * as galleryApi from '../../api/galleryApi';
import {
  fetchGalleryRequest, fetchGallerySuccess, fetchGalleryFailure,
  uploadImagesRequest, uploadImagesSuccess, uploadImagesFailure,
  deleteImageRequest, deleteImageSuccess, deleteImageFailure,
} from './gallerySlice';

function* fetchGallerySaga(action) {
  try {
    const data = yield call(galleryApi.getGalleryByPet, action.payload);
    yield put(fetchGallerySuccess(data));
  } catch (err) {
    yield put(fetchGalleryFailure(err.response?.data?.message || err.message));
  }
}

function* uploadImagesSaga(action) {
  try {
    const { petId, formData } = action.payload;
    const data = yield call(galleryApi.uploadPetImages, petId, formData);
    yield put(uploadImagesSuccess(data));
  } catch (err) {
    yield put(uploadImagesFailure(err.response?.data?.message || err.message));
  }
}

function* deleteImageSaga(action) {
  try {
    yield call(galleryApi.deleteGalleryImage, action.payload);
    yield put(deleteImageSuccess(action.payload));
  } catch (err) {
    yield put(deleteImageFailure(err.response?.data?.message || err.message));
  }
}

export default function* galleryWatcher() {
  yield takeLatest(fetchGalleryRequest.type, fetchGallerySaga);
  yield takeLatest(uploadImagesRequest.type, uploadImagesSaga);
  yield takeLatest(deleteImageRequest.type, deleteImageSaga);
}
