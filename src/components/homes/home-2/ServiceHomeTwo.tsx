 
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/bundle';
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

 

const ServiceHomeTwo = () => {
	return (
		<>
			<div className="section-space-md-top section-space-bottom">
				<div className="section-space-sm-bottom">
					<div className="container">
						<div className="row">
							<div className="col-md-8 col-xl-6">
								<div
									className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4"
									data-cue="fadeIn"
								>
									<div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
									<span className="d-block fw-medium text-light fs-20 text-gradient-primary">
										Our Services
									</span>
								</div>
								<h2 className="mb-0" data-cue="fadeIn">
									Our Dynamic Range Of
									<span className="text-gradient-primary">Services</span>
								</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid">
					<div className="row g-0">
						<div className="col-12">
							<div className="service-slider">
								<div className="service-slider__nav mb-4">
									<div className="swiper-button-prev service-slider__nav-prev">
										<img
											src="assets/img/icon-arrow-prev.png"
											alt="image"
											className="img-fluid"
										/>
									</div>
									<div className="swiper-button-next service-slider__nav-next">
										<img
											src="assets/img/icon-arrow-next.png"
											alt="image"
											className="img-fluid"
										/>
									</div>
								</div>
								<Swiper 
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                pagination={{
                  el: ".service-slider__pagination",
                  type: "bullets",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".service-slider__nav-next",
                  prevEl: ".service-slider__nav-prev",
                }}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  576: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                  1920: { slidesPerView: 5 },
                  2100: { slidesPerView: 6 },
                }}
                 className="swiper service-slider__is">
							 
										<SwiperSlide className="swiper-slide">
											<div className="service-slider__slide">
												<img
													src="assets/img/service-slider-img-1.png"
													alt="image"
													className="img-fluid w-100"
												/>
												<div className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
													<h5 className="mb-2">
														<Link
															to="/service-details"
															className="link d-block text-light hover:text-danger"
														>
															Language Processing
														</Link>
													</h5>
													<p className="fs-14">
														Vivamus neck nigh, plellentesque sed felis
													</p>
													<Link
														to="/service-details"
														className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1"
													>
														<span className="d-inline-block">
															View Details
														</span>
														<span className="d-inline-block">
															<i className="bi bi-arrow-right"></i>
														</span>
													</Link>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="service-slider__slide">
												<img
													src="assets/img/service-slider-img-2.png"
													alt="image"
													className="img-fluid w-100"
												/>
												<div className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
													<h5 className="mb-2">
														<Link
															to="/service-details"
															className="link d-block text-light hover:text-danger"
														>
															AI Development
														</Link>
													</h5>
													<p className="fs-14">
														Vivamus neck nigh, plellentesque sed felis
													</p>
													<Link
														to="/service-details"
														className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1"
													>
														<span className="d-inline-block">
															View Details
														</span>
														<span className="d-inline-block">
															<i className="bi bi-arrow-right"></i>
														</span>
													</Link>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="service-slider__slide">
												<img
													src="assets/img/service-slider-img-3.png"
													alt="image"
													className="img-fluid w-100"
												/>
												<div className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
													<h5 className="mb-2">
														<Link
															to="/service-details"
															className="link d-block text-light hover:text-danger"
														>
															Vision Solution
														</Link>
													</h5>
													<p className="fs-14">
														Vivamus neck nigh, plellentesque sed felis
													</p>
													<Link
														to="/service-details"
														className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1"
													>
														<span className="d-inline-block">
															View Details
														</span>
														<span className="d-inline-block">
															<i className="bi bi-arrow-right"></i>
														</span>
													</Link>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="service-slider__slide">
												<img
													src="assets/img/service-slider-img-4.png"
													alt="image"
													className="img-fluid w-100"
												/>
												<div className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
													<h5 className="mb-2">
														<Link
															to="/service-details"
															className="link d-block text-light hover:text-danger"
														>
															Language Processing
														</Link>
													</h5>
													<p className="fs-14">
														Vivamus neck nigh, plellentesque sed felis
													</p>
													<Link
														to="/service-details"
														className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1"
													>
														<span className="d-inline-block">
															View Details
														</span>
														<span className="d-inline-block">
															<i className="bi bi-arrow-right"></i>
														</span>
													</Link>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="service-slider__slide">
												<img
													src="assets/img/service-slider-img-5.png"
													alt="image"
													className="img-fluid w-100"
												/>
												<div className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
													<h5 className="mb-2">
														<Link
															to="/service-details"
															className="link d-block text-light hover:text-danger"
														>
															Chat Processing
														</Link>
													</h5>
													<p className="fs-14">
														Vivamus neck nigh, plellentesque sed felis
													</p>
													<Link
														to="/service-details"
														className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1"
													>
														<span className="d-inline-block">
															View Details
														</span>
														<span className="d-inline-block">
															<i className="bi bi-arrow-right"></i>
														</span>
													</Link>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="service-slider__slide">
												<img
													src="assets/img/service-slider-img-1.png"
													alt="image"
													className="img-fluid w-100"
												/>
												<div className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
													<h5 className="mb-2">
														<Link
															to="/service-details"
															className="link d-block text-light hover:text-danger"
														>
															Language Processing
														</Link>
													</h5>
													<p className="fs-14">
														Vivamus neck nigh, plellentesque sed felis
													</p>
													<Link
														to="/service-details"
														className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1"
													>
														<span className="d-inline-block">
															View Details
														</span>
														<span className="d-inline-block">
															<i className="bi bi-arrow-right"></i>
														</span>
													</Link>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="service-slider__slide">
												<img
													src="assets/img/service-slider-img-1.png"
													alt="image"
													className="img-fluid w-100"
												/>
												<div className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
													<h5 className="mb-2">
														<Link
															to="/service-details"
															className="link d-block text-light hover:text-danger"
														>
															Language Processing
														</Link>
													</h5>
													<p className="fs-14">
														Vivamus neck nigh, plellentesque sed felis
													</p>
													<Link
														to="/service-details"
														className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1"
													>
														<span className="d-inline-block">
															View Details
														</span>
														<span className="d-inline-block">
															<i className="bi bi-arrow-right"></i>
														</span>
													</Link>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="service-slider__slide">
												<img
													src="assets/img/service-slider-img-2.png"
													alt="image"
													className="img-fluid w-100"
												/>
												<div className="service-slider__overlay position-absolute inset-0 p-6 z-1 d-flex flex-column align-items-start justify-content-end">
													<h5 className="mb-2">
														<Link
															to="/service-details"
															className="link d-block text-light hover:text-danger"
														>
															AI Development
														</Link>
													</h5>
													<p className="fs-14">
														Vivamus neck nigh, plellentesque sed felis
													</p>
													<Link
														to="/service-details"
														className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1"
													>
														<span className="d-inline-block">
															View Details
														</span>
														<span className="d-inline-block">
															<i className="bi bi-arrow-right"></i>
														</span>
													</Link>
												</div>
											</div>
										</SwiperSlide>
							 
								</Swiper>
								<div className="swiper-pagination service-slider__pagination mt-4"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServiceHomeTwo;
