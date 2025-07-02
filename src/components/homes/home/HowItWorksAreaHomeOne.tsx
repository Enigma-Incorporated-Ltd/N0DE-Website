import { Link } from "react-router-dom";

 

const HowItWorksAreaHomeOne = ({style_2} : any) => {
	return (
		<>
			<div className={`${style_2 ? "section-space-md-bottom section-space-top" : "section-space-md-y"}`}>
				<div className="section-space-sm-bottom">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-10 col-lg-8 col-xl-6">
								<div
									className="d-flex justify-content-center align-items-center flex-wrap row-gap-2 column-gap-4"
									data-cue="fadeIn"
								>
									<div className="flex-shrink-0 d-inline-block w-10 h-2px bg-primary-gradient"></div>
									<span className="d-block fw-medium text-light fs-20">
										How It Works
									</span>
								</div>
								<h2 className="text-light text-center" data-cue="fadeIn">
									Elevate Your Craft With Our Suggestion
								</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row g-4" data-cues="fadeIn">
						<div className="col-md-6 col-lg-4">
							<div className="process-card rounded-5 p-6 p-xl-10">
								<span className="d-inline-block h2 mb-8 text-light process-card__icon">
									<i className="bi bi-people"></i>
								</span>
								<h5 className="text-light process-card__title">
									Human Like Intelligence
								</h5>
								<p className="mb-8">
									Sed ut perspiciatis unde omnis iste ab illo inventore
									veritatis et quasi architecto vitae explicabo.
								</p>
								<Link
									to="/about"
									className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
								>
									<span className="d-inline-block">Discover </span>
									<span className="d-inline-block">
										<i className="bi bi-arrow-right"></i>
									</span>
								</Link>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="process-card rounded-5 p-6 p-xl-10">
								<span className="d-inline-block h2 mb-8 text-light process-card__icon">
									<i className="bi bi-translate"></i>
								</span>
								<h5 className="text-light process-card__title">
									Natural Language
								</h5>
								<p className="mb-8">
									Sed ut perspiciatis unde omnis iste ab illo inventore
									veritatis et quasi architecto vitae explicabo.
								</p>
								<Link
									to="/about"
									className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
								>
									<span className="d-inline-block">Discover </span>
									<span className="d-inline-block">
										<i className="bi bi-arrow-right"></i>
									</span>
								</Link>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="process-card rounded-5 p-6 p-xl-10">
								<span className="d-inline-block h2 mb-8 text-light process-card__icon">
									<i className="bi bi-gear-wide-connected"></i>
								</span>
								<h5 className="text-light process-card__title">
									Customizable Interface
								</h5>
								<p className="mb-8">
									Sed ut perspiciatis unde omnis iste ab illo inventore
									veritatis et quasi architecto vitae explicabo.
								</p>
								<Link
									to="/about"
									className="btn process-card__btn text-white fs-14 border-0 rounded-pill"
								>
									<span className="d-inline-block">Discover </span>
									<span className="d-inline-block">
										<i className="bi bi-arrow-right"></i>
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HowItWorksAreaHomeOne;
