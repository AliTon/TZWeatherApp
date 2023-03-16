import {createSlice} from '@reduxjs/toolkit'
import {IForecastData, IHistoricalData} from "../../interfaces";

export interface WeatherState {
    loading: boolean;
    type: boolean
    forecast: IForecastData[];
    history: IHistoricalData[]
}

const initialState: WeatherState = {
    loading: true,
    type: true,
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
            state.loading =true
        },
        getWeatherSuccess(state, {payload: {forecast, history}}){
            state.forecast = forecast
            state.history = history
        },
        getWeatherFailed(state, {payload: {forecast, history}}){
            // state.forecast = forecast
            // state.history = history
        }
    },
})

export const { changeTempType , getWeatherByLocation, getWeatherSuccess, getWeatherByCityName} = weatherSlice.actions
