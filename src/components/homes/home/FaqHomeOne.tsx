 

if (typeof window !== "undefined") {
  // require("bootstrap/dist/js/bootstrap");  
  import('bootstrap/dist/js/bootstrap.bundle.min.js');

}

const FaqHomeOne = () => {
	return (
		<>
			<div className="section-space-md-y">
				<div className="container">
					<div className="row g-4">
						<div className="col-lg-6">
							<div
								className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
								data-cue="fadeIn"
							>
								<div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
								<span className="d-block fw-medium text-light fs-20">FAQ</span>
							</div>
							<h2 className="text-light" data-cue="fadeIn">
								Frequently Asked Questions
							</h2>
							<p data-cue="fadeIn">
								Many desktop publishing packages and web page editors now use as
								their default model text, and a search for will uncover many web
								sites still in their infancy. is untrammelled and when nothing
								prevents our
							</p>
							<p className="mb-0" data-cue="fadeIn">
								Various versions have evolved over the years, sometimes by
								accident sometimes on purpose
							</p>
						</div>
						<div className="col-lg-6">
							<div className="bg-dark-gradient p-6 p-xl-8 rounded-5">
								<div
									className="accordion accordion--dark accordion-separate-body accordion--faq"
									id="faqAccordion"
									data-cues="fadeIn"
								>
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faqAccordion1"
												aria-expanded="true"
												aria-controls="faqAccordion1"
											>
												How Can I Get Started With Power AI’s Services?
											</button>
										</h2>
										<div
											id="faqAccordion1"
											className="accordion-collapse collapse show"
											data-bs-parent="#faqAccordion"
										>
											<div className="accordion-body bg-dark">
												Many desktop publishing packages and web page editors
												now uand a search for will uncover many web sites still
												in their infancy.
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faqAccordion2"
												aria-expanded="false"
												aria-controls="faqAccordion2"
											>
												What is Artificial Intelligence AI?
											</button>
										</h2>
										<div
											id="faqAccordion2"
											className="accordion-collapse collapse"
											data-bs-parent="#faqAccordion"
										>
											<div className="accordion-body bg-dark">
												Many desktop publishing packages and web page editors
												now uand a search for will uncover many web sites still
												in their infancy.
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faqAccordion3"
												aria-expanded="false"
												aria-controls="faqAccordion3"
											>
												What Services Does Power Ai Provide?
											</button>
										</h2>
										<div
											id="faqAccordion3"
											className="accordion-collapse collapse"
											data-bs-parent="#faqAccordion"
										>
											<div className="accordion-body bg-dark">
												Many desktop publishing packages and web page editors
												now uand a search for will uncover many web sites still
												in their infancy.
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faqAccordion4"
												aria-expanded="false"
												aria-controls="faqAccordion4"
											>
												Is Power AI Suitable For Small Businesses?
											</button>
										</h2>
										<div
											id="faqAccordion4"
											className="accordion-collapse collapse"
											data-bs-parent="#faqAccordion"
										>
											<div className="accordion-body bg-dark">
												Many desktop publishing packages and web page editors
												now uand a search for will uncover many web sites still
												in their infancy.
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FaqHomeOne;
