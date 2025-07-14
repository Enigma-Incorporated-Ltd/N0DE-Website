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
    <Link to="/" className="d-flex align-items-center text-decoration-none">
      <div className="bg-primary rounded-3 d-flex align-items-center justify-content-center me-2" style={{ width: '2rem', height: '2rem' }}>
        <Icon name="CreditCard" size={20} color="white" />
      </div>
      <span className="h4 fw-semibold text-dark mb-0">SubscriptionFlow</span>
    </Link>
  );

  const AuthButtons = () => (
    <div className="d-flex align-items-center">
      <Button variant="ghost" asChild>
        <Link to="/login" className="me-2">Sign In</Link>
      </Button>
      <Button variant="default" asChild>
        <Link to="/register">Get Started</Link>
      </Button>
    </div>
  );

  const UserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
      <div className="position-relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="position-relative"
        >
          <Icon name="User" size={20} />
        </Button>

        {isDropdownOpen && (
          <div className="position-absolute end-0 mt-2 bg-white border rounded shadow-lg" style={{ width: '12rem', zIndex: 1050 }}>
            <div className="py-1">
              <Link to="/user-dashboard" className="d-block px-3 py-2 text-decoration-none text-dark small" onClick={() => setIsDropdownOpen(false)}>
                Dashboard
              </Link>
              <Link to="/billing-management" className="d-block px-3 py-2 text-decoration-none text-dark small" onClick={() => setIsDropdownOpen(false)}>
                Billing
              </Link>
              <Link to="/support-center" className="d-block px-3 py-2 text-decoration-none text-dark small" onClick={() => setIsDropdownOpen(false)}>
                Support
              </Link>
              <hr className="my-1" />
              <button className="btn btn-link text-start w-100 px-3 py-2 text-dark small text-decoration-none" onClick={() => {
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
      <div className="position-relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="position-relative"
        >
          <Icon name="Settings" size={20} />
        </Button>

        {isDropdownOpen && (
          <div className="position-absolute end-0 mt-2 bg-white border rounded shadow-lg" style={{ width: '12rem', zIndex: 1050 }}>
            <div className="py-1">
              <Link to="/admin-dashboard" className="d-block px-3 py-2 text-decoration-none text-dark small" onClick={() => setIsDropdownOpen(false)}>
                Admin Dashboard
              </Link>
              <Link to="/user-management" className="d-block px-3 py-2 text-decoration-none text-dark small" onClick={() => setIsDropdownOpen(false)}>
                User Management
              </Link>
              <hr className="my-1" />
              <button className="btn btn-link text-start w-100 px-3 py-2 text-dark small text-decoration-none" onClick={() => {
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
    <div className={`d-lg-none ${isMobileMenuOpen ? 'd-block' : 'd-none'}`}>
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 1040 }}>
        <div className="position-fixed top-0 end-0 h-100 bg-white border-start shadow-lg" style={{ width: '20rem', maxWidth: '100%', zIndex: 1050 }}>
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="p-3">
            {isPublicPage ? (
              <div className="d-grid gap-2">
                <Button variant="ghost" fullWidth asChild>
                  <Link to="/login" className="text-decoration-none" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button variant="default" fullWidth asChild>
                  <Link to="/register" className="text-decoration-none" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="d-grid gap-2">
                <Link to="/user-dashboard" className="py-2 text-decoration-none text-dark" onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/billing-management" className="py-2 text-decoration-none text-dark" onClick={() => setIsMobileMenuOpen(false)}>
                  Billing
                </Link>
                <Link to="/support-center" className="py-2 text-decoration-none text-dark" onClick={() => setIsMobileMenuOpen(false)}>
                  Support
                </Link>
                <Link to="/admin-dashboard" className="py-2 text-decoration-none text-dark" onClick={() => setIsMobileMenuOpen(false)}>
                  Admin Dashboard
                </Link>
                <Link to="/user-management" className="py-2 text-decoration-none text-dark" onClick={() => setIsMobileMenuOpen(false)}>
                  User Management
                </Link>
                <hr />
                <button className="btn btn-link text-start w-100 py-2 text-dark text-decoration-none" onClick={() => {
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
      <header className="sticky-top border-bottom bg-white" style={{ zIndex: 1030 }}>
        <div className="d-flex align-items-center justify-content-between px-3 px-lg-4" style={{ height: '4rem' }}>
          <Logo />

          {/* Desktop Navigation */}
          <div className="d-none d-lg-flex align-items-center">
            {isPublicPage ? (
              <AuthButtons />
            ) : (
              <div className="d-flex align-items-center">
                <UserMenu />
                <AdminMenu />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="d-lg-none">
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
