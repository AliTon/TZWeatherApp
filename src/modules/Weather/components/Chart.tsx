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
import {useAppSelector} from "../../../configureApp/hooks";
import {selectTempType} from "../redux/selectors/weatherSelector";
import {tempConvertor} from "../../../utils";

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
            flexDirection: 'column',
            justifyContent: 'start',
            background: 'black',
            paddingTop: '24px'
        }}>
            <h1 style={{color: 'white', fontSize: '32px', fontWeight: 600}}>Last days history</h1>
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
