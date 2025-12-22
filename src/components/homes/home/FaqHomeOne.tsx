// Loads Bootstrap JS only in the browser
if (typeof window !== "undefined") {
  import("bootstrap/dist/js/bootstrap.bundle.min.js");
}

const FaqHomeOne = () => {
  return (
    <>
      <div className="section-space-md-y" id="faq">
        <div className="container ">
          <div className="row g-4 ">
            <div className="col-lg-6 g-20 p-6">
              <div
                className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4  "
                data-cue="fadeIn"
              >
                <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                <span className="d-block fw-medium text-light fs-20">FAQ</span>
              </div>
              <h2 className="text-light mb-10" data-cue="fadeIn">
                Frequently Asked Questions
              </h2>
              <p className="text-light-75" data-cue="fadeIn">
                Straight answers about how N0DE improves gaming, streaming, and
                day-to-day connectivity, without changing your ISP or your setup
                flow.
              </p>
              <p className="mb-0 text-light-75" data-cue="fadeIn">
                If you do not see your question here, reach out and we will help
                you choose the right solution for you.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="bg-dark-gradient p-6 p-xl-8 rounded-5">
                <div
                  className="accordion accordion--dark accordion-separate-body accordion--faq"
                  id="faqAccordion"
                  data-cues="fadeIn"
                >
                  {/* Q1 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPerf">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqPerf"
                        aria-expanded="true"
                        aria-controls="faqPerf"
                      >
                        What impact will N0DE have on my network performance?
                      </button>
                    </h2>
                    <div
                      id="faqPerf"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingPerf"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-dark">
                        You will notice a clear increase in stability, with
                        fewer latency spikes and less jitter. N0DE reduces
                        latency fluctuation and smooths throughput so real-time
                        apps feel snappier.
                        <br />
                        <br />
                        There can be a small decrease in headline bandwidth,
                        typically around 15 percent, due to the extra TCP
                        acceleration and control overheads. Most connections do
                        not use their full rated speed during normal activity,
                        so real-world performance still improves. N0DE fixes
                        fundamental inefficiencies in common internet transport
                        paths, which means you get more usable performance per
                        Mbps even if a speed test shows a slightly lower peak.
                      </div>
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPlatforms">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqPlatforms"
                        aria-expanded="false"
                        aria-controls="faqPlatforms"
                      >
                        Does N0DE support all gaming platforms?
                      </button>
                    </h2>
                    <div
                      id="faqPlatforms"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingPlatforms"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-dark">
                        <p>
                          Yes. N0DE Pro and N0DE MAX improve traffic for PC,
                          PlayStation, Xbox, and Mobile — all at the same time —
                          because the optimization runs on our N0DE-configured
                          CPE and affects all network traffic that passes
                          through it. For best results we recommend devices
                          connect via an ethernet port, but the system delivers
                          Wi‑Fi 6 capability.
                        </p>
                        <p>
                          For our software-only deployment, our current version
                          is Windows but more are coming online soon, including
                          Mobile.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Q: CPE/router requirement */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingCPE">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqCPE"
                        aria-expanded="false"
                        aria-controls="faqCPE"
                      >
                        Why do I need to buy a N0DE CPE/router?
                      </button>
                    </h2>
                    <div
                      id="faqCPE"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingCPE"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-dark">
                        <p>
                          You don't! That is why we have N0DE Lite, a
                          software-only version deployable onto your own
                          individual device (currently only Windows PC
                          available).
                        </p>
                        <p>
                          However, for users seeking full-network optimization
                          or running bandwidth-intensive setups, a standalone
                          N0DE device is essential. To meet this demand, we've
                          engineered a select range of off-the-shelf routers
                          with custom-installed and pre-configured N0DE software
                          — transforming them into powerful edge devices that
                          offload processing and deliver end-to-end optimization
                          across the entire network.
                        </p>
                        <p>
                          These enhanced units do the heavy lifting, ensuring
                          AI-driven traffic prioritization, lag-free gaming, and
                          seamless multi-platform streaming — not just for one
                          device, but for every connection in your environment.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingQoS">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqQoS"
                        aria-expanded="false"
                        aria-controls="faqQoS"
                      >
                        How does N0DE prioritise gaming traffic?
                      </button>
                    </h2>
                    <div
                      id="faqQoS"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingQoS"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-dark">
                        N0DE uses patented QoS techniques with machine learning
                        to classify traffic types and destinations in real time,
                        then applies priority to latency-sensitive flows like
                        game sessions and voice. This keeps ping consistent even
                        when the network is busy with other tasks.
                      </div>
                    </div>
                  </div>

                  {/* Q4 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingISP">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqISP"
                        aria-expanded="false"
                        aria-controls="faqISP"
                      >
                        Does N0DE work with my current internet provider?
                      </button>
                    </h2>
                    <div
                      id="faqISP"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingISP"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-dark">
                        Yes. N0DE helps you get the most from your existing line
                        and does not require changing ISP or buying more
                        bandwidth. Once installed, the software optimizes
                        throughput and stability automatically with no ongoing
                        management required.
                      </div>
                    </div>
                  </div>

                  {/* Q5 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPlans">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqPlans"
                        aria-expanded="false"
                        aria-controls="faqPlans"
                      >
                        Which N0DE subscription is right for me?
                      </button>
                    </h2>
                    <div
                      id="faqPlans"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingPlans"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-dark">
                        <h6 className="text-light">N0DE LITE</h6>
                        <p>
                          Ideal for casual gamers and consumers who want
                          smoother gaming, streaming, broadcasting, video calls,
                          and faster downloads/uploads on a single device.
                        </p>
                        <br />
                        <h6 className="text-light">N0DE PRO</h6>
                        <p>
                          For power users with multiple devices that need
                          consistent low latency and higher overall throughput.
                          Popular with professional creators and competitive
                          players.
                        </p>
                        <br />
                        <h6 className="text-light">N0DE MAX</h6>
                        <p>
                          Built for eSports teams, gaming centers, practice
                          rooms, corporate providers, enterprise networks, and
                          mixed use facilities that need the highest performance
                          across many devices at once.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /col */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqHomeOne;
