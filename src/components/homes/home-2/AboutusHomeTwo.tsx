import { Link } from "react-router-dom";

 
const AboutusHomeTwo = () => {
  return (
    <>
       <div className="section-space-y bg-dark about-us-section">
    <div className="section-space-sm-bottom text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-xl-8"><span className="d-block fw-medium text-light fs-20 text-gradient-primary mb-4"
              data-cue="fadeIn">About Us</span>
            <h2 className="text-light mb-0" data-cue="fadeIn">We’ve Helped Hundreds of Partners, From Startups To Mid Sized
              Business</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row g-4 justify-content-center" data-cues="fadeIn">
        <div className="col-md-6 col-lg-4">
          <div className="service-slider__slide"><img src="assets/img/about-img-3.png" alt="image" className="img-fluid w-100" />
            <div
              className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
              <h5 className="mb-0"><Link to="/about" className="link d-block text-light hover:text-danger">Project <span
                    className="fw-light">Management</span></Link></h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="service-slider__slide"><img src="assets/img/about-img-4.png" alt="image" className="img-fluid w-100" />
            <div
              className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
              <h5 className="mb-0"><Link to="/about" className="link d-block text-light hover:text-danger">Image <span
                    className="fw-normal">Design</span></Link></h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="service-slider__slide"><img src="assets/img/about-img-5.png" alt="image" className="img-fluid w-100" />
            <div
              className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
              <h5 className="mb-0"><Link to="/about" className="link d-block text-light hover:text-danger">AI <span
                    className="fw-normal">Development</span></Link></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default AboutusHomeTwo;