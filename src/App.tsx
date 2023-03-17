import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import { Weather } from './modules/Weather'
import {useDispatch} from "react-redux";
import {getWeatherByLocation, getWeatherByCityName} from "./modules/Weather/redux/slices/weatherSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // get the user's current location
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                dispatch(getWeatherByLocation({latitude, longitude}))
                },
            () => {
                dispatch(getWeatherByCityName("Yerevan"))
            }
        );
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="*" element={<Weather />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
