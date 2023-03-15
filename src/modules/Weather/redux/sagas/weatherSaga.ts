import { takeEvery, put, call, Effect } from '@redux-saga/core/effects'
// import {
//     getNews,
// } from '../../service/WeatherService'
// import { getNewsFeedAction } from '../actions/weatherActions'
// import { PayloadAction } from '@reduxjs/toolkit'
// import { getNewsFeedSuccess } from '../slices/weatherSlice'
// import { IOrder } from '../../interfaces'
//
// function* fetchWeatherSaga({
//     payload,
// }: PayloadAction<{ order: IOrder }>): Generator<Effect> {
//     try {
//         const data = yield call(getWeather, payload.order)
//         yield put(getWeatherSuccess(data))
//     } catch (error) {
//         yield put({ type: 'FETCH_DATA_ERROR', payload: error })
//     }
// }
//
//
// export function* watchFetchNews() {
//     yield takeEvery(getNewsFeedAction.type, fetchNewsSaga)
// }

export const watchFetchWeather = ''
