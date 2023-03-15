import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './rootSaga'
import {weatherSlice} from "../modules/Weather/redux/slices/weatherSlice";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        [weatherSlice.name]: weatherSlice.reducer,
    },
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
