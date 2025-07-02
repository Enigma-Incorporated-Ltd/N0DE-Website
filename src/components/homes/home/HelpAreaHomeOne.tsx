import { Link } from "react-router-dom";

 

 
const HelpAreaHomeOne = () => {
  return (
    <>
       <div className="section-space-md-y">
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8">
              <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4" data-cue="fadeIn">
                <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div><span
                  className="d-block fw-medium text-light fs-20">How Chatbot Help you</span>
              </div>
              <h2 className="text-light" data-cue="fadeIn">Experience The Full Power</h2>
              <p className="text-light mb-0 max-text-11" data-cue="fadeIn">There are many variations of passage available,
                but the majority have suffered words which don't look even slightly believable.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4" data-cues="fadeIn">
          <div className="col-md-6">
            <div className="process-card rounded-5 p-6 p-xl-10"><span
                className="d-inline-block h2 mb-8 text-light process-card__icon"><i className="bi bi-robot"></i></span>
              <h5 className="text-light process-card__title">Virtual Assistants</h5>
              <p className="mb-8">There are many variations of passage available, but the majority have suffered words which
                don't look even slightly believable.</p><Link to="/contact"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"><span className="d-inline-block">Get
                  Answer </span><span className="d-inline-block"><i className="bi bi-arrow-right"></i></span></Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="process-card rounded-5 p-6 p-xl-10"><span
                className="d-inline-block h2 mb-8 text-light process-card__icon"><i className="bi bi-headset"></i></span>
              <h5 className="text-light process-card__title">Live Chat</h5>
              <p className="mb-8">There are many variations of passage available, but the majority have suffered words which
                don't look even slightly believable.</p><Link to="/contact"
                className="btn process-card__btn text-white fs-14 border-0 rounded-pill"><span className="d-inline-block">Get
                  Answer </span><span className="d-inline-block"><i className="bi bi-arrow-right"></i></span></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section-space-sm-top" data-cue="fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h6 className="text-center mb-0 text-light">What Is Zenith Ai Chatbot Used For? For More Details. <span
                  className="text-gradient-primary">Explore More Service !</span></h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HelpAreaHomeOne;