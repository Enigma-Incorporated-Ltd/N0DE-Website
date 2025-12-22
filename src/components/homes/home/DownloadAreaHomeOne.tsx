import React from "react";

const DownloadAreaHomeOne: React.FC = () => {
  return (
    <section className="download-area py-5 bg-dark text-white">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-lg-10">
            <div className="mb-3">
              <div
                className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2"
                data-cue="fadeIn"
              >
                <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                <span className="d-block fw-medium text-light fs-20">
                  Multi Platform
                </span>
              </div>
              <h1
                className="text-light mb-4 display-4 fw-bold"
                data-cue="fadeIn"
              >
                Download
              </h1>
            </div>
            <p className="text-muted mb-4">
              Get our Windows app today. Mobile apps are on the way!
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
              {/* Ensure badges scale crisply and maintain consistent height */}
              <style>{`:root{--badge-h:56px}@media (max-width:575.98px){:root{--badge-h:48px}} .store-badge{height:var(--badge-h); display:block;}.store-badge img{height:var(--badge-h); width:auto; display:block;}`}</style>
              {/* Windows download badge */}
              <a
                href="/download/windows"
                className="d-inline-flex align-items-center store-badge"
                role="button"
                aria-label="Download"
              >
                <img
                  src="/assets/store-badges/windows-button.png"
                  alt="Download"
                  height={56}
                  style={{ height: 56 }}
                />
              </a>

              {/* App Store (coming soon) */}
              <span
                className="opacity-50 store-badge"
                title="Coming soon"
                aria-disabled="true"
              >
                <img
                  src="/assets/store-badges/app_store-badge.png"
                  alt="Download on the App Store (coming soon)"
                  height={56}
                  style={{ height: 56 }}
                />
              </span>

              {/* Google Play (coming soon) */}
              <span
                className="opacity-50 store-badge"
                title="Coming soon"
                aria-disabled="true"
              >
                <img
                  src="/assets/store-badges/google_store_badge.png"
                  alt="Get it on Google Play (coming soon)"
                  height={56}
                  style={{ height: 56 }}
                />
              </span>
            </div>

            <div className="mt-2">
              <small className="text-secondary">
                App Store and Google Play deployments landing soon
              </small>
            </div>

            {/* Optional system requirements note */}
            {/* <div className="mt-3">
              <small className="text-secondary">Requires Windows 10 or later.</small>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAreaHomeOne;
