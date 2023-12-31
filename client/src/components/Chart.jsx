import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

export default function Chart({ data, dataKeysAndColors }) {

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 40 }}>
        <defs>
          {dataKeysAndColors.map(({ dataKey, lineColor }) => (
            <linearGradient key={dataKey} id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="monthYear" angle={-75} interval={1} textAnchor="end" height={80} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="bottom" align='center' height={36} />
        {dataKeysAndColors.map(({ dataKey, lineColor }) => (
          <Area
            key={dataKey}
            type="monotone"
            dataKey={dataKey}
            stroke={lineColor}
            fillOpacity={1}
            fill={`url(#color-${dataKey})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKeysAndColors: PropTypes.arrayOf(PropTypes.object).isRequired,
};