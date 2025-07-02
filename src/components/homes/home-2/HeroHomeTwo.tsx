 
const HeroHomeTwo = () => {
	return (
		<>
			<div className="hero-2 bg-dark">
				<div className="section-space-y">
					<div className="container">
						<div className="row g-4">
							<div className="col-md-10 col-lg-8">
								<div
									className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
									data-cue="fadeIn"
								>
									<div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
									<span className="d-block fw-medium text-light fs-20">
										Welcome Image Generate
									</span>
								</div>
								<h1 className="text-light" data-cue="fadeIn">
									The AI Content Platform
									<span className="text-gradient-primary">Image Generate</span>
								</h1>
								<p className="text-light mb-12 max-text-11" data-cue="fadeIn">
									It is a long established fact that a reader will be distracted
									by the readable content of a page when looking at its layout.
									The point of using it has a more-or less normal of letters, as
									more.
								</p>
								<div
									className="d-flex align-items-center max-text-11 rounded p-2 newsletter-1 mb-4"
									data-cue="fadeIn"
								>
									<input
										type="text"
										className="form-control border-0 bg-transparent"
										placeholder="Write a prompt"
									/>
									<button className="btn btn-primary-gradient text-light border-0">
										Generate
									</button>
								</div>
								<div className="d-flex flex-wrap row-gap-2 column-gap-4">
									<p className="mb-0 fw-medium" data-cue="fadeIn">
										Popular Tags:
									</p>
									<ul
										className="list list-row flex-wrap gap-2"
										data-cues="fadeIn"
									>
										<li>
											<a
												href="#"
												className="link fs-12 bg-light bg-opacity-10 px-2 py-1 rounded-1 text-light text-opacity-70"
											>
												Creative
											</a>
										</li>
										<li>
											<a
												href="#"
												className="link fs-12 bg-light bg-opacity-10 px-2 py-1 rounded-1 text-light text-opacity-70"
											>
												Sports
											</a>
										</li>
										<li>
											<a
												href="#"
												className="link fs-12 bg-light bg-opacity-10 px-2 py-1 rounded-1 text-light text-opacity-70"
											>
												Animation
											</a>
										</li>
										<li>
											<a
												href="#"
												className="link fs-12 bg-light bg-opacity-10 px-2 py-1 rounded-1 text-light text-opacity-70"
											>
												Fantacy
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-4 d-none d-lg-block" data-cues="fadeIn">
								<div className="d-inline-block position-relative z-1 hero-2-img">
									<img
										src="assets/img/hero-2-img.png"
										alt="image"
										className="img-fluid"
									/>
									<img
										src="assets/img/hero-2-shape-2.png"
										alt="image"
										className="img-fluid d-none d-xl-block position-absolute z-n1 hero-2-img__1"
									/>
									<img
										src="assets/img/hero-2-shape-1.png"
										alt="image"
										className="img-fluid d-none d-xl-block position-absolute z-n1 hero-2-img__2"
									/>
									<img
										src="assets/img/hero-2-shape-3.png"
										alt="image"
										className="img-fluid d-none d-xl-block position-absolute z-n1 hero-2-img__3"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeroHomeTwo;
