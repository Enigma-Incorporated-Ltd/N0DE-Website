import { Link } from "react-router-dom";

 
const ServiceHomeThree = () => {
  return (
    <>
      <div className="popular-service-section section-space-top section-space-md-bottom">
      <div className="section-space-sm-bottom text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8"><span className="d-block fs-20 text-light mb-4" data-cue="fadeIn">Popular
                Services</span>
              <h2 className="text-light" data-cue="fadeIn">The Best Artificial Intelligence <span
                  className="text-gradient-primary">Solution Platform</span></h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4" data-cues="fadeIn">
          <div className="col-lg-6">
            <div className="d-flex flex-column flex-sm-row align-items-start gap-4 p-4 p-md-6 rounded-4 service-card">
              <div
                className="d-grid place-content-center w-20 h-20 flex-shrink-0 border border-light rounded-circle border-opacity-30">
                <img src="assets/img/icon-feather.png" alt="image" className="img-fluid" /></div>
              <div className="flex-grow-1">
                <h6 className="text-light mb-2">Writing Blog Content</h6>
                <p className="mb-0 fs-14">It is a long established fact be distracted by when looking at its layout.</p>
              </div><Link to="/service-details"
                className="link d-grid place-content-center w-20 h-20 flex-shrink-0 border border-light rounded-circle border-opacity-30 fs-32 text-light hover:text-primary"><i
                  className="bi bi-arrow-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex flex-column flex-sm-row align-items-start gap-4 p-4 p-md-6 rounded-4 service-card">
              <div
                className="d-grid place-content-center w-20 h-20 flex-shrink-0 border border-light rounded-circle border-opacity-30">
                <img src="assets/img/icon-mic.png" alt="image" className="img-fluid" /></div>
              <div className="flex-grow-1">
                <h6 className="text-light mb-2">Marketing Copy</h6>
                <p className="mb-0 fs-14">It is a long established fact be distracted by when looking at its layout.</p>
              </div><Link to="/service-details"
                className="link d-grid place-content-center w-20 h-20 flex-shrink-0 border border-light rounded-circle border-opacity-30 fs-32 text-light hover:text-primary"><i
                  className="bi bi-arrow-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex flex-column flex-sm-row align-items-start gap-4 p-4 p-md-6 rounded-4 service-card">
              <div
                className="d-grid place-content-center w-20 h-20 flex-shrink-0 border border-light rounded-circle border-opacity-30">
                <img src="assets/img/icon-bag.png" alt="image" className="img-fluid" /></div>
              <div className="flex-grow-1">
                <h6 className="text-light mb-2">eCommerce Copy</h6>
                <p className="mb-0 fs-14">It is a long established fact be distracted by when looking at its layout.</p>
              </div><Link to="/service-details"
                className="link d-grid place-content-center w-20 h-20 flex-shrink-0 border border-light rounded-circle border-opacity-30 fs-32 text-light hover:text-primary"><i
                  className="bi bi-arrow-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex flex-column flex-sm-row align-items-start gap-4 p-4 p-md-6 rounded-4 service-card">
              <div
                className="d-grid place-content-center w-20 h-20 flex-shrink-0 border border-light rounded-circle border-opacity-30">
                <img src="assets/img/icon-link.png" alt="image" className="img-fluid" /></div>
              <div className="flex-grow-1">
                <h6 className="text-light mb-2">Website Copy</h6>
                <p className="mb-0 fs-14">It is a long established fact be distracted by when looking at its layout.</p>
              </div><Link to="/service-details"
                className="link d-grid place-content-center w-20 h-20 flex-shrink-0 border border-light rounded-circle border-opacity-30 fs-32 text-light hover:text-primary"><i
                  className="bi bi-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServiceHomeThree;