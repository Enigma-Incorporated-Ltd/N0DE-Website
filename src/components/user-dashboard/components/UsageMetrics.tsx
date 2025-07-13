import React from 'react';
import Icon from '../../../components/AppIcon';

// Define the shape of each metric
interface UsageMetric {
  id: string;
  name: string;
  icon: string;
  used: number;
  limit?: number | 'unlimited';
  description: string;
}

// Define props for the component
interface UsageMetricsProps {
  metrics: UsageMetric[];
  planLimits?: Record<string, number | 'unlimited'>;
}

const UsageMetrics: React.FC<UsageMetricsProps> = ({ metrics = [], planLimits = {} }) => {
  const calculatePercentage = (used: number, limit: number | 'unlimited' | undefined): number => {
    if (limit === 'unlimited' || !limit) return 0;
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-destructive bg-destructive/10';
    if (percentage >= 70) return 'text-warning bg-warning/10';
    return 'text-success bg-success/10';
  };

  const getBarColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-destructive';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  const formatLimit = (limit: number | 'unlimited' | undefined): string => {
    return limit === 'unlimited' ? '∞' : Number(limit).toLocaleString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">Usage Overview</h3>
      <div className="space-y-6">
        {metrics.map((metric) => {
          const { id, name, icon, used, description } = metric;
          const limit = planLimits?.[id] ?? metric.limit;
          const percentage = calculatePercentage(used, limit);
          const usageColorClass = getUsageColor(percentage);
          const barColorClass = getBarColor(percentage);

          return (
            <div key={id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {used.toLocaleString()} / {formatLimit(limit)}
                </span>
              </div>

              {limit !== 'unlimited' && limit !== undefined && (
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 transition-all duration-300 ${barColorClass}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{description}</span>
                {limit !== 'unlimited' && limit !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full ${usageColorClass}`}>
                    {percentage.toFixed(0)}% used
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsageMetrics;
