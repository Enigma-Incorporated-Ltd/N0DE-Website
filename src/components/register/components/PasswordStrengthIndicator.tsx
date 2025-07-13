import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return { score, label: 'Weak', color: 'bg-error', textColor: 'text-error' };
    if (score < 4) return { score, label: 'Fair', color: 'bg-warning', textColor: 'text-warning' };
    if (score < 5) return { score, label: 'Good', color: 'bg-accent', textColor: 'text-accent' };
    return { score, label: 'Strong', color: 'bg-success', textColor: 'text-success' };
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
        <span className="text-sm text-muted-foreground">Password strength:</span>
        <span className={`text-sm font-medium ${strength.textColor}`}>
          {strength.label}
        </span>
      </div>
      
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-colors ${
              level <= strength.score ? strength.color : 'bg-muted'
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
              className={req.met ? 'text-success' : 'text-muted-foreground'}
            />
            <span className={req.met ? 'text-success' : 'text-muted-foreground'}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;