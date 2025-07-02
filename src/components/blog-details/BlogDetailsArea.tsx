import { Link } from "react-router-dom";

 

const BlogDetailsArea = () => {
	return (
		<>
			<div className="section-space-y">
				<div className="container">
					<div className="row g-4">
						<div className="col-lg-8">
							<img
								src="assets/img/blog-img-10.png"
								alt="image"
								className="img-fluid"
							/>
							<div className="d-flex align-items-center row-gap-2 column-gap-6 flex-wrap mt-8 mb-4">
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
							<h3 className="d-inline-block text-light">
								Design System Smashing Design Patterns Are Better Way To
								Collaborate On Your Design System
							</h3>
							<p className="mb-8">
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum deleniti atque corrupti quos
								dolores et quas molestias excepturi sint fuga. Et harum quidem
								rerum facilis est et expedita distinctio.
							</p>
							<div className="d-flex gap-4 bg-primary-gradient rounded-4 p-4 p-md-6 p-xl-8 my-8">
								<div className="d-inline-block flex-shrink-0">
									<img
										src="assets/img/icon-quote-light.png"
										alt="image"
										className="img-fluid"
									/>
								</div>
								<div className="d-inline-block flex-grow-1">
									<span className="d-block text-light mb-3">
										‘’ Embed a little help from our friends from time to time.
										Although we offer the one-stop convenience of annery
										integrated range of legal.’’{" "}
									</span>
									<span className="d-flex align-items-center gap-2">
										<span className="d-inline-block w-10 h-2px bg-light flex-shrink-0"></span>{" "}
										<span className="d-inline-block text-light">
											Peter Parker
										</span>
									</span>
								</div>
							</div>
							<p className="mb-8">
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum deleniti atque corrupti quos
								dolores et quas molestias excepturi sint fuga. Et harum quidem
								rerum facilis est et expedita distinctio.
							</p>
							<div className="section-space-sm-y border-top border-bottom">
								<div className="row g-4 align-items-center">
									<div className="col-md-6">
										<ul className="list list-row align-items-center flex-wrap gap-3">
											<li>
												<span className="d-inline-block fw-bold text-light">
													Tags:
												</span>
											</li>
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Business
												</Link>
											</li>
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Videos
												</Link>
											</li>
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Image
												</Link>
											</li>
										</ul>
									</div>
									<div className="col-md-6">
										<ul className="list list-row align-items-center justify-content-md-end flex-wrap gap-3">
											<li>
												<span className="d-inline-block fw-bold text-light">
													Share:
												</span>
											</li>
											<li>
												<a
													href="#"
													className="link d-grid place-content-center w-8 h-8 rounded-circle text-light border hover:text-primary hover:border-primary"
												>
													<i className="bi bi-facebook"></i>
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-grid place-content-center w-8 h-8 rounded-circle text-light border hover:text-primary hover:border-primary"
												>
													<i className="bi bi-twitter"></i>
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-grid place-content-center w-8 h-8 rounded-circle text-light border hover:text-primary hover:border-primary"
												>
													<i className="bi bi-linkedin"></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="section-space-sm-y border-bottom">
								<h4 className="mb-8 text-light">Comments</h4>
								<ul className="list list-flush list-review">
									<li>
										<div className="d-flex flex-wrap flex-lg-nowrap gap-4 align-items-start pb-4">
											<div className="w-12 h-12 rounded-circle d-grid place-content-center flex-shrink-0">
												<img
													src="assets/img/user-img-8.png"
													alt="image"
													className="w-100 h-100 object-fit-cover"
												/>
											</div>
											<div className="flex-grow-1">
												<div className="d-flex flex-wrap align-items-center justify-content-between mb-2">
													<h6 className="mb-0 fw-semibold text-light">
														Ronald Richards
													</h6>
													<div className="d-flex align-items-center gap-2">
														<span className="d-block fs-12 text-body-secondary">
															13 June, 2018, 7:30pm{" "}
														</span>
														<button
															type="button"
															className="btn btn-sm btn-dark"
														>
															Reply
														</button>
													</div>
												</div>
												<p className="mb-0 fs-14">
													In this challenge, we invite you to unleash your
													imagination and create and imagination incredible
													webpages, website sections, with the Scroll Speed
													Effect
												</p>
											</div>
										</div>
									</li>
									<li>
										<div className="d-flex flex-wrap flex-lg-nowrap gap-4 align-items-start py-4">
											<div className="w-12 h-12 rounded-circle d-grid place-content-center flex-shrink-0">
												<img
													src="assets/img/user-img-9.png"
													alt="image"
													className="w-100 h-100 object-fit-cover"
												/>
											</div>
											<div className="flex-grow-1">
												<div className="d-flex flex-wrap align-items-center justify-content-between mb-2">
													<h6 className="mb-0 fw-semibold text-light">
														Leslie Alexander
													</h6>
													<div className="d-flex align-items-center gap-2">
														<span className="d-block fs-12 text-body-secondary">
															13 June, 2018, 7:30pm{" "}
														</span>
														<button
															type="button"
															className="btn btn-sm btn-dark"
														>
															Reply
														</button>
													</div>
												</div>
												<p className="mb-0 fs-14">
													In this challenge, we invite you to unleash your
													imagination and create and imagination incredible
													webpages, website sections, with the Scroll Speed
													Effect
												</p>
											</div>
										</div>
									</li>
									<li>
										<div className="d-flex flex-wrap flex-lg-nowrap gap-4 align-items-start pt-4">
											<div className="w-12 h-12 rounded-circle d-grid place-content-center flex-shrink-0">
												<img
													src="assets/img/user-img-6.png"
													alt="image"
													className="w-100 h-100 object-fit-cover"
												/>
											</div>
											<div className="flex-grow-1">
												<div className="d-flex flex-wrap align-items-center justify-content-between mb-2">
													<h6 className="mb-0 fw-semibold text-light">
														Annette Black
													</h6>
													<div className="d-flex align-items-center gap-2">
														<span className="d-block fs-12 text-body-secondary">
															13 June, 2018, 7:30pm{" "}
														</span>
														<button
															type="button"
															className="btn btn-sm btn-dark"
														>
															Reply
														</button>
													</div>
												</div>
												<p className="mb-0 fs-14">
													In this challenge, we invite you to unleash your
													imagination and create and imagination incredible
													webpages, website sections, with the Scroll Speed
													Effect
												</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="section-space-sm-top">
								<div className="bg-dark-gradient p-4 p-md-6 p-xl-8 rounded-4">
									<h4 className="text-light">Leave a Reply</h4>
									<p className="fs-14">
										Your email Address Not Be Published. Requied Fields are
										Marked
									</p>
									<div className="row g-4">
										<div className="col-12">
											<label className="form-label fs-14">Your Name</label>
											<div className="form-control--gradient rounded-1">
												<input
													type="text"
													className="form-control border-0 bg-transparent"
												/>
											</div>
										</div>
										<div className="col-12">
											<label className="form-label fs-14">Email Address</label>
											<div className="form-control--gradient rounded-1">
												<input
													type="email"
													className="form-control border-0 bg-transparent"
												/>
											</div>
										</div>
										<div className="col-12">
											<label className="form-label fs-14">
												How can help you?
											</label>
											<div className="form-control--gradient rounded-1">
												<textarea
													className="form-control border-0 bg-transparent"
													rows={4}
												></textarea>
											</div>
										</div>
										<div className="col-12">
											<button className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1 w-100 justify-content-center">
												<span className="d-inline-block">Submit Now </span>
												<span className="d-inline-block">
													<i className="bi bi-arrow-right"></i>
												</span>
											</button>
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
													to="/blog"
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
													to="/blog"
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
													to="/blog"
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
													to="/blog"
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
													to="/blog"
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
													to="/blog"
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
										<h3 className="mb-0 text-gradient-primary">Recent Post</h3>
										<hr className="my-5" />
										<ul className="list gap-4">
											<li>
												<div className="d-flex gap-4 align-items-center">
													<div className="d-grid place-content-center w-12 h-12 flex-shrink-0">
														<img
															src="assets/img/recent-img-1.png"
															alt="image"
															className="img-fluid"
														/>
													</div>
													<div className="flex-grow-1">
														<div className="d-flex align-items-center gap-2 mb-1">
															<span className="d-inline-block fs-12">
																<i className="bi bi-calendar2-check"></i>{" "}
															</span>
															<span className="d-inline-block fs-12">
																23 Oct, 2023
															</span>
														</div>
														<Link
															to="/blog"
															className="link d-inline-block fs-14 fw-medium text-light text-opacity-70 hover:text-opacity-100"
														>
															Popular Search finance Manager Customer
														</Link>
													</div>
												</div>
											</li>
											<li>
												<div className="d-flex gap-4 align-items-center">
													<div className="d-grid place-content-center w-12 h-12 flex-shrink-0">
														<img
															src="assets/img/recent-img-2.png"
															alt="image"
															className="img-fluid"
														/>
													</div>
													<div className="flex-grow-1">
														<div className="d-flex align-items-center gap-2 mb-1">
															<span className="d-inline-block fs-12">
																<i className="bi bi-calendar2-check"></i>{" "}
															</span>
															<span className="d-inline-block fs-12">
																23 Oct, 2023
															</span>
														</div>
														<Link
															to="/blog"
															className="link d-inline-block fs-14 fw-medium text-light text-opacity-70 hover:text-opacity-100"
														>
															Leonardo Da Vinci Can Teach Us About Web
														</Link>
													</div>
												</div>
											</li>
											<li>
												<div className="d-flex gap-4 align-items-center">
													<div className="d-grid place-content-center w-12 h-12 flex-shrink-0">
														<img
															src="assets/img/recent-img-3.png"
															alt="image"
															className="img-fluid"
														/>
													</div>
													<div className="flex-grow-1">
														<div className="d-flex align-items-center gap-2 mb-1">
															<span className="d-inline-block fs-12">
																<i className="bi bi-calendar2-check"></i>{" "}
															</span>
															<span className="d-inline-block fs-12">
																23 Oct, 2023
															</span>
														</div>
														<Link
															to="/blog"
															className="link d-inline-block fs-14 fw-medium text-light text-opacity-70 hover:text-opacity-100"
														>
															Dynamic Donut Charts WIth Tailwlnd Recat
														</Link>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-12">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">Tags:</h3>
										<hr className="my-5" />
										<ul className="list list-row flex-wrap gap-3">
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Business
												</Link>
											</li>
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Videos
												</Link>
											</li>
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Image
												</Link>
											</li>
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Content
												</Link>
											</li>
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Media Post
												</Link>
											</li>
											<li>
												<Link to="/blog" className="btn btn-light btn-sm">
													Design
												</Link>
											</li>
										</ul>
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

export default BlogDetailsArea;
