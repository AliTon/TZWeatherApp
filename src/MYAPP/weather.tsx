import React, { useState, useEffect } from 'react'
import {List, Spin} from 'antd'
import Chart from './components/Chart'
import Cards from './components/Cards'
import Search from "./components/Search";
import {WeatherStyle} from "./Weather.styles";
import {IForecastData, IHistoricalData} from "../modules/Weather";


function Weather(): JSX.Element {
    const [loading, setLoading] = useState(false)
    const [forecastData, setForecastData] = useState<IForecastData[]>([])
    const [historicalData, setHistoricalData] = useState<IHistoricalData[]>([])
    const apiKey = process.env.REACT_APP_API_KEY

    const handleSearchClick = async (city: string): Promise<void> => {
        try {
            setLoading(true)
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
                        itemDate <= new Date(currentDate.setDate(currentDate.getDate() + 4)) // Only include data for the next 5 days
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
                    index
                }));
            setForecastData(filteredForecastData)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };



    useEffect(() => {
        if (forecastData.length > 0 && historicalData.length > 0) {
            console.log('Historical data:', historicalData)
        }
    }, [forecastData, historicalData])

    return (
        <WeatherStyle>
            <Search handleSearchClick={handleSearchClick}/>
            {loading && <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px'
            }}><Spin size="large" /></div>}
            {forecastData.length > 0 && (
                <>
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
                                borderRadius: '30px'
                            }}>
                                <Cards item={item} />
                            </div>
                        )}
                    />
                    <Chart data={historicalData || []} />
                </>
            )}
        </WeatherStyle>
    )
}
export default Weather
