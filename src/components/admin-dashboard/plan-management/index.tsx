import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../../common/Wrapper';
import Icon from '../../../components/AppIcon';

interface PlanFeature {
  text?: string;
  description?: string;
  Description?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: (string | PlanFeature)[];
  status: 'active' | 'inactive' | 'draft';
  subscribers: number;
  revenue: number;
  createdDate: string;
  popular: boolean;
}

const PlanManagement = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCycle, setFilterCycle] = useState('all');

  // Mock plan data
  const mockPlans: Plan[] = [
    {
      id: '1',
      name: 'LITE',
      description: 'Perfect for individuals getting started',
      price: 9.99,
      billingCycle: 'monthly',
      features: ['5 Projects', '10GB Storage', 'Basic Support', 'API Access'],
      status: 'active',
      subscribers: 150,
      revenue: 1498.50,
      createdDate: '2024-01-15',
      popular: false
    },
    {
      id: '2',
      name: 'PRO',
      description: 'Best for growing businesses',
      price: 29.99,
      billingCycle: 'monthly',
      features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced API', 'Team Collaboration'],
      status: 'active',
      subscribers: 85,
      revenue: 2549.15,
      createdDate: '2024-01-15',
      popular: true
    },
    {
      id: '3',
      name: 'ENTERPRISE',
      description: 'For large organizations',
      price: 99.99,
      billingCycle: 'monthly',
      features: ['Everything in PRO', 'Unlimited Storage', 'Custom Integration', 'Dedicated Support', 'SLA'],
      status: 'active',
      subscribers: 25,
      revenue: 2499.75,
      createdDate: '2024-01-15',
      popular: false
    },
    {
      id: '4',
      name: 'PRO Yearly',
      description: 'PRO plan with annual billing',
      price: 299.99,
      billingCycle: 'yearly',
      features: ['Everything in PRO', '2 Months Free', 'Priority Support'],
      status: 'active',
      subscribers: 42,
      revenue: 12599.58,
      createdDate: '2024-01-15',
      popular: false
    },
    {
      id: '5',
      name: 'STARTER',
      description: 'Basic plan for testing',
      price: 4.99,
      billingCycle: 'monthly',
      features: ['2 Projects', '5GB Storage', 'Email Support'],
      status: 'inactive',
      subscribers: 0,
      revenue: 0,
      createdDate: '2024-01-15',
      popular: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPlans(mockPlans);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPlans = plans.filter(plan => {
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus;
    const matchesCycle = filterCycle === 'all' || plan.billingCycle === filterCycle;
    return matchesStatus && matchesCycle;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { class: 'bg-success', text: 'Active' },
      inactive: { class: 'bg-danger', text: 'Inactive' },
      draft: { class: 'bg-warning', text: 'Draft' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`badge ${config.class} text-white`}>
        {config.text}
      </span>
    );
  };

  const getCycleBadge = (cycle: string) => {
    const cycleConfig = {
      monthly: { class: 'bg-primary', text: 'Monthly' },
      yearly: { class: 'bg-info', text: 'Yearly' }
    };
    const config = cycleConfig[cycle as keyof typeof cycleConfig];
    return (
      <span className={`badge ${config.class} text-white`}>
        {config.text}
      </span>
    );
  };

  const getTotalSubscribers = () => {
    return plans.reduce((sum, plan) => sum + plan.subscribers, 0);
  };

  const getTotalRevenue = () => {
    return plans.reduce((sum, plan) => sum + plan.revenue, 0);
  };

  const getActiveRevenue = () => {
    return plans.filter(p => p.status === 'active').reduce((sum, plan) => sum + plan.revenue, 0);
  };

  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark">
          {/* <HeaderDashboard /> */}
          {/* <AdminNavigation /> */}
          <div className="section-space-md-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center">
                    <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
                    <p className="text-light">Loading plans...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <>
      <Helmet>
        <title>Plan Management - Admin Dashboard - N0de</title>
        <meta name="description" content="Manage subscription plans and pricing in the admin dashboard" />
      </Helmet>

      <Wrapper>
        <div className="bg-dark">
          {/* <HeaderDashboard /> */}
          {/* <AdminNavigation /> */}
          
          {/* Page Header */}
          <div className="section-space-md-top pb-2">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                      <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                      <span className="d-block fw-medium text-light fs-20">Plan Management</span>
                    </div>
                    <h1 className="text-light mb-2" data-cue="fadeIn">
                      Manage <span className="text-gradient-primary">Subscription Plans</span>
                    </h1>
                    <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                      Create, edit, and manage subscription plans and pricing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-light fw-bold fs-2 mb-2">{plans.length}</div>
                    <div className="text-light text-opacity-75">Total Plans</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-success fw-bold fs-2 mb-2">{getTotalSubscribers()}</div>
                    <div className="text-light text-opacity-75">Total Subscribers</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-primary fw-bold fs-2 mb-2">${getTotalRevenue().toFixed(2)}</div>
                    <div className="text-light text-opacity-75">Total Revenue</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-warning fw-bold fs-2 mb-2">${getActiveRevenue().toFixed(2)}</div>
                    <div className="text-light text-opacity-75">Active Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row g-3">
                <div className="col-md-3">
                  <select
                    className="form-select bg-dark border-light border-opacity-25 text-light"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select bg-dark border-light border-opacity-25 text-light"
                    value={filterCycle}
                    onChange={(e) => setFilterCycle(e.target.value)}
                  >
                    <option value="all">All Billing Cycles</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary d-flex align-items-center">
                      <Icon name="Plus" size={16} className="me-2" />
                      Create New Plan
                    </button>
                    <button className="btn btn-outline-light d-flex align-items-center">
                      <Icon name="Copy" size={16} className="me-2" />
                      Duplicate Plan
                    </button>
                    <button className="btn btn-outline-light d-flex align-items-center">
                      <Icon name="Download" size={16} className="me-2" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row g-4">
                {filteredPlans.map((plan) => (
                  <div key={plan.id} className="col-lg-6 col-xl-4">
                    <div className={`bg-dark-gradient border border-light border-opacity-10 rounded-5 p-4 h-100 position-relative ${plan.popular ? 'border-primary' : ''}`}>
                      {plan.popular && (
                        <div className="position-absolute top-0 start-50 translate-middle">
                          <span className="badge bg-primary text-white px-3 py-1">Most Popular</span>
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h3 className="text-light fw-bold mb-1">{plan.name}</h3>
                          <p className="text-light text-opacity-75 small mb-0">{plan.description}</p>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          {getStatusBadge(plan.status)}
                          {getCycleBadge(plan.billingCycle)}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-baseline">
                          <span className="text-light fw-bold fs-1">${plan.price}</span>
                          <span className="text-light text-opacity-75 ms-2">/{plan.billingCycle}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-light fw-medium mb-2 fs-6">Features</h4>
                        <ul className="list-unstyled">
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
                            <li key={index} className="d-flex align-items-center mb-2">
                              <Icon name="Check" size={16} className="text-success me-2" />
                                <span className="text-light text-opacity-75 small">{featureText}</span>
                            </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="mb-3">
                        <div className="row g-2">
                          <div className="col-6">
                            <div className="text-center">
                              <div className="text-light fw-medium">{plan.subscribers}</div>
                              <div className="text-light text-opacity-50 small">Subscribers</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="text-center">
                              <div className="text-light fw-medium">${plan.revenue.toFixed(2)}</div>
                              <div className="text-light text-opacity-50 small">Revenue</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-light btn-sm flex-grow-1 d-flex align-items-center justify-content-center">
                          <Icon name="Edit" size={14} className="me-1" />
                          Edit
                        </button>
                        <button className="btn btn-outline-light btn-sm flex-grow-1 d-flex align-items-center justify-content-center">
                          <Icon name="Copy" size={14} className="me-1" />
                          Clone
                        </button>
                        <button className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center">
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default PlanManagement; 