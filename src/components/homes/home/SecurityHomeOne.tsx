import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SecurityHomeOne = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // const toggleCard = (index: number) => {
  //   setActiveIndex((prev) => (prev === index ? null : index));
  // };

  const features = [
    {
      title: "Threat Intelligence",
      desc: "Real‑time feeds + behavioural analytics + inline malware filtering",
    },
    {
      title: "Encryption & Obfuscation",
      desc: "AES‑256‑GCM, perfect forward secrecy, and stealth traffic shaping",
    },
    {
      title: "Access Control",
      desc: "Zero‑trust, posture checks, least‑privilege enforcement, and MFA",
    },
    {
      title: "Privacy by Design",
      desc: "No user logs, GDPR‑aligned policies, and full user data control",
    },
  ];

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
                <span className="d-block fw-medium text-light fs-20">
                  Stealth‑Level Security & Privacy
                </span>
              </div>
              <h2 className="text-light" data-cue="fadeIn">
                Data handling you can trust
              </h2>
              <p className="text-light mb-4 max-text-11" data-cue="fadeIn">
                With enterprise SD‑WAN technology at the core of N0DE’s network,
                all data is protected with full‑spectrum encryption, zero‑trust
                automation, and AI‑powered threat detection — all whilst
                improving performance.
              </p>
              <p className="text-light mb-6 max-text-11" data-cue="fadeIn">
                From gamers to global teams, N0DE ensures your traffic stays
                secure, private, and invisible.
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
                    Out‑of‑Band Resilience — maintains performance even under
                    network attack
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-lock"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    Automated Security Posture Validation — block non‑compliant
                    devices instantly
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-activity"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    Self‑Healing Security Layer — detects and remediates
                    anomalies in real time
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-shield-lock"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    Always‑On DPI Firewall — no manual toggling or user
                    intervention required
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: 2x2 feature cards */}
            <div className="col-lg-6">
              <div
                className="bg-dark-gradient p-6 p-xl-8 rounded-5"
                data-cue="fadeIn"
              >
                <div className="row g-4">
                  {features.map((f, idx) => (
                    <div key={f.title} className="col-sm-6">
                      <div
                        className="border border-light border-opacity-10 rounded-4 p-4 h-100 position-relative"
                        // onClick={() => toggleCard(idx)}
                      >
                        <h6 className="text-light mb-1">{f.title}</h6>
                        <p className="mb-0 text-light-75">{f.desc}</p>

                        {activeIndex === idx && (
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center text-center p-4"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(5,150,241,0.95), rgba(0,0,0,0.85))",
                            }}
                          >
                            <h6 className="text-white mb-2">{f.title}</h6>
                            <p className="mb-0 text-white">{f.desc}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 text-center" data-cue="fadeIn">
                  <Link
                    className="text-light text-opacity-75 h5 cursor-pointer"
                    to={"/legal"}
                  >
                    Privacy Policy
                  </Link>
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
