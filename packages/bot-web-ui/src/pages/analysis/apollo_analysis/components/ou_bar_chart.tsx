import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const renderCustomizedLabel = (props:any) => {
    const { x, y, width, value } = props;
    return (
        <text x={x + width + 5} y={y + 10} fill='#666' textAnchor='start' fontSize={12}>
            {value}
        </text>
    );
};

const calculatePercentage = (arr: Number[], over: Number, under: Number) => {
    const totalCount = arr.length;
    const overCount = arr.filter(item => item > over).length;
    const underCount = arr.filter(item => item < under).length;

    const overPercentage = (overCount / totalCount) * 100;
    const underPercentage = (underCount / totalCount) * 100;

    return [overPercentage, underPercentage];
};

interface OverUnderProps {
    overUnderList: Number[];
}

export default class OverUnderBarChart extends PureComponent<OverUnderProps> {
    render() {
        const { overUnderList } = this.props;
        const [overPercentage, underPercentage] = calculatePercentage(overUnderList, 3, 4);
        const data = [
            {
                name: `Over`,
                uv: +overPercentage.toFixed(2),
            },
            {
                name: `Under`,
                uv: +underPercentage.toFixed(2),
            },
        ];

        return (
            <ResponsiveContainer width='140%' height={211}>
                <BarChart
                    width={100}
                    height={211}
                    data={data}
                    layout='vertical'
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis type='number' label='' />
                    <YAxis type='category' dataKey='name' />
                    <Tooltip />
                    <Bar dataKey='uv' fill='#8884d8'>
                        <LabelList dataKey='uv' content={renderCustomizedLabel} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}