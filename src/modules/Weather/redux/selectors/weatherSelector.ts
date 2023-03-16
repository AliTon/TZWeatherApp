import { RootState } from '../../../../configureApp/configureStore'

export const selectTempType = (state: RootState) => state.weather.type
export const selectForecastData = (state: RootState) => state.weather.forecast
export const selectHistoricalData = (state: RootState) => state.weather.history

