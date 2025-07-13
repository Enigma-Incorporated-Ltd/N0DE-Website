import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

import Button from '../../../components/ui/Button';

const SubscriptionChart = () => {
  const [chartType, setChartType] = useState('growth');
  const [timeRange, setTimeRange] = useState('6months');

  const growthData = [
    { month: 'Jul', subscribers: 1250, revenue: 18750 },
    { month: 'Aug', subscribers: 1420, revenue: 21300 },
    { month: 'Sep', subscribers: 1680, revenue: 25200 },
    { month: 'Oct', subscribers: 1950, revenue: 29250 },
    { month: 'Nov', subscribers: 2180, revenue: 32700 },
    { month: 'Dec', subscribers: 2450, revenue: 36750 }
  ];

  const planDistributionData = [
    { plan: 'LITE', count: 980, percentage: 40 },
    { plan: 'PRO', count: 1225, percentage: 50 },
    { plan: 'MAX', count: 245, percentage: 10 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-popover-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Analytics</h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'growth' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('growth')}
              className="text-xs"
            >
              Growth
            </Button>
            <Button
              variant={chartType === 'distribution' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('distribution')}
              className="text-xs"
            >
              Plans
            </Button>
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
          >
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
          </select>
        </div>
      </div>

      <div className="h-80">
        {chartType === 'growth' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="subscribers" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name="Subscribers"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={planDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="plan" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                name="Subscribers"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span>{chartType === 'growth' ? 'Subscribers' : 'Plan Distribution'}</span>
          </div>
          {chartType === 'growth' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span>Revenue ($)</span>
            </div>
          )}
        </div>
        
        <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
          Export
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionChart;