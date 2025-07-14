import { Link } from "react-router-dom";

const FooterOne = ({ style_2 }: any) => {
  return (
    <footer className={`${style_2 ? "footer-2" : "footer-1"} overflow-hidden`}>
      <div className="container px-4">
        <div className="row gy-4 justify-content-center">
          <div className="col-12 col-md-6 col-xl-4">
            <Link to="/" className="logo d-block mb-4">
              <img
                src="assets/img/logo-light.png"
                alt="logo"
                className="logo__img"
              />
            </Link>
            <p className="mb-4 text-light text-opacity-70">
              Many desktop publishing packages and web page editors now use
              as their default
            </p>
            <h6 className="text-light mb-3">Join Our Newsletter</h6>
            <div className="d-flex align-items-center border-bottom border-light border-opacity-50">
              <input
                className="form-control bg-transparent border-0 px-0 text-light"
                type="email"
                placeholder="Email Address"
              />
              <button
                type="submit"
                className="border-0 bg-transparent d-inline-block flex-shrink-0 text-light px-2"
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-xl-8">
            <div className="row gy-4">
              <div className="col-6 col-sm-6 col-md-3">
                <h5 className="text-light mb-4">Company</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <Link to="/about" className="text-light text-opacity-70 text-decoration-none">
                      About Us
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/service" className="text-light text-opacity-70 text-decoration-none">
                      Our Mission
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/about" className="text-light text-opacity-70 text-decoration-none">
                      Company History
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/about" className="text-light text-opacity-70 text-decoration-none">
                      Testimonials
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/contact" className="text-light text-opacity-70 text-decoration-none">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <h5 className="text-light mb-4">Support</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <Link to="/contact" className="text-light text-opacity-70 text-decoration-none">
                      Contact Us
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/about" className="text-light text-opacity-70 text-decoration-none">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/about" className="text-light text-opacity-70 text-decoration-none">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/about" className="text-light text-opacity-70 text-decoration-none">
                      Cookies
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/faq" className="text-light text-opacity-70 text-decoration-none">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <h5 className="text-light mb-4">Product</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <Link to="/blog-list" className="text-light text-opacity-70 text-decoration-none">
                      Recents
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/blog" className="text-light text-opacity-70 text-decoration-none">
                      Upcoming
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/service" className="text-light text-opacity-70 text-decoration-none">
                      Builder
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/about" className="text-light text-opacity-70 text-decoration-none">
                      On Sale
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/contact" className="text-light text-opacity-70 text-decoration-none">
                      Live Demo
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <h5 className="text-light mb-4">Follow Us</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <a href="#" className="text-light text-opacity-70 text-decoration-none">
                      Facebook
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-light text-opacity-70 text-decoration-none">
                      Twitter
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-light text-opacity-70 text-decoration-none">
                      Instagram
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-light text-opacity-70 text-decoration-none">
                      LinkedIn
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-light text-opacity-70 text-decoration-none">
                      Pinterest
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top border-light border-opacity-10 mt-5">
        <div className="container px-4">
          <div className="row py-4 align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0 text-light text-opacity-70">
                © {new Date().getFullYear()} All Rights Reserved
              </p>
            </div>
            <div className="col-12 col-md-6 text-center text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <a href="#" className="text-light text-opacity-70 text-decoration-none">
                    Terms of Service
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-light text-opacity-70 text-decoration-none">
                    Privacy Policy
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-light text-opacity-70 text-decoration-none">
                    Cookie Policy
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
  );
};

export default FooterOne;
