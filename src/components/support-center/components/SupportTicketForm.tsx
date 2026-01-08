import React, { useState, FormEvent } from 'react';
import AccountService from '../../../services/Account';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useLocation } from 'react-router-dom';

// No props needed
interface FormData {
  title: string;
  message: string;
}

interface FormErrors {
  title?: string;
  message?: string;
  submit?: string;
}

const SupportTicketForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Ticket title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const location = useLocation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg(null);
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const userId = location.state?.userId;
      console.log('SupportTicketForm: userId from navigation state (on submit):', userId);
      if (!userId) {
        setErrors({ submit: 'User ID not found in navigation state. Please log in again.' });
        setIsSubmitting(false);
        return;
      }
      // Use userId for ticket submission
      const result = await AccountService.insertTicket({
        userId,
        title: formData.title,
        description: formData.message
      });
      if (result && (result.TicketId || result.Trackid)) {
        setSuccessMsg('Your ticket was submitted successfully!');
        setFormData({ title: '', message: '' });
        setErrors({});
      } else {
        setErrors({ submit: result?.message || 'Your ticket was submitted successfully!' });
      }
    } catch (error: any) {
      setErrors({ submit: error?.message || 'Failed to submit ticket. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxLength = 2000;

  return (
    <>
      {isSubmitting && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#181A20',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
            <p className="text-light">Submitting your ticket...</p>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center align-items-start bg-dark" style={{ minHeight: 'auto', padding: '20px 0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-12 mb-4 mb-lg-0" style={{ paddingRight: '0' }}>
              <div className="card-gl-dark rounded-4 p-3 shadow-lg h-100" style={{ maxWidth: 480, width: '100%', margin: '0 0 0 auto' }}>
                <div className="text-center mb-2">
                  <Icon name="MessageSquare" size={24} className="text-gradient-primary mb-1" />
                  <h2 className="fw-bold text-gradient-primary mb-0" style={{ fontSize: '2rem' }}>Support Ticket</h2>
                  <p className="text-light-50 mb-0" style={{ fontSize: '1rem' }}>Our team will respond within 24 hours</p>
                </div>
                {successMsg && (
                  <div className="p-3 mb-3 rounded-3 d-flex align-items-center" style={{ background: '#007bff33', border: '1.5px solidrgb(18, 209, 63)' }}>
                    <Icon name="CheckCircle" size={18} className="me-2" style={{ color: '#28a745' }} />
                    <span className="fw-medium" style={{ color: '#28a745', fontWeight: 600, fontSize: 16, lineHeight: 1.3, letterSpacing: 0.2 }}>{successMsg}</span>
                    <button type="button" className="btn-close ms-auto" onClick={() => setSuccessMsg(null)} />
                  </div>
                )}
                {errors.submit && (
                  <div className="bg-sucess-subtle border border-danger rounded-3 p-3 d-flex align-items-center mb-3">
                    <Icon name="AlertCircle" size={18} className="text-danger me-2" />
                    <span className="text-danger">{errors.submit}</span>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="mb-2">
                    <label htmlFor="ticket-title" className="form-label text-light fw-medium mb-1" style={{ fontSize: '0.9rem' }}>Ticket Title <span className="text-danger">*</span></label>
                    <input
                      id="ticket-title"
                      type="text"
                      className={`form-control bg-dark text-light border-light border-opacity-25 rounded-3 py-2 px-3 ${errors.title ? 'border-danger' : ''}`}
                      style={{ fontSize: '0.9rem' }}
                      value={formData.title}
                      onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      maxLength={100}
                      required
                      placeholder="Enter a short, descriptive title"
                    />
                    {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
                  </div>
                  <div className="mb-2">
                    <label htmlFor="support-message" className="form-label text-light fw-medium mb-1" style={{ fontSize: '0.9rem' }}>Describe Your Issue <span className="text-danger">*</span></label>
                    <textarea
                      id="support-message"
                      className={`form-control bg-dark text-light border-light border-opacity-25 rounded-3 py-2 px-3 ${errors.message ? 'border-danger' : ''}`}
                      style={{ minHeight: 80, resize: 'vertical', fontSize: '0.9rem' }}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      maxLength={maxLength}
                      required
                      placeholder="Please describe your issue in detail."
                    />
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <small className={errors.message ? 'text-danger' : 'text-light-50'} style={{ fontSize: '0.75rem' }}>
                        {errors.message || 'Minimum 10 characters required'}
                      </small>
                      <small className={formData.message.length > 1800 ? 'text-warning' : 'text-light-50'} style={{ fontSize: '0.75rem' }}>
                        {formData.message.length}/2000
                      </small>
                    </div>
                  </div>

                  <div className="rounded-3 p-3 d-flex align-items-center mb-3" style={{ background: 'linear-gradient(90deg, #007bff33 0%, #0056b355 100%)' }}>
                    <Icon name="Info" size={16} className="text-white me-2" />
                    <span className="text-white small">
                      <span className="fw-bold">Note:</span> Please provide as much detail as possible. Step-by-step descriptions help us resolve your issue faster.
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-2 pt-1">
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="right"
                      className="flex-fill btn btn-primary-gradient btn-sm px-3 py-2 fs-6 rounded-pill d-flex align-items-center justify-content-center"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({ title: '', message: '' });
                        setErrors({});
                      }}
                      className="flex-fill btn btn-outline-primary btn-sm px-3 py-2 fs-6 rounded-pill justify-content-center"
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-12 d-flex align-items-center" style={{ paddingLeft: '20px' }}>
              <div className="text-center">
                <img 
                  src="/assets/img/settings icon.png" 
                  alt="Support Settings" 
                  className="img-fluid" 
                  style={{ maxWidth: '300px', height: 'auto', borderRadius: '12px' }}
                />
                <h5 className="text-light mt-3">How can I help you today?</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportTicketForm;