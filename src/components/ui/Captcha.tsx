import React, { useState, useCallback } from 'react';

interface CaptchaData {
  question: string;
  answer: number;
}

interface CaptchaProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
}

const Captcha: React.FC<CaptchaProps> = ({
  value,
  onChange,
  onValidationChange,
  error,
  disabled = false,
  className = '',
  label = 'Security Check',
  placeholder = 'Enter your answer'
}) => {
  // CAPTCHA generation
  const generateCaptcha = useCallback((): CaptchaData => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    const question = `What is ${num1} + ${num2}?`;
    return { question, answer };
  }, []);

  const [captcha, setCaptcha] = useState<CaptchaData>(() => generateCaptcha());

  const refreshCaptcha = useCallback(() => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    onChange(''); // Clear the input value
  }, [generateCaptcha, onChange]);

  const validateCaptcha = useCallback((inputValue: string): boolean => {
    if (!inputValue.trim()) return false;
    
    const userAnswer = parseInt(inputValue.trim());
    if (isNaN(userAnswer)) return false;
    
    return userAnswer === captcha.answer;
  }, [captcha.answer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    // Notify parent component about validation status
    if (onValidationChange) {
      const isValid = validateCaptcha(inputValue);
      onValidationChange(isValid);
    }
  };

  return (
    <div className={`captcha-container ${className}`}>
      <label className="form-label fs-14">{label} *</label>
      
      <div className="captcha-question">
        <span className="captcha-text">{captcha.question}</span>
        <button 
          type="button" 
          className="captcha-refresh-btn"
          onClick={refreshCaptcha}
          disabled={disabled}
          title="Refresh CAPTCHA"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      
      <div className="form-control--gradient rounded-1">
        <input 
          type="number" 
          className={`form-control border-0 bg-transparent ${error ? 'is-invalid' : ''}`}
          value={value}
          onChange={handleInputChange}
          maxLength={10}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
      
      {error && (
        <div className="text-danger fs-12 mt-1">{error}</div>
      )}
      
      <div className="text-light-50 fs-12 mt-1">
        Please solve the math problem to verify you're human
      </div>

      <style>{`
        .captcha-container {
          margin-bottom: 8px;
        }
        
        .captcha-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 1px solid #dee2e6;
          border-radius: 6px;
          padding: 12px 16px;
          margin-bottom: 12px;
          font-family: 'Courier New', monospace;
        }
        
        .captcha-text {
          font-size: 16px;
          font-weight: 600;
          color: #495057;
          letter-spacing: 1px;
        }
        
        .captcha-refresh-btn {
          background: none;
          border: none;
          color: #6c757d;
          font-size: 14px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .captcha-refresh-btn:hover:not(:disabled) {
          background-color: rgba(108, 117, 125, 0.1);
          color: #495057;
          transform: rotate(180deg);
        }
        
        .captcha-refresh-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .is-invalid {
          border-color: #dc3545 !important;
        }
      `}</style>
    </div>
  );
};

export default Captcha;
