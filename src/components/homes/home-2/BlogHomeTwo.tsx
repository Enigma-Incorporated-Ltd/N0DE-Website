import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CmsService, type BlogItem } from "../../../services";

const BlogHomeTwo = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await CmsService.getBlogs();
        setBlogs(allBlogs.slice(0, 3));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date not available";
    try {
      const cleanDate = dateString.replace(/^["']+|["']+$/g, "").trim();
      const date = new Date(cleanDate);
      if (isNaN(date.getTime())) {
        return "Date not available";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Date not available";
    }
  };

  const cleanText = (text: string) => {
    if (!text) return "";
    let cleaned = text.replace(/\\"/g, '"');
    cleaned = cleaned.replace(/[,\s]*["']+$/, "");
    cleaned = cleaned.replace(/^["']+/, "");
    cleaned = cleaned.replace(/["']+$/, "");
    cleaned = cleaned.replace(/,\s*$/, "");
    return cleaned.trim();
  };

  const getImageUrl = (blog: BlogItem) => {
    if (blog.fields?.media && blog.fields.media.length > 0) {
      return blog.fields.media[0].thumbnail_url || blog.fields.media[0].url;
    }
    return "assets/img/blog-img-4.png";
  };

  const getImageAlt = (blog: BlogItem) => {
    if (blog.fields?.media && blog.fields.media.length > 0) {
      return (
        blog.fields.media[0].metadata?.alt_text ||
        blog.fields.media[0].filename ||
        "Blog image"
      );
    }
    return "Blog image";
  };

  const getTitle = (blog: BlogItem) => {
    if (!blog.fields?.title) return "Untitled";
    return cleanText(blog.fields.title);
  };

 

  const getDate = (blog: BlogItem) => {
    const dateValue = blog.fields?.date || blog.published_at;
    if (dateValue) {
      return formatDate(dateValue);
    }
    return "Date not available";
  };

  if (loading) {
    return null;
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
				.blog-card-home-two {
					transition: transform 0.3s ease;
				}
				.blog-card-home-two:hover {
					transform: translateY(-5px);
				}
				.blog-image-wrapper-two {
					position: relative;
					overflow: hidden;
					border-radius: 12px;
					margin-bottom: 1.5rem;
				}
				.blog-image-wrapper-two img {
					transition: transform 0.4s ease;
					width: 100%;
					height: 220px;
					object-fit: cover;
				}
				.blog-image-wrapper-two:hover img {
					transform: scale(1.08);
				}
				.blog-tag-link-two {
					transition: all 0.3s ease;
				}
				.blog-tag-link-two:hover {
					transform: translateY(-2px);
				}
				.blog-title-link-two {
					transition: all 0.3s ease;
				}
				.blog-title-link-two:hover {
					color: var(--bs-primary) !important;
					transform: translateX(5px);
				}
			`}</style>
      <div className="section-space-md-top section-space-bottom">
        <div className="section-space-sm-bottom text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-6">
                <span
                  className="d-block fw-medium text-light fs-20 text-gradient-primary mb-2"
                  data-cue="fadeIn"
                >
                  Latest Blogs
                </span>
                <h2 className="mb-0" data-cue="fadeIn">
                  Our Latest Blogs
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row g-4" data-cues="fadeIn">
            {blogs.map((blog) => {
              return (
                <div
                  key={blog.uuid}
                  className="col-md-6 col-lg-4 blog-card-home-two"
                >
                  <Link
                    to="/blog-details"
                    state={{ uuid: blog.uuid }}
                    className="link d-block blog-image-wrapper-two"
                  >
                    <img
                      src={getImageUrl(blog)}
                      alt={getImageAlt(blog)}
                      className="img-fluid"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "assets/img/blog-img-4.png";
                      }}
                    />
                  </Link>
                  <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
                    <span className="d-inline-flex align-items-center gap-2 fs-12 text-dark text-opacity-50">
                      <i className="bi bi-calendar3"></i>
                      {getDate(blog)}
                    </span>
                  </div>
                  <h5
                    className="mb-0"
                    style={{ lineHeight: "1.4", minHeight: "3rem" }}
                  >
                    <Link
                      to="/blog-details"
                      state={{ uuid: blog.uuid }}
                      className="link d-inline-block text-dark hover:text-primary blog-title-link-two"
                    >
                      {getTitle(blog)}
                    </Link>
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogHomeTwo;
