import { Link } from "react-router-dom";

 
 
const BlogHomeThree = () => {
  return (
    <>
        <div className="section-space-md-top section-space-bottom">
      <div className="section-space-sm-bottom text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6"><span className="d-block fw-medium text-light fs-20 mb-2"
                data-cue="fadeIn">Latest Blogs</span>
              <h2 className="mb-0 text-light" data-cue="fadeIn">Our Latest Blogs</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4" data-cues="fadeIn">
          <div className="col-md-6 col-lg-4"><Link to="/blog-details" className="link d-block mb-6"><img
                src="assets/img/blog-img-4.png" alt="image" className="img-fluid" /></Link>
            <div className="d-flex align-items-center flex-wrap gap-4 mb-2"><Link to="/blog"
                className="link d-inline-block fw-medium text-light hover:text-primary fs-14">Digital </Link><span
                className="d-inline-block fs-12 d-inline-block text-light text-opacity-50">Oct 12, 2024</span></div>
            <h5 className="mb-0"><Link to="/blog-details"
                className="link d-inline-block text-light hover:text-primary">Stories OF Brands That Have Benefited From
                AI</Link></h5>
          </div>
          <div className="col-md-6 col-lg-4"><Link to="/blog-details" className="link d-block mb-6"><img
                src="assets/img/blog-img-5.png" alt="image" className="img-fluid" /></Link>
            <div className="d-flex align-items-center flex-wrap gap-4 mb-2"><Link to="/blog"
                className="link d-inline-block fw-medium text-light hover:text-primary fs-14">Digital </Link><span
                className="d-inline-block fs-12 d-inline-block text-light text-opacity-50">Oct 12, 2024</span></div>
            <h5 className="mb-0"><Link to="/blog-details"
                className="link d-inline-block text-light hover:text-primary">Software For Startups & Small Business</Link>
            </h5>
          </div>
          <div className="col-md-6 col-lg-4"><Link to="/blog-details" className="link d-block mb-6"><img
                src="assets/img/blog-img-6.png" alt="image" className="img-fluid" /></Link>
            <div className="d-flex align-items-center flex-wrap gap-4 mb-2"><Link to="/blog"
                className="link d-inline-block fw-medium text-light hover:text-primary fs-14">Digital </Link><span
                className="d-inline-block fs-12 d-inline-block text-light text-opacity-50">Oct 12, 2024</span></div>
            <h5 className="mb-0"><Link to="/blog-details" className="link d-inline-block text-light hover:text-primary">THe
                Outstanding Examples of AI In Marketing</Link></h5>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogHomeThree;