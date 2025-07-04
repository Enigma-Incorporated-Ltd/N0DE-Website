import { Link } from "react-router-dom";

 

const HeroArea = () => {
	return (
		<>
			<div className="hero-1--container">
				<div className="hero-1">
					<div className="section-space-y">
						<div className="container">
							<div className="row g-4 align-items-center">
								<div className="col-lg-7 col-xl-6">
									<div
										className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
										data-cue="fadeIn"
									>
										<div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
										<span className="d-block fw-medium text-light fs-20">
											The Ultimate Gaming Network
										</span>
									</div>
									<h1 className="text-light" data-cue="fadeIn">  <span className="text-gradient-primary">GOOD GAME</span>
									</h1>
									<p className="text-light mb-8 max-text-11" data-cue="fadeIn">
										triple-tier network for zero-lag gaming.
										Smart traffic steering and dynamic failover deliver unwavering stability.
										Easy install, instant speed: the edge you need
									</p>
									<div
										className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-6"
										data-cue="fadeIn"
									>
										<Link
											to="/contact"
											className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
										>
											<span className="d-inline-block">
												Try N0DE Lite for free
											</span>
											<span className="d-inline-block">
												<i className="bi bi-arrow-right"></i>
											</span>
										</Link>
										<span className="d-inline-block text-light">
											No credit card required
										</span>
									</div>
								</div>
								<div className="col-lg-5 col-xl-6">
									<img
										src="assets/img/hero-img-1.png"
										alt="image"
										className="img-fluid"
										data-cue="fadeIn"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="section-space-md-y">
					<div className="section-space-sm-bottom">
						<div className="container">
							<div className="row">
								<div className="col-12">
									<h3 className="mb-0 text-light text-center" data-cue="fadeIn">
										Cut latency and jitter
										<span className="text-gradient-primary"> 80% </span>
										and speed up downloads by upto
										<span className="text-gradient-primary"> 64x </span>
									</h3>
								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<ul
									className="list list-row flex-wrap justify-content-center align-items-center row-gap-2 column-gap-8 column-gap-xl-12 column-gap-xxl-15"
									data-cues="fadeIn"
									data-group="images"
								>
									<li className="text-center">
										<img
											src="assets/img/brand-img-1.png"
											alt="image"
											className="img-fluid"
										/>
									</li>
									<li className="text-center">
										<img
											src="assets/img/brand-img-2.png"
											alt="image"
											className="img-fluid"
										/>
									</li>
									<li className="text-center">
										<img
											src="assets/img/brand-img-3.png"
											alt="image"
											className="img-fluid"
										/>
									</li>
									<li className="text-center">
										<img
											src="assets/img/brand-img-4.png"
											alt="image"
											className="img-fluid"
										/>
									</li>
									<li className="text-center">
										<img
											src="assets/img/brand-img-5.png"
											alt="image"
											className="img-fluid"
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeroArea;
