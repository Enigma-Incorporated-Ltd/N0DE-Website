import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';

interface AdminNavigationProps {
  className?: string;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ className = '' }) => {
  const location = useLocation();
  
  const navigationItems = [
    // {
    //   title: 'Dashboard',
    //   path: '/admin/dashboard',
    //   icon: 'LayoutDashboard',
    //   description: 'Overview and analytics'
    // },
    {
      title: 'User & Plan Management',
      path: '/admin/user-management',
      icon: 'Users',
      description: 'Manage users and Plans'
    },
    {
      title: 'Orders & Payments',
      path: '/admin/orders-payments',
      icon: 'CreditCard',
      description: 'Transaction management'
    },
    {
      title: 'Support Tickets',
      path: '/admin/support-tickets',
      icon: 'Ticket',
      description: 'View and manage support tickets'
    },
    // {
    //   title: 'Plan Management',
    //   path: '/admin/plan-management',
    //   icon: 'Package',
    //   description: 'Subscription plans and pricing'
    // }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`bg-dark-gradient border-bottom border-light border-opacity-10 ${className}`} style={{ marginTop: '80px' }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="py-3">
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                {/* Navigation Title */}
                {/* <Link 
                  to="/admin/dashboard"
                  className="d-flex align-items-center me-lg-4 text-decoration-none"
                >
                  <div className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '2rem', height: '2rem' }}>
                    <Icon name="Settings" size={16} className="text-primary" />
                  </div>
                  <span className="text-light fw-medium">Admin Panel</span>
                </Link> */}

                {/* Navigation Items */}
                <div className="d-flex flex-wrap align-items-center gap-1 flex-grow-1">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={`
                        btn btn-sm d-flex align-items-center text-decoration-none px-3 py-2 rounded-3 transition
                        ${isActive(item.path) 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'text-light text-opacity-75 hover:bg-light hover:bg-opacity-10 hover:text-light'
                        }
                        cursor-pointer hover:shadow-sm
                      `}
                      title={item.description}
                      style={{ transition: 'all 0.2s ease-in-out' }}
                    >
                      <Icon 
                        name={item.icon as any} 
                        size={16} 
                        className={`me-2 ${isActive(item.path) ? 'text-white' : 'text-primary'}`} 
                      />
                      <span className="small fw-medium">{item.title}</span>
                    </Link>
                  ))}
                </div>

                {/* Quick Actions */}
                {/* <div className="d-flex align-items-center gap-2">
                  <Link 
                    to="/"
                    className="btn btn-sm btn-outline-light text-light text-opacity-75 hover:text-light d-flex align-items-center px-3 py-2 rounded-3"
                    title="View Site"
                  >
                    <Icon name="ExternalLink" size={14} className="me-2" />
                    <span className="small">View Site</span>
                  </Link>
                  
                  <div className="vr bg-light bg-opacity-25 mx-2" style={{ height: '1.5rem' }}></div>
                  
                  <button 
                    className="btn btn-sm btn-outline-light text-light text-opacity-75 hover:text-light d-flex align-items-center px-3 py-2 rounded-3 position-relative"
                    title="Notifications"
                  >
                    <Icon name="Bell" size={14} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                      3
                    </span>
                  </button>
                </div> */}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation; 