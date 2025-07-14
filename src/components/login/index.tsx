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
        <title>Sign In - SubscriptionFlow</title>
        <meta name="description" content="Sign in to your SubscriptionFlow account to manage your subscriptions, billing, and account settings." />
        <meta name="keywords" content="login, sign in, subscription management, billing, account access" />
      </Helmet>

      <div className="min-vh-100 bg-light">
        <Header />
        
        <main className="flex-fill">
          {/* Hero Section with Login Form */}
          <section className="py-5">
            <div className="container-fluid px-4">
              <div className="row g-5 align-items-center">
                {/* Left Column - Login Form */}
                <div className="col-12 col-lg-6 order-2 order-lg-1">
                  <LoginForm />
                </div>

                {/* Right Column - Welcome Content */}
                <div className="col-12 col-lg-6 order-1 order-lg-2 text-center text-lg-start">
                  <div className="mx-auto mx-lg-0" style={{ maxWidth: '32rem' }}>
                    <h1 className="display-4 fw-bold text-dark mb-4">
                      Welcome Back to
                      <span className="text-primary d-block">SubscriptionFlow</span>
                    </h1>
                    <p className="lead text-muted mb-4">
                      Manage your subscriptions, track your billing, and access your dashboard with ease. Your subscription management made simple.
                    </p>
                    
                    {/* Feature Highlights */}
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '1.5rem', height: '1.5rem' }}>
                          <div className="bg-white rounded-circle" style={{ width: '0.5rem', height: '0.5rem' }}></div>
                        </div>
                        <span className="text-dark">Real-time subscription tracking</span>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '1.5rem', height: '1.5rem' }}>
                          <div className="bg-white rounded-circle" style={{ width: '0.5rem', height: '0.5rem' }}></div>
                        </div>
                        <span className="text-dark">Automated billing management</span>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '1.5rem', height: '1.5rem' }}>
                          <div className="bg-white rounded-circle" style={{ width: '0.5rem', height: '0.5rem' }}></div>
                        </div>
                        <span className="text-dark">24/7 customer support</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="row g-3 text-center">
                      <div className="col-4">
                        <div className="h2 fw-bold text-primary">10K+</div>
                        <div className="small text-muted">Active Users</div>
                      </div>
                      <div className="col-4">
                        <div className="h2 fw-bold text-primary">99.9%</div>
                        <div className="small text-muted">Uptime</div>
                      </div>
                      <div className="col-4">
                        <div className="h2 fw-bold text-primary">24/7</div>
                        <div className="small text-muted">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Help Section */}
          <section className="py-4 bg-secondary bg-opacity-10">
            <div className="container-fluid px-4">
              <HelpSection />
            </div>
          </section>

          {/* Security Badges */}
          <section className="py-5">
            <div className="container-fluid px-4">
              <SecurityBadges />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white border-top py-4">
          <div className="container-fluid px-4">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded d-flex align-items-center justify-content-center me-2" style={{ width: '1.5rem', height: '1.5rem' }}>
                    <div className="bg-white rounded" style={{ width: '0.75rem', height: '0.75rem' }}></div>
                  </div>
                  <span className="text-dark fw-medium">SubscriptionFlow</span>
                </div>
              </div>
              
              <div className="col-12 col-md-6 text-center text-md-end">
                <p className="small text-muted mb-2">&copy; {new Date().getFullYear()} SubscriptionFlow. All rights reserved.</p>
                <div className="d-flex justify-content-center justify-content-md-end">
                  <a href="#" className="text-muted text-decoration-none me-3 small">Privacy Policy</a>
                  <a href="#" className="text-muted text-decoration-none me-3 small">Terms of Service</a>
                  <a href="#" className="text-muted text-decoration-none small">Cookie Policy</a>
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