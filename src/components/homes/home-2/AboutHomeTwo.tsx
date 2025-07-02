import { Link } from "react-router-dom";

 

const AboutHomeTwo = () => {
	return (
		<>
			<div className="section-space-top section-space-md-bottom">
				<div className="container">
					<div className="row g-4 justify-content-between align-items-center">
						<div className="col-lg-4">
							<div
								className="d-inline-block position-relative"
								data-cues="fadeIn"
							>
								<img
									src="assets/img/about-img-2.png"
									alt="image"
									className="img-fluid"
								/>
								<img
									src="assets/img/about-img-2-btn.png"
									alt="image"
									className="img-fluid position-absolute top-50 end-0 about-img-btn"
								/>
							</div>
						</div>
						<div className="col-lg-7">
							<div
								className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
								data-cue="fadeIn"
							>
								<div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
								<span className="d-block fw-medium text-light fs-20 text-gradient-primary">
									About Us
								</span>
							</div>
							<h2 data-cue="fadeIn">
								Imagination With AI Image
								<span className="text-gradient-primary">Generation</span>
							</h2>
							<p className="max-text-11 text-dark" data-cue="fadeIn">
								But I must explain to you how all this mistaken idea of
								denouncing hum dislikes or avoids pleasure itself because it is
								pleasure.
							</p>
							<p className="mb-8 max-text-11 text-dark" data-cue="fadeIn">
								It is a long established fact that a reader will be distracted
								by the readable content of a page when looking at its layout.
							</p>
							<div
								className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-6"
								data-cues="fadeIn"
							>
								<Link
									to="/about"
									className="btn btn-lg btn-primary-gradient text-white fs-16 border-0"
								>
									<span className="d-inline-block">Read More </span>
									<span className="d-inline-block">
										<i className="bi bi-arrow-right"></i>
									</span>
								</Link>
								<span className="d-flex align-items-center flex-wrap gap-2">
									<img
										src="assets/img/avatar-group.png"
										alt="image"
										className="img-fluid flex-shrink-0"
									/>
									<span className="d-block text-dark fw-semibold">
										<span className="text-gradient-primary">20+ Our</span> AI
										Enginee
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutHomeTwo;
