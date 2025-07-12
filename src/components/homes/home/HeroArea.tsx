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
                      The Ultimate Gaming Network
                    </span>
                  </div>
                  <h1 className="text-light" data-cue="fadeIn">
                    {" "}
                    <span className="text-gradient-primary">GOOD GAME</span>
                  </h1>
                  <p className="text-light mb-8 max-text-11" data-cue="fadeIn">
                    <span>
                      <div>
                        <span style={{ color: "#f8eeee" }}>
                          Triple-tier network for zero-lag gaming
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "#f8eeee" }}>
                          <br />
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "#f8eeee" }}>
                          Smart traffic steering and dynamic failover keep your
                          connection rock-solid
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "#f8eeee" }}>
                          <br />
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "#f8eeee" }}>
                          Effortless setup. Instant speed. Competitive
                          edge—guaranteed
                        </span>
                      </div>
                    </span>
                  </p>
                  <div
                    className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-6"
                    data-cue="fadeIn"
                  >
                    <Link
                      to="/contact"
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
                    <span className="d-inline-block text-light">
                      <span
                        style={{
                          fontSize: "10pt",
                          fontFamily: "Arial, sans-serif, serif, EmojiFont",
                          color: "rgb(255, 255, 255)",
                        }}
                      >
                        7-day trial on N0DE Lite
                      </span>
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
                    Cut latency and jitter
                    <span className="text-gradient-primary"> 80% </span>
                    and speed up downloads by upto
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
