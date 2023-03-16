import { all } from '@redux-saga/core/effects'
import { watchFetchWeather } from '../modules/Weather'

export default function* rootSaga() {
    yield all([watchFetchWeather()])
}
