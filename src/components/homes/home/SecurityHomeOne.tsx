const SecurityHomeOne = () => {
  return (
    <>
      <div className="section-space-md-y">
        <div className="container">
          <div className="row g-4 justify-content-xxl-between align-items-center">
            <div className="col-lg-6">
              <div
                className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
                data-cue="fadeIn"
              >
                <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                <span className="d-block fw-medium text-light fs-20">Security</span>
              </div>
              <h2 className="text-light" data-cue="fadeIn">
                Security you can trust
              </h2>
              <p className="text-light mb-8 max-text-11" data-cue="fadeIn">
                We protect your data and traffic with industry-standard practices across our platform and devices. From encrypted connections to strict access controls, security is built in by design.
              </p>
              <ul className="list gap-6" data-cues="fadeIn">
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-shield-check"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    TLS 1.2+ encryption in transit and encryption at rest for stored data
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-lock"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    Least‑privilege access, audit logging, and regular security updates
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-shield-lock"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    OAuth 2.0 authentication and secure session management
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-check2-circle"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    GDPR-aligned data handling and user control over personal data
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="bg-dark-gradient p-6 p-xl-8 rounded-5" data-cue="fadeIn">
                <div className="row g-4">
                  <div className="col-sm-6">
                    <div className="border border-light border-opacity-10 rounded-4 p-4 h-100">
                      <h6 className="text-light mb-1">Transport</h6>
                      <p className="mb-0 text-light-75">TLS 1.2+ with strong ciphers</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-light border-opacity-10 rounded-4 p-4 h-100">
                      <h6 className="text-light mb-1">Access</h6>
                      <p className="mb-0 text-light-75">RBAC and least‑privilege</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-light border-opacity-10 rounded-4 p-4 h-100">
                      <h6 className="text-light mb-1">Privacy</h6>
                      <p className="mb-0 text-light-75">GDPR‑aligned policies</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-light border-opacity-10 rounded-4 p-4 h-100">
                      <h6 className="text-light mb-1">Auth</h6>
                      <p className="mb-0 text-light-75">OAuth 2.0, secure sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityHomeOne;
