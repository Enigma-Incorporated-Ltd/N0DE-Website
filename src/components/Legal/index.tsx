import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import HeaderOne from "../../layouts/headers/HeaderOne";
import FooterOne from "../../layouts/footers/FooterOne";

// Add this style tag to your component
const hoverStyle = `
  .nav-link-hover:hover {
    color: #f59e0b !important;
  }
`;

const Legal = () => {
  // Scroll to top when component mounts
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // console.log("Hello world");
    // window.scrollTo(0, 0);
    topRef.current?.scrollIntoView({ behavior: "smooth" }); // 2. Use scrollIntoView
  }, []);

  return (
    <>
      <Helmet>
        <title>Legal — N0DE Terms, Policies & Notices</title>

        <meta
          name="description"
          content="Read N0DE’s legal terms, policies and notices, including privacy, fair use, DMCA, and user agreements."
        />

        <link rel="canonical" href="https://n0de.gg/legal" />

        <meta
          property="og:title"
          content="Legal — N0DE Terms, Policies & Notices"
        />
        <meta
          property="og:description"
          content="Review N0DE’s legal pages including terms of service, privacy policy, and other legal notices."
        />
        <meta property="og:url" content="https://n0de.gg/legal" />
        <meta property="og:type" content="website" />
      </Helmet>
      <style>{hoverStyle}</style>
      <div className="min-vh-100 bg-dark d-flex flex-column" ref={topRef}>
        <HeaderOne />
        <div className="flex-grow-1 pt-5">
          <div className="container py-4 mt-5">
            <div className="row g-4 mt-3">
              {/* Left Sidebar - Reduced width */}
              <div className="col-12 col-lg-2 ps-0">
                <div
                  className="bg-dark-gradient p-3 rounded-3 h-100"
                  style={{ marginLeft: "-15px", width: "calc(100% + 15px)" }}
                >
                  <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                      <NavLink
                        to="/legal/standard-terms"
                        className={({ isActive }) =>
                          `nav-link nav-link-hover ${
                            isActive ||
                            window.location.pathname === "/legal" ||
                            window.location.pathname === "/legal/"
                              ? "text-primary fw-bold"
                              : "text-light"
                          }`
                        }
                        end
                      >
                        Standard Terms
                      </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                      <NavLink
                        to="/legal/privacy-policy"
                        className={({ isActive }) =>
                          `nav-link nav-link-hover ${isActive ? "text-primary fw-bold" : "text-light"}`
                        }
                      >
                        Privacy Policy
                      </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                      <NavLink
                        to="/legal/fair-use-policy"
                        className={({ isActive }) =>
                          `nav-link nav-link-hover ${isActive ? "text-primary fw-bold" : "text-light"}`
                        }
                      >
                        Fair Use Policy
                      </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                      <NavLink
                        to="/legal/end-user-policy"
                        className={({ isActive }) =>
                          `nav-link nav-link-hover ${isActive ? "text-primary fw-bold" : "text-light"}`
                        }
                      >
                        End User Policy
                      </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                      <NavLink
                        to="/legal/dmca-policy"
                        className={({ isActive }) =>
                          `nav-link nav-link-hover ${isActive ? "text-primary fw-bold" : "text-light"}`
                        }
                      >
                        DMCA Policy
                      </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                      <NavLink
                        to="/legal/software-license"
                        className={({ isActive }) =>
                          `nav-link nav-link-hover ${isActive ? "text-primary fw-bold" : "text-light"}`
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
