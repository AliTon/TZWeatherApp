import React, { useState } from 'react'
import {List, Spin} from 'antd'
import Chart from './components/Chart'
import Card from './components/Card'
import Search from "./components/Search";
import {WeatherStyle} from "./Weather.styles";
import {IForecastData, IHistoricalData} from "../modules/Weather";


function Weather(): JSX.Element {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [forecastData, setForecastData] = useState<IForecastData[]>([])
    const [historicalData, setHistoricalData] = useState<IHistoricalData[]>([])
    const apiKey = process.env.REACT_APP_API_KEY

    const handleSearchClick = async (city: string): Promise<void> => {
        try {
            setLoading(true);

            // Get the forecast data for the specified city
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
            );
            const forecastData = await forecastResponse.json();
            const filteredForecastData = forecastData.list
                .filter((item: any, index: number) => {
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
                }));
            setForecastData(filteredForecastData);

            const currentDate = new Date();
            const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 5)); // 5 days ago
            const pastTimestamp = Math.floor(pastDate.getTime() / 1000); // Convert to UNIX timestamp

            const { city: { coord } } = forecastData;

            // Get the historical weather data for the specified city
            const historicalResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coord.lat}&lon=${coord.lon}&dt=${pastTimestamp}&units=metric&appid=${apiKey}`
            );
            const historicalData = await historicalResponse.json();
            const historicalWeatherData = historicalData.hourly.map((item: any) => ({
                date: new Date(item.dt * 1000).toLocaleDateString(),
                temperature: item.temp,
            }));
            setHistoricalData(historicalWeatherData);
        } catch (error) {
            setError(true)
            console.log(error, ">>>>>>>>>>>>>>>>>>>>>>>");
        } finally {
            setLoading(false);
        }
    };


    return (
        <WeatherStyle>
            <Search handleSearchClick={handleSearchClick}/>
            {loading ?
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '40px'
                }}>
                    <Spin size="large"/>
                </div>
                :
                <>
                    {forecastData.length > 0 && (
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                                xxl: 5,
                            }}
                            dataSource={forecastData}

                            renderItem={(item) => (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                    <Card item={item}/>
                                </div>
                            )}
                        />
                    )}
                    {historicalData.length > 0 && (
                        <Chart data={historicalData || []}/>
                    )}
                </>

            }

        </WeatherStyle>
    )
}
export default Weather
