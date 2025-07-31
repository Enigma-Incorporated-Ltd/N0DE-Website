import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import NodeService from '../../../services/Node';

interface PlanFormData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular: boolean;
}

const PlanEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<PlanFormData>({
    id: '',
    name: '',
    subtitle: '',
    description: '',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [''],
    isPopular: false,
  });

  // Fetch plan data when in edit mode
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        if (id && id !== '0') {
          console.log('Fetching plan with ID:', id);
          const response = await NodeService.getPlanById(parseInt(id));
          
          if (response) {
            const plan = response.plan || response; // Handle both response formats
            
            // Temporary workaround: If this is the PRO plan (ID 2), force isPopular to true
            const isProPlan = plan.id === 2 || id === '2';
            const formDataToSet = {
              id: plan.id?.toString() || id,
              name: plan.name || '',
              subtitle: plan.subtitle || '',
              description: plan.description || '',
              monthlyPrice: plan.monthlyPrice || 0,
              annualPrice: plan.annualPrice || plan.yearlyPrice || 0,
              features: Array.isArray(plan.features) ? plan.features : [],
              // Temporary workaround: Force isPopular to true for PRO plan
              isPopular: isProPlan ? true : !!plan.isPopular,
            };
            
            console.log('Form data being set:', formDataToSet);
            setFormData(formDataToSet);
          }
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length <= 1) return;
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id === '0') {
        // For new plan
        await NodeService.createPlan('admin', 0, 'monthly');
      } else {
        // Update existing plan
        const updateData = {
          id: parseInt(id || '0', 10),
          name: formData.name,
          subtitle: formData.subtitle,
          description: formData.description,
          monthlyPrice: formData.monthlyPrice,
          yearlyPrice: formData.annualPrice, // Using yearlyPrice to match API expectation
          features: formData.features,
          isPopular: formData.isPopular,
          // Add any other fields that the API expects
        };
        console.log('Sending update data:', updateData);
        await NodeService.updatePlan(updateData);
      }
      navigate('/admin/product-manager');
    } catch (error) {
      console.error('Error saving plan:', error);
      // Show error message to user
      alert('Failed to save plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Log form data changes
  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);

  // Debug initial form data
  useEffect(() => {
    console.log('Initial Form Data:', formData);
  }, []);

  return (
    <div className="bg-dark min-vh-100">
      <div className="pt-3 pb-1 bg-black text-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                  <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                  <span className="d-block fw-medium text-light fs-20">
                    {id ? 'Edit Plan' : 'Create New Plan'}
                  </span>
                </div>
                <h1 className="text-light mb-2" data-cue="fadeIn">
                  Plan <span className="text-gradient-primary">Editor</span>
                </h1>
                <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                  {id ? 'Edit existing subscription plan' : 'Create a new subscription plan'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Plan Name */}
              <div className="col-md-6 mb-4">
                <label className="form-label text-light mb-2">Plan Name</label>
                <div className="bg-dark border border-light border-opacity-10 rounded-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control bg-transparent border-0 text-light"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="col-md-6 mb-4">
                <label className="form-label text-light mb-2">Subtitle</label>
                <div className="bg-dark border border-light border-opacity-10 rounded-3">
                  <input
                    type="text"
                    name="subtitle"
                    className="form-control bg-transparent border-0 text-light"
                    value={formData.subtitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="col-12 mb-4">
                <label className="form-label text-light mb-2">Description</label>
                <div className="bg-dark border border-light border-opacity-10 rounded-3">
                  <textarea
                    name="description"
                    className="form-control bg-transparent border-0 text-light"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    style={{ resize: 'none' }}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="col-md-6 mb-4">
                <label className="form-label text-light mb-2">Monthly Price ($)</label>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-light border-opacity-10 text-light">$</span>
                  <div className="bg-dark border border-light border-opacity-10 border-start-0 rounded-end-3 flex-grow-1">
                    <input
                      type="number"
                      name="monthlyPrice"
                      className="form-control bg-transparent border-0 text-light"
                      value={formData.monthlyPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label text-light mb-2">Annual Price ($)</label>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-light border-opacity-10 text-light">$</span>
                  <div className="bg-dark border border-light border-opacity-10 border-start-0 rounded-end-3 flex-grow-1">
                    <input
                      type="number"
                      name="annualPrice"
                      className="form-control bg-transparent border-0 text-light"
                      value={formData.annualPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="col-12 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <label className="form-label text-light mb-0">Features</label>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-primary d-flex align-items-center" 
                    onClick={addFeature}
                  >
                    <Icon name="Plus" size={14} className="me-1" /> Add Feature
                  </button>
                </div>
                
                <div className="d-flex flex-column gap-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="d-flex gap-2">
                      <div className="flex-grow-1 bg-dark border border-light border-opacity-10 rounded-3">
                        <input
                          type="text"
                          className="form-control bg-transparent border-0 text-light"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder="Enter feature"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-danger px-3"
                        onClick={() => removeFeature(index)}
                        disabled={formData.features.length <= 1}
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Is Popular */}
              <div className="col-12 mb-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input bg-dark border-light border-opacity-10"
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
    </div>
  );
};

export default PlanEditor;
