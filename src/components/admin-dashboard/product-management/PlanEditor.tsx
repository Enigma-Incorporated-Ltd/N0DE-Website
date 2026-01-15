import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import NodeService from '../../../services/Node';
import { CURRENCY_SYMBOL } from '../../../services/Account';

// Types
interface PlanFeature {
  id?: number | null;
  text: string;
  isDeleted?: boolean;
  isNew?: boolean;
}

interface PlanFormData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PlanFeature[];
  isPopular: boolean;
}

interface ValidationErrors {
  name?: string;
  subtitle?: string;
  description?: string;
  monthlyPrice?: string;
  annualPrice?: string;
}

interface ModalState {
  isOpen: boolean;
  message: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

// Validation Functions
const validatePlanName = (name: string): string | undefined => {
  if (!name.trim()) {
    return 'Plan name is required';
  }
  if (name.trim().length < 3) {
    return 'Plan name must be at least 3 characters long';
  }
  if (name.trim().length > 50) {
    return 'Plan name must be less than 50 characters';
  }
  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name.trim())) {
    return 'Plan name can only contain letters, numbers, spaces, hyphens, and underscores';
  }
  return undefined;
};

const validateSubtitle = (subtitle: string): string | undefined => {
  // Subtitle is now required
  if (!subtitle.trim()) {
    return 'Subtitle is required';
  }
  
  if (subtitle.trim().length < 3) {
    return 'Subtitle must be at least 3 characters long';
  }
  
  if (subtitle.trim().length > 100) {
    return 'Subtitle must be less than 100 characters';
  }
  
  // Very permissive validation - only check for obviously problematic characters
  const problematicChars = /[<>{}]/;
  if (problematicChars.test(subtitle.trim())) {
    return 'Subtitle contains invalid characters. Please avoid using <, >, {, or } characters.';
  }
  
  return undefined;
};

const validateDescription = (description: string): string | undefined => {
  if (!description.trim()) {
    return 'Description is required';
  }
  if (description.trim().length < 10) {
    return 'Description must be at least 10 characters long';
  }
  if (description.trim().length > 500) {
    return 'Description must be less than 500 characters';
  }
  return undefined;
};

const validateMonthlyPrice = (price: number): string | undefined => {
  if (price < 0) {
    return 'Monthly price must be greater than 0';
  }
  return undefined;
};

const validateAnnualPrice = (price: number): string | undefined => {
  if (price < 0) {
    return 'Annual price must be greater than 0';
  }
  return undefined;
};

// Helper Functions
const parseFeatureFromAPI = (feature: any): PlanFeature => {
  if (typeof feature === 'string') {
    return {
      id: null,
      text: feature,
      isDeleted: false,
      isNew: false
    };
  }
  
  const featureId = feature.id || feature.featureId || feature.feature_id || feature.ID || null;
  const featureText = feature.text || feature.description || feature.Description || feature.FeatureDescription || '';
  
  return {
    id: featureId,
    text: featureText,
    isDeleted: false,
    isNew: false
  };
};

const categorizeFeatures = (features: PlanFeature[]) => {
  const newFeatures = features.filter(feature => 
    !feature.isDeleted && !feature.id && feature.text.trim() !== ''
  );
  
  const deletedFeatures = features.filter(feature => 
    feature.isDeleted && feature.id && feature.id !== null
  );
  
  const updatedFeatures = features.filter(feature => 
    !feature.isDeleted && feature.id && feature.id !== null && feature.text.trim() !== ''
  );
  
  return { newFeatures, deletedFeatures, updatedFeatures };
};

