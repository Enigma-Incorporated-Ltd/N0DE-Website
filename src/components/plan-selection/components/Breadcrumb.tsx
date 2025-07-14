import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

// Types
interface BreadcrumbItem {
  label: string;
  href: string;
  current: boolean;
}

const Breadcrumb: React.FC = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/user-dashboard', current: false },
    { label: 'Plans', href: '/plan-selection', current: true }
  ];

  return (
    <nav className="d-inline-flex align-items-center bg-dark-light rounded-pill px-4 py-2 mb-4" data-cue="fadeIn" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div className="d-flex align-items-center mx-2">
              <Icon name="ChevronRight" size={16} className="text-light-50" />
            </div>
          )}
          {item.current ? (
            <span className="text-gradient-primary fw-semibold d-flex align-items-center gap-2 px-3 py-1" aria-current="page">
              <Icon name="CreditCard" size={14} />
              <span>{item.label}</span>
            </span>
          ) : (
            <Link
              to={item.href}
              className="text-light text-decoration-none d-flex align-items-center gap-2 px-3 py-1 rounded-pill transition-all"
              style={{ 
                transition: 'all 0.3s ease',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon name="Home" size={14} />
              <span className="fw-medium">{item.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;