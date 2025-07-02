import { Link } from 'react-router-dom';

 
if(typeof window !== "undefined") { 
  import('bootstrap/dist/js/bootstrap.bundle.min.js');

}

const ServiceDetailsArea = () => {
	return (
		<>
			<div className="section-space-y">
				<div className="container">
					<div className="row g-4">
						<div className="col-lg-8">
							<img
								src="assets/img/service-details-img-1.png"
								alt="image"
								className="img-fluid"
							/>
							<div className="d-flex align-items-center row-gap-2 column-gap-6 flex-wrap mt-6 mb-8">
								<div className="d-flex row-gap-2 column-gap-3 align-items-center">
									<span className="d-inline-block flex-shrink-0">
										<i className="bi bi-calendar2-minus"></i>
									</span>
									<p className="mb-0 flex-shrink-0 fs-14">23, Oct 2023</p>
								</div>
								<div className="d-flex row-gap-2 column-gap-3 align-items-center">
									<span className="d-inline-block flex-shrink-0">
										<i className="bi bi-people"></i>
									</span>
									<p className="mb-0 flex-shrink-0 fs-14">By Admin</p>
								</div>
								<div className="d-flex row-gap-2 column-gap-3 align-items-center">
									<span className="d-inline-block flex-shrink-0">
										<i className="bi bi-chat-square-dots"></i>
									</span>
									<p className="mb-0 flex-shrink-0 fs-14">Comment</p>
								</div>
							</div>
							<h2 className="text-light">Embracing Multilingual Support</h2>
							<p>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum deleniti atque corrupti quos
								dolores et quas molestias excepturi sint fuga. Et harum quidem
								rerum facilis est et expedita distinctio.
							</p>
							<p>
								But I must explain to you how all this mistaken idea of
								denouncing pleasure and praising pain was born and I will give
								you a complete account of the system and expound the actual
								teachings of the great explorer of the truth the master-builder
								of human happiness.
							</p>
							<p className="mb-8">
								No one rejects dislikes or avoids pleasure itself because it is
								pleasure but because those who do not know how to pursue
								pleasure rationally encounter consequences that are extremely
								painful. Nor again is there anyone who loves or pursues or
								desires to obtain pain of itself because it is pain but because
								occasionally circumstances occur.
							</p>
							<Link
								to="/about"
								className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
							>
								<span className="d-inline-block">Get Started </span>
								<span className="d-inline-block">
									<i className="bi bi-arrow-right"></i>
								</span>
							</Link>
							<div className="section-space-md-y">
								<div className="row g-4">
									<div className="col-xl-6">
										<img
											src="assets/img/service-details-img-2.png"
											alt="image"
											className="img-fluid"
										/>
									</div>
									<div className="col-xl-6">
										<h3 className="text-light">Website Localization</h3>
										<p className="mb-6">
											At vero eos et accusamus et iusto odio dignissimos ducimus
											qui blanditiis praesentium voluptatum deleniti
										</p>
										<ul className="list gap-6">
											<li className="d-flex align-items-center gap-4">
												<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
													<i className="bi bi-arrow-up-right"></i>{" "}
												</span>
												<span className="d-block flex-grow-1 fw-medium text-light">
													Free Live Chatbots
												</span>
											</li>
											<li className="d-flex align-items-center gap-4">
												<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
													<i className="bi bi-arrow-up-right"></i>{" "}
												</span>
												<span className="d-block flex-grow-1 fw-medium text-light">
													Real Time Language Translation
												</span>
											</li>
											<li className="d-flex align-items-center gap-4">
												<span className="d-grid place-content-center flex-shrink-0 w-6 h-6 rounded-circle bg-primary-gradient text-light fs-14">
													<i className="bi bi-arrow-up-right"></i>{" "}
												</span>
												<span className="d-block flex-grow-1 fw-medium text-light">
													13,000+ Websites Use Nor star
												</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div
								className="accordion accordion--dark accordion-separate-body accordion--faq"
								id="faqAccordion"
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
											Many desktop publishing packages and web page editors now
											uand a search for will uncover many web sites still in
											their infancy.
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
											Many desktop publishing packages and web page editors now
											uand a search for will uncover many web sites still in
											their infancy.
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
											Many desktop publishing packages and web page editors now
											uand a search for will uncover many web sites still in
											their infancy.
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
											Many desktop publishing packages and web page editors now
											uand a search for will uncover many web sites still in
											their infancy.
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="row g-4">
								<div className="col-12">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">
											Service Lists
										</h3>
										<hr className="my-5" />
										<ul className="list gap-4">
											<li>
												<Link
													to="/service-details"
													className="link d-flex justify-content-between align-items-center gap-3 text-light hover:text-primary group"
												>
													<span className="d-block flex-grow-1">
														Article Generation{" "}
													</span>
													<span className="d-grid place-content-center w-6 h-6 rounded-circle bg-light text-dark group-hover:bg-primary transition">
														<i className="bi bi-chevron-right"></i>
													</span>
												</Link>
											</li>
											<li>
												<Link
													to="/service-details"
													className="link d-flex justify-content-between align-items-center gap-3 text-light hover:text-primary group"
												>
													<span className="d-block flex-grow-1">
														Ecommerce Copy{" "}
													</span>
													<span className="d-grid place-content-center w-6 h-6 rounded-circle bg-light text-dark group-hover:bg-primary transition">
														<i className="bi bi-chevron-right"></i>
													</span>
												</Link>
											</li>
											<li>
												<Link
													to="/service-details"
													className="link d-flex justify-content-between align-items-center gap-3 text-light hover:text-primary group"
												>
													<span className="d-block flex-grow-1">
														Sales Copy{" "}
													</span>
													<span className="d-grid place-content-center w-6 h-6 rounded-circle bg-light text-dark group-hover:bg-primary transition">
														<i className="bi bi-chevron-right"></i>
													</span>
												</Link>
											</li>
											<li>
												<Link
													to="/service-details"
													className="link d-flex justify-content-between align-items-center gap-3 text-light hover:text-primary group"
												>
													<span className="d-block flex-grow-1">
														Social media Content{" "}
													</span>
													<span className="d-grid place-content-center w-6 h-6 rounded-circle bg-light text-dark group-hover:bg-primary transition">
														<i className="bi bi-chevron-right"></i>
													</span>
												</Link>
											</li>
											<li>
												<Link
													to="/service-details"
													className="link d-flex justify-content-between align-items-center gap-3 text-light hover:text-primary group"
												>
													<span className="d-block flex-grow-1">Ad Copy </span>
													<span className="d-grid place-content-center w-6 h-6 rounded-circle bg-light text-dark group-hover:bg-primary transition">
														<i className="bi bi-chevron-right"></i>
													</span>
												</Link>
											</li>
											<li>
												<Link
													to="/service-details"
													className="link d-flex justify-content-between align-items-center gap-3 text-light hover:text-primary group"
												>
													<span className="d-block flex-grow-1">
														Startup tools{" "}
													</span>
													<span className="d-grid place-content-center w-6 h-6 rounded-circle bg-light text-dark group-hover:bg-primary transition">
														<i className="bi bi-chevron-right"></i>
													</span>
												</Link>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-12">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">Download</h3>
										<hr className="my-5" />
										<ul className="list gap-4">
											<li>
												<a
													href="#"
													className="link d-flex justify-content-between align-items-center gap-3 text-light hover:text-primary group"
												>
													<span className="d-block flex-grow-1">
														Company Profile{" "}
													</span>
													<span className="d-grid place-content-center w-6 h-6 text-light group-hover:text-primary transition">
														<i className="bi bi-chevron-right"></i>
													</span>
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-flex justify-content-between align-items-center gap-3 text-light hover:text-primary group"
												>
													<span className="d-block flex-grow-1">
														Zip Download{" "}
													</span>
													<span className="d-grid place-content-center w-6 h-6 text-light group-hover:text-primary transition">
														<i className="bi bi-chevron-right"></i>
													</span>
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-12">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">Need Help?</h3>
										<hr className="my-5" />
										<h5 className="text-gradient-primary">(00) 123-456-6789</h5>
										<p className="mb-0">
											At vero eos et accusamus et iusto odio quos dignissimos
											ducimus qui blanditiis quos praesentium voluptatum
											deleniti atque corrupti quos dolores.
										</p>
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

export default ServiceDetailsArea;
