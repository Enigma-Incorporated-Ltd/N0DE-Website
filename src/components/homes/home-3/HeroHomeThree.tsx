import { Link } from "react-router-dom";

 
 

const HeroHomeThree = () => {
  return (
    <>
      <div className="hero-3 position-relative z-1">
      <div className="section-space-y text-center">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-md-10">
              <h1 className="text-light" data-cue="fadeIn">Explore The Fastest Ai Powered Content Generator</h1>
              <p className="mb-8 max-text-15 mx-auto" data-cue="fadeIn">There are many variations of passages of available
                If you are going to use a passage of you need to be sure there isn't anything embarrassing hidden in the
                middle of text.</p>
              <div className="d-flex align-items-center justify-content-center row-gap-2 column-gap-4 flex-wrap"
                data-cues="fadeIn"><Link to="/contact"
                  className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"><span
                    className="d-inline-block">Contact Us </span><span className="d-inline-block"><i
                      className="bi bi-arrow-right"></i> </span></Link><Link to="/about"
                  className="btn btn-light fs-14 rounded-pill"><span className="d-inline-block">Learn More </span><span
                    className="d-inline-block"><i className="bi bi-arrow-right"></i></span></Link></div>
            </div>
            <div className="col-md-10">
              <div className="hero-3__img position-relative z-1 d-inline-block" data-cue="slideInUp">
                <img
                  src="assets/img/hero-3-img.png" alt="image" className="img-fluid" /></div>
            </div>
          </div>
        </div>
      </div>
      <img src="assets/img/icon-star-2.png" alt="image" className="img-fluid hero-3__shape hero-3__shape-1" /> 
      <img
        src="assets/img/icon-star-2.png" alt="image" className="img-fluid hero-3__shape hero-3__shape-2" /> 
        <img
        src="assets/img/icon-star-3.png" alt="image" className="img-fluid hero-3__shape hero-3__shape-3" /> 
        <img
        src="assets/img/icon-star-4.png" alt="image" className="img-fluid hero-3__shape hero-3__shape-4" />
    </div>
    </>
  );
};

export default HeroHomeThree;