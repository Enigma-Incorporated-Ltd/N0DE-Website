import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ForgotPasswordForm from './components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Forgot Password - N0de</title>
        <meta name="description" content="Reset your N0de account password. Enter your email address to receive password reset instructions." />
        <meta name="keywords" content="forgot password, reset password, password recovery, account recovery" />
      </Helmet>

      <div className="min-vh-100 bg-dark">
        <Header />
        
        <main className="flex-fill section-space-md-y">
          {/* Hero Section with Forgot Password Form */}
          <section className="py-5">
            <div className="container">
              <div className="row g-5 align-items-center">
                {/* Left Column - Forgot Password Form */}
                <div className="col-12 col-lg-6 order-2 order-lg-1">
                  <ForgotPasswordForm />
                </div>

                {/* Right Column - Recovery Content */}
                <div className="col-12 col-lg-6 order-1 order-lg-2 text-center text-lg-start">
                  <div className="mx-auto mx-lg-0" style={{ maxWidth: '32rem' }}>
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-4" data-cue="fadeIn">
                      <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                      <span className="d-block fw-medium text-light fs-20">Account Recovery</span>
                    </div>
                    <h1 className="text-light mb-4" data-cue="fadeIn">
                      Reset Your
                      <span className="text-gradient-primary d-block">Password</span>
                    </h1>
                    <p className="text-light text-opacity-75 mb-8" data-cue="fadeIn">
                      Don't worry, it happens to the best of us. Enter your email address and we'll send you a link to reset your password.
                    </p>
                    
                    {/* Recovery Process Steps */}
                    <div className="mb-8" data-cue="fadeIn">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2rem', height: '2rem' }}>
                          <span className="text-light fw-bold small">1</span>
                        </div>
                        <span className="text-light">Enter your email address</span>
                      </div>
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2rem', height: '2rem' }}>
                          <span className="text-light fw-bold small">2</span>
                        </div>
                        <span className="text-light">Check your inbox for reset link</span>
                      </div>
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2rem', height: '2rem' }}>
                          <span className="text-light fw-bold small">3</span>
                        </div>
                        <span className="text-light">Create your new password</span>
                      </div>
                    </div>

                    {/* Recovery Stats */}
                    <div className="bg-dark-gradient p-6 rounded-5" data-cue="fadeIn">
                      <div className="row g-4">
                        <div className="col-4">
                          <div className="h2 fw-bold text-gradient-primary mb-2">
                            <span className="fs-1">2</span>
                            <span className="fs-4">min</span>
                          </div>
                          <div className="text-light text-opacity-75 small">Average Reset Time</div>
                        </div>
                        <div className="col-4">
                          <div className="h2 fw-bold text-gradient-primary mb-2">
                            <span className="fs-1">24</span>
                            <span className="fs-4">hrs</span>
                          </div>
                          <div className="text-light text-opacity-75 small">Link Valid For</div>
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

export default ForgotPasswordPage; 