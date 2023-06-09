import {IForecastData} from "../../interfaces";

export const forecastAdapter = (data: IForecastData[], name: string) => {
    return data.filter((item: IForecastData, index: number) => {
        // Only include data for the next 5 days (starting from tomorrow)
        const currentDate = new Date();
        const itemDate = new Date(item.dt_txt);
        return (
            index % 8 === 0 && // Only include data for 12:00:00 for each day
            itemDate <= new Date(
                currentDate.setDate(currentDate.getDate() + 4)
            ) // Only include data for the next 5 days
        );
    })
        .map((item: any, index: number) => ({
            date: item.dt_txt.split(" ")[0],
            temperature: item.main.temp,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            description: item.weather[0].description,
            main: item.weather[0].main,
            speed: item.wind.speed,
            icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
            index,
            name,
        }));
}

export const historyAdapter = (datas: unknown[]) => {
    const result: any = []
    datas.forEach((data: any) => {
        data.hourly.forEach((item: any) => {
            result.push({
                date: new Date(item.dt * 1000).toLocaleDateString(),
                temperature: item.temp,
            })
        })
    })
    return result
}