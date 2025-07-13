import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isPublicPage = [
    '/login',
    '/register',
    '/plan-selection',
    '/checkout',
    '/payment-confirmation',
  ].includes(location.pathname);

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="CreditCard" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">SubscriptionFlow</span>
    </Link>
  );

  const AuthButtons = () => (
    <div className="flex items-center space-x-3">
      <Button variant="ghost" asChild>
        <Link to="/login">Sign In</Link>
      </Button>
      <Button variant="default" asChild>
        <Link to="/register">Get Started</Link>
      </Button>
    </div>
  );

  const UserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative"
        >
          <Icon name="User" size={20} />
        </Button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-50">
            <div className="py-1">
              <Link to="/user-dashboard" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth" onClick={() => setIsDropdownOpen(false)}>
                Dashboard
              </Link>
              <Link to="/billing-management" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth" onClick={() => setIsDropdownOpen(false)}>
                Billing
              </Link>
              <Link to="/support-center" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth" onClick={() => setIsDropdownOpen(false)}>
                Support
              </Link>
              <hr className="my-1 border-border" />
              <button className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth" onClick={() => {
                setIsDropdownOpen(false);
                // Handle logout
              }}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AdminMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative"
        >
          <Icon name="Settings" size={20} />
        </Button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-50">
            <div className="py-1">
              <Link to="/admin-dashboard" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth" onClick={() => setIsDropdownOpen(false)}>
                Admin Dashboard
              </Link>
              <Link to="/user-management" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth" onClick={() => setIsDropdownOpen(false)}>
                User Management
              </Link>
              <hr className="my-1 border-border" />
              <button className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth" onClick={() => {
                setIsDropdownOpen(false);
                // Handle logout
              }}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MobileMenu = () => (
    <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-card border-l border-border shadow-elevated">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            {isPublicPage ? (
              <div className="space-y-3">
                <Button variant="ghost" fullWidth asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button variant="default" fullWidth asChild>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/user-dashboard" className="block py-2 text-foreground hover:text-primary transition-smooth" onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/billing-management" className="block py-2 text-foreground hover:text-primary transition-smooth" onClick={() => setIsMobileMenuOpen(false)}>
                  Billing
                </Link>
                <Link to="/support-center" className="block py-2 text-foreground hover:text-primary transition-smooth" onClick={() => setIsMobileMenuOpen(false)}>
                  Support
                </Link>
                <Link to="/admin-dashboard" className="block py-2 text-foreground hover:text-primary transition-smooth" onClick={() => setIsMobileMenuOpen(false)}>
                  Admin Dashboard
                </Link>
                <Link to="/user-management" className="block py-2 text-foreground hover:text-primary transition-smooth" onClick={() => setIsMobileMenuOpen(false)}>
                  User Management
                </Link>
                <hr className="border-border" />
                <button className="block w-full text-left py-2 text-foreground hover:text-primary transition-smooth" onClick={() => {
                  setIsMobileMenuOpen(false);
                  // Handle logout
                }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {isPublicPage ? (
              <AuthButtons />
            ) : (
              <div className="flex items-center space-x-2">
                <UserMenu />
                <AdminMenu />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu />
    </>
  );
};

export default Header;
