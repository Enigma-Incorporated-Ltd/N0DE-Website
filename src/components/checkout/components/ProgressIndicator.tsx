import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep = 2 }) => {
  const steps = [
    { id: 1, name: 'Plan Selection', completed: true },
    { id: 2, name: 'Checkout', completed: false, current: true },
    { id: 3, name: 'Confirmation', completed: false }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step.completed 
                    ? 'bg-success text-success-foreground' 
                    : step.current 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {step.completed ? (
                  <Icon name="Check" size={16} />
                ) : (
                  step.id
                )}
              </div>
              <span className={`
                text-xs mt-2 text-center
                ${step.current ? 'text-foreground font-medium' : 'text-muted-foreground'}
              `}>
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-4 mt-4
                ${steps[index + 1].completed || step.completed 
                  ? 'bg-success' :'bg-border'
                }
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;