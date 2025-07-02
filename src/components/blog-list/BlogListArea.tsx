import { Link } from "react-router-dom";

 

const BlogListArea = () => {
	return (
		<>
			<div className="section-space-y">
				<div className="container">
					<div className="row g-4">
						<div className="col-lg-8">
							<ul className="list gap-12" data-cues="fadeIn">
								<li>
									<Link to="/blog-details" className="link d-inline-block">
										<img
											src="assets/img/blog-img-10.png"
											alt="image"
											className="img-fluid"
										/>
									</Link>
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
									<h3 className="d-inline-block">
										<Link
											to="/blog-details"
											className="link d-inline-block text-light hover:text-primary"
										>
											Design System Smashing Design Patterns Are Better Way To
											Collaborate On Your Design System
										</Link>
									</h3>
									<p className="mb-8">
										At vero eos et accusamus et iusto odio dignissimos ducimus
										qui blanditiis praesentium voluptatum deleniti atque
										corrupti quos dolores et quas molestias excepturi sint fuga.
										Et harum quidem rerum facilis est et expedita distinctio.
									</p>
									<Link
										to="/blog-details"
										className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
									>
										<span className="d-inline-block">Get Started </span>
										<span className="d-inline-block">
											<i className="bi bi-arrow-right"></i>
										</span>
									</Link>
								</li>
								<li>
									<Link to="/blog-details" className="link d-inline-block">
										<img
											src="assets/img/blog-img-11.png"
											alt="image"
											className="img-fluid"
										/>
									</Link>
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
									<h3 className="d-inline-block">
										<Link
											to="/blog-details"
											className="link d-inline-block text-light hover:text-primary"
										>
											Design System Smashing Design Patterns Are Better Way To
											Collaborate On Your Design System
										</Link>
									</h3>
									<p className="mb-8">
										At vero eos et accusamus et iusto odio dignissimos ducimus
										qui blanditiis praesentium voluptatum deleniti atque
										corrupti quos dolores et quas molestias excepturi sint fuga.
										Et harum quidem rerum facilis est et expedita distinctio.
									</p>
									<Link
										to="/blog-details"
										className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
									>
										<span className="d-inline-block">Get Started </span>
										<span className="d-inline-block">
											<i className="bi bi-arrow-right"></i>
										</span>
									</Link>
								</li>
								<li>
									<div className="d-flex gap-4 bg-primary-gradient rounded-4 p-4 p-md-6 p-xl-8">
										<div className="d-inline-block flex-shrink-0">
											<img
												src="assets/img/icon-quote-light.png"
												alt="image"
												className="img-fluid"
											/>
										</div>
										<div className="d-inline-block flex-grow-1">
											<span className="d-block text-light mb-3">
												‘’ Embed a little help from our friends from time to
												time. Although we offer the one-stop convenience of
												annery integrated range of legal.’’{" "}
											</span>
											<span className="d-flex align-items-center gap-2">
												<span className="d-inline-block w-10 h-2px bg-light flex-shrink-0"></span>{" "}
												<span className="d-inline-block text-light">
													Peter Parker
												</span>
											</span>
										</div>
									</div>
								</li>
								<li>
									<Link to="/blog-details" className="link d-inline-block">
										<img
											src="assets/img/blog-img-12.png"
											alt="image"
											className="img-fluid"
										/>
									</Link>
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
									<h3 className="d-inline-block">
										<Link
											to="/blog-details"
											className="link d-inline-block text-light hover:text-primary"
										>
											Design System Smashing Design Patterns Are Better Way To
											Collaborate On Your Design System
										</Link>
									</h3>
									<p className="mb-8">
										At vero eos et accusamus et iusto odio dignissimos ducimus
										qui blanditiis praesentium voluptatum deleniti atque
										corrupti quos dolores et quas molestias excepturi sint fuga.
										Et harum quidem rerum facilis est et expedita distinctio.
									</p>
									<Link
										to="/blog-details"
										className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
									>
										<span className="d-inline-block">Get Started </span>
										<span className="d-inline-block">
											<i className="bi bi-arrow-right"></i>
										</span>
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-lg-4">
							<div className="row g-4">
								<div className="col-12" data-cue="fadeIn">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">
											Service Lists
										</h3>
										<hr className="my-5" />
										<ul className="list gap-4">
											<li>
												<Link
													to="/blog-details"
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
													to="/blog-details"
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
													to="/blog-details"
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
													to="/blog-details"
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
													to="/blog-details"
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
													to="/blog-details"
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
								<div className="col-12" data-cue="fadeIn">
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
															to="/blog-details"
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
															to="/blog-details"
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
															to="/blog-details"
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
								<div className="col-12" data-cue="fadeIn">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">Tags:</h3>
										<hr className="my-5" />
										<ul className="list list-row flex-wrap gap-3">
											<li>
												<Link
													to="/blog-details"
													className="btn btn-light btn-sm"
												>
													Business
												</Link>
											</li>
											<li>
												<Link
													to="/blog-details"
													className="btn btn-light btn-sm"
												>
													Videos
												</Link>
											</li>
											<li>
												<Link
													to="/blog-details"
													className="btn btn-light btn-sm"
												>
													Image
												</Link>
											</li>
											<li>
												<Link
													to="/blog-details"
													className="btn btn-light btn-sm"
												>
													Content
												</Link>
											</li>
											<li>
												<Link
													to="/blog-details"
													className="btn btn-light btn-sm"
												>
													Media Post
												</Link>
											</li>
											<li>
												<Link
													to="/blog-details"
													className="btn btn-light btn-sm"
												>
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

export default BlogListArea;
