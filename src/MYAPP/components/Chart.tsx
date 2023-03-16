import React, {useCallback} from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
import {useAppSelector} from "../../configureApp/hooks";
import {selectTempType} from "../../modules/Weather/redux/selectors/weatherSelector";
import {tempConvertor} from "../../utils";

interface HistoricalData {
    date: string
    temperature: number
}
interface IProps {
    data?: HistoricalData[]
}

const Chart: React.FC<IProps> = ({data = []}) => {
    const tempType = useAppSelector(selectTempType)

    const dataAdapter = useCallback((data: HistoricalData[]) => {
        return data.map((item) => {
            return {
                temperature: tempConvertor(item.temperature, tempType),
                date: item.date
            }
        })
    }, [tempType])

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            background: 'white',
            paddingTop: '24px'
        }}>
            {data.length > 0 && (
                <LineChart width={600} height={400} data={dataAdapter(data)}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#8884d8"
                    />
                </LineChart>
            )}
        </div>
    )
}

export default Chart
