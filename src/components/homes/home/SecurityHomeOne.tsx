const SecurityHomeOne = () => {
  return (
    <>
      <div className="section-space-md-y">
        <div className="container">
          <div className="row g-4 justify-content-xxl-between align-items-center">
            {/* Left: Copy + bullets */}
            <div className="col-lg-6">
              <div
                className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
                data-cue="fadeIn"
              >
                <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                <span className="d-block fw-medium text-light fs-20">Stealth‑Level Security & Privacy</span>
              </div>
              <h2 className="text-light" data-cue="fadeIn">
                Data handling you can trust
              </h2>
              <p className="text-light mb-4 max-text-11" data-cue="fadeIn">
                With enterprise SD‑WAN technology at the core of N0DE’s network, all data is protected with full‑spectrum encryption, zero‑trust automation, and AI‑powered threat detection — all whilst improving performance.
              </p>
              <p className="text-light mb-6 max-text-11" data-cue="fadeIn">
                From gamers to global teams, N0DE ensures your traffic stays secure, private, and invisible.
              </p>

              <h2 className="h5 text-light mb-3" data-cue="fadeIn">
                Why Security‑Critical Users Trust N0DE:
              </h2>

              <ul className="list gap-6" data-cues="fadeIn">
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-shield-check"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    Out‑of‑Band Resilience — maintains performance even under network attack
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-lock"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    Automated Security Posture Validation — block non‑compliant devices instantly
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-activity"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    Self‑Healing Security Layer — detects and remediates anomalies in real time
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-shield-lock"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    Always‑On DPI Firewall — no manual toggling or user intervention required
                  </span>
                </li>
              </ul>

            </div>

            {/* Right: 2x2 feature cards */}
            <div className="col-lg-6">
              <div className="bg-dark-gradient p-6 p-xl-8 rounded-5" data-cue="fadeIn">
                <div className="row g-4">
                  <div className="col-sm-6">
                    <div className="border border-light border-opacity-10 rounded-4 p-4 h-100">
                      <h6 className="text-light mb-1">Threat Intelligence</h6>
                      <p className="mb-0 text-light-75">Real‑time feeds + behavioural analytics + inline malware filtering</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-light border-opacity-10 rounded-4 p-4 h-100">
                      <h6 className="text-light mb-1">Encryption & Obfuscation</h6>
                      <p className="mb-0 text-light-75">AES‑256‑GCM, perfect forward secrecy, and stealth traffic shaping</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-light border-opacity-10 rounded-4 p-4 h-100">
                      <h6 className="text-light mb-1">Access Control</h6>
                      <p className="mb-0 text-light-75">Zero‑trust, posture checks, least‑privilege enforcement, and MFA</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-light border-opacity-10 rounded-4 p-4 h-100">
                      <h6 className="text-light mb-1">Privacy by Design</h6>
                      <p className="mb-0 text-light-75">No user logs, GDPR‑aligned policies, and full user data control</p>
                    </div>
              </div>
              <div className="mt-3" data-cue="fadeIn">
                <span className="text-light text-opacity-75">[LINK TO PRIVACY POLICY ETC]</span>
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
