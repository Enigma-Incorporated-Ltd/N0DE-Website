import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SupportTicketForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'account', label: 'Account Management' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, attachments: 'File size must be less than 10MB' }));
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, attachments: 'Only images, PDF, and text files are allowed' }));
        return false;
      }
      return true;
    });

    setFormData(prev => ({ 
      ...prev, 
      attachments: [...prev.attachments, ...validFiles].slice(0, 5) 
    }));
    setErrors(prev => ({ ...prev, attachments: '' }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const ticketData = {
        ...formData,
        id: `TICK-${Date.now()}`,
        status: 'open',
        createdAt: new Date().toISOString(),
        estimatedResponse: '24 hours'
      };
      
      onSubmit(ticketData);
      
      // Reset form
      setFormData({
        subject: '',
        category: '',
        priority: 'medium',
        message: '',
        attachments: []
      });
      
    } catch (error) {
      setErrors({ submit: 'Failed to submit ticket. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageLength = formData.message.length;
  const maxLength = 2000;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="MessageSquare" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Submit Support Ticket</h2>
          <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Subject"
            type="text"
            placeholder="Brief description of your issue"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            error={errors.subject}
            required
          />
          
          <Select
            label="Category"
            placeholder="Select category"
            options={categoryOptions}
            value={formData.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors.category}
            required
          />
        </div>

        <Select
          label="Priority Level"
          options={priorityOptions}
          value={formData.priority}
          onChange={(value) => handleInputChange('priority', value)}
          description="Help us prioritize your request"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder="Please describe your issue in detail..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            maxLength={maxLength}
          />
          <div className="flex justify-between items-center text-xs">
            <span className={`${errors.message ? 'text-destructive' : 'text-muted-foreground'}`}>
              {errors.message || 'Minimum 10 characters required'}
            </span>
            <span className={`${messageLength > maxLength * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
              {messageLength}/{maxLength}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground">
              Attachments
            </label>
            <span className="text-xs text-muted-foreground">
              Max 5 files, 10MB each
            </span>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.gif,.pdf,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Icon name="Upload" size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Images, PDF, TXT files only
              </p>
            </label>
          </div>

          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024 / 1024).toFixed(1)}MB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAttachment(index)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {errors.attachments && (
            <p className="text-sm text-destructive">{errors.attachments}</p>
          )}
        </div>

        {errors.submit && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{errors.submit}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
            className="flex-1 sm:flex-none"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                subject: '',
                category: '',
                priority: 'medium',
                message: '',
                attachments: []
              });
              setErrors({});
            }}
            className="flex-1 sm:flex-none"
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SupportTicketForm;