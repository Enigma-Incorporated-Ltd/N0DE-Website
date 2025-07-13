import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeatureComparison = ({ plans }) => {
  const [expandedSection, setExpandedSection] = useState(null);

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

  const getFeatureValue = (planName, featureName) => {
    const plan = plans.find(p => p.name === planName);
    const feature = plan?.features.find(f => f.text.includes(featureName) || f.category === featureName);
    
    // Mock feature values based on plan and feature
    const featureMap = {
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

  const renderFeatureValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="Check" size={16} className="text-success" />
      ) : (
        <Icon name="X" size={16} className="text-muted-foreground" />
      );
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  // Mobile view with expandable sections
  const MobileComparison = () => (
    <div className="lg:hidden space-y-4">
      <h3 className="text-xl font-bold text-foreground mb-4">Feature Comparison</h3>
      {featureCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-card border border-border rounded-lg">
          <button
            onClick={() => setExpandedSection(expandedSection === categoryIndex ? null : categoryIndex)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-medium text-foreground">{category.name}</span>
            <Icon 
              name={expandedSection === categoryIndex ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </button>
          
          {expandedSection === categoryIndex && (
            <div className="border-t border-border">
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="p-4 border-b border-border last:border-b-0">
                  <div className="font-medium text-sm text-foreground mb-3">{feature}</div>
                  <div className="grid grid-cols-3 gap-4">
                    {plans.map((plan) => (
                      <div key={plan.name} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">{plan.name}</div>
                        <div className="flex justify-center">
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
    <div className="hidden lg:block">
      <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Feature Comparison</h3>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-foreground">Features</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center p-4 font-medium text-foreground min-w-[120px]">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCategories.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <tr className="bg-muted/30">
                    <td colSpan={plans.length + 1} className="p-3 font-medium text-foreground text-sm">
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature, featureIndex) => (
                    <tr key={featureIndex} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-foreground">{feature}</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="p-4 text-center">
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
    <div className="mt-12">
      <MobileComparison />
      <DesktopComparison />
    </div>
  );
};

export default FeatureComparison;