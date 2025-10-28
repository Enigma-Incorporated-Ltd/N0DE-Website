const AboutAreaHomeOne = () => {
  return (
    <>
      <div className="section-space-md-y">
        <div className="container">
          <div className="row g-4 justify-content-xxl-between align-items-center">
            <div className="col-lg-6 col-xxl-5">
              <img
                src="assets/img/about-img-1.png"
                alt="image"
                className="img-fluid"
                data-cue="slideInUp"
              />
            </div>
            <div className="col-lg-6">
              <div
                className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
                data-cue="fadeIn"
              >
                <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                <span className="d-block fw-medium text-light fs-20">
                  <h2>
                    <span
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        color: "rgb(255, 255, 255)",
                      }}
                    >
                      N0DE
                    </span>
                  </h2>
                </span>
              </div>
              <h2 className="text-light" data-cue="fadeIn">
                Own the Network. <br />
                Own the Game.
              </h2>
              <p className="text-light mb-8 max-text-11" data-cue="fadeIn">
                N0DE is a plug-and-play network accelerator in Lite, Pro and Max
                tiers turbocharges gaming, voice and data with zero lag and
                seamless failover. Powered by Enigma Net’s adaptive APN
                technology,
              </p>
              <ul className="list gap-6" data-cues="fadeIn">
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-arrow-up-right"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    optimizes your connection automatically with no setup
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-arrow-up-right"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    rock-solid stability
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-arrow-up-right"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    lightning-fast performance
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutAreaHomeOne;
