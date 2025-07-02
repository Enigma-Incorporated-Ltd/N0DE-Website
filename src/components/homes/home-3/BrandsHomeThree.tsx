
const BrandsHomeThree = () => {
  return (
    <>
      <div className="section-space-md-y trusted-brand-section">
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="mb-0 text-light text-center" data-cue="fadeIn">Trusted by <span
                  className="text-gradient-primary">40,999+</span> marketers at companies including</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul
                className="list list-row flex-wrap justify-content-center align-items-center row-gap-2 column-gap-8 column-gap-xl-12 column-gap-xxl-15"
                data-cues="fadeIn" data-group="images">
                <li className="text-center"><img src="assets/img/brand-img-1.png" alt="image" className="img-fluid" /></li>
                <li className="text-center"><img src="assets/img/brand-img-2.png" alt="image" className="img-fluid" /></li>
                <li className="text-center"><img src="assets/img/brand-img-3.png" alt="image" className="img-fluid" /></li>
                <li className="text-center"><img src="assets/img/brand-img-4.png" alt="image" className="img-fluid" /></li>
                <li className="text-center"><img src="assets/img/brand-img-5.png" alt="image" className="img-fluid" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandsHomeThree;