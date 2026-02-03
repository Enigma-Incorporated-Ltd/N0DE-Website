import ryanPhoto from "/assets/ryan/profile.webp";
import leveledUp from "/assets/img_partner/logo-white.png";

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
    title: "less gaming and streaming drops",
    percentage: 60,
    img: "/assets/ryan/less-drops.png",
  },
];

const InfoAreaHomeOne = () => {
  return (
    <div className="section-space-s-y   ">
      <div className="container ">
        <div className="row g-5">
          {/* ================= INTRO ================= */}
          <div className="col-12">
            <div className="mb-10">
              <div className="d-inline-flex align-items-center column-gap-4 mb-4">
                <div className="w-20 h-2px bg-primary-gradient"></div>
                <span className="fw-medium text-light fs-20">
                  N0DE: Dramatic Real World Gains for Gamers and Streamers
                </span>
              </div>

              <span className="d-block fw-semibold text-light fs-32 mb-2">
                “N0DE genuinely improved my online experience”
              </span>

              <span className="d-block fw-semibold text-light fs-32 mb-4">
                “I highly recommend N0DE”
              </span>

              <p className="text-light fs-22 fw-light mb-0">
                I'm still on copper broadband with just 54Mbps download, which
                struggles with multi-streaming. After switching to N0DE, I saw a
                noticeable drop in packet loss and a much smoother ping.
              </p>
            </div>
          </div>

          {/* ================= SPLIT SECTION ================= */}
          <div className="col-12">
            <div className="row g-5 align-items-start">
              {/* LEFT */}
              <div className="col-md-5">
                <img
                  src={ryanPhoto}
                  alt="Ryan Sparrowhawk"
                  className="img-fluid rounded mb-8"
                />

                <div className="d-flex align-items-center mb-4">
                  <img
                    src={leveledUp}
                    alt="Levelled Up Gaming"
                    style={{ width: 40 }}
                    className="me-3"
                  />
                  <div>
                    <span className="d-block fw-semibold text-light fs-24">
                      Ryan Sparrowhawk
                    </span>
                    <span className="d-block fw-light fs-14 text-light text-opacity-50">
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

              {/* RIGHT */}
              <div className="col-md-7">
                <div
                  className="bg-dark-gradient p-4 p-sm-6 p-md-10 p-lg-6 p-xl-8 p-xxl-10 rounded-5"
                  data-cue="fadeIn"
                >
                  {/* <ul className="list list-row flex-wrap info-list"> */}
                  <ul className="row row-cols-1 row-cols-md-2  h-100 info-list">
                    {stats.map((stat, i) => (
                      <li
                        key={i}
                        className="h-100 d-flex flex-column align-items-center justify-content-center text-center gap-2 p-2"
                      >
                        <div className="stat-img d-flex align-items-center justify-content-center">
                          <img
                            src={stat.img}
                            alt="icon"
                            className="w-100 h-100"
                          />
                        </div>

                        <div className="d-flex flex-column align-items-center">
                          <span className="d-block text-gradient-primary fw-bold fs-32">
                            {stat.percentage}%
                          </span>
                          <span className="d-block text-light fs-16">
                            {stat.title}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAreaHomeOne;
