import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export interface ChartSectionProps {
  title?: string;
  description?: string;
  data: any[];
  config: {
    type: 'line' | 'area' | 'bar';
    xAxisKey: string;
    series: {
      key: string;
      name?: string;
      color?: string;
    }[];
  };
}

const ChartSection: React.FC<ChartSectionProps> = ({ title, description, data, config }) => {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    const renderSeries = () => {
      return config.series.map((s, idx) => {
        const color = s.color || '#EFC7FF'; // default theme color
        
        if (config.type === 'line') {
          return <Line key={idx} type="monotone" dataKey={s.key} name={s.name || s.key} stroke={color} strokeWidth={3} dot={{ r: 4, fill: color }} activeDot={{ r: 6 }} />;
        }
        if (config.type === 'area') {
          return <Area key={idx} type="monotone" dataKey={s.key} name={s.name || s.key} fill={color} stroke={color} fillOpacity={0.3} strokeWidth={2} />;
        }
        if (config.type === 'bar') {
          return <Bar key={idx} dataKey={s.key} name={s.name || s.key} fill={color} radius={[4, 4, 0, 0]} />;
        }
        return null;
      });
    };

    const commonChildren = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke="#C1ABCC" opacity={0.2} />
        <XAxis 
          dataKey={config.xAxisKey} 
          stroke="#C1ABCC" 
          tick={{ fill: '#C1ABCC', fontFamily: 'var(--font-family-mono)' }} 
          tickMargin={10} 
          axisLine={{ stroke: '#C1ABCC', opacity: 0.5 }} 
          style={{ fontFamily: 'var(--font-family-mono)' }}
        />
        <YAxis 
          stroke="#C1ABCC" 
          tick={{ fill: '#C1ABCC', fontFamily: 'var(--font-family-mono)' }} 
          tickMargin={10} 
          axisLine={{ stroke: '#C1ABCC', opacity: 0.5 }} 
          style={{ fontFamily: 'var(--font-family-mono)' }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#250036', borderColor: '#580081', borderRadius: '8px', color: '#EFC7FF', fontFamily: 'var(--font-family-mono)' }}
          itemStyle={{ color: '#EFC7FF', fontFamily: 'var(--font-family-mono)' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px', color: '#EFC7FF', fontFamily: 'var(--font-family-mono)' }} />
        {renderSeries()}
      </>
    );

    switch (config.type) {
      case 'line':
        return <LineChart {...commonProps}>{commonChildren}</LineChart>;
      case 'area':
        return <AreaChart {...commonProps}>{commonChildren}</AreaChart>;
      case 'bar':
        return <BarChart {...commonProps}>{commonChildren}</BarChart>;
      default:
        return <LineChart {...commonProps}>{commonChildren}</LineChart>;
    }
  };

  return (
    <section className="chart-section">
      <div className="chart-section__content">
        {title && <h2 className="chart-section__title">{title}</h2>}
        {description && <p className="chart-section__text">{description}</p>}
      </div>
        
      <div className="chart-section__chart-container">
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ChartSection;
