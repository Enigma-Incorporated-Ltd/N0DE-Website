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
    if (percentage >= 90) return 'text-danger bg-danger';
    if (percentage >= 70) return 'text-warning bg-warning';
    return 'text-success bg-success';
  };

  const getBarColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-danger';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  const formatLimit = (limit: number | 'unlimited' | undefined): string => {
    return limit === 'unlimited' ? '∞' : Number(limit).toLocaleString();
  };

  return (
    <div className="bg-dark border border-secondary rounded-3 p-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
      <h3 className="text-light h5 mb-4">Usage Overview</h3>
      <div className="d-flex flex-column gap-4">
        {metrics.map((metric) => {
          const { id, name, icon, used, description } = metric;
          const limit = planLimits?.[id] ?? metric.limit;
          const percentage = calculatePercentage(used, limit);
          const usageColorClass = getUsageColor(percentage);
          const barColorClass = getBarColor(percentage);

          return (
            <div key={id} className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Icon name={icon} size={16} className="text-light opacity-75 me-2" />
                  <span className="text-light fw-medium" style={{ fontSize: '0.875rem' }}>{name}</span>
                </div>
                <span className="text-light opacity-75" style={{ fontSize: '0.875rem' }}>
                  {used.toLocaleString()} / {formatLimit(limit)}
                </span>
              </div>

              {limit !== 'unlimited' && limit !== undefined && (
                <div className="progress" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <div
                    className={`progress-bar ${barColorClass}`}
                    role="progressbar"
                    style={{ width: `${percentage}%`, transition: 'width 0.3s ease' }}
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              )}

              <div className="d-flex align-items-center justify-content-between">
                <span className="text-light opacity-75" style={{ fontSize: '0.75rem' }}>{description}</span>
                {limit !== 'unlimited' && limit !== undefined && (
                  <span className={`badge rounded-pill ${usageColorClass}`} style={{ fontSize: '0.7rem' }}>
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
