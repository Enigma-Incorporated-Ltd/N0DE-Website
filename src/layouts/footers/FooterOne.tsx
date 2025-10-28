import { Link } from "react-router-dom";

 
const FooterOne = ({ style_2 }: any) => {
	return (
		<>
			<footer className={`${style_2 ? "footer-2" : "footer-1"}`}>
				<div className="section-space-md-y">
					<div className="container">
						<div className="row g-4">
							<div className="col-md-6 col-xl-4">
								<Link to="/" className="logo d-block mb-6">
									<img
										src="assets/img/logo-light.png"
										alt="logo"
										className="logo__img"
									/>
								</Link>
								<p className="mb-6">
									Many desktop publishing packages and web page editors now use
									as their default
								</p>
								<h6 className="text-light">Join On Our Newsletter</h6>
								<div className="d-flex align-items-center border-bottom border-light border-opacity-50">
									<input
										className="form-control bg-transparent border-0 flex-grow-1"
										type="email"
										placeholder="Email Address"
									/>
									<button
										type="submit"
										className="border-0 bg-transparent d-inline-block flex-shrink-0 text-light"
									>
										<i className="bi bi-arrow-right"></i>
									</button>
								</div>
							</div>
							<div className="col-xl-8">
								<div className="row g-4">
									<div className="col-sm-6 col-md-3">
										<h5 className="text-light mb-8">Company</h5>
										<ul className="list gap-2">
											<li>
												<Link
													to="/about"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													About Us
												</Link>
											</li>
											<li>
												<Link
													to="/service"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Our Mission
												</Link>
											</li>
											<li>
												<Link
													to="/about"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Company History
												</Link>
											</li>
											<li>
												<Link
													to="/about"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Testimonials
												</Link>
											</li>
											<li>
												<Link
													to="/contact"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Careers
												</Link>
											</li>
										</ul>
									</div>
									<div className="col-sm-6 col-md-3">
										<h5 className="text-light mb-8">Support</h5>
										<ul className="list gap-2">
											<li>
												<Link
													to="/contact"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Contact Us
												</Link>
											</li>
											<li>
												<Link
													to="/about"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Privacy Policy
												</Link>
											</li>
											<li>
												<Link
													to="/about"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Terms Conditions
												</Link>
											</li>
											<li>
												<Link
													to="/about"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Cookies
												</Link>
											</li>
											<li>
												<Link
													to="/faq"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Faq
												</Link>
											</li>
										</ul>
									</div>
									<div className="col-sm-6 col-md-3">
										<h5 className="text-light mb-8">Product</h5>
										<ul className="list gap-2">
											<li>
												<Link
													to="/blog-list"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Recents
												</Link>
											</li>
											<li>
												<Link
													to="/blog"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Upcoming
												</Link>
											</li>
											<li>
												<Link
													to="/service"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Builder
												</Link>
											</li>
											<li>
												<Link
													to="/about"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													On Sale
												</Link>
											</li>
											<li>
												<Link
													to="/contact"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Live Demo
												</Link>
											</li>
										</ul>
									</div>
									<div className="col-sm-6 col-md-3">
										<h5 className="text-light mb-8">Follow Us</h5>
										<ul className="list gap-2">
											<li>
												<a
													href="#"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Facebook
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Twitter
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Instagram
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Linkedin
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
												>
													Pinterest
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="section-space-xsm-y">
					<div className="container">
						<div className="row g-4 align-items-center">
							<div className="col-md-6">
								<p className="mb-0 fs-14">
									{new Date().getFullYear()} &copy; All CopyCopyright Reserved
								</p>
							</div>
							<div className="col-md-6">
								<ul className="list list-row justify-content-md-end row-gap-2 column-gap-4">
									<li>
										<a
											href="#"
											className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
										>
											Teams Of Services
										</a>
									</li>
									<li>
										<a
											href="#"
											className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
										>
											Privacy Policy
										</a>
									</li>
									<li>
										<a
											href="#"
											className="link d-inline-block text-light text-opacity-70 hover:text-opacity-100 fs-14"
										>
											Cooke Policy
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{style_2 && (
					<>
						<img src="assets/img/hero-2-shape-1.png" alt="image" className="img-fluid footer-2__shape-2" />
						<img src="assets/img/hero-2-shape-2.png" alt="image" className="img-fluid footer-2__shape-1" />
					</>
				)}
			</footer>
		</>
	);
};

export default FooterOne;
