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
      color: 'bg-danger bg-opacity-50', 
      textColor: 'text-danger' 
    };
    if (score < 4) return { 
      score, 
      label: 'Fair', 
      color: 'bg-warning bg-opacity-50', 
      textColor: 'text-warning' 
    };
    if (score < 5) return { 
      score, 
      label: 'Good', 
      color: 'bg-info bg-opacity-50', 
      textColor: 'text-info' 
    };
    return { 
      score, 
      label: 'Strong', 
      color: 'bg-success bg-opacity-50', 
      textColor: 'text-success' 
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
    <div className="mt-2">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text-light-50 fs-7">Password strength:</span>
        <span className={`fs-7 fw-medium ${strength.textColor}`}>
          {strength.label}
        </span>
      </div>
      
      <div className="d-flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`flex-grow-1 rounded-pill ${
              level <= strength.score ? strength.color : 'bg-light bg-opacity-10'
            }`}
            style={{ height: '8px' }}
          />
        ))}
      </div>
      
      <div className="d-flex flex-column gap-1">
        {requirements.map((req, index) => (
          <div key={index} className="d-flex align-items-center gap-2">
            <Icon
              name={req.met ? 'Check' : 'X'}
              size={12}
              className={req.met ? 'text-success' : 'text-light-50'}
            />
            <span className={`fs-7 ${req.met ? 'text-light-50' : 'text-light-50 opacity-50'}`}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;