import React from 'react'
import {useAppSelector} from "../../../../configureApp/hooks";
import {selectTempType} from "../../redux/selectors/weatherSelector";
import {IForecastData} from "../../index";
import {CardStyle} from "./Card.style";
import {formatDateIfExists, tempConvertor} from '../../../../utils';


interface IProps {
    item: IForecastData
    style?: any
}
const Chart: React.FC<IProps> = ({ item = {}, style = {} }) => {
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
                </div>

            </div>
        </CardStyle>

    )
}

export default Chart
