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
              <h2 className="h4 text-light mb-6" data-cue="fadeIn">
                ''N0DE Pro helps me stream and play etc...''
              </h2>
              <div
                className="d-flex align-items-center gap-5"
                data-cue="fadeIn"
              >
                <div className="d-grid place-content-center w-15 h-15 rounded-circle overflow-hidden flex-shrink-0">
                  <img
                    src="assets/img/user-img-1.png"
                    alt="image"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0 text-light">Kristin Mansion</h6>
                  <span className="d-block fs-14 text-light text-opacity-50">
                    Product Manager
                  </span>
                </div>
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
                        <p>increase in content output</p>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-6 p-4 p-md-6">
                      <h3 className="mb-0 text-light flex-shrink-0">60%</h3>
                      <p className="mb-0 text-opacity-50 flex-grow-1">
                        <p>increase in content output</p>
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
