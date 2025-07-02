 

if (typeof window !== "undefined") {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

}

const FaqHomeThree = () => {
  return (
    <>
      <div className="section-space-md-y">
      <div className="section-space-sm-bottom text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10"><span className="d-block fs-20 text-light mb-4" data-cue="fadeIn">Asked Questions</span>
              <h2 className="text-light mb-0" data-cue="fadeIn">Frequently Asked Questions</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="accordion accordion--dark accordion-separate-body accordion--faq" id="faqAccordion"
              data-cues="fadeIn">
              <div className="accordion-item">
                <h2 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#faqAccordion1" aria-expanded="true" aria-controls="faqAccordion1">How Can I Get
                    Started With Power AI’s Services?</button></h2>
                <div id="faqAccordion1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div className="accordion-body bg-dark">There are many variations of passages of Lorem Ipsum available,
                    but the majority have suffered alteration in some form, by injected humour, or randomised words
                    which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
                    need to be sure there isn't anything embarrassing hidden in the middle of text.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#faqAccordion2" aria-expanded="false"
                    aria-controls="faqAccordion2">What is Artificial Intelligence AI?</button></h2>
                <div id="faqAccordion2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body bg-dark">There are many variations of passages of Lorem Ipsum available,
                    but the majority have suffered alteration in some form, by injected humour, or randomised words
                    which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
                    need to be sure there isn't anything embarrassing hidden in the middle of text.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#faqAccordion3" aria-expanded="false"
                    aria-controls="faqAccordion3">What Services Does Power Ai Provide?</button></h2>
                <div id="faqAccordion3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body bg-dark">There are many variations of passages of Lorem Ipsum available,
                    but the majority have suffered alteration in some form, by injected humour, or randomised words
                    which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
                    need to be sure there isn't anything embarrassing hidden in the middle of text.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#faqAccordion4" aria-expanded="false"
                    aria-controls="faqAccordion4">Is Power AI Suitable For Small Businesses?</button></h2>
                <div id="faqAccordion4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body bg-dark">There are many variations of passages of Lorem Ipsum available,
                    but the majority have suffered alteration in some form, by injected humour, or randomised words
                    which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
                    need to be sure there isn't anything embarrassing hidden in the middle of text.</div>
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

export default FaqHomeThree;