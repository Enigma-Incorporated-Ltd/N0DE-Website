import { Link } from "react-router-dom";

 

const AboutHomeThree = () => {
  return (
    <>
      <div className="section-space-md-top section-space-bottom overflow-hidden">
      <div className="container">
        <div className="row g-4 align-items-center justify-content-between">
          <div className="col-md-4">
            <div className="d-inline-block position-relative z-1" data-cue="slideInUp"><img src="assets/img/about-img-6.png"
                alt="image" className="img-fluid" /> <img src="assets/img/icon-star-5.png" alt="image"
                className="img-fluid d-none d-xl-block position-absolute start-0 top-50 translate-middle z-n1" /></div>
          </div>
          <div className="col-md-8 col-xl-7">
            <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-4" data-cue="fadeIn">
              <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-light"></div><span
                className="d-block fw-medium text-light fs-20">About Us</span>
            </div>
            <h2 className="text-light" data-cue="fadeIn">Technology It’s not Just The About The <span
                className="text-gradient-primary">Gadgets It’s</span></h2>
            <p className="mb-8 max-text-13" data-cue="fadeIn">It has survived not only five centuries, but also the leap It
              was popularised in the with the release of passages and more recently with desktop like.</p>
            <ul className="list gap-6 mb-8" data-cues="fadeIn">
              <li className="d-flex align-items-center gap-4"><span
                  className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14"><i
                    className="bi bi-arrow-up-right"></i> </span><span className="d-block flex-grow-1 fw-medium text-light">Free
                  Live Chatbots</span></li>
              <li className="d-flex align-items-center gap-4"><span
                  className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14"><i
                    className="bi bi-arrow-up-right"></i> </span><span className="d-block flex-grow-1 fw-medium text-light">Real
                  Time Language Translation</span></li>
              <li className="d-flex align-items-center gap-4"><span
                  className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14"><i
                    className="bi bi-arrow-up-right"></i> </span><span
                  className="d-block flex-grow-1 fw-medium text-light">13,000+ Websites Use Nor star</span></li>
            </ul><Link to="/about" className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
              data-cue="fadeIn"><span className="d-inline-block">Read More </span><span className="d-inline-block"><i
                  className="bi bi-arrow-right"></i></span></Link>
            <div className="d-inline-block position-relative z-1 mt-8" data-cues="fadeIn"><img
                src="assets/img/about-img-7.png" alt="image" className="img-fluid" /> <img src="assets/img/icon-star-2.png"
                alt="image"
                className="img-fluid d-none d-xl-block position-absolute start-100 top-50 translate-middle z-n1 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div> 
    </>
  );
};

export default AboutHomeThree;