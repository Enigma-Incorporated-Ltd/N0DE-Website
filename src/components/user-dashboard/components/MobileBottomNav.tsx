import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/user-dashboard',
      icon: 'LayoutDashboard',
    },
    {
      name: 'Billing',
      href: '/billing-management',
      icon: 'CreditCard',
    },
    {
      name: 'Support',
      href: '/support-center',
      icon: 'HelpCircle',
    },
    {
      name: 'Settings',
      href: '/user-settings',
      icon: 'Settings',
    },
  ];

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border lg:hidden z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                active
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon
                name={item.icon}
                size={20}
                className={active ? 'text-primary' : 'text-muted-foreground'}
              />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
