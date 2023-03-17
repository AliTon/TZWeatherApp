import {takeEvery, put, call, Effect, all} from '@redux-saga/core/effects'
import {PayloadAction} from '@reduxjs/toolkit'
import {
    getWeatherByCoordinates,
    getWeatherByCity,
    getWeatherHistory
} from "../../service/WeatherService";
import {
    getWeatherByCityName,
    getWeatherByLocation,
    getWeatherSuccess,
    getWeatherFailed,
    getLoadingState
} from "../slices/weatherSlice";
import {forecastAdapter, historyAdapter} from "../adapters/weatherAdapter";
//
function* getWeatherByLocationSaga({
                                       payload,
                                   }: PayloadAction<GeolocationCoordinates>): Generator<Effect> {
    try {
        const data = yield call(getWeatherByCoordinates, payload.latitude, payload.longitude);
        const history = yield all([
            call(getWeatherHistory, payload.latitude, payload.longitude, 5),
            call(getWeatherHistory, payload.latitude, payload.longitude, 4),
            call(getWeatherHistory, payload.latitude, payload.longitude, 3),
            call(getWeatherHistory, payload.latitude, payload.longitude, 2),
            call(getWeatherHistory, payload.latitude, payload.longitude, 1),
        ]);
        //@ts-ignore
        yield put(getWeatherSuccess({forecast: forecastAdapter(data.data.list, data.data.city.name), history: historyAdapter(history.map(h => h.data))}))
    } catch (error) {
        console.log(error)
        yield put({type: 'FETCH_DATA_ERROR', payload: error})
    }
}

function* getWeatherByCitySaga({
                                   payload,
                               }: PayloadAction<string>): Generator<Effect> {
    try {
        yield put(getLoadingState())
        const data = yield call(getWeatherByCity, payload);
        //@ts-ignore
        const history = yield call(getWeatherHistory, data.data.city.coord.lat, data.data.city.coord.lon);
        //@ts-ignore
        yield put(getWeatherSuccess({forecast: forecastAdapter(data.data.list), history: historyAdapter(history.data)}))
    } catch (error) {
        yield put(getWeatherFailed())
    }
}


export function* watchFetchWeather() {
    yield takeEvery(getWeatherByLocation.type, getWeatherByLocationSaga)
    yield takeEvery(getWeatherByCityName.type, getWeatherByCitySaga)
}

