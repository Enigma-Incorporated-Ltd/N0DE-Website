 
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/bundle';
import { Navigation } from "swiper/modules";
 

const TestimonialHomeTwo = () => {
  return (
    <>
      <div className="section-space-top section-space-md-bottom">
        <div className="section-space-sm-bottom text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                <div className="d-flex justify-content-center align-items-center flex-wrap row-gap-2 column-gap-4"
                  data-cue="fadeIn">
                  <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div><span
                    className="d-block fw-medium text-light fs-20 text-gradient-primary">Testimonials</span>
                </div>
                <h2 data-cue="fadeIn">What Client Say <span className="text-gradient-primary">About Us</span></h2>
                <p className="mb-0 text-dark" data-cue="fadeIn">But I must explain to you how all this mistaken idea of
                  denouncing hum dislikes or avoids pleasure itself because it is pleasure.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <div className="position-relative z-1">
                <Swiper
                slidesPerView={1}
                loop={true}
                navigation={{
                  nextEl: ".testimonial-slider-2__next",
                  prevEl: ".testimonial-slider-2__prev",  
                }}
                modules={[Navigation]}
                 className="swiper testimonial-slider-2">
                  <SwiperSlide className="swiper-slide text-center">
                    <h5>Great Work!</h5>
                    <p className="mb-8 text-dark">But in certain circumstances and owing to the claims of duty or the
                      obligations of business it will frequently occur that pleasures have to be repudiated and annoyances
                      accepted.</p>
                    <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                      <div className="flex-shrink-0"><img src="assets/img/user-img-7.png" alt="image" className="img-fluid" /></div>
                      <div className="d-flex flex-column align-items-start">
                        <h6 className="mb-0">Peter Parker</h6><span className="d-block text-dark fs-14">Catch, CEO</span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide text-center">
                    <h5>Great Work!</h5>
                    <p className="mb-8 text-dark">But in certain circumstances and owing to the claims of duty or the
                      obligations of business it will frequently occur that pleasures have to be repudiated and annoyances
                      accepted.</p>
                    <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                      <div className="flex-shrink-0"><img src="assets/img/user-img-7.png" alt="image" className="img-fluid" /></div>
                      <div className="d-flex flex-column align-items-start">
                        <h6 className="mb-0">Peter Parker</h6><span className="d-block text-dark fs-14">Catch, CEO</span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide text-center">
                    <h5>Great Work!</h5>
                    <p className="mb-8 text-dark">But in certain circumstances and owing to the claims of duty or the
                      obligations of business it will frequently occur that pleasures have to be repudiated and annoyances
                      accepted.</p>
                    <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                      <div className="flex-shrink-0"><img src="assets/img/user-img-7.png" alt="image" className="img-fluid" /></div>
                      <div className="d-flex flex-column align-items-start">
                        <h6 className="mb-0">Peter Parker</h6><span className="d-block text-dark fs-14">Catch, CEO</span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide text-center">
                    <h5>Great Work!</h5>
                    <p className="mb-8 text-dark">But in certain circumstances and owing to the claims of duty or the
                      obligations of business it will frequently occur that pleasures have to be repudiated and annoyances
                      accepted.</p>
                    <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                      <div className="flex-shrink-0"><img src="assets/img/user-img-7.png" alt="image" className="img-fluid" /></div>
                      <div className="d-flex flex-column align-items-start">
                        <h6 className="mb-0">Peter Parker</h6><span className="d-block text-dark fs-14">Catch, CEO</span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide text-center">
                    <h5>Great Work!</h5>
                    <p className="mb-8 text-dark">But in certain circumstances and owing to the claims of duty or the
                      obligations of business it will frequently occur that pleasures have to be repudiated and annoyances
                      accepted.</p>
                    <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                      <div className="flex-shrink-0"><img src="assets/img/user-img-7.png" alt="image" className="img-fluid" /></div>
                      <div className="d-flex flex-column align-items-start">
                        <h6 className="mb-0">Peter Parker</h6><span className="d-block text-dark fs-14">Catch, CEO</span>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className="swiper-button-prev testimonial-slider-2__prev"><img src="assets/img/icon-arrow-prev.png"
                  alt="image" className="img-fluid" /></div>
                <div className="swiper-button-next testimonial-slider-2__next"><img src="assets/img/icon-arrow-next.png"
                  alt="image" className="img-fluid" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialHomeTwo;