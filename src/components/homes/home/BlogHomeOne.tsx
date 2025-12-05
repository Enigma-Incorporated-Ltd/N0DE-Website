import { Link } from "react-router-dom";

const blogPosts = [
  {
    img: "assets/img/blog-img-1.png",
    category: "Creative",
    date: "Oct 12, 2024",
    title: "Generation Create AI Chatbots",
    excerpt:
      "publishing packages and web page editors now use as their default model text, and a search for will uncover many web sites",
  },
  {
    img: "assets/img/blog-img-2.png",
    category: "Realistic",
    date: "Oct 12, 2024",
    title: "A Game-Changer For E-Commerce",
    excerpt:
      "publishing packages and web page editors now use as their default model text, and a search for will uncover many web sites",
  },
  {
    img: "assets/img/blog-img-3.png",
    category: "AI Chatbots",
    date: "Oct 12, 2024",
    title: "Breaking The Barriers of Creativity",
    excerpt:
      "publishing packages and web page editors now use as their default model text, and a search for will uncover many web sites",
  },
];

const BlogHomeOne = ({ style_2 }: any) => {
  return (
    <>
      <div
        className={`${style_2 ? "section-space-md-bottom section-space-top" : "section-space-md-y"}`}
      >
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row g-4 align-items-center" data-cues="fadeIn">
              <div className="col-md-6">
                <h2 className="text-light mb-0">Our Blogs</h2>
              </div>
              <div className="col-md-6">
                <div className="text-md-end">
                  <Link
                    to="/blog"
                    className="btn btn-outline-danger fs-14 rounded-pill"
                  >
                    <span className="d-inline-block">View All Posts</span>
                    <span className="d-inline-block">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row g-4" data-cues="fadeIn">
            {blogPosts.map((post, idx) => (
              <div className="col-md-Link col-xl-4 d-flex" key={idx}>
                <div className="d-flex flex-column h-100 w-100">
                  <Link to="/blog-details" className="link d-block mb-6">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="img-fluid"
                    />
                  </Link>

                  <div className="d-flex align-items-center flex-wrap gap-4 mb-2">
                    <Link
                      to="/blog"
                      className="link d-inline-block text-light hover:text-primary fs-14"
                    >
                      {post.category}
                    </Link>
                    <span className="d-inline-block fs-14 text-light text-opacity-50">
                      {post.date}
                    </span>
                  </div>

                  <h5>
                    <Link
                      to="/blog-details"
                      className="link d-inline-block text-light hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h5>

                  <p className="fs-14 mb-6">{post.excerpt}</p>

                  {/* Button wrapper pushed to bottom */}
                  <div className="mt-auto">
                    <Link
                      to="/blog-details"
                      className="btn btn-sm btn-outline-danger fs-14 rounded-pill"
                    >
                      <span className="d-inline-block">Read More</span>
                      <span className="d-inline-block">
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogHomeOne;
