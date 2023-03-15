import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'

interface HistoricalData {
    date: string
    temperature: number
}
interface IProps {
    data?: HistoricalData[]
}
const Chart: React.FC<IProps> = ({ data = [] }) => {
    console.log(data, '>>>>>>>>>>>>>>>>> data')
    return (
        <>
            <div>
                {data.length > 0 && (
                    <LineChart width={600} height={400} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#8884d8"
                        />
                    </LineChart>
                )}
            </div>
        </>
    )
}

export default Chart
