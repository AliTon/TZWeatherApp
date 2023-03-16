import {AxiosPromise, AxiosResponse} from "axios";
import {WEATHER_API_KEY} from "../../../configs/constants";
import axiosInstance from "../../../configureApp/axiosInstance";

export const getWeatherByCoordinates = (lat: number, lon: number): AxiosPromise<AxiosResponse<{list: any}>> => {
    return axiosInstance.get(`/forecast`, {
        params: {lat, lon, appid: WEATHER_API_KEY, units: "metric"}
    });
}

export const getWeatherByCity = (city: string) => {
    return axiosInstance.get(`/forecast`, {
        params: {q: city, appid: WEATHER_API_KEY, units: "metric"}
    });
}


export const getWeatherHistory = (lat: number, lon: number) => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 5)); // 5 days ago
    const pastTimestamp = Math.floor(pastDate.getTime() / 1000); // Convert to UNIX timestamp

    return axiosInstance.get(`/onecall/timemachine`, {
        params: {lat, lon, dt: pastTimestamp, appid: WEATHER_API_KEY, units: "metric"}
    });
}

