import { createSlice } from '@reduxjs/toolkit'

export interface NewsState {
    loading: boolean
    type: boolean
}

const initialState: NewsState = {
    loading: true,
    type: true,
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        changeTempType(state, { payload }) {
            state.type = payload
            state.loading = false
        },
    },
})

export const { changeTempType } = weatherSlice.actions
