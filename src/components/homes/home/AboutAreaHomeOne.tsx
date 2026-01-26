const AboutAreaHomeOne = () => {
  return (
    <>
      <div className="section-space-md-y">
        <div className="container">
          <div className="row g-4 justify-content-xxl-between align-items-center">
            <div className="col-lg-6 col-xxl-5">
              <img
                src="/assets/img/about-img-1.webp"
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
                  N0DE: The Ultimate Gaming Network
                </span>
              </div>
              <h2 className="text-light" data-cue="fadeIn">
                Own the Network. <br />
                Own the Game.
              </h2>
              <p className="text-light mb-8 max-text-11" data-cue="fadeIn">
                N0DE is a plug-and-play network accelerator, available in
                different tiers, which turbocharges all gaming, voice and data
                with zero lag and seamless failover. Powered by Enigma Net’s
                adaptive APN technology, N0DE:
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
                    ensures rock-solid stability
                  </span>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
                    <i className="bi bi-arrow-up-right"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium text-light">
                    provides lightning-fast performance
                  </span>
                </li>
              </ul>
              <div
                className="text-light mb-8 max-text-11 mt-4"
                data-cue="fadeIn"
              >
                <h4 className="h4 text-light mb-3">
                  How is this even possible?
                </h4>
                <p>
                  Us gamers who work at a net-tech company have taken our deep
                  expertise in corporate-grade networking and combined it with
                  our obsession for flawless gameplay. The result is{" "}
                  <strong>N0DE</strong> — a purpose-built performance platform
                  designed by gamers, for gamers.
                </p>
                <p>
                  Built from the ground up to crush lag, stabilize streams, and
                  give you the competitive edge — N0DE isn’t just optimized for
                  gaming. It was born from it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutAreaHomeOne;
