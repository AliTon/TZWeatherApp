import {createSlice} from '@reduxjs/toolkit'
import {IForecastData, IHistoricalData} from "../../interfaces";

export interface WeatherState {
    loading: boolean;
    type: boolean
    error: boolean
    forecast: IForecastData[];
    history: IHistoricalData[]
}

const initialState: WeatherState = {
    loading: false,
    type: true,
    error: false,
    forecast: [],
    history: []
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        changeTempType(state, { payload }) {
            state.type = payload
            state.loading = false
        },
        getWeatherByLocation(state){
            state.loading = true
        },
        getWeatherByCityName(state, {payload}){
            state.loading = true
        },
        getWeatherSuccess(state, {payload: {forecast, history}}){
            state.forecast = forecast
            state.history = history
            state.error = false;
            state.loading = false;
        },
        getWeatherFailed(state){
            state.forecast = []
            state.history = []
            state.loading = false;
            state.error = true;
        },
        getLoadingState(state){
            state.loading = true;
        }
    },
})

export const {
    changeTempType,
    getWeatherByLocation,
    getWeatherSuccess,
    getWeatherByCityName,
    getWeatherFailed,
    getLoadingState
} = weatherSlice.actions
