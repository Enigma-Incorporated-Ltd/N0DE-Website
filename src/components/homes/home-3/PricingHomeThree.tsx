import { Link } from "react-router-dom";

 
 
const PricingHomeThree = () => {
  return (
    <>
        <div className="section-space-md-y">
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-10 col-lg-8">
              <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-4" data-cue="fadeIn">
                <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-light"></div><span
                  className="d-block fw-medium text-light fs-20">Pricing Price</span>
              </div>
              <h2 className="text-light" data-cue="fadeIn">Amazing Pricing Package for <span
                  className="text-gradient-primary">Content & Generator</span></h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4" data-cues="fadeIn">
          <div className="col-md-6 col-lg-4">
            <div className="pricing-card rounded-4">
              <div className="pricing-card__head p-4 p-md-10 p-lg-6 p-xl-10">
                <h5 className="text-light">Basic Plan</h5>
                <p className="mb-0 fs-14 text-light text-opacity-70">This package is ideal for individual students bloggers
                  and casual Sierras.</p>
              </div>
              <div className="pricing-card__body px-4 px-md-10 px-lg-6 px-xl-10 py-4">
                <h3 className="text-light mb-0">$19.99<span className="fs-12 fw-normal">/per month</span></h3>
              </div>
              <div className="pricing-card__footer p-4 p-md-10 p-lg-6 p-xl-10">
                <ul className="list gap-4 mb-8">
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span className="d-block flex-grow-1 fw-medium text-light">Basic
                      Content Generation</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">User-Friendly Interface</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-light bg-opacity-10 text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Template Variety</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-light bg-opacity-10 text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Content Exploration Tools</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-light bg-opacity-10 text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Priority Customer Support</span></li>
                </ul><Link to="/service-details" className="btn btn-light fs-14 border-0 rounded-pill"><span
                    className="d-inline-block">Read More </span><span className="d-inline-block"><i
                      className="bi bi-arrow-right"></i></span></Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="pricing-card popular-pricing-card rounded-4">
              <div className="pricing-card__head p-4 p-md-10 p-lg-6 p-xl-10">
                <h5 className="text-light">Premium Plan</h5>
                <p className="mb-0 fs-14 text-light text-opacity-70">This package is ideal for individual students bloggers
                  and casual Sierras.</p>
              </div>
              <div className="pricing-card__body px-4 px-md-10 px-lg-6 px-xl-10 py-4">
                <h3 className="text-light mb-0">$99.99<span className="fs-12 fw-normal">/per month</span></h3>
              </div>
              <div className="pricing-card__footer p-4 p-md-10 p-lg-6 p-xl-10">
                <ul className="list gap-4 mb-8">
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span className="d-block flex-grow-1 fw-medium text-light">Basic
                      Content Generation</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">User-Friendly Interface</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Template Variety</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Content Exploration Tools</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Priority Customer Support</span></li>
                </ul><Link to="/service-details"
                  className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"><span
                    className="d-inline-block">Read More </span><span className="d-inline-block"><i
                      className="bi bi-arrow-right"></i></span></Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="pricing-card rounded-4">
              <div className="pricing-card__head p-4 p-md-10 p-lg-6 p-xl-10">
                <h5 className="text-light">Standard Plan</h5>
                <p className="mb-0 fs-14 text-light text-opacity-70">This package is ideal for individual students bloggers
                  and casual Sierras.</p>
              </div>
              <div className="pricing-card__body px-4 px-md-10 px-lg-6 px-xl-10 py-4">
                <h3 className="text-light mb-0">$39.99<span className="fs-12 fw-normal">/per month</span></h3>
              </div>
              <div className="pricing-card__footer p-4 p-md-10 p-lg-6 p-xl-10">
                <ul className="list gap-4 mb-8">
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span className="d-block flex-grow-1 fw-medium text-light">Basic
                      Content Generation</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">User-Friendly Interface</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-primary-gradient text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Template Variety</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-light bg-opacity-10 text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Content Exploration Tools</span></li>
                  <li className="d-flex align-items-center gap-4"><span
                      className="d-grid place-content-center w-6 h-6 bg-light bg-opacity-10 text-light flex-shrink-0 rounded-circle"><i
                        className="bi bi-check-lg"></i> </span><span
                      className="d-block flex-grow-1 fw-medium text-light">Priority Customer Support</span></li>
                </ul><Link to="/service-details" className="btn btn-light fs-14 border-0 rounded-pill"><span
                    className="d-inline-block">Read More </span><span className="d-inline-block"><i
                      className="bi bi-arrow-right"></i></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PricingHomeThree;