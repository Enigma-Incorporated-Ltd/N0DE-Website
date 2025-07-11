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
                    <h6>The N0DE Tech</h6>
                    <h3></h3>
                    <h6></h6>
                    <p></p>
                  </span>
                </div>
                <h2 className="text-light" data-cue="fadeIn">
                  Unleash the Full Power of Your Connection
                </h2>
                <p className="text-light mb-0 max-text-11" data-cue="fadeIn">
                  <div>
                    N0DE harnesses next-generation SD-WAN technology to deliver
                    ultra-low latency, purpose-built for elite gaming
                    performance
                  </div>
                  <div>
                    <br />
                  </div>
                  <div>
                    It enhances your existing internet connection through
                    AI-driven traffic optimization, intelligent Quality of
                    Service (QoS) management, and high-speed, secure file
                    transfer—ensuring peak performance in every application
                  </div>
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
                  <i className="bi bi-robot"></i>
                </span>
                <h5 className="text-light process-card__title">
                  Virtual Assistants
                </h5>
                <p className="mb-8">
                  There are many variations of passage available, but the
                  majority have suffered words which don't look even slightly
                  believable.
                </p>
                <Link
                  to="/contact"
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block">Get Answer </span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="process-card rounded-5 p-6 p-xl-10">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-headset"></i>
                </span>
                <h5 className="text-light process-card__title">Live Chat</h5>
                <p className="mb-8">
                  There are many variations of passage available, but the
                  majority have suffered{" "}
                  <span style={{ fontFamily: "Montserrat, sans-serif" }}>
                    words{" "}
                  </span>
                  which don't look even slightly believable.
                </p>
                <Link
                  to="/contact"
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block">Get Answer </span>
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
                <h6 className="text-center mb-0 text-light">
                  What&nbsp; more can&nbsp; N0DE do.{" "}
                  <span className="text-gradient-primary">
                    Explore More Service !
                  </span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpAreaHomeOne;
