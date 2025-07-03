const AboutAreaHomeOne = () => {
	return (
		<>
			<div className="section-space-md-y">
				<div className="container">
					<div className="row g-4 justify-content-xxl-between align-items-center">
						<div className="col-lg-6 col-xxl-5">
							<img
								src="assets/img/about-img-1.png"
								alt="image"
								className="img-fluid"
								data-cue="slideInUp"
							/>
						</div>
						<div className="col-lg-6">
							<div
								className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
								data-cue="fadeIn"
							>
								<div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
								<span className="d-block fw-medium text-light fs-20">
									About Us
								</span>
							</div>
							<h2 className="text-light" data-cue="fadeIn">
								We Are Creating Modern & High Quality Software For Your AI
								Chatbots
							</h2>
							<p className="text-light mb-8 max-text-11" data-cue="fadeIn">
								There are many variations of passage available, but the majority
								have suffered alteration in some form, by injected humour, or
								randomised words which don't look good.
							</p>
							<ul className="list gap-6" data-cues="fadeIn">
								<li className="d-flex align-items-center gap-4">
									<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
										<i className="bi bi-arrow-up-right"></i>
									</span>
									<span className="d-block flex-grow-1 fw-medium text-light">
										Free Live Chatbots
									</span>
								</li>
								<li className="d-flex align-items-center gap-4">
									<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
										<i className="bi bi-arrow-up-right"></i>
									</span>
									<span className="d-block flex-grow-1 fw-medium text-light">
										Real Time Language Translation
									</span>
								</li>
								<li className="d-flex align-items-center gap-4">
									<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
										<i className="bi bi-arrow-up-right"></i>
									</span>
									<span className="d-block flex-grow-1 fw-medium text-light">
										13,000+ Websites Use Nor star
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutAreaHomeOne;
