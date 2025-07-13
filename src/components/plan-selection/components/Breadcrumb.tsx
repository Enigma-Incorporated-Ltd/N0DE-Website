import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/', current: false },
    { label: 'Plans', href: '/plan-selection', current: true }
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {item.current ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;