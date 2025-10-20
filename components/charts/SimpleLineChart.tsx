import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function SimpleLineChart({ data }: { data: { month: string; value: number }[] }) {
return (
<div style={{ width: '100%', height: 240 }}>
<ResponsiveContainer>
<LineChart data={data}>
<XAxis dataKey="month" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="value" stroke="#3182ce" strokeWidth={2} dot={false} />
</LineChart>
</ResponsiveContainer>
</div>
);
}