import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

if (typeof window !== 'undefined') {
  import('bootstrap/dist/js/bootstrap.bundle.min.js');
}

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const { planId, billingCycle, selectedPlan } = location.state || {};

  const isPublicPage = [
    '/login',
    '/register',
    '/forgot-password',
    '/plan-selection',
    '/checkout',
    '/payment-confirmation',
  ].includes(location.pathname);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-overlay z-3 navbar--dark">
        <div className="container">
          <Link to="/" className="logo d-block">
            <img src="assets/img/nodeWhite.png" alt="logo" className="logo__img" style={{ height: '40px' }} />
          </Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
            <ul className="navbar-nav justify-content-end align-items-lg-center w-100">
              {isPublicPage ? (
                <li className="nav-item ms-lg-auto">
                  <ul className="list list-row gap-2">
                    <li>
                      <Link to="/login" state={{ planId, billingCycle, selectedPlan }} className="btn btn-outline-light me-2 fs-14">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" state={{ planId, billingCycle, selectedPlan }} className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill">
                        Get Started
                        <span className="d-inline-block ms-2">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item ms-lg-auto">
                  <ul className="list list-row gap-2">
                    <li>
                      <Link to="/user-dashboard" className="btn btn-outline-light me-2 fs-14">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button 
                        className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                        onClick={() => {
                          // Handle logout
                        }}
                      >
                        Sign Out
                        <span className="d-inline-block ms-2">
                          <i className="bi bi-box-arrow-right"></i>
                        </span>
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
