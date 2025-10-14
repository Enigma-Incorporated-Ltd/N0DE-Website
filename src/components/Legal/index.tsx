import { NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import HeaderOne from '../../layouts/headers/HeaderOne';
import FooterOne from '../../layouts/footers/FooterOne';

// Add this style tag to your component
const hoverStyle = `
  .nav-link-hover:hover {
    color: #f59e0b !important;
  }
`;

const Legal = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{hoverStyle}</style>
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
                          `nav-link nav-link-hover ${isActive ? 'text-primary fw-bold' : 'text-light'}`
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
                          `nav-link nav-link-hover ${isActive ? 'text-primary fw-bold' : 'text-light'}`
                        }
                      >
                        Fair Use Policy
                      </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                      <NavLink 
                        to="/legal/end-user-policy" 
                        className={({ isActive }) => 
                          `nav-link nav-link-hover ${isActive ? 'text-primary fw-bold' : 'text-light'}`
                        }
                      >
                        End User Policy
                      </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                      <NavLink 
                        to="/legal/dmca-policy" 
                        className={({ isActive }) => 
                          `nav-link nav-link-hover ${isActive ? 'text-primary fw-bold' : 'text-light'}`
                        }
                      >
                        DMCA Policy
                      </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                      <NavLink 
                        to="/legal/software-license" 
                        className={({ isActive }) => 
                          `nav-link nav-link-hover ${isActive ? 'text-primary fw-bold' : 'text-light'}`
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
    </>
  );
};

export default Legal;