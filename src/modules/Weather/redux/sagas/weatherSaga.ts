import {takeEvery, put, call, Effect} from '@redux-saga/core/effects'
// import {
//     getNews,
// } from '../../service/WeatherService'
// import { getNewsFeedAction } from '../actions/weatherActions'
import {PayloadAction} from '@reduxjs/toolkit'
import {getWeatherByCoordinates, getWeatherByCity, getWeatherHistory} from "../../service/WeatherService";
import {getWeatherByCityName, getWeatherByLocation, getWeatherSuccess} from "../slices/weatherSlice";
import {forecastAdapter, historyAdapter} from "../adapters/weatherAdapter";
// import { getNewsFeedSuccess } from '../slices/weatherSlice'
// import { IOrder } from '../../interfaces'
//
function* getWeatherByLocationSaga({
                                       payload,
                                   }: PayloadAction<GeolocationCoordinates>): Generator<Effect> {
    try {
        const data = yield call(getWeatherByCoordinates, payload.latitude, payload.longitude);
        const history = yield call(getWeatherHistory, payload.latitude, payload.longitude);
        console.log(history)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        yield put(getWeatherSuccess({forecast: forecastAdapter(data.data.list), history: historyAdapter(history.data)}))
    } catch (error) {
        yield put({type: 'FETCH_DATA_ERROR', payload: error})
    }
}

function* getWeatherByCitySaga({
                                   payload,
                               }: PayloadAction<string>): Generator<Effect> {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const data = yield call(getWeatherByCity, payload);
        // console.log({data})
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const history = yield call(getWeatherHistory, data.data.city.coord.lat, data.data.city.coord.lon);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        yield put(getWeatherSuccess({forecast: forecastAdapter(data.data.list), history: historyAdapter(history.data)}))
    } catch (error) {
        yield put({type: 'FETCH_DATA_ERROR', payload: error})
    }
}


export function* watchFetchWeather() {
    yield takeEvery(getWeatherByLocation.type, getWeatherByLocationSaga)
    yield takeEvery(getWeatherByCityName.type, getWeatherByCitySaga)
}

