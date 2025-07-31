import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import NodeService from '../../../services/Node';

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  guarantee: string;
  isPopular: boolean;
}

const ProductManagement = () => {
  // Navigation and state management
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  type BillingCycle = 'all' | 'monthly' | 'yearly';
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('all');
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const plansData = await NodeService.getAllPlans();

        if (!Array.isArray(plansData)) {
          throw new Error('Invalid response format');
        }

        const transformedPlans = plansData.map((plan: any) => ({
          id: plan.id.toString(),
          name: plan.name,
          description: plan.description || `${plan.name} Plan`,
          monthlyPrice: plan.monthlyPrice,
          annualPrice: plan.annualPrice ?? plan.yearlyPrice ?? 0,
          features: Array.isArray(plan.features) ? plan.features : [],
          guarantee: plan.guarantee || '',
          isPopular: !!plan.isPopular,
        }));

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

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      console.log('Delete plan:', id);
      // TODO: Implement delete functionality
    }
  };

  const handleAddNew = () => {
    navigate('/admin/product-manager/plan-editor/0');
  };

  return (
    <div className="bg-black min-vh-100">
      <Helmet>
        <title>Product Manager - N0de</title>
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
                      <div className="dropdown">
                        <button 
                          className="btn btn-outline-light text-white hover:text-primary hover:border-primary fs-14 border-1 rounded-pill d-flex align-items-center transition px-3 py-2" 
                          type="button" 
                          id="billingCycleDropdown" 
                          data-bs-toggle="dropdown" 
                          aria-expanded="false"
                        >
                          <Icon name="Calendar" size={16} className="me-2" />
                          {billingCycle === 'all' ? 'All Billing Cycles' : `${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}`}
                        </button>
                        <ul className="dropdown-menu bg-dark border border-secondary rounded-2 p-2 min-w-auto" aria-labelledby="billingCycleDropdown">
                          <li>
                            <button 
                              className={`dropdown-item text-white bg-transparent rounded-1 px-3 py-2 w-100 text-start ${billingCycle === 'all' ? 'bg-primary bg-opacity-10' : 'hover:bg-primary hover:bg-opacity-10'}`}
                              onClick={() => setBillingCycle('all')}
                            >
                              All Billing Cycles
                            </button>
                          </li>
                          <li>
                            <button 
                              className={`dropdown-item text-white bg-transparent rounded-1 px-3 py-2 w-100 text-start ${billingCycle === 'monthly' ? 'bg-primary bg-opacity-10' : 'hover:bg-primary hover:bg-opacity-10'}`}
                              onClick={() => setBillingCycle('monthly')}
                            >
                              Monthly
                            </button>
                          </li>
                          <li>
                            <button 
                              className={`dropdown-item text-white bg-transparent rounded-1 px-3 py-2 w-100 text-start ${billingCycle === 'yearly' ? 'bg-primary bg-opacity-10' : 'hover:bg-primary hover:bg-opacity-10'}`}
                              onClick={() => setBillingCycle('yearly')}
                            >
                              Yearly
                            </button>
                          </li>
                        </ul>
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
                      {plans
                        .filter(plan => {
                          // Show all plans if 'all' is selected
                          if (billingCycle === 'all') return true;
                          
                          // Check if plan has a monthly price (monthly plan)
                          const hasMonthlyPrice = plan.monthlyPrice > 0 && plan.monthlyPrice !== plan.annualPrice;
                          // Check if plan has an annual price (yearly plan)
                          const hasYearlyPrice = plan.annualPrice > 0 && plan.monthlyPrice !== plan.annualPrice;
                          
                          if (billingCycle === 'monthly') {
                            return hasMonthlyPrice || (!hasYearlyPrice && plan.monthlyPrice > 0);
                          } else if (billingCycle === 'yearly') {
                            return hasYearlyPrice || (!hasMonthlyPrice && plan.annualPrice > 0);
                          }
                          
                          return true;
                        })
                        .map((plan) => (
                        <div key={plan.id} className="col-md-6 col-lg-4 d-flex">
                          <div 
                            className={`card w-100 bg-dark ${plan.isPopular ? 'border-warning' : 'border-secondary'} h-100`} 
                            style={{ 
                              minHeight: '240px',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <div className="card-body d-flex flex-column p-3">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="card-title text-light mb-0">
                                  {plan.name}
                                  {plan.isPopular && (
                                    <span className="badge bg-warning text-dark ms-2">Popular</span>
                                  )}
                                </h5>
                                <div className="dropdown">
                                  <button 
                                    className="btn btn-sm btn-outline-light rounded-circle p-1" 
                                    type="button" 
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <Icon name="MoreVertical" size={16} className="text-light" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                                    <li>
                                      <button 
                                        className="dropdown-item text-light"
                                        onClick={() => handleEdit(plan)}
                                      >
                                        <Icon name="Edit" size={14} className="me-2" /> Edit
                                      </button>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                      <button 
                                        className="dropdown-item text-danger"
                                        onClick={() => handleDelete(plan.id)}
                                      >
                                        <Icon name="Trash2" size={14} className="me-2" /> Delete
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <div className="d-flex align-items-baseline">
                                  <span className="h4 text-light">
                                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                                  </span>
                                  <span className="ms-1 text-light text-opacity-75">
                                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                                  </span>
                                </div>
                                <div className="text-light text-opacity-75 small">
                                  {billingCycle === 'monthly' ? (
                                    <>
                                      ${plan.annualPrice} billed annually
                                    </>
                                  ) : (
                                    <>
                                      ${(plan.annualPrice / 12).toFixed(2)} per month
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              <div className="mb-2">
                                <h6 className="text-light mb-2 small">Features:</h6>
                                <ul className="list-unstyled mb-0">
                                  {plan.features.map((feature, index) => (
                                    <li key={index} className="mb-1 d-flex align-items-start">
                                      <Icon name="Check" size={14} className="text-success mt-0 me-2 flex-shrink-0" />
                                      <span className="text-light text-opacity-75 small">{feature}</span>
                                    </li>
                                  ))}
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
    </div>
  );
};

export default ProductManagement;
