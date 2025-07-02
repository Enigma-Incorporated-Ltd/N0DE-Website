import { Link } from "react-router-dom";

 
const CtaHomeThree = () => {
	return (
		<>
			<div className="cta-section">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div
								className="section-space-md-y text-center px-4 px-sm-6 px-md-15 cta-section__content rounded-4 overflow-hidden"
								data-cue="slideInUp"
							>
								<div className="row justify-content-center">
									<div className="col-xl-10">
										<h2 className="text-light">
											Customize Powered Content Generator Driven By AI
											Innovation
										</h2>
										<p className="mb-8">
											Gipo used AI to Provide Personalized Powered Experiences
											for students
										</p>
										<Link
											to="/faq"
											className="btn btn-light fs-14 border-0 rounded-pill"
										>
											<span className="d-inline-block">Read More </span>
											<span className="d-inline-block">
												<i className="bi bi-arrow-right"></i>
											</span>
										</Link>
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

export default CtaHomeThree;
