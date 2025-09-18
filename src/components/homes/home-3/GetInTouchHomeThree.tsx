const GetInTouchHomeThree = () => {
  return (
    <>
      <div className="section-space-y">
        <div className="container">
          <div className="row g-4 align-items-center justify-content-xl-between">
            {/* Left copy */}
            <div className="col-lg-6">
              <span className="d-inline-block fs-20 text-gradient-primary fw-medium" data-cue="fadeIn">📩 Get in Touch</span>
              <h2 className="text-light mb-3" data-cue="fadeIn">Have a project in mind, or want to learn how N0DE can supercharge your network?</h2>
              <p className="mb-4 text-light-75" data-cue="fadeIn">Our team is here to help — whether it’s for gaming, streaming, or enterprise‑grade performance.</p>

              <hr className="border-light border-opacity-10 mb-4" />
              <h6 className="text-light mb-2" data-cue="fadeIn">🚨 For Urgent Assistance</h6>
              <ul className="list gap-6" data-cues="fadeIn">
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center w-13 h-13 rounded-circle bg-primary-gradient text-light fs-24 lh-1 flex-shrink-0">
                    <i className="bi bi-phone-vibrate"></i>
                  </span>
                  <div className="d-block flex-grow-1">
                    <p className="mb-0 fs-14">Call us</p>
                    <span className="d-block fw-medium text-light">+44 0000 123-456-789</span>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-4">
                  <span className="d-grid place-content-center w-13 h-13 rounded-circle bg-primary-gradient text-light fs-24 lh-1 flex-shrink-0">
                    <i className="bi bi-envelope-at"></i>
                  </span>
                  <div className="d-block flex-grow-1">
                    <p className="mb-0 fs-14">Email (24/7)</p>
                    <span className="d-block fw-medium text-light"><a href="mailto:support@enigma-inc.com">support@enigma-inc.com</a></span>
                  </div>
                </li>
              </ul>

              <hr className="border-light border-opacity-10 my-4" />
              <h6 className="text-light mb-2" data-cue="fadeIn">✍️ Send Us a Message</h6>
              <p className="text-light-75 mb-0" data-cue="fadeIn">Our experts will get back to you as quickly as possible.</p>
              <hr className="border-light border-opacity-10 my-4" />
              <p className="text-light-75 mb-0">💡 Trusted worldwide — powering performance for creators, gamers, and businesses everywhere.</p>
            </div>

            {/* Right form */}
            <div className="col-lg-6 col-xl-5">
              <div className="row g-4" data-cues="fadeIn">
                <div className="col-12">
                  <label className="form-label fs-14">Your Name</label>
                  <div className="form-control--gradient rounded-1">
                    <input type="text" className="form-control border-0 bg-transparent" />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fs-14">Email Address</label>
                  <div className="form-control--gradient rounded-1">
                    <input type="email" className="form-control border-0 bg-transparent" />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fs-14">How can we help you?</label>
                  <div className="form-control--gradient rounded-1">
                    <textarea className="form-control border-0 bg-transparent" rows={4}></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1 w-100 justify-content-center">
                    <span className="d-inline-block">Send Message</span>
                    <span className="d-inline-block"><i className="bi bi-arrow-right"></i></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouchHomeThree;
