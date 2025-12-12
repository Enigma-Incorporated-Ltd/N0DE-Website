import ryanPhoto from "/assets/ryan/profile.jpg";
import leveledUp from "/assets/img_partner/logo-white.png";
import iconPlaceholder from "/assets/img/placeholder-img.png";

const stats = [
  {
    title: "jitter reduction",
    percentage: 95,
    img: "/assets/ryan/jitter.png",
  },
  {
    title: "faster downloads",
    percentage: 210,
    img: "/assets/ryan/download.png",
  },
  {
    title: "more content output",
    percentage: 40,
    img: "/assets/ryan/content output.png",
  },
  {
    title: "[GMC: unknown]",
    percentage: 60,
    img: "/assets/ryan/jitter.png",
  },
];

const InfoAreaHomeOne = () => {
  return (
    <div className="section-space-md-y info-section">
      <div className="container">
        <div className="row g-5">
          {/* Top Header / Quotes */}
          <div className="row g-4 align-items-center mb-10">
            <div
              className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
              data-cue="fadeIn"
            >
              <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
              <span className="d-block fw-medium text-light fs-20">
                N0DE: Dramatic Real World Gains for Gamers and Streamers
              </span>
            </div>

            <span className="d-block fw-semibold text-light fs-32">
              "N0DE genuinely improdved my online experience"
            </span>
            <span className="d-block fw-semibold text-light fs-32">
              "I highly recommend N0DE"
            </span>
            <span className="d-block fw-light text-light fs-22">
              "I'm still on copper broadband with just 54Mbps download, which
              struggles with multi-streaming.
            </span>
            <span className="d-block fw-light text-light fs-22">
              After switching to N0DE, I saw a noticable drop in packet loss and
              a much smoother ping.."
            </span>
          </div>

          <div className="col-12 d-flex flex-column flex-md-row align-items-start gap-5 ">
            <div className="d-flex flex-column " style={{ maxWidth: "320px" }}>
              <img
                src={ryanPhoto}
                alt="Ryan Sparrowhawk"
                className="img-fluid rounded mb-3 p-8"
              />

              <div className="d-flex align-items-center mb-3">
                <img
                  src={leveledUp}
                  alt="N0DE"
                  className="me-3"
                  style={{ width: "40px" }}
                />

                <div>
                  <span className="d-block fw-semibold text-light fs-24">
                    Ryan Sparrowhawk
                  </span>
                  <span className="d-block fw-light fs-14">
                    Levelled Up Gaming
                  </span>
                </div>
              </div>

              <p className="text-light fs-20 fw-light">
                Levelled Up Gaming is a thriving community with over 500,000
                followers across all platforms. As an early adopter of N0DE,
                Ryan has experienced significant performance gains across his
                diverse networking needs.
              </p>
            </div>
            {/* 
            <div className="process-card rounded-5 p-8 h-100 w-100 d-flex flex-column stats-grid">
              <div className="row row-cols-1 row-cols-sm-2 g-4 h-100 w-100">
                {stats.map((s, i) => (
                  <div className="col" key={i}>
                    <div className="h-100 d-flex flex-column align-items-center">
                      <div className="stat-img">
                        <img src={s.img} alt="icon" className="w-100 h-100" />
                      </div>

                      <span className="text-gradient-primary h3 fw-bold fs-32 mb-1">
                        {s.percentage}%
                      </span>
                      <span className="text-light fs-16">{s.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="process-card rounded-5 p-8 h-100 w-100 d-flex flex-column stats-grid">
              <div className="row row-cols-1 row-cols-sm-2 g-4 h-100 w-100 stats-divider">
                {stats.map((s, i) => (
                  <div className="col" key={i}>
                    <div className="h-100 d-flex flex-column align-items-center">
                      <div className="stat-img">
                        <img src={s.img} alt="icon" className="w-100 h-100" />
                      </div>
                      <span className="text-gradient-primary h3 fw-bold fs-32 mb-1">
                        {s.percentage}%
                      </span>
                      <span className="text-light fs-16">{s.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAreaHomeOne;
