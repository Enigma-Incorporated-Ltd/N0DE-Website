import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CmsService, type BlogItem } from "../../../services";

const BlogHomeOne = ({ style_2 }: any) => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await CmsService.getBlogs();
        // Limit to first 3 blogs for home page
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

  const stripHtmlTags = (html: string) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    let text = tmp.textContent || tmp.innerText || "";
    text = text.replace(/\\"/g, '"').replace(/\\n/g, " ").trim();
    return text;
  };

  const getImageUrl = (blog: BlogItem) => {
    if (blog.fields?.media && blog.fields.media.length > 0) {
      return blog.fields.media[0].thumbnail_url || blog.fields.media[0].url;
    }
    return "assets/img/blog-img-1.png";
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

  const getOverview = (blog: BlogItem) => {
    if (blog.fields?.overview) {
      const overview = cleanText(blog.fields.overview);
      if (overview) return stripHtmlTags(overview);
    }
    if (blog.fields?.comment) {
      const comment = cleanText(blog.fields.comment);
      if (comment) return stripHtmlTags(comment);
    }
    if (blog.fields?.["long-text"]) {
      const text = stripHtmlTags(blog.fields["long-text"]);
      return text.length > 100 ? text.substring(0, 100) + "..." : text;
    }
    return "No description available";
  };

  const getDate = (blog: BlogItem) => {
    const dateValue = blog.fields?.date || blog.published_at;
    if (dateValue) {
      return formatDate(dateValue);
    }
    return "Date not available";
  };

  const getFirstTag = (blog: BlogItem) => {
    if (!blog.fields?.tag) return null;
    const tagString = cleanText(blog.fields.tag);
    const tags = tagString.split(/\s+/).filter((tag) => tag.startsWith("#"));
    return tags.length > 0 ? tags[0].replace(/^#/, "") : null;
  };

  if (loading) {
    return null; // Don't show anything while loading
  }

  if (blogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <>
      <style>{`
				.blog-card-home {
					transition: transform 0.3s ease, box-shadow 0.3s ease;
				}
				.blog-card-home:hover {
					transform: translateY(-8px);
				}
				.blog-image-wrapper {
					position: relative;
					overflow: hidden;
					border-radius: 12px;
					margin-bottom: 1.5rem;
				}
				.blog-image-wrapper img {
					transition: transform 0.4s ease;
					width: 100%;
					height: 250px;
					object-fit: cover;
				}
				.blog-image-wrapper:hover img {
					transform: scale(1.1);
				}
				.blog-tag-badge {
					transition: all 0.3s ease;
				}
				.blog-tag-badge:hover {
					background-color: var(--bs-primary) !important;
					color: white !important;
					transform: translateY(-2px);
				}
				.blog-read-more-btn {
					transition: all 0.3s ease;
				}
				.blog-read-more-btn:hover {
					transform: translateX(5px);
				}
			`}</style>
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
                    style={{ transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span className="d-inline-block">View All Post </span>
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
            {blogs.map((blog) => {
              const tag = getFirstTag(blog);
              return (
                <div
                  key={blog.uuid}
                  className="col-md-6 col-xl-4 blog-card-home"
                >
                  <Link
                    to={`/blog-details?uuid=${blog.uuid}`}
                    className="link d-block blog-image-wrapper"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={getImageUrl(blog)}
                      alt={getImageAlt(blog)}
                      className="img-fluid"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "assets/img/blog-img-1.png";
                      }}
                    />
                  </Link>
                  <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
                    {tag && (
                      <Link
                        to="/blog"
                        className="badge bg-primary-gradient text-white px-3 py-1 rounded-pill fs-12 fw-normal blog-tag-badge text-decoration-none"
                      >
                        {tag}
                      </Link>
                    )}
                    <span className="d-inline-flex align-items-center gap-2 fs-14 text-light text-opacity-70">
                      <i className="bi bi-calendar3"></i>
                      {getDate(blog)}
                    </span>
                  </div>
                  <h5
                    className="mb-3"
                    style={{ lineHeight: "1.4", minHeight: "3.5rem" }}
                  >
                    <Link
                      to={`/blog-details?uuid=${blog.uuid}`}
                      className="link d-inline-block text-light hover:text-primary transition-colors"
                    >
                      {getTitle(blog)}
                    </Link>
                  </h5>
                  <p
                    className="fs-14 mb-4 text-light text-opacity-80"
                    style={{ lineHeight: "1.6", minHeight: "3rem" }}
                  >
                    {getOverview(blog)}
                  </p>
                  <Link
                    to={`/blog-details?uuid=${blog.uuid}`}
                    className="btn btn-sm btn-outline-danger fs-14 rounded-pill d-inline-flex align-items-center gap-2 blog-read-more-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--bs-danger)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "";
                    }}
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogHomeOne;
