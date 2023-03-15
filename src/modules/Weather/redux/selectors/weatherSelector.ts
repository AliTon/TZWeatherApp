import { RootState } from '../../../../configureApp/configureStore'

export const selectTempType = (state: RootState) => state.weather.type

