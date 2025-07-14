import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

// Types
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PlanFeature[];
  guarantee: string;
}

interface FeatureComparisonProps {
  plans: Plan[];
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ plans }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const featureCategories = [
    {
      name: 'Core Features',
      features: [
        'Monthly Transactions',
        'User Accounts',
        'Storage Space',
        'API Calls',
        'Email Support'
      ]
    },
    {
      name: 'Advanced Features',
      features: [
        'Priority Support',
        'Custom Integrations',
        'Advanced Analytics',
        'White Label',
        'Dedicated Manager'
      ]
    },
    {
      name: 'Security & Compliance',
      features: [
        'SSL Certificate',
        'Data Backup',
        'GDPR Compliance',
        'SOC 2 Compliance',
        'Custom Security'
      ]
    }
  ];

  const getFeatureValue = (planName: string, featureName: string) => {
    const plan = plans.find(p => p.name === planName);
    const feature = plan?.features.find(f => f.text.includes(featureName) || f.text === featureName);
    
    // Mock feature values based on plan and feature
    const featureMap: Record<string, Record<string, string | boolean>> = {
      'LITE': {
        'Monthly Transactions': '1,000',
        'User Accounts': '5',
        'Storage Space': '10GB',
        'API Calls': '10,000',
        'Email Support': true,
        'Priority Support': false,
        'Custom Integrations': false,
        'Advanced Analytics': false,
        'White Label': false,
        'Dedicated Manager': false,
        'SSL Certificate': true,
        'Data Backup': 'Weekly',
        'GDPR Compliance': true,
        'SOC 2 Compliance': false,
        'Custom Security': false
      },
      'PRO': {
        'Monthly Transactions': '10,000',
        'User Accounts': '25',
        'Storage Space': '100GB',
        'API Calls': '100,000',
        'Email Support': true,
        'Priority Support': true,
        'Custom Integrations': '5',
        'Advanced Analytics': true,
        'White Label': false,
        'Dedicated Manager': false,
        'SSL Certificate': true,
        'Data Backup': 'Daily',
        'GDPR Compliance': true,
        'SOC 2 Compliance': true,
        'Custom Security': false
      },
      'MAX': {
        'Monthly Transactions': 'Unlimited',
        'User Accounts': 'Unlimited',
        'Storage Space': '1TB',
        'API Calls': 'Unlimited',
        'Email Support': true,
        'Priority Support': true,
        'Custom Integrations': 'Unlimited',
        'Advanced Analytics': true,
        'White Label': true,
        'Dedicated Manager': true,
        'SSL Certificate': true,
        'Data Backup': 'Real-time',
        'GDPR Compliance': true,
        'SOC 2 Compliance': true,
        'Custom Security': true
      }
    };

    const value = featureMap[planName]?.[featureName];
    return value;
  };

  const renderFeatureValue = (value: string | boolean | undefined) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="Check" size={16} className="text-success" />
      ) : (
        <Icon name="X" size={16} className="text-secondary" />
      );
    }
    return <span className="small text-light">{value}</span>;
  };

  // Mobile view with expandable sections
  const MobileComparison = () => (
    <div className="d-lg-none">
      <h3 className="text-light fw-bold mb-4 h4">Feature Comparison</h3>
      {featureCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-dark border border-secondary rounded-3 mb-3">
          <button
            onClick={() => setExpandedSection(expandedSection === categoryIndex ? null : categoryIndex)}
            className="w-100 d-flex align-items-center justify-content-between p-3 text-start bg-transparent border-0 text-light"
          >
            <span className="fw-medium">{category.name}</span>
            <Icon 
              name={expandedSection === categoryIndex ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-secondary" 
            />
          </button>
          
          {expandedSection === categoryIndex && (
            <div className="border-top border-secondary">
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="p-3 border-bottom border-secondary">
                  <div className="fw-medium small text-light mb-2">{feature}</div>
                  <div className="row g-2">
                    {plans.map((plan) => (
                      <div key={plan.name} className="col-4 text-center">
                        <div className="text-secondary small mb-1">{plan.name}</div>
                        <div className="d-flex justify-content-center">
                          {renderFeatureValue(getFeatureValue(plan.name, feature))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Desktop view with full table
  const DesktopComparison = () => (
    <div className="d-none d-lg-block">
      <h3 className="text-light fw-bold mb-4 h3 text-center">Feature Comparison</h3>
      <div className="bg-dark border border-secondary rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0">
            <thead>
              <tr className="border-bottom border-secondary">
                <th className="text-start p-3 fw-medium text-light">Features</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center p-3 fw-medium text-light">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCategories.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <tr className="bg-secondary bg-opacity-25">
                    <td colSpan={plans.length + 1} className="p-3 fw-medium text-light small">
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature, featureIndex) => (
                    <tr key={featureIndex} className="border-bottom border-secondary">
                      <td className="p-3 text-light">{feature}</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="p-3 text-center">
                          {renderFeatureValue(getFeatureValue(plan.name, feature))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-5">
      <MobileComparison />
      <DesktopComparison />
    </div>
  );
};

export default FeatureComparison;