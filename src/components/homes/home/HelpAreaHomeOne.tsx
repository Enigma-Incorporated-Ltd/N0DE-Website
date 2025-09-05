import { Link } from "react-router-dom";

const HelpAreaHomeOne = () => {
  return (
    <>
      <div className="section-space-md-y">
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8">
                <div
                  className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
                  data-cue="fadeIn"
                >
                  <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                  <span className="d-block fw-medium text-light fs-20">
                    The N0DE Tech: under the hood
                  </span>
                </div>
                <h2 className="text-light" data-cue="fadeIn">
                  Unleash the Full Power of your Connection
                </h2>
                <p className="text-light mb-0 max-text-11" data-cue="fadeIn">
                  N0DE harnesses next-generation SD-WAN technology to deliver ultra-low latency, purpose-built for elite gaming performance
                  It enhances your existing internet connection through AI-driven traffic optimization, intelligent Quality ofService (QoS) management, and high-speed, secure file transfer—ensuring peak performance in every application
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row g-4" data-cues="fadeIn">
            <div className="col-md-6">
              <div className="process-card rounded-5 p-6 p-xl-10">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-laptop"></i>
                </span>
                <h5 className="text-light process-card__title">
                  Software Deployment - "Lite"
                </h5>
                <p className="mb-8">
                  N0DE Lite is currently available on Windows PC, with dramatic ‘last mile’ improvements experienced on that device. Mobile and console versions are coming online soon…
                </p>
                <Link
                  to="#choose-your-level"
                  onClick={(e) => { e.preventDefault(); const el = document.getElementById('choose-your-level'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block" style={{ cursor: "pointer", pointerEvents: "auto" }}>See Plans </span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="process-card rounded-5 p-6 p-xl-10">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-ethernet"></i>
                </span>
                <h5 className="text-light process-card__title">Hardware Deployment – "Pro" and "MAX"</h5>
                <p className="mb-8">
                  Both N0DE Pro and N0DE MAX include an Enigma-accelerated CPE device that connects directly to your existing router. This integration ensures that all network traffic is optimized by the N0DE network (whether for gaming, broadcasting, streaming, or business apps) — delivering enhanced total performance, not just on one device.
                </p>
                <Link
                  to="#choose-your-level"
                  onClick={(e) => { e.preventDefault(); const el = document.getElementById('choose-your-level'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block" style={{ cursor: "pointer", pointerEvents: "auto" }}>See Plans </span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="section-space-sm-top" data-cue="fadeIn">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center mb-3 text-gradient-primary display-4">What more can N0DE do?</h2>
                <div className="text-center"><p className="text-light text-opacity-75">Explore more benefits</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpAreaHomeOne;
