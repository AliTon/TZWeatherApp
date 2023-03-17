import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { useAppSelector } from '../../../../configureApp/hooks';
import { selectTempType } from '../../redux/selectors/weatherSelector';
import { tempConvertor } from '../../../../utils';
import { ChartStyle } from './Chart.style';

interface HistoricalData {
    date: string;
    temperature: number;
}

interface IProps {
    data?: HistoricalData[];
}

const Chart: React.FC<IProps> = ({ data = [] }) => {
    const tempType = useAppSelector(selectTempType);
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartWidth, setChartWidth] = useState(0);
    const [chartHeight, setChartHeight] = useState(0);

    const dataAdapter = useCallback(
        (data: HistoricalData[]) => {
            return data.map((item) => {
                return {
                    temperature: tempConvertor(item.temperature, tempType),
                    date: item.date,
                };
            });
        },
        [tempType],
    );

    useLayoutEffect(() => {
        function handleResize() {
            if (chartRef.current) {
                const width = chartRef.current.offsetWidth * 0.8;
                const height = Math.min(width * 0.6, window.innerHeight * 0.6);
                setChartWidth(width);
                setChartHeight(height);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ChartStyle>
            <div className="weather_chart_title">Last days history</div>
            {data.length > 0 && (
                <div className="chart_container" ref={chartRef}>
                    <LineChart width={chartWidth} height={chartHeight} data={dataAdapter(data)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                    </LineChart>
                </div>
            )}
        </ChartStyle>
    );
};

export default Chart;
