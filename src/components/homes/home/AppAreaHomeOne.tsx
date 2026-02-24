import CreatorFocusedFeatures from "./CreatorFocusedFeatures";

const AppAreaHomeOne = () => {
  return (
    <>
      <div className="">
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8">
                <div
                  className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
                  data-cue="fadeIn"
                >
                  <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                  <span className="d-block fw-medium text-light fs-20">
                    Built for Streamers and Content Creators
                  </span>
                </div>
                <h3
                  className="h2 mb-0 text-light font-weight-bold"
                  data-cue="fadeIn"
                >
                  Boosts streaming and cloud based services
                </h3>
                <div className="text-light mt-3 max-text-11" data-cue="fadeIn">
                  <p>
                    As well as dominating in-game, content creators use N0DE to
                    unlock peak broadcasting performance, across multiple
                    concurrent streams
                  </p>
                  <p>
                    N0DE users simultaneously game and stream in ultra-low
                    latency environments without performance drops
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 creator-focused features */}
        <CreatorFocusedFeatures />
        <div className="section-space-sm-top" data-cue="fadeIn">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppAreaHomeOne;
