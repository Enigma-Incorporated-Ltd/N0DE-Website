import { NavLink, Outlet } from 'react-router-dom';
import HeaderOne from '../../layouts/headers/HeaderOne';
import FooterOne from '../../layouts/footers/FooterOne';

const Legal = () => {
  return (
    <div className="min-vh-100 bg-dark d-flex flex-column">
      <HeaderOne />
      <div className="flex-grow-1 pt-5">
        <div className="container py-4 mt-5">
          <div className="row g-4 mt-3">
            {/* Left Sidebar - Reduced width */}
            <div className="col-12 col-lg-2 ps-0">
              <div className="bg-dark-gradient p-3 rounded-3 h-100" style={{ marginLeft: '-15px', width: 'calc(100% + 15px)' }}>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <NavLink 
                      to="/legal/standard-terms" 
                      className={({ isActive }) => 
                        `nav-link text-light ${isActive ? 'active' : ''}`
                      }
                      end
                    >
                      Standard Terms
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink 
                      to="/legal/fair-use-policy" 
                      className={({ isActive }) => 
                        `nav-link text-light ${isActive ? 'active' : ''}`
                      }
                    >
                      Fair Use Policy
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink 
                      to="/legal/end-user-policy" 
                      className={({ isActive }) => 
                        `nav-link text-light ${isActive ? 'active' : ''}`
                      }
                    >
                      End User Policy
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink 
                      to="/legal/dmca-policy" 
                      className={({ isActive }) => 
                        `nav-link text-light ${isActive ? 'active' : ''}`
                      }
                    >
                      DMCA Policy
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink 
                      to="/legal/software-license" 
                      className={({ isActive }) => 
                        `nav-link text-light ${isActive ? 'active' : ''}`
                      }
                    >
                      Software Licence Agreement
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content - Increased width */}
            <div className="col-12 col-lg-10">
              <div className="bg-dark-gradient p-4 p-lg-5 rounded-3 min-vh-100">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOne />
    </div>
  );
};

export default Legal;