import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import HelpSection from './components/HelpSection';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - N0de</title>
        <meta name="description" content="Sign in to your N0de account to manage your subscriptions, billing, and account settings." />
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
                    <h1 className="text-light mb-4" data-cue="fadeIn">
                      Sign in to
                      <span className="text-gradient-primary d-block">N0de</span>
                    </h1>
                    <p className="text-light text-opacity-75 mb-8" data-cue="fadeIn">
                      Manage your subscriptions, track your billing, and access your dashboard with ease. Your subscription management made simple.
                    </p>
                    
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

          {/* Help Section */}
          {/* <section className="section-space-md-y bg-dark-gradient">
            <div className="container">
              <HelpSection />
            </div>
          </section> */}

          {/* Security Badges */}
          <section className="section-space-md-y">
            <div className="container">
              <SecurityBadges />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-dark-gradient border-top border-light border-opacity-10 py-8">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 mb-4 mb-md-0">
                <div className="d-flex align-items-center">
                  <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="bi bi-lightning-charge-fill text-light fs-18"></i>
                  </div>
                  <span className="text-light fw-medium fs-20">N0de</span>
                </div>
              </div>
              
              <div className="col-12 col-md-6 text-center text-md-end">
                <p className="text-light text-opacity-75 mb-4">&copy; {new Date().getFullYear()} N0de. All rights reserved.</p>
                <div className="d-flex justify-content-center justify-content-md-end gap-4">
                  <a href="#" className="text-light text-opacity-75 text-decoration-none hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="text-light text-opacity-75 text-decoration-none hover:text-primary transition-colors">Terms of Service</a>
                  <a href="#" className="text-light text-opacity-75 text-decoration-none hover:text-primary transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;