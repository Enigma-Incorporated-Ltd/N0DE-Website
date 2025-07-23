 

const GetInTouchHomeThree = () => {
  return (
    <>
       <div className="section-space-y">
      <div className="container">
        <div className="row g-4 align-items-center justify-content-xl-between">
          <div className="col-lg-6"><span className="d-inline-block fs-20 text-gradient-primary fw-medium" data-cue="fadeIn">Get
              In touch</span>
            <h2 className="text-light" data-cue="fadeIn">Have any Project Plan In your Mind?</h2>
            <p className="mb-8" data-cue="fadeIn">All the Lorem Ipsum generators on the Internet tend to repeat predefined
              chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over
              200 Latin words,</p>
            <ul className="list gap-6" data-cues="fadeIn">
              <li className="d-flex align-items-center gap-4"><span
                  className="d-grid place-content-center w-13 h-13 rounded-circle bg-primary-gradient text-light fs-24 lh-1 flex-shrink-0"><i
                    className="bi bi-phone-vibrate"></i></span>
                <div className="d-block flex-grow-1">
                  <p className="mb-0 fs-14">For urgent help</p><span className="d-block fw-medium text-light">+ 0000
                    123-456-789</span>
                </div>
              </li>
              <li className="d-flex align-items-center gap-4"><span
                  className="d-grid place-content-center w-13 h-13 rounded-circle bg-primary-gradient text-light fs-24 lh-1 flex-shrink-0"><i
                    className="bi bi-envelope-at"></i></span>
                <div className="d-block flex-grow-1">
                  <p className="mb-0 fs-14">Mail us 24/7</p><span
                    className="d-block fw-medium text-light"><a href="mailto:example@mail.com">example@mail.com</a></span>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-xl-5">
            <div className="row g-4" data-cues="fadeIn">
              <div className="col-12"><label className="form-label fs-14">Your Name</label>
                <div className="form-control--gradient rounded-1"><input type="text"
                    className="form-control border-0 bg-transparent" /></div>
              </div>
              <div className="col-12"><label className="form-label fs-14">Email Address</label>
                <div className="form-control--gradient rounded-1"><input type="email"
                    className="form-control border-0 bg-transparent" /></div>
              </div>
              <div className="col-12"><label className="form-label fs-14">How can help you?</label>
                <div className="form-control--gradient rounded-1"><textarea className="form-control border-0 bg-transparent"
                    rows={4}></textarea></div>
              </div>
              <div className="col-12"><button
                  className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1 w-100 justify-content-center"><span
                    className="d-inline-block">Submit Now </span><span className="d-inline-block"><i
                      className="bi bi-arrow-right"></i></span></button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default GetInTouchHomeThree;