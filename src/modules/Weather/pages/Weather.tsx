import React from 'react'
import {List, Spin} from 'antd'
import Chart from '../components/Chart'
import Card from '../components/Card'
import Search from "../components/Search";
import {WeatherStyle} from "./Weather.styles";
import {useDispatch} from "react-redux";
import {getWeatherByCityName} from "../redux/slices/weatherSlice";
import {useAppSelector} from "../../../configureApp/hooks";
import {
    selectError,
    selectForecastData,
    selectHistoricalData,
    selectLoadingState
} from "../redux/selectors/weatherSelector";


function Weather(): JSX.Element {
    const dispatch = useDispatch()
    const forecastData = useAppSelector(selectForecastData)
    const historicalData = useAppSelector(selectHistoricalData)
    const error = useAppSelector(selectError)
    const loading = useAppSelector(selectLoadingState)

    const handleSearchClick = async (city: string): Promise<void> => {
        dispatch(getWeatherByCityName(city))
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
                    {
                        error ? <div style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            color: 'red'
                        }}>Something want wrong!!!</div> : <>
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
                </>
            }
        </WeatherStyle>
    )
}
export default Weather