// Modal Components
const SuccessModal = ({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center" style={{ 
      zIndex: 1050,
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="bg-dark-gradient border border-light border-opacity-20 rounded-4 shadow-lg w-100 mh-80 d-flex flex-column" style={{ 
        maxWidth: '32rem',
        background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}>
        <div className="d-flex align-items-center justify-content-center p-4 border-bottom border-light border-opacity-20" style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
        }}>
          <div className="d-flex align-items-center">
            <div className="bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <h2 className="fs-5 fw-semibold text-light mb-0">Success</h2>
          </div>
        </div>
        <div className="flex-grow-1 overflow-auto p-4" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
          <div className="text-center">
            <div className="bg-success bg-opacity-10 border border-success border-opacity-20 rounded-3 p-4 mb-3">
              <Icon name="CheckCircle" size={32} className="text-success mb-3" />
              <p className="text-success fw-medium mb-0">{message}</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-top border-light border-opacity-20 d-flex justify-content-center" style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)'
        }}>
          <button className="btn btn-success btn-sm px-4 py-2" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const ErrorModal = ({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center" style={{ 
      zIndex: 1050,
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="bg-dark-gradient border border-light border-opacity-20 rounded-4 shadow-lg w-100 mh-80 d-flex flex-column" style={{ 
        maxWidth: '32rem',
        background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}>
        <div className="d-flex align-items-center justify-content-center p-4 border-bottom border-light border-opacity-20" style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
        }}>
          <div className="d-flex align-items-center">
            <div className="bg-danger bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
              <Icon name="XCircle" size={20} className="text-danger" />
            </div>
            <h2 className="fs-5 fw-semibold text-light mb-0">Error</h2>
          </div>
        </div>
        <div className="flex-grow-1 overflow-auto p-4" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
          <div className="text-center">
            <div className="bg-danger bg-opacity-10 border border-danger border-opacity-20 rounded-3 p-4 mb-3">
              <Icon name="XCircle" size={32} className="text-danger mb-3" />
              <p className="text-danger fw-medium mb-0">{message}</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-top border-light border-opacity-20 d-flex justify-content-center" style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)'
        }}>
          <button className="btn btn-danger btn-sm px-4 py-2" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Delete", 
  cancelText = "Cancel",
  type = "danger" 
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const getIconAndColor = () => {
    switch (type) {
      case 'danger':
        return { icon: 'AlertTriangle', color: 'text-danger', bgColor: 'bg-danger' };
      case 'warning':
        return { icon: 'AlertCircle', color: 'text-warning', bgColor: 'bg-warning' };
      case 'info':
        return { icon: 'Info', color: 'text-info', bgColor: 'bg-info' };
      default:
        return { icon: 'AlertTriangle', color: 'text-danger', bgColor: 'bg-danger' };
    }
  };

  const { icon, color, bgColor } = getIconAndColor();

  return (
    <div className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center" style={{ 
      zIndex: 1050,
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="bg-dark-gradient border border-light border-opacity-20 rounded-4 shadow-lg w-100 mh-80 d-flex flex-column" style={{ 
        maxWidth: '32rem',
        background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}>
        <div className="d-flex align-items-center justify-content-center p-4 border-bottom border-light border-opacity-20" style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
        }}>
          <div className="d-flex align-items-center">
            <div className={`${bgColor} bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3`} style={{ width: '2.5rem', height: '2.5rem' }}>
              <Icon name={icon} size={20} className={color} />
            </div>
            <h2 className="fs-5 fw-semibold text-light mb-0">{title}</h2>
          </div>
        </div>
        <div className="flex-grow-1 overflow-auto p-4" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
          <div className="text-center">
            <div className={`${bgColor} bg-opacity-10 border border-${type} border-opacity-20 rounded-3 p-4 mb-3`}>
              <Icon name={icon} size={32} className={`${color} mb-3`} />
              <p className={`${color} fw-medium mb-0`}>{message}</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-top border-light border-opacity-20 d-flex justify-content-center gap-2" style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)'
        }}>
          <button className="btn btn-outline-light btn-sm px-4 py-2" onClick={onClose}>
            {cancelText}
          </button>
          <button className={`btn btn-${type} btn-sm px-4 py-2`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const PlanEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  // State
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<PlanFormData>({
    id: '',
    name: '',
    subtitle: '',
    description: '',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [{ text: '', isDeleted: false, isNew: true }],
    isPopular: false,
  });
  const [successModal, setSuccessModal] = useState<ModalState>({ isOpen: false, message: "" });
  const [errorModal, setErrorModal] = useState<ModalState>({ isOpen: false, message: "" });
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    featureIndex: number;
    featureText: string;
  }>({ isOpen: false, featureIndex: -1, featureText: '' });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Check if this is a new plan or editing existing
  const isNewPlan = !id || id === '0';

  // Fetch plan data when editing
  useEffect(() => {
    const fetchPlan = async () => {
      if (isNewPlan) {
        setLoading(false);
        return;
      }

      try {
          const response = await NodeService.getPlanById(parseInt(id));
          
          if (response) {
          // Handle both response formats: {plan: {...}} or direct plan object
          const plan = response.plan || response;
          const isProPlan = plan.id === 2 || id === '2';
          
        //  console.log('API Response:', response);
          //console.log('Plan Data:', plan);
          
          const formDataToSet: PlanFormData = {
              id: plan.id?.toString() || id,
            name: plan.name || plan.planTitle || plan.PlanTitle || '',
            subtitle: plan.subtitle || plan.planSubTitle || plan.PlanSubTitle || '',
            description: plan.description || plan.planDescription || plan.PlanDescription || '',
            monthlyPrice: plan.monthlyPrice || plan.AmountPerMonth || 0,
            annualPrice: plan.annualPrice || plan.yearlyPrice || plan.AmountPerYear || 0,
            features: Array.isArray(plan.features) 
              ? plan.features.map(parseFeatureFromAPI)
              : [],
              isPopular: isProPlan ? true : !!plan.isPopular,
            };
            
        //  console.log('Form Data to Set:', formDataToSet);
          
            setFormData(formDataToSet);
          
          // Debug: Check if form data was set correctly
          setTimeout(() => {
           // console.log('Form Data After Set:', formDataToSet);
          }, 100);
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
        setErrorModal({
          isOpen: true,
          message: 'Failed to load plan data. Please try again.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id, isNewPlan]);

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    // Only allow editing for new features (where isNew is true)
    if (!formData.features[index]?.isNew) return;
    
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, text: value } : feature
      )
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({ 
      ...prev, 
      features: [...prev.features, { text: '', isDeleted: false, isNew: true }]
    }));
  };

  const requestDeleteFeature = (index: number) => {
    const feature = formData.features[index];
    const featureText = feature.text || 'this feature';
    
    setConfirmationModal({
      isOpen: true,
      featureIndex: index,
      featureText: featureText
    });
  };

  const confirmDeleteFeature = () => {
    const { featureIndex } = confirmationModal;
    
    if (featureIndex >= 0 && formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.map((feature, i) => 
          i === featureIndex ? { ...feature, isDeleted: true } : feature
        )
      }));
    }
    
    setConfirmationModal({ isOpen: false, featureIndex: -1, featureText: '' });
  };

  const undoDeleteFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, isDeleted: false } : feature
      )
    }));
  };

  const validateAllFields = (): boolean => {
    const nameError = validatePlanName(formData.name);
    const subtitleError = validateSubtitle(formData.subtitle);
    const descriptionError = validateDescription(formData.description);
    const monthlyPriceError = validateMonthlyPrice(formData.monthlyPrice);
    const annualPriceError = validateAnnualPrice(formData.annualPrice);

    // Debug logging
    console.log('Validation Debug:', {
      name: formData.name,
      nameError,
      subtitle: formData.subtitle,
      subtitleError,
      description: formData.description,
      descriptionError,
      monthlyPrice: formData.monthlyPrice,
      monthlyPriceError,
      annualPrice: formData.annualPrice,
      annualPriceError
    });

    const errors: ValidationErrors = {};
    if (nameError) errors.name = nameError;
    if (subtitleError) errors.subtitle = subtitleError;
    if (descriptionError) errors.description = descriptionError;
    if (monthlyPriceError) errors.monthlyPrice = monthlyPriceError;
    if (annualPriceError) errors.annualPrice = annualPriceError;

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate all fields
    if (!validateAllFields()) {
      setLoading(false);
      return;
    }

    try {
      const { newFeatures, deletedFeatures, updatedFeatures } = categorizeFeatures(formData.features);
      
      console.log('Form Data:', formData);
      
      const planData = {
        planID: isNewPlan ? 0 : parseInt(id || '0', 10),
        PlanTitle: formData.name,
        PlanSubtitle: formData.subtitle,
        PlanDescription: formData.description,
        IsPopular: formData.isPopular,
        AmountPerMonth: parseFloat(formData.monthlyPrice.toString()),
        AmountPerYear: parseFloat(formData.annualPrice.toString()),
        addedFeatures: newFeatures.map(feature => feature.text),
        deletedFeatureIds: deletedFeatures.map(feature => feature.id!),
        updatedFeatures: updatedFeatures.map(feature => ({
          featureId: feature.id!,
          Description: feature.text
        }))
      };
      
      console.log('Plan Data being sent:', planData);

      await NodeService.savePlan(planData);
      
      // Clear validation errors on successful submission
      setValidationErrors({});
      
      setSuccessModal({
        isOpen: true,
        message: isNewPlan ? 'Plan created successfully!' : 'Plan updated successfully!'
      });
    } catch (error: any) {
      console.error('Error saving plan:', error);
      setErrorModal({
        isOpen: true,
        message: `Failed to save plan: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setSuccessModal({ isOpen: false, message: "" });
    setErrorModal({ isOpen: false, message: "" });
    navigate('/admin/product-manager');
  };

  // Render
  return (
    <div className="bg-dark min-vh-100">
      {/* Header */}
      <div className="pt-3 pb-1 bg-black text-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                  <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                  <span className="d-block fw-medium text-light fs-20">
                    {isNewPlan ? 'Create New Plan' : 'Edit Plan'}
                  </span>
                </div>
                <h1 className="text-light mb-2" data-cue="fadeIn">
                  Plan <span className="text-gradient-primary">Manager</span>
                </h1>
                <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                  {isNewPlan ? 'Create a new subscription plan' : 'Edit existing subscription plan'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container py-4">
        <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
                             {/* Plan Name */}
               <div className="col-md-6 mb-4">
                 <label className="form-label text-light mb-2">Plan Name <span className="text-danger">*</span></label>
                 <div className={`bg-dark border rounded-3 ${validationErrors.name ? 'border-danger border-opacity-50' : 'border-light border-opacity-10'}`}>
                                       <input
                      type="text"
                      name="name"
                      className={`form-control bg-transparent border-0 ${validationErrors.name ? 'text-danger' : 'text-light'}`}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter plan name (required)"
                    />
                   {validationErrors.name && (
                     <div className="text-danger small mt-1 d-flex align-items-center">
                       <Icon name="AlertCircle" size={12} className="me-1" />
                       {validationErrors.name}
                     </div>
                   )}
                 </div>
               </div>

                             {/* Subtitle */}
               <div className="col-md-6 mb-4">
                 <label className="form-label text-light mb-2">Subtitle <span className="text-danger">*</span></label>
                 <div className={`bg-dark border rounded-3 ${validationErrors.subtitle ? 'border-danger border-opacity-75 shadow-sm' : 'border-light border-opacity-10'}`}>
                   <input
                     type="text"
                     name="subtitle"
                     className={`form-control bg-transparent border-0 ${validationErrors.subtitle ? 'text-danger' : 'text-light'}`}
                     value={formData.subtitle}
                     onChange={handleChange}
                     required
                     placeholder="Enter plan subtitle (required)"
                   />
                   {validationErrors.subtitle && (
                     <div className="text-danger small mt-1 d-flex align-items-center">
                       <Icon name="AlertCircle" size={12} className="me-1" />
                       {validationErrors.subtitle}
                     </div>
                   )}
                 </div>
               </div>

                             {/* Description */}
               <div className="col-12 mb-4">
                 <label className="form-label text-light mb-2">Description <span className="text-danger">*</span></label>
                 <div className={`bg-dark border rounded-3 ${validationErrors.description ? 'border-danger border-opacity-50' : 'border-light border-opacity-10'}`}>
                   <textarea
                     name="description"
                     className={`form-control bg-transparent border-0 ${validationErrors.description ? 'text-danger' : 'text-light'}`}
                     rows={3}
                     value={formData.description}
                     onChange={handleChange}
                     style={{ resize: 'none' }}
                     placeholder="Enter plan description (minimum 10 characters)"
                   />
                   {validationErrors.description && (
                     <div className="text-danger small mt-1 d-flex align-items-center">
                       <Icon name="AlertCircle" size={12} className="me-1" />
                       {validationErrors.description}
                     </div>
                   )}
                 </div>
               </div>

                             {/* Pricing */}
               <div className="col-md-6 mb-4">
                 <label className="form-label text-light mb-2">Monthly Price ({CURRENCY_SYMBOL}) <span className="text-danger">*</span></label>
                 <div className="input-group">
                   <span className="input-group-text bg-dark border-light border-opacity-10 text-light">{CURRENCY_SYMBOL}</span>
                   <div className={`bg-dark border border-light border-opacity-10 border-start-0 rounded-end-3 flex-grow-1 ${validationErrors.monthlyPrice ? 'border-danger border-opacity-75 shadow-sm' : ''}`}>
                     <input
                       type="number"
                       name="monthlyPrice"
                       className={`form-control bg-transparent border-0 ${validationErrors.monthlyPrice ? 'text-danger' : 'text-light'}`}
                       value={formData.monthlyPrice}
                       onChange={handleChange}
                       min="0"
                       step="0.01"
                       required
                       placeholder="0.00"
                     />
                   </div>
                 </div>
                 {validationErrors.monthlyPrice && (
                   <div className="text-danger small mt-1 d-flex align-items-center">
                     <Icon name="AlertCircle" size={12} className="me-1" />
                     {validationErrors.monthlyPrice}
                   </div>
                 )}
               </div>

                             <div className="col-md-6 mb-4">
                 <label className="form-label text-light mb-2">Annual Price ({CURRENCY_SYMBOL}) <span className="text-danger">*</span></label>
                 <div className="input-group">
                   <span className="input-group-text bg-dark border-light border-opacity-10 text-light">{CURRENCY_SYMBOL}</span>
                   <div className={`bg-dark border border-light border-opacity-10 border-start-0 rounded-end-3 flex-grow-1 ${validationErrors.annualPrice ? 'border-danger border-opacity-75 shadow-sm' : ''}`}>
                     <input
                       type="number"
                       name="annualPrice"
                       className={`form-control bg-transparent border-0 ${validationErrors.annualPrice ? 'text-danger' : 'text-light'}`}
                       value={formData.annualPrice}
                       onChange={handleChange}
                       min="0"
                       step="0.01"
                       required
                       placeholder="0.00"
                     />
                   </div>
                 </div>
                 {validationErrors.annualPrice && (
                   <div className="text-danger small mt-1 d-flex align-items-center">
                     <Icon name="AlertCircle" size={12} className="me-1" />
                     {validationErrors.annualPrice}
                   </div>
                 )}
               </div>

              {/* Features */}
              <div className="col-12 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <label className="form-label text-light mb-0">Features</label>
                  <button 
                    type="button" 
                    className="btn btn-outline-primary btn-sm d-flex align-items-center px-3 py-2" 
                    onClick={addFeature}
                  >
                    <Icon name="Plus" size={16} className="me-2" /> 
                    Add Feature
                  </button>
                </div>
                
                <div className="d-flex flex-column gap-3">
                  {formData.features.map((feature, index) => {
                    // Skip rendering if feature is deleted
                    if (feature.isDeleted) return null;
                    return (
                    <div key={index} className={`d-flex align-items-center gap-3 ${feature.isDeleted ? 'opacity-75' : ''}`}>
                      <div className={`flex-grow-1 border rounded-3 ${feature.isDeleted ? 'bg-secondary border-secondary' : 'bg-dark border-light border-opacity-10'}`}>
                        <input
                          type="text"
                          className={`form-control border-0 py-2 ${feature.isDeleted ? 'bg-secondary text-secondary' : 'bg-transparent text-light'}`}
                          value={feature.text}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          readOnly={!feature.isNew}
                          placeholder={feature.isNew ? "Enter new feature" : ""}
                          disabled={feature.isDeleted}
                        />
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="d-flex align-items-center gap-2">
                        {feature.isDeleted ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm d-flex align-items-center justify-content-center"
                              style={{ width: '36px', height: '36px' }}
                              onClick={() => undoDeleteFeature(index)}
                              title="Restore feature"
                            >
                              <Icon name="RotateCcw" size={16} />
                            </button>
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger text-white px-2 py-1 d-flex align-items-center">
                                <Icon name="Trash2" size={10} className="me-1" />
                                Deleted
                              </span>
                            </div>
                          </>
                        ) : (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                        style={{
                          width: '36px',
                          height: '36px',
                          padding: '0.25rem',
                          borderColor: 'rgba(220, 53, 69, 0.5)',
                          color: '#dc3545'
                        }}
                        onClick={() => requestDeleteFeature(index)}
                        disabled={formData.features.length <= 1}
                        title="Delete feature"
                      >
                        <Icon name="Trash2" size={16} color="currentColor" />
                      </button>
                      )}
                      </div>
                    </div>
                  );
                  })}
                </div>
                
                {/* Feature Summary */}
                {formData.features.length > 0 && (
                  <div className="mt-3">
                    <span className="text-light text-opacity-75 small">
                      {formData.features.filter(f => !f.isDeleted).length} active features
                    </span>
                  </div>
                )}
              </div>

              {/* Is Popular */}
              <div className="col-12 mb-4">
                <div className="form-check form-switch">
                  <input
                    className={`form-check-input ${formData.isPopular ? 'bg-primary' : 'bg-dark'}`}
                    type="checkbox"
                    role="switch"
                    id="isPopular"
                    name="isPopular"
                    checked={!!formData.isPopular}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        isPopular: e.target.checked
                      }));
                    }}
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'-4 -4 8 8\'%3e%3ccircle r=\'3\' fill=\'rgba(255, 255, 255, 1)\'/%3e%3c/svg%3e")',
                      backgroundPosition: formData.isPopular ? 'right center' : 'left center',
                      borderColor: formData.isPopular ? '#0d6efd' : '#dee2e6',
                      cursor: 'pointer',
                      width: '3em',
                      height: '1.5em',
                      backgroundSize: '1.5em 1.5em'
                    }}
                  />
                  <label className="form-check-label text-light ms-2" htmlFor="isPopular">
                    Mark as Popular Plan
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="col-12 mt-5 pt-4 border-top border-light border-opacity-10">
                <div className="d-flex gap-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4 py-2 fw-medium rounded-3" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Plan'
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-light px-4 py-2 rounded-3"
                    onClick={() => navigate('/admin/product-manager')}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modals */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={handleModalClose}
        message={successModal.message}
      />
      
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ isOpen: false, featureIndex: -1, featureText: '' })}
        onConfirm={confirmDeleteFeature}
        title="Delete Feature"
        message={`Are you sure you want to delete "${confirmationModal.featureText}"? This action cannot be undone.`}
        confirmText="Delete Feature"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default PlanEditor;
