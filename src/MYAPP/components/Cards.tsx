import React from 'react'
import { Card } from 'antd'
import {useAppSelector} from "../../configureApp/hooks";
import {selectTempType} from "../../modules/Weather/redux/selectors/weatherSelector";
import {IForecastData} from "../../modules/Weather";


interface IProps {
    item?: IForecastData
}
const Chart: React.FC<IProps> = ({ item = {} }) => {
    const { Meta } = Card

    const tempType = useAppSelector(selectTempType)
    console.log(tempType, ">>>>>>>>>> tempTypetempType")


    return (
        <Card
            hoverable
            style={{ width: 180, background: item.index ? 'red' : 'yellow' }}
            cover={
                <img
                    src={item.icon}
                    width={70}
                    height="auto"
                    alt="Weather icon"
                />
            }
        >
            <Meta
                title={item.date}
                description={
                    <div className="description">{tempType ? item.temperature :'barev'}</div>
                }
            />
        </Card>
    )
}

export default Chart
