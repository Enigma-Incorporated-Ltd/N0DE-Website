import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Icon from "../../components/AppIcon";
import { AccountService } from '../../services/Account';

if (typeof window !== 'undefined') { 
  import('bootstrap/dist/js/bootstrap.bundle.min.js');
}

const HeaderDashboard = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're in admin context
  const isAdminContext = location.pathname.startsWith('/admin');
  const dashboardUrl = isAdminContext ? '/admin/user-management' : '/user-dashboard';
  
  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Signing out...');
    AccountService.logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-overlay z-3 navbar--dark" style={{ height: '80px' }}>
        <div className="container">
          <Link to={dashboardUrl} className="logo d-block">
            <img src="/assets/img/nodeWhite.png" alt="logo" className="logo__img" />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="primaryMenu">
            <ul className="navbar-nav justify-content-end align-items-lg-center w-100">
              <li className="nav-item ms-lg-auto">
                <ul className="list list-row gap-2">
                  <li>
                    <button 
                      onClick={handleSignOut}
                      className="btn btn-outline-light text-white hover:text-primary fs-14 border-1 rounded-pill d-flex align-items-center transition"
                    >
                      <Icon name="LogOut" size={16} className="me-2" />
                      <span className="d-inline-block">Sign Out</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>             
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderDashboard; 