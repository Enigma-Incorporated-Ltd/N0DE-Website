import React, { useState } from 'react';
import NodeService from '../../../services/Node';

interface FormData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  message: string;
  captchaAnswer: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  message?: string;
  captchaAnswer?: string;
}

interface CaptchaData {
  question: string;
  answer: number;
}

const GetInTouchHomeThree = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    message: '',
    captchaAnswer: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const dismissStatus = () => {
    setSubmitStatus({ type: null, message: '' });
  };

  // CAPTCHA generation
  const generateCaptcha = (): CaptchaData => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    const question = `What is ${num1} + ${num2}?`;
    return { question, answer };
  };

  const [captcha, setCaptcha] = useState<CaptchaData>(() => generateCaptcha());

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setFormData(prev => ({ ...prev, captchaAnswer: '' }));
    if (errors.captchaAnswer) {
      setErrors(prev => ({ ...prev, captchaAnswer: '' }));
    }
  };

  // Validation constants matching backend constraints
  const VALIDATION_LIMITS = {
    firstName: { max: 100, required: true },
    lastName: { max: 100, required: true },
    emailAddress: { max: 255, required: true },
    message: { max: 5000, required: true },
    captchaAnswer: { max: 10, required: true }
  };

  const validateField = (name: keyof FormData, value: string): string => {
    const limit = VALIDATION_LIMITS[name];
    
    if (limit.required && !value.trim()) {
      return `${name === 'emailAddress' ? 'Email address' : name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }

    if (value.length > limit.max) {
      return `${name === 'emailAddress' ? 'Email address' : name.charAt(0).toUpperCase() + name.slice(1)} cannot exceed ${limit.max} characters.`;
    }

    if (name === 'emailAddress' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please provide a valid email address.';
    }

    if (name === 'captchaAnswer' && value) {
      const userAnswer = parseInt(value.trim());
      if (isNaN(userAnswer)) {
        return 'Please enter a valid number.';
      }
      if (userAnswer !== captcha.answer) {
        return 'Incorrect answer. Please try again.';
      }
    }

    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit status when user makes changes
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await NodeService.submitContactInquiry(formData);
      
      setSubmitStatus({
        type: 'success',
        message: result.message || 'Your inquiry has been submitted successfully. We\'ll get back to you soon!'
      });

      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        emailAddress: '',
        message: '',
        captchaAnswer: ''
      });

      // Generate new CAPTCHA after successful submission
      setCaptcha(generateCaptcha());

    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred while submitting your inquiry. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="section-space-y">
        <div className="container">
          <div className="row g-4 align-items-center justify-content-xl-between">
            {/* Left copy */}
            <div className="col-lg-6">
              <span className="d-inline-block fs-20 text-gradient-primary fw-medium" data-cue="fadeIn">📩 Get in Touch</span>
              <h2 className="text-light mb-3" data-cue="fadeIn">Have a project in mind, or want to learn how N0DE can supercharge your network?</h2>
              <p className="mb-4 text-light-75" data-cue="fadeIn">Our team is here to help — whether it's for gaming, streaming, or enterprise‑grade performance.</p>

              <hr className="border-light border-opacity-10 mb-4" />
              <h6 className="text-light mb-2" data-cue="fadeIn">🚨 For Urgent Assistance</h6>
              <ul className="list gap-6" data-cues="fadeIn">
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center w-13 h-13 rounded-circle bg-primary-gradient text-light fs-24 lh-1 flex-shrink-0">
                    <i className="bi bi-phone-vibrate"></i>
                  </span>
                  <div className="d-block flex-grow-1">
                    <p className="mb-0 fs-14">Call us</p>
                    <span className="d-block fw-medium text-light">+44 0000 123-456-789</span>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center w-13 h-13 rounded-circle bg-primary-gradient text-light fs-24 lh-1 flex-shrink-0">
                    <i className="bi bi-envelope-at"></i>
                  </span>
                  <div className="d-block flex-grow-1">
                    <p className="mb-0 fs-14">Email (24/7)</p>
                    <span className="d-block fw-medium text-light"><a href="mailto:support@enigma-inc.com">support@enigma-inc.com</a></span>
                  </div>
                </li>
              </ul>

              <hr className="border-light border-opacity-10 my-4" />
              <h6 className="text-light mb-2" data-cue="fadeIn">✍️ Send Us a Message</h6>
              <p className="text-light-75 mb-0" data-cue="fadeIn">Our experts will get back to you as quickly as possible.</p>
              <hr className="border-light border-opacity-10 my-4" />
              <p className="text-light-75 mb-0">💡 Trusted worldwide — powering performance for creators, gamers, and businesses everywhere.</p>
            </div>

            {/* Right form */}
            <div className="col-lg-6 col-xl-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-4" data-cues="fadeIn">
                  <div className="col-12">
                    <label className="form-label fs-14">First Name *</label>
                    <div className="form-control--gradient rounded-1">
                      <input 
                        type="text" 
                        name="firstName"
                        className={`form-control border-0 bg-transparent ${errors.firstName ? 'is-invalid' : ''}`}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        maxLength={VALIDATION_LIMITS.firstName.max}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.firstName && (
                      <div className="text-danger fs-12 mt-1">{errors.firstName}</div>
                    )}
                    <div className="text-light-50 fs-12 mt-1">
                      {formData.firstName.length}/{VALIDATION_LIMITS.firstName.max} characters
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fs-14">Last Name *</label>
                    <div className="form-control--gradient rounded-1">
                      <input 
                        type="text" 
                        name="lastName"
                        className={`form-control border-0 bg-transparent ${errors.lastName ? 'is-invalid' : ''}`}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        maxLength={VALIDATION_LIMITS.lastName.max}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.lastName && (
                      <div className="text-danger fs-12 mt-1">{errors.lastName}</div>
                    )}
                    <div className="text-light-50 fs-12 mt-1">
                      {formData.lastName.length}/{VALIDATION_LIMITS.lastName.max} characters
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fs-14">Email Address *</label>
                    <div className="form-control--gradient rounded-1">
                      <input 
                        type="email" 
                        name="emailAddress"
                        className={`form-control border-0 bg-transparent ${errors.emailAddress ? 'is-invalid' : ''}`}
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        maxLength={VALIDATION_LIMITS.emailAddress.max}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.emailAddress && (
                      <div className="text-danger fs-12 mt-1">{errors.emailAddress}</div>
                    )}
                    <div className="text-light-50 fs-12 mt-1">
                      {formData.emailAddress.length}/{VALIDATION_LIMITS.emailAddress.max} characters
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fs-14">How can we help you? *</label>
                    <div className="form-control--gradient rounded-1">
                      <textarea 
                        name="message"
                        className={`form-control border-0 bg-transparent ${errors.message ? 'is-invalid' : ''}`}
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        maxLength={VALIDATION_LIMITS.message.max}
                        disabled={isSubmitting}
                        placeholder="Please describe your inquiry or how we can help you..."
                      ></textarea>
                    </div>
                    {errors.message && (
                      <div className="text-danger fs-12 mt-1">{errors.message}</div>
                    )}
                    <div className="text-light-50 fs-12 mt-1">
                      {formData.message.length}/{VALIDATION_LIMITS.message.max} characters
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fs-14">Security Check *</label>
                    <div className="captcha-container">
                      <div className="captcha-question">
                        <span className="captcha-text">{captcha.question}</span>
                        <button 
                          type="button" 
                          className="captcha-refresh-btn"
                          onClick={refreshCaptcha}
                          disabled={isSubmitting}
                          title="Refresh CAPTCHA"
                        >
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                      </div>
                      <div className="form-control--gradient rounded-1">
                        <input 
                          type="number" 
                          name="captchaAnswer"
                          className={`form-control border-0 bg-transparent ${errors.captchaAnswer ? 'is-invalid' : ''}`}
                          value={formData.captchaAnswer}
                          onChange={handleInputChange}
                          maxLength={VALIDATION_LIMITS.captchaAnswer.max}
                          disabled={isSubmitting}
                          placeholder="Enter your answer"
                        />
                      </div>
                    </div>
                    {errors.captchaAnswer && (
                      <div className="text-danger fs-12 mt-1">{errors.captchaAnswer}</div>
                    )}
                    <div className="text-light-50 fs-12 mt-1">
                      Please solve the math problem to verify you're human
                    </div>
                  </div>

                  {/* Status Messages */}
                  {submitStatus.type && (
                    <div className="col-12">
                      <div className={`toast-message ${submitStatus.type === 'success' ? 'toast-success' : 'toast-error'}`}>
                        <div className="toast-content">
                          <div className="toast-icon">
                            {submitStatus.type === 'success' ? (
                              <i className="bi bi-check-circle-fill"></i>
                            ) : (
                              <i className="bi bi-exclamation-triangle-fill"></i>
                            )}
                          </div>
                          <div className="toast-text">
                            {submitStatus.message}
                          </div>
                        </div>
                        <button 
                          type="button" 
                          className="toast-close-btn" 
                          onClick={dismissStatus}
                          aria-label="Close"
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="col-12">
                    <button 
                      type="submit"
                      className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1 w-100 justify-content-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="d-inline-block me-2">
                            <i className="bi bi-arrow-clockwise spin"></i>
                          </span>
                          <span className="d-inline-block">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="d-inline-block">Send Message</span>
                          <span className="d-inline-block"><i className="bi bi-arrow-right"></i></span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .is-invalid {
          border-color: #dc3545 !important;
        }
        
        .toast-message {
          position: relative;
          padding: 16px 20px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          line-height: 1.5;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid transparent;
        }
        
        .toast-success {
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
          border-color: #28a745;
          color: #155724;
        }
        
        .toast-error {
          background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
          border-color: #dc3545;
          color: #721c24;
        }
        
        .toast-content {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-right: 32px;
        }
        
        .toast-icon {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        
        .toast-success .toast-icon {
          color: #28a745;
        }
        
        .toast-error .toast-icon {
          color: #dc3545;
        }
        
        .toast-text {
          flex: 1;
          font-weight: 500;
        }
        
        .toast-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }
        
        .toast-close-btn:hover {
          background-color: rgba(0, 0, 0, 0.1);
          transform: scale(1.1);
        }
        
        .toast-success .toast-close-btn {
          color: #155724;
        }
        
        .toast-success .toast-close-btn:hover {
          background-color: rgba(21, 87, 36, 0.1);
        }
        
        .toast-error .toast-close-btn {
          color: #721c24;
        }
        
        .toast-error .toast-close-btn:hover {
          background-color: rgba(114, 28, 36, 0.1);
        }
        
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
      `}</style>
    </>
  );
};

export default GetInTouchHomeThree;
