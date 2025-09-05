import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import NodeService from '../../../services/Node';

interface PlanFeature {
  text?: string;
  description?: string;
  Description?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: (string | PlanFeature)[];
  guarantee: string;
  isPopular: boolean;
  active?: boolean;
  subtitle?: string;
}

// Confirmation Modal Component
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Delete", 
  cancelText = "Cancel",
  type = "danger" 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}) => {
  if (!isOpen) return null;
  
  const getIconAndColor = () => {
    switch (type) {
      case "danger":
        return { icon: "AlertTriangle", color: "text-danger", bgColor: "bg-danger bg-opacity-20" };
      case "warning":
        return { icon: "AlertCircle", color: "text-warning", bgColor: "bg-warning bg-opacity-20" };
      case "info":
        return { icon: "Info", color: "text-info", bgColor: "bg-info bg-opacity-20" };
      default:
        return { icon: "AlertTriangle", color: "text-danger", bgColor: "bg-danger bg-opacity-20" };
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
            <div className={`${bgColor} rounded-circle d-flex align-items-center justify-content-center me-3`} style={{ width: '2.5rem', height: '2.5rem' }}>
              <Icon name={icon} size={20} className={color} />
            </div>
            <h2 className="fs-5 fw-semibold text-light mb-0">{title}</h2>
          </div>
        </div>
        <div className="flex-grow-1 overflow-auto p-4" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
          <p className="text-light mb-0">{message}</p>
        </div>
        <div className="p-4 border-top border-light border-opacity-20 d-flex justify-content-end gap-2" style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)'
        }}>
          <button 
            className="btn btn-outline-light btn-sm px-3 py-2" 
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`btn btn-sm px-3 py-2 ${type === 'danger' ? 'btn-danger' : type === 'warning' ? 'btn-warning' : 'btn-info'}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Success Modal Component
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

// Error Modal Component
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

const ProductManagement = () => {
  // Navigation and state management
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  type BillingCycle = 'monthly' | 'yearly';
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  
  // Modal states
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: "danger" | "warning" | "info";
    confirmText?: string;
    cancelText?: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "danger",
    confirmText: "Delete",
    cancelText: "Cancel"
  });
  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ""
  });
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ""
  });
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const plansData = await NodeService.getAllPlans();

        if (!Array.isArray(plansData)) {
          throw new Error('Invalid response format');
        }

        console.log('Raw plans data from API:', plansData);
        
        const transformedPlans = plansData.map((plan: any) => {
          console.log('Processing plan:', plan);
          return {
            id: plan.id.toString(),
            name: plan.name,
            description: plan.planDescription || plan.description || `${plan.name} Plan`,
            monthlyPrice: plan.monthlyPrice,
            annualPrice: plan.annualPrice ?? plan.yearlyPrice ?? 0,
            features: Array.isArray(plan.features) ? plan.features : [],
            guarantee: plan.guarantee || '',
            isPopular: !!plan.isPopular,
            active: plan.isActive !== undefined ? plan.isActive : true,
            subtitle: plan.planSubTitle
          };
        });
        
        console.log('Transformed plans:', transformedPlans);

        setPlans(transformedPlans);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching plans:', err);
        setError(err.message || 'Failed to load plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleEdit = (plan: Plan) => {
    navigate(`/admin/product-manager/plan-editor/${plan.id}`);
  };

  const handleDelete = async (id: string) => {
    const planToDelete = plans.find(plan => plan.id === id);
    const planName = planToDelete?.name || 'this plan';
    
    // Show initial confirmation
    setConfirmationModal({
      isOpen: true,
      title: "Delete Plan",
      message: `Are you sure you want to delete "${planName}"? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        
        try {
          setLoading(true);
          
          // First check if the plan has active subscribers
          const subscriberCheck = await NodeService.checkPlanSubscribers(id);
          
          if (subscriberCheck.hasSubscribers) {
            const subscriberCount = subscriberCheck.subscriberCount || 0;
            
            // Show warning about subscribers
            setConfirmationModal({
              isOpen: true,
              title: "Warning: Active Subscribers",
              message: `"${planName}" has ${subscriberCount} active subscriber(s). Deleting this plan will affect these users. Are you sure you want to proceed?`,
              onConfirm: async () => {
                setConfirmationModal(prev => ({ ...prev, isOpen: false }));
                await performDelete(id, planName);
              },
              type: "warning"
            });
            setLoading(false);
            return;
          }
          
          await performDelete(id, planName);
        } catch (error: any) {
          console.error('Error deleting plan:', error);
          setLoading(false);
          
          // Show error modal
          const errorMessage = error.message || 'An unknown error occurred while deleting the plan.';
          setErrorModal({
            isOpen: true,
            message: `Failed to delete "${planName}": ${errorMessage}`
          });
        }
      },
      type: "danger"
    });
  };

  const performDelete = async (id: string, planName: string) => {
    try {
      setLoading(true);
      await NodeService.deletePlan(id);
      
      // Remove the deleted plan from the local state
      setPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
      
      // Show success modal
      setSuccessModal({
        isOpen: true,
        message: `"${planName}" has been deleted successfully!`
      });
    } catch (error: any) {
      console.error('Error deleting plan:', error);
      
      // Show error modal
      const errorMessage = error.message || 'An unknown error occurred while deleting the plan.';
      setErrorModal({
        isOpen: true,
        message: `Failed to delete "${planName}": ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    navigate('/admin/product-manager/plan-editor/0');
  };

  const handleToggleActive = async (plan: Plan) => {
    const isCurrentlyActive = plan.active;
    const action = isCurrentlyActive ? 'deactivate' : 'activate';
    const planName = plan.name;
    const status = isCurrentlyActive ? 0 : 1; // 0 for deactivate, 1 for activate
    
    // Show confirmation modal with user-friendly message
    setConfirmationModal({
      isOpen: true,
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Plan`,
      message: isCurrentlyActive 
        ? `Are you sure you want to deactivate "${planName}"? This plan will no longer be available for new subscriptions.`
        : `Are you sure you want to activate "${planName}"? This plan will become available for new subscriptions.`,
      onConfirm: async () => {
        setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        
        try {
          setLoading(true);
          
          // Call the new API endpoint
          await NodeService.updatePlanStatus(parseInt(plan.id), status);
          
          // Update the local state
          setPlans(prevPlans => prevPlans.map(p => 
            p.id === plan.id ? { ...p, active: !p.active } : p
          ));
          
          // Show success modal with user-friendly message
          const successMessage = isCurrentlyActive 
            ? `"${planName}" has been deactivated successfully. This plan is no longer available for new subscriptions.`
            : `"${planName}" has been activated successfully. This plan is now available for new subscriptions.`;
          
          setSuccessModal({
            isOpen: true,
            message: successMessage
          });
        } catch (error: any) {
          console.error('Error toggling plan status:', error);
          setLoading(false);
          
          // Show error modal with user-friendly message
          const errorMessage = error.message || 'An unknown error occurred while updating the plan status.';
          const userFriendlyError = isCurrentlyActive
            ? `Failed to deactivate "${planName}": ${errorMessage}`
            : `Failed to activate "${planName}": ${errorMessage}`;
          
          setErrorModal({
            isOpen: true,
            message: userFriendlyError
          });
        } finally {
          setLoading(false);
        }
      },
      type: isCurrentlyActive ? "warning" : "info",
      confirmText: isCurrentlyActive ? "Deactivate" : "Activate",
      cancelText: "Cancel"
    });
  };

  return (
    <div className="bg-black min-vh-100">
      <Helmet>
        <title>Product Manager - N0DE</title>
        <meta name="description" content="Manage products in the admin dashboard" />
      </Helmet>

      <div className="pt-3 pb-1 bg-black text-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                  <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                  <span className="d-block fw-medium text-light fs-20">Product Management</span>
                </div>
                <h1 className="text-light mb-2" data-cue="fadeIn">
                  Product <span className="text-gradient-primary">Manager</span>
                </h1>
                <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                  Manage and organize your product catalog
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-space-sm-y bg-black">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card border-0 bg-dark">
                <div className="card-body p-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                    <h3 className="text-light mb-0">Plans</h3>
                                         <div className="d-flex align-items-center gap-2">
                       <div className="d-flex align-items-center gap-2">
                         <button
                           className={`btn px-3 py-2 fw-medium d-flex align-items-center justify-content-center text-center ${billingCycle === 'monthly' ? 'btn-primary' : 'btn-outline-light'} rounded-pill`}
                           onClick={() => setBillingCycle('monthly')}
                           style={{ 
                             fontSize: '14px',
                             minWidth: '120px',
                             lineHeight: '1.2'
                           }}
                         >
                           Monthly
                         </button>
                         <button
                           className={`btn px-3 py-2 fw-medium d-flex align-items-center justify-content-center text-center ${billingCycle === 'yearly' ? 'btn-primary' : 'btn-outline-light'} rounded-pill`}
                           onClick={() => setBillingCycle('yearly')}
                           style={{ 
                             fontSize: '14px',
                             minWidth: '120px',
                             lineHeight: '1.2'
                           }}
                         >
                           Yearly
                         </button>
                       </div>
                      <button 
                        className="btn btn-outline-light text-white hover:text-primary hover:border-primary fs-14 border-1 rounded-pill d-flex align-items-center transition px-3 py-2"
                        onClick={handleAddNew}
                      >
                        <Icon name="Plus" size={16} className="me-2" />
                        <span>Add New Plan</span>
                      </button>
                    </div>
                  </div>
                  
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="text-light mt-3">Loading plans...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : plans.length === 0 ? (
                    <div className="text-center py-5">
                      <Icon name="Package" size={48} className="text-light text-opacity-25 mb-3" />
                      <p className="text-light text-opacity-50">No plans found. Add your first plan to get started.</p>
                    </div>
                  ) : (
                                         <div className="row g-4">
                       {plans.map((plan) => (
                        <div key={plan.id} className="col-md-6 col-lg-4 d-flex">
                          <div 
                            className={`card w-100 bg-dark ${plan.isPopular ? 'border-warning' : 'border-secondary'} h-100`} 
                            style={{ 
                              minHeight: '280px',
                              display: 'flex',
                              flexDirection: 'column',
                              opacity: plan.active ? 1 : 0.7,
                              transition: 'all 0.3s ease',
                              boxShadow: plan.active ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
                              border: plan.isPopular ? '2px solid #ffc107' : '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '12px',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            {!plan.active && (
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                zIndex: 1
                              }}>
                               
                              </div>
                            )}
                            {plan.isPopular && (
                              <div style={{
                                background: 'linear-gradient(45deg, rgb(240, 248, 40), rgb(79, 179, 217))',
                                color: '#000',
                                textAlign: 'center',
                                padding: '8px 16px',
                                fontWeight: '600',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                width: '100%',
                                boxSizing: 'border-box',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}>
                                Most Popular
                              </div>
                            )}
                            <div className="card-body d-flex flex-column p-4 text-center" style={{
                              paddingTop: !plan.active ? '40px' : '16px',
                              borderTopLeftRadius: plan.isPopular ? '0' : '10px',
                              borderTopRightRadius: plan.isPopular ? '0' : '10'
                            }}>
                              <div className="d-flex flex-column justify-content-center align-items-center mb-2 position-relative">
                                <h5 className="card-title text-light mb-0">
                                  {plan.name}
                                  {!plan.active && (
                                    <span style={{
                                      background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                                      color: 'white',
                                      padding: '4px 10px',
                                      borderRadius: '12px',
                                      fontSize: '0.7rem',
                                      marginLeft: '8px',
                                      display: 'inline-block',
                                      fontWeight: '600',
                                      letterSpacing: '0.5px',
                                      textTransform: 'uppercase',
                                      boxShadow: '0 1px 3px rgba(220, 53, 69, 0.3)'
                                    }}>
                                      Inactive
                                    </span>
                                  )}
                                </h5>
                                {plan.subtitle && (
                                  <>
                                    <p className="text-light text-opacity-75 mb-0 mt-1" style={{ fontSize: '0.9rem' }}>
                                      {plan.subtitle}
                                    </p>
                                    <div style={{
                                      height: '1px',
                                      background: 'rgba(255, 255, 255, 0.1)',
                                      margin: '16px 0',
                                      width: '100%'
                                    }} />
                                  </>
                                )}
                                <div className="dropdown position-absolute" style={{ right: '0', top: '0' }}>
                                  <button 
                                    className="btn btn-link p-0" 
                                    type="button" 
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                      background: 'transparent',
                                      border: 'none',
                                      outline: 'none',
                                      boxShadow: 'none',
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      padding: '4px 8px',
                                      borderRadius: '4px',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                                  >
                                    <Icon name="MoreVertical" size={20} />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end" style={{
                                    backgroundColor: '#000000',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    padding: '8px 0',
                                    minWidth: '200px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
                                  }}>
                                    <li>
                                      <button 
                                        className="dropdown-item d-flex align-items-center py-2 px-3"
                                        onClick={() => handleEdit(plan)}
                                        style={{
                                          color: 'rgba(255, 255, 255, 0.9)',
                                          fontSize: '14px',
                                          transition: 'all 0.2s ease',
                                          backgroundColor: 'transrparent'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                      >
                                        <Icon name="Edit" size={16} className="me-3" style={{ width: '20px' }} />
                                        <span>Edit</span>
                                      </button>
                                    </li>
                                    <li><hr className="dropdown-divider my-1" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} /></li>
                                    <li>
                                      <button 
                                        className={`dropdown-item d-flex align-items-center py-2 px-3 ${plan.active ? 'text-warning' : 'text-success'}`}
                                        onClick={() => handleToggleActive(plan)}
                                        style={{
                                          fontSize: '14px',
                                          transition: 'all 0.2s ease',
                                          backgroundColor: 'transparent'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                      >
                                        <Icon 
                                          name={plan.active ? "Pause" : "Play"} 
                                          size={16} 
                                          className="me-3" 
                                          style={{ width: '20px' }} 
                                        />
                                        <span>{plan.active ? 'Deactivate' : 'Activate'}</span>
                                      </button>
                                    </li>
                                    <li><hr className="dropdown-divider my-1" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} /></li>
                                    <li>
                                      <button 
                                        className="dropdown-item d-flex align-items-center py-2 px-3 text-danger"
                                        onClick={() => handleDelete(plan.id)}
                                        style={{
                                          fontSize: '14px',
                                          transition: 'all 0.2s ease',
                                          backgroundColor: 'transparent'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                      >
                                        <Icon name="Trash2" size={16} className="me-3" style={{ width: '20px' }} />
                                        <span>Delete</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <div className="d-flex align-items-baseline justify-content-center mb-1">
                                  <span className="h3 text-light" style={{ fontWeight: '700' }}>
                                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                                  </span>
                                  <span className="ms-2 text-light text-opacity-75" style={{ fontSize: '1rem' }}>
                                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                                  </span>
                                </div>
                                <div className="mb-1" style={{ height: '0.5rem' }}></div>
                                <p className="text-light text-opacity-75 text-center mb-0" style={{
                                  fontSize: '0.9rem',
                                  lineHeight: '1.5',
                                  paddingTop: '0',
                                  marginTop: '0'
                                }}>
                                  {plan.description || 'No description available'}
                                </p>
                              </div>

                              <div className="mb-3">
                                <div style={{
                                  height: '1px',
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  margin: '12px 0 16px 0',
                                  width: '100%'
                                }} />
                                <ul className="list-unstyled mb-0 mx-auto" style={{ maxWidth: '250px' }}>
                                  {plan.features.map((feature, index) => {
                                    // Handle different feature formats
                                    let featureText = '';
                                    
                                    if (typeof feature === 'string') {
                                      featureText = feature;
                                    } else if (typeof feature === 'object') {
                                      const featureObj = feature as PlanFeature;
                                      featureText = featureObj.text || featureObj.description || featureObj.Description || '';
                                    }
                                    
                                    return (
                                    <li key={index} className="mb-2 d-flex align-items-start justify-content-center" style={{
                                      padding: '6px 0',
                                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                      <Icon name="Check" size={14} className="text-success mt-0 me-3 flex-shrink-0" style={{ marginTop: '2px', flexShrink: 0 }} />
                                        <span className="text-light text-opacity-75 small" style={{ 
                                          fontSize: '0.8rem', 
                                          lineHeight: '1.4',
                                          flex: 1
                                        }}>{featureText}</span>
                                    </li>
                                    );
                                  })}
                                </ul>
                              </div>
                              
                              {plan.guarantee && (
                                <div className="mt-auto pt-3 text-center">
                                  <span className="badge bg-dark text-light border border-light border-opacity-10 px-3 py-2">
                                    {plan.guarantee}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
        confirmText={confirmationModal.confirmText}
        cancelText={confirmationModal.cancelText}
      />
      
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, message: "" })}
        message={successModal.message}
      />
      
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </div>
  );
};

export default ProductManagement;
