const InfoAreaHomeOne = () => {
  return (
    <>
      <div className="section-space-md-y info-section">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <div className="pe-xl-12" data-cue="slideInUp">
                <img
                  src="assets/img/info-section-img.png"
                  alt="image"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div
                className="d-flex align-items-center gap-5"
                data-cue="fadeIn"
              >
                <div className="d-grid place-content-center w-15 h-15 rounded-circle overflow-hidden flex-shrink-0"></div>
                <div className="flex-grow-1"></div>
              </div>
              <div
                className="bg-dark-gradient p-4 p-sm-6 p-md-10 p-lg-6 p-xl-8 p-xxl-10 rounded-5"
                data-cue="fadeIn"
              >
                <ul className="list list-row flex-wrap info-list">
                  <li>
                    <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                      <h3 className="mb-0 text-light flex-shrink-0">95%</h3>
                      <p className="mb-0 text-opacity-50 flex-grow-1">
                        reduction in jitter
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                      <h3 className="mb-0 text-light flex-shrink-0">210%</h3>
                      <p className="mb-0 text-opacity-50 flex-grow-1">
                        faster downloads
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                      <h3 className="mb-0 text-light flex-shrink-0">40%</h3>
                      <p className="mb-0 text-opacity-50 flex-grow-1">
                        increase in content output
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                      <h3 className="mb-0 text-light flex-shrink-0">60%</h3>
                      <p className="mb-0 text-opacity-50 flex-grow-1">
                        increase in content output
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoAreaHomeOne;
