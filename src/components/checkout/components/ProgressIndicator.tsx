import React from 'react';
import Icon from '../../../components/AppIcon';

interface ProgressIndicatorProps {
  currentStep?: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep = 2 }) => {
  const steps = [
    { id: 1, name: 'Plan Selection', completed: currentStep > 1 },
    { id: 2, name: 'Checkout', completed: currentStep > 2, current: currentStep === 2 },
    { id: 3, name: 'Confirmation', completed: currentStep > 3, current: currentStep === 3 }
  ];

  return (
    <div className="w-100 mb-8">
      <div className="d-flex align-items-center justify-content-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="d-flex flex-column align-items-center">
              <div
                className={`
                  rounded-circle d-flex align-items-center justify-content-center fw-medium
                  ${step.completed 
                    ? 'bg-success text-light' 
                    : step.current 
                      ? 'bg-primary text-light' 
                      : 'bg-secondary text-light'
                  }
                `}
                style={{ width: '2rem', height: '2rem', fontSize: '0.875rem' }}
              >
                {step.completed ? (
                  <Icon name="Check" size={16} />
                ) : (
                  step.id
                )}
              </div>
              <span className={`
                small mt-2 text-center
                ${step.current ? 'text-light fw-medium' : 'text-light text-opacity-75'}
              `}>
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`
                flex-fill mt-4 border-top
                ${steps[index + 1].completed || step.completed 
                  ? 'border-success border-2' : 'border-secondary'
                }
              `} style={{ height: '2px', margin: '0 1rem' }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;