import { Link } from "react-router-dom";

const AppAreaHomeOne = () => {
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
                    Built for Streamers and Content Creators
                  </span>
                  </div>
                  <h2 className="mb-0 text-light" data-cue="fadeIn">
                    Boosts streaming and cloud based services
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* 4 creator-focused features */}
          <div className="container">
            <div className="row g-4" data-cues="fadeIn">
              {/* Stream Stability */}
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="process-card rounded-5 p-6 p-xl-8">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-broadcast"></i>
                </span>
                  <h5 className="text-light mb-12">Stream Stability</h5>
                  <Link
                      to="/service-details#stability"
                      className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                  >
                    <span className="d-inline-block">Learn more </span>
                    <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                  </Link>
                </div>
              </div>

              {/* Ultra Low Latency */}
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="process-card rounded-5 p-6 p-xl-8">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-speedometer2"></i>
                </span>
                  <h5 className="text-light mb-12">Ultra Low Latency</h5>
                  <Link
                      to="/service-details#latency"
                      className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                  >
                    <span className="d-inline-block">Learn more </span>
                    <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                  </Link>
                </div>
              </div>

              {/* Creator Uploads */}
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="process-card rounded-5 p-6 p-xl-8">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-cloud-arrow-up"></i>
                </span>
                  <h5 className="text-light mb-12">Faster Uploads</h5>
                  <Link
                      to="/service-details#uploads"
                      className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                  >
                    <span className="d-inline-block">Learn more </span>
                    <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                  </Link>
                </div>
              </div>

              {/* Network Ready */}
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="process-card rounded-5 p-6 p-xl-8">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  {/* Closest to a router: ethernet or wifi */}
                  <i className="bi bi-ethernet"></i>
                </span>
                  <h5 className="text-light mb-12">Network Ready</h5>
                  <Link
                      to="/service-details#networking"
                      className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                  >
                    <span className="d-inline-block">Learn more </span>
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
                <div className="col-12 text-center">
                  <Link
                      to="/service"
                      className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                  >
                    <span className="d-inline-block">AI Powered Apps </span>
                    <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default AppAreaHomeOne;
