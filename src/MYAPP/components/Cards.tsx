import React from 'react'
import {Card, Divider} from 'antd'
import {useAppSelector} from "../../configureApp/hooks";
import {selectTempType} from "../../modules/Weather/redux/selectors/weatherSelector";
import {IForecastData} from "../../modules/Weather";
import {CardStyle} from "./Card.style";
import {formatDateIfExists, tempConvertor} from '../../utils';


interface IProps {
    item?: IForecastData
}
const Chart: React.FC<IProps> = ({ item = {} }) => {
    const tempType = useAppSelector(selectTempType)


    return (
        <CardStyle current={item.index === 0}>
            <div>
                <div className='card-header'>
                    <div>
                        <div>{formatDateIfExists(item.date)}</div>
                        <div>{item.main}</div>
                    </div>

                        <img
                            src={item.icon}
                            width='60px'
                            height="auto"
                            alt="Weather icon"
                        />

                </div>
                <div className='card-body'>
                    <div className='divider'/>
                    <div className='card-content'>
                        {`${tempConvertor(item.temperature as number, tempType)} ${tempType ?  '(°C)':  '(°F)'}`}
                    </div>
                    <div className='card-info'>
                        <div>{item.description}</div>
                        <div>
                            <span>speed</span>{`:... ${item.speed} km/h`}
                        </div>
                        <div>
                            <span>humidity</span>{`:... ${item.humidity} %`}
                        </div>
                        <div>
                            <span>pressure</span>{`:... ${item.pressure} MB`}
                        </div>
                    </div>

                    {/*<Meta*/}
                    {/*    title={item.date}*/}
                    {/*    description={*/}
                    {/*        <div className="description">{tempType ? item.temperature : 'barev'}</div>*/}
                    {/*    }*/}
                    {/*/>*/}
                    {/*<Meta*/}
                    {/*    title={item.date}*/}
                    {/*    description={*/}
                    {/*        <div className="description">{tempType ? item.temperature : 'barev'}</div>*/}
                    {/*    }*/}
                    {/*/>*/}
                </div>

            </div>
        </CardStyle>

    )
}

export default Chart
