import { useState } from "react";

const AppAreaHomeOne = () => {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (idx: number) => setActive((p) => (p === idx ? null : idx));

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
                <div className="text-light mt-3 max-text-11" data-cue="fadeIn">
                  <p>
                    As well as dominating in-game, content creators use N0DE to unlock peak broadcasting performance, across multiple concurrent streams
                  </p>
                  <p>
                    N0DE users simultaneously game and stream in ultra-low latency environments without performance drops
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 creator-focused features */}
        <div className="container">
          <div className="row g-4" data-cues="fadeIn">
            {/* Stream Stability */}
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="process-card rounded-5 p-6 p-xl-8 position-relative">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-broadcast"></i>
                </span>
                <h5 className="text-light mb-12">Stream Stability</h5>
                <button
                  type="button"
                  onClick={() => toggle(0)}
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block">Learn more </span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </button>
                {active === 0 && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center text-center p-4" style={{ background: "linear-gradient(135deg, rgba(5,150,241,0.95), rgba(0,0,0,0.85))" }}>
                    <h6 className="text-white mb-2">Stream Stability</h6>
                    <p className="mb-0 text-white">xxxx</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ultra Low Latency */}
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="process-card rounded-5 p-6 p-xl-8 position-relative">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-speedometer2"></i>
                </span>
                <h5 className="text-light mb-12">Ultra Low Latency</h5>
                <button
                  type="button"
                  onClick={() => toggle(1)}
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block">Learn more </span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </button>
                {active === 1 && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center text-center p-4" style={{ background: "linear-gradient(135deg, rgba(5,150,241,0.95), rgba(0,0,0,0.85))" }}>
                    <h6 className="text-white mb-2">Ultra Low Latency</h6>
                    <p className="mb-0 text-white">xxxx</p>
                  </div>
                )}
              </div>
            </div>

            {/* Creator Uploads */}
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="process-card rounded-5 p-6 p-xl-8 position-relative">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  <i className="bi bi-cloud-arrow-up"></i>
                </span>
                <h5 className="text-light mb-12">Faster Uploads</h5>
                <button
                  type="button"
                  onClick={() => toggle(2)}
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block">Learn more </span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </button>
                {active === 2 && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center text-center p-4" style={{ background: "linear-gradient(135deg, rgba(5,150,241,0.95), rgba(0,0,0,0.85))" }}>
                    <h6 className="text-white mb-2">Faster Uploads</h6>
                    <p className="mb-0 text-white">xxxx</p>
                  </div>
                )}
              </div>
            </div>

            {/* Network Ready */}
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="process-card rounded-5 p-6 p-xl-8 position-relative">
                <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                  {/* Closest to a router: ethernet or wifi */}
                  <i className="bi bi-ethernet"></i>
                </span>
                <h5 className="text-light mb-12">Network Ready</h5>
                <button
                  type="button"
                  onClick={() => toggle(3)}
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block">Learn more </span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </button>
                {active === 3 && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center text-center p-4" style={{ background: "linear-gradient(135deg, rgba(5,150,241,0.95), rgba(0,0,0,0.85))" }}>
                    <h6 className="text-white mb-2">Network Ready</h6>
                    <p className="mb-0 text-white">xxxx</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="section-space-sm-top" data-cue="fadeIn">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <a
                  href="/service"
                  className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                >
                  <span className="d-inline-block">AI Powered Apps </span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppAreaHomeOne;
