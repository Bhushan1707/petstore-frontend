import { all } from 'redux-saga/effects';
import authWatcher from './auth/authSaga';
import petWatcher from './pets/petSaga';
import adoptionWatcher from './adoptions/adoptionSaga';
import galleryWatcher from './gallery/gallerySaga';

export default function* rootSaga() {
  yield all([
    authWatcher(),
    petWatcher(),
    adoptionWatcher(),
    galleryWatcher(),
  ]);
}
