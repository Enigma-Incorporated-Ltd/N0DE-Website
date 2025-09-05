import { Link } from "react-router-dom";

const HeroArea = () => {
  return (
    <>
      <div className="hero-1--container">
        <div className="hero-1">
          <div className="section-space-y">
            <div className="container">
              <div className="row g-4 align-items-center">
                <div className="col-lg-7 col-xl-6">
                  <div
                    className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
                    data-cue="fadeIn"
                  >
                    <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                    <span className="d-block fw-medium text-light fs-20">
                      N0DE: The Ultimate Gaming Network
                    </span>
                  </div>
                  <h1 className="text-light" data-cue="fadeIn">
                    {" "}
                    <span className="text-gradient-primary">GOOD GAME</span>
                  </h1>
                  <div className="text-light mb-8 max-text-11" data-cue="fadeIn">
                    <div className="d-flex align-items-start gap-3 mb-2">
                      <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                        <i className="bi bi-arrow-up-right"></i>
                      </span>
                      <p className="mb-0">Triple-tier network for zero-lag gaming</p>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-2">
                      <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                        <i className="bi bi-arrow-up-right"></i>
                      </span>
                      <p className="mb-0">Smart traffic steering and dynamic failover</p>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-2">
                      <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                        <i className="bi bi-arrow-up-right"></i>
                      </span>
                      <p className="mb-0">Keep your connection rock-solid</p>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-2">
                      <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                        <i className="bi bi-arrow-up-right"></i>
                      </span>
                      <p className="mb-0">Effortless setup. Instant speed</p>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                        <i className="bi bi-arrow-up-right"></i>
                      </span>
                      <p className="mb-0">Competitive edge — guaranteed</p>
                    </div>
                  </div>
                  <div
                    className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-6"
                    data-cue="fadeIn"
                  >
                    <Link
                      to="https://github.com/Enigma-Incorporated-Ltd/EnigmaNet-N0DE-Binaries/releases/download/v1.0.7/N0DE-Setup-1.0.7.exe"
                      className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                    >
                      <span
                        className="d-inline-block"
                        style={{ font: "d-inline-block" }}
                      >
                        <span style={{ color: "rgb(0, 0, 0)" }}>
                          Try N0DE Lite for free
                        </span>
                      </span>
                      <span className="d-inline-block">
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                    <span className="d-inline-block text-light" style={{ marginRight: "auto" }}>
                      with our 7-day free trial
                    </span>
                  </div>
                </div>
                <div className="col-lg-5 col-xl-6">
                  <img
                    src="assets/img/hero-img-1.png"
                    alt="image"
                    className="img-fluid"
                    data-cue="fadeIn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-space-md-y">
          <div className="section-space-sm-bottom">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h3 className="mb-0 text-light text-center" data-cue="fadeIn">
                    N0DE cuts latency and jitter by
                    <span className="text-gradient-primary"> 80% </span>
                    and accelerates downloads up to
                    <span className="text-gradient-primary"> 64x </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul
                  className="list list-row flex-wrap justify-content-center align-items-center row-gap-2 column-gap-8 column-gap-xl-12 column-gap-xxl-15"
                  data-cues="fadeIn"
                  data-group="images"
                >
                  <li className="text-center"></li>
                  <li className="text-center"></li>
                  <li className="text-center">
                    <div
                      style={{
                        position: "relative",
                        height: "auto",
                        marginBottom: "20px",
                        color: "rgba(255, 255, 255, 1)",
                        font: "700 32px Montserrat, sans-serif",
                      }}
                    >
                      Working with
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F764c63db9dbb47d1ac9fe25913e14ec5%2F5514675ad278454c9298713388f30922"
                      alt="image"
                      className="img-fluid"
                      style={{ maxWidth: "25%" }}
                    />
                  </li>
                  <li className="text-center"></li>
                  <li className="text-center"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroArea;
