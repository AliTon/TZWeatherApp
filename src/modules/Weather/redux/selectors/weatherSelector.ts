import { RootState } from '../../../../configureApp/configureStore'

export const selectTempType = (state: RootState) => state.weather.type
export const selectError = (state: RootState) => state.weather.error
export const selectLoadingState = (state: RootState) => state.weather.loading
export const selectForecastData = (state: RootState) => state.weather.forecast
export const selectHistoricalData = (state: RootState) => state.weather.history

