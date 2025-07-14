import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

interface NavItemType {
  title: string;
  href: string;
  icon: string;
  description: string;
}

interface NavItemProps {
  item: NavItemType;
  isCollapsed: boolean;
}

interface NavSectionProps {
  title: string;
  items: NavItemType[];
  isCollapsed: boolean;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const userNavItems: NavItemType[] = [
    {
      title: 'Dashboard',
      href: '/user-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview of your subscriptions',
    },
    {
      title: 'Billing',
      href: '/billing-management',
      icon: 'CreditCard',
      description: 'Manage payments and invoices',
    },
    {
      title: 'Support',
      href: '/support-center',
      icon: 'HelpCircle',
      description: 'Get help and contact support',
    },
  ];

  const adminNavItems: NavItemType[] = [
    {
      title: 'Admin Dashboard',
      href: '/admin/dashboard',
      icon: 'Shield',
      description: 'Administrative overview',
    },
    {
      title: 'User & Plan Management',
      href: '/admin/user-management',
      icon: 'Users',
      description: 'Manage system users',
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  const NavItem: React.FC<NavItemProps> = React.memo(({ item, isCollapsed }) => (
    <Link
      to={item.href}
      className={`
        flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
        ${isActive(item.href)
          ? 'bg-primary text-primary-foreground shadow-subtle'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
        ${isCollapsed ? 'justify-center' : ''}
      `}
      title={isCollapsed ? item.title : ''}
    >
      <Icon
        name={item.icon}
        size={20}
        className={isActive(item.href) ? 'text-primary-foreground' : ''}
      />
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{item.title}</div>
          <div className="text-xs opacity-75 truncate">{item.description}</div>
        </div>
      )}
    </Link>
  ));

  const NavSection: React.FC<NavSectionProps> = ({ title, items, isCollapsed }) => (
    <div className="space-y-2">
      {!isCollapsed && (
        <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} item={item} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  );

  return (
    <aside
      className={`
        fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        lg:translate-x-0 -translate-x-full lg:block hidden
      `}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="ml-auto"
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
          </Button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <NavSection
            title="User Area"
            items={userNavItems}
            isCollapsed={isCollapsed}
          />

          <NavSection
            title="Administration"
            items={adminNavItems}
            isCollapsed={isCollapsed}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div
            className={`
              flex items-center space-x-3 text-sm text-muted-foreground
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <Icon name="Zap" size={16} />
            {!isCollapsed && (
              <div>
                <div className="font-medium">N0de</div>
                <div className="text-xs">v2.1.0</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
