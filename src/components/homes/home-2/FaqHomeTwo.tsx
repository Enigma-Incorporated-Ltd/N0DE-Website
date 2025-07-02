 

if (typeof window !== "undefined") {
   import('bootstrap/dist/js/bootstrap.bundle.min.js');

}


const FaqHomeTwo = () => {
  return (
    <>
      <div className="section-space-md-y">
    <div className="section-space-sm-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <div className="d-flex align-items-center flex-wrap row-gap-2 column-gap-4" data-cue="fadeIn">
              <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div><span
                className="d-block fw-medium text-light fs-20 text-gradient-primary">Our FAQ</span>
            </div>
            <h2 className="mb-0" data-cue="fadeIn">Questions About Our Zenith AI <span className="text-gradient-primary">We Have
                Answers</span></h2>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-xl-10">
          <div className="accordion accordion--dark accordion-separate-body accordion--faq-light" id="faqAccordion"
            data-cues="fadeIn">
            <div className="accordion-item">
              <h2 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse"
                  data-bs-target="#faqAccordion1" aria-expanded="true" aria-controls="faqAccordion1">How Can I Get
                  Started With Power AI’s Services?</button></h2>
              <div id="faqAccordion1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body bg-light-subtle text-dark">Many desktop publishing packages and web page
                  editors now uand a search for will uncover many web sites still in their infancy.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header"><button className="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#faqAccordion2" aria-expanded="false"
                  aria-controls="faqAccordion2">What is Artificial Intelligence AI?</button></h2>
              <div id="faqAccordion2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body bg-light-subtle text-dark">Many desktop publishing packages and web page
                  editors now uand a search for will uncover many web sites still in their infancy.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header"><button className="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#faqAccordion3" aria-expanded="false"
                  aria-controls="faqAccordion3">What Services Does Power Ai Provide?</button></h2>
              <div id="faqAccordion3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body bg-light-subtle text-dark">Many desktop publishing packages and web page
                  editors now uand a search for will uncover many web sites still in their infancy.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header"><button className="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#faqAccordion4" aria-expanded="false"
                  aria-controls="faqAccordion4">Is Power AI Suitable For Small Businesses?</button></h2>
              <div id="faqAccordion4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body bg-light-subtle text-dark">Many desktop publishing packages and web page
                  editors now uand a search for will uncover many web sites still in their infancy.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default FaqHomeTwo;