import React from 'react';
import Icon from '../../../components/AppIcon';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '', textColor: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return { 
      score, 
      label: 'Weak', 
      color: 'bg-gradient-to-r from-error/50 to-error-light/50', 
      textColor: 'text-error-light' 
    };
    if (score < 4) return { 
      score, 
      label: 'Fair', 
      color: 'bg-gradient-to-r from-warning/50 to-warning-light/50', 
      textColor: 'text-warning-light' 
    };
    if (score < 5) return { 
      score, 
      label: 'Good', 
      color: 'bg-gradient-to-r from-accent/50 to-accent-light/50', 
      textColor: 'text-accent-light' 
    };
    return { 
      score, 
      label: 'Strong', 
      color: 'bg-gradient-to-r from-success/50 to-success-light/50', 
      textColor: 'text-success-light' 
    };
  };

  const strength = getPasswordStrength(password);
  const requirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'One lowercase letter', met: /[a-z]/.test(password) },
    { text: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'One number', met: /\d/.test(password) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/70">Password strength:</span>
        <span className={`text-sm font-medium ${strength.textColor}`}>
          {strength.label}
        </span>
      </div>
      
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-colors ${
              level <= strength.score ? strength.color : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            <Icon
              name={req.met ? 'Check' : 'X'}
              size={12}
              className={req.met ? 'text-success-light' : 'text-white/30'}
            />
            <span className={req.met ? 'text-white/70' : 'text-white/30'}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;