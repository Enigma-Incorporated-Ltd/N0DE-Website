import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
//import SecurityBadges from './components/SecurityBadges';
//import HelpSection from './components/HelpSection';
import FooterOne from '../../layouts/footers/FooterOne';

const LoginPage = () => {
  // Scroll to the top of the page when the login page loads to ensure correct scroll position after navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Sign In - N0DE</title>
        <meta name="description" content="Loadout synced. Resume your campaign — manage your N0DE subscription, billing, and account settings." />
        <meta name="keywords" content="login, sign in, subscription management, billing, account access" />
      </Helmet>

      <div className="min-vh-100 bg-dark">
        <Header />
        
        <main className="flex-fill section-space-md-y">
          {/* Hero Section with Login Form */}
          <section className="py-5">
            <div className="container">
              <div className="row g-5 align-items-center">
                {/* Left Column - Login Form */}
                <div className="col-12 col-lg-6 order-2 order-lg-1">
                  <LoginForm />
                </div>

                {/* Right Column - Welcome Content */}
                <div className="col-12 col-lg-6 order-1 order-lg-2 text-center text-lg-start">
                  <div className="mx-auto mx-lg-0" style={{ maxWidth: '32rem' }}>
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-4" data-cue="fadeIn">
                      <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                      <span className="d-block fw-medium text-light fs-20">Welcome Back</span>
                    </div>
                    <h1 className="text-light mb-4" data-cue="fadeIn">Loadout synced</h1>
                    <p className="text-light text-opacity-75 mb-8" data-cue="fadeIn">Resume your campaign — manage plans, track billing, and jump back into peak performance with N0DE.</p>
                    
                    {/* Feature Highlights */}
                    <div className="mb-8" data-cue="fadeIn">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2rem', height: '2rem' }}>
                          <i className="bi bi-shield-check text-light"></i>
                        </div>
                        <span className="text-light">Real-time subscription tracking</span>
                      </div>
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2rem', height: '2rem' }}>
                          <i className="bi bi-credit-card text-light"></i>
                        </div>
                        <span className="text-light">Automated billing management</span>
                      </div>
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2rem', height: '2rem' }}>
                          <i className="bi bi-headset text-light"></i>
                        </div>
                        <span className="text-light">24/7 customer support</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-dark-gradient p-6 rounded-5" data-cue="fadeIn">
                      <div className="row g-4">
                        <div className="col-4">
                          <div className="h2 fw-bold text-gradient-primary mb-2">10K+</div>
                          <div className="text-light text-opacity-75 small">Active Users</div>
                        </div>
                        <div className="col-4">
                          <div className="h2 fw-bold text-gradient-primary mb-2">
                            <span className="fs-1">99.9</span>
                            <span className="fs-4">%</span>
                          </div>
                          <div className="text-light text-opacity-75 small">Uptime</div>
                        </div>
                        <div className="col-4">
                          <div className="h2 fw-bold text-gradient-primary mb-2">
                            <span className="fs-1">24</span>
                            <span className="fs-4">/7</span>
                          </div>
                          <div className="text-light text-opacity-75 small">Support</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        

          {/* Security Badges */}
          <section className="section-space-md-y">
            <div className="container">
              {/*<SecurityBadges />*/}
            </div>
          </section>
        </main>

        {/* Footer */}
        <FooterOne />
      </div>
    </>
  );
};

export default LoginPage;
