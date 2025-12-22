import { useState } from "react";
const features = [
  {
    feature: "Stream Stability",
    title:
      "Stream Like a Pro: How N0DE Eliminates Buffering and Dropouts for Creators",
    desc: "Whether you're gaming, podcasting, or live-streaming to multiple platforms, stability is everything. N0DE uses AI-driven traffic prioritization and deep packet inspection to ensure your stream stays rock-solid — even when your network is under pressure.",
    icon: "bi bi-broadcast",
  },
  {
    feature: "Ultra Low Latency",
    title:
      "Milliseconds Matter: Why N0DE's Ultra Low Latency Gives Gamers the Edge",
    desc: "In competitive gaming, a single frame delay can cost you the win. N0DE slashes latency through real-time path optimization and smart packet scheduling, giving you the edge in FPS, MOBAs, and more.",
    icon: "bi bi-speedometer2",
  },
  {
    feature: "Faster Uploads",
    title:
      "Upload Smarter, Not Harder: N0DE’s Game-Changing File Transfer Performance",
    desc: "Large file transfers — game clips, renders, patch builds — shouldn’t be a waiting game. With N0DE, intelligent compression and multi-path streaming make uploads blisteringly fast.",
    icon: "bi bi-cloud-arrow-up",
  },
  {
    feature: "Network Ready",
    title: "Always Network Ready: How N0DE Optimizes Every Device, Everywhere",
    desc: "Whether you're gaming on a console, streaming from a rig, or pushing updates from a dev environment — N0DE adapts. No need to reconfigure or babysit your connection.",
    icon: "bi bi-ethernet",
  },
];

export default function CreatorFocusedFeatures() {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (idx: number) => setActive((p) => (p === idx ? null : idx));

  return (
    <div className="container">
      <div className="row g-4" data-cues="fadeIn">
        {features.map((f, i) => (
          <>
            <div className="col-md-6 col-lg-4 col-xl-3" key={f.feature}>
              <div className="process-card rounded-5 p-6 p-xl-8 d-flex flex-column justify-content-between">
                {/* TOP SECTION */}
                <div>
                  <span className="d-inline-block h2 mb-8 text-light process-card__icon">
                    <i className={f.icon}></i>
                  </span>
                  <h6 className="text-light mb-12">{f.feature}</h6>
                </div>

                {/* BUTTON */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="btn process-card__btn text-white fs-14 border-0 rounded-pill align-self-start"
                >
                  <span className="d-inline-block">Learn more</span>
                  <span className="d-inline-block">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </button>
                {/* OVERLAY / EXPANDED CONTENT */}

                <div
                  className={`feature-expand rounded-4 p-2 mt-4 ${
                    active === i ? "show" : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(5,150,241,0.25), rgba(0,0,0,0.35))",
                  }}
                >
                  <h6 className="text-white mb-2">{f.title}</h6>
                  <p className="mb-0 text-white">{f.desc}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
