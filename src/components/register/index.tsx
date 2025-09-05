import Icon from '../AppIcon';
import Header from '../ui/Header';
import RegistrationForm from './components/RegistrationForm';

const Register = () => {
  return (
    <div className="bg-dark">
      <Header />

      {/* Main Content */}
      <main className="section-space-y">
        <div className="container">
          <div className="row g-4 align-items-center">
            {/* Left Side - Marketing Content */}
            <div className="col-lg-6 d-none d-lg-block">
              <div className="mb-8">
                <h2 className="text-light mb-4 fs-1 fw-bold">
                  Take Control of Your Gaming Experience
                </h2>
                <p className="text-light-50 fs-5 mb-0">
                  Join thousands of gamers who trust N0DE to enhance their gaming journey, 
                  track achievements, and never miss a gaming opportunity.
                </p>
              </div>

              <div className="mb-8">
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-primary-gradient bg-opacity-20 rounded-3" style={{ width: '40px', height: '40px' }}>
                    <Icon name="Shield" size={20} className="text-primary-light" />
                  </div>
                  <div>
                    <h3 className="text-light fw-semibold mb-2">Advanced Security</h3>
                    <p className="text-light-50 mb-0">
                      Your gaming data is protected with industry-standard encryption
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-accent-gradient bg-opacity-20 rounded-3" style={{ width: '40px', height: '40px' }}>
                    <Icon name="Bell" size={20} className="text-accent-light" />
                  </div>
                  <div>
                    <h3 className="text-light fw-semibold mb-2">Creator‑grade Performance</h3>
                    <p className="text-light-50 mb-0">Game, stream, and create simultaneously — zero compromise, zero lag.</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-warning-gradient bg-opacity-20 rounded-3" style={{ width: '40px', height: '40px' }}>
                    <Icon name="BarChart3" size={20} className="text-warning-light" />
                  </div>
                  <div>
                    <h3 className="text-light fw-semibold mb-2">Performance Analytics</h3>
                    <p className="text-light-50 mb-0">
                      Track your gaming progress and optimize your performance
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-dark bg-opacity-50 rounded-4 p-4 backdrop-blur">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary" style={{ width: '12px', height: '12px' }}></div>
                    <div className="rounded-circle bg-success ms-1" style={{ width: '12px', height: '12px' }}></div>
                    <div className="rounded-circle bg-warning ms-1" style={{ width: '12px', height: '12px' }}></div>
                  </div>
                  <div className="text-light fw-medium">
                    Join 50,000+ happy users
                  </div>
                </div>
                <p className="text-light-50 fs-6 mb-2">
                  "N0DE has completely transformed my gaming experience. The analytics and community features are game-changing!"
                </p>
                <div className="text-light-50 fs-7">
                  — Alex K., Pro Gamer
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="col-lg-6">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 mt-auto">
        <div className="container">
          <div className="text-center">
            <div className="text-light-50 fs-7">
              © {new Date().getFullYear()} N0DE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;
