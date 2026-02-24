import { useSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CmsService } from "../../services";

// Define the BlogItem type since we can't import it
type BlogItem = {
  uuid: string;
  fields?: {
    title?: string;
    media?: Array<{
      url?: string;
      thumbnail_url?: string;
      filename?: string;
      metadata?: {
        alt_text?: string;
      };
    }>;
    tag?: string;
    date?: string;
    'long-text'?: string;
    comment?: string;
    overview?: string;
  };
  published_at?: string;
};

const BlogDetailsArea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlCleanedRef = useRef(false);

  // Try to get UUID from state first (preferred), then fallback to URL params
  const state = location.state as { uuid?: string } | null;
  const urlUuid = searchParams.get("uuid");
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get UUID from URL parameters
  const uuid = searchParams.get("uuid");

  // Fallback to location state if UUID is not in URL (for backward compatibility)
  const blogUuid = uuid || (location.state as { uuid?: string })?.uuid;

  // Clean URL if UUID was read from URL params (only once)
  useEffect(() => {
    if (urlUuid && !state?.uuid && !urlCleanedRef.current) {
      // UUID came from URL, clean it up and store in state
      urlCleanedRef.current = true;
      navigate("/blog-details", { replace: true, state: { uuid: urlUuid } });
    }
  }, [urlUuid, state?.uuid, navigate]);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!blogUuid) {
        setError("No blog ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch all blogs to find the specific one and get recent posts
        const blogs = await CmsService.getBlogs();

        // Find the specific blog by UUID
        const foundBlog = blogs.find((b) => b.uuid === blogUuid);
        if (!foundBlog) {
          throw new Error("Blog not found");
        }

        setBlog(foundBlog);

        // Get recent blogs (excluding current one, limit to 3)
        const recent = blogs
          .filter((b) => b.uuid !== blogUuid)
          .slice(0, 3);
        setRecentBlogs(recent);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err instanceof Error ? err.message : "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [uuid]);

  // Share helpers: Web Share API where available, otherwise open social share dialogs or copy link
  const openShareWindow = (url: string, title = "Share", w = 600, h = 600) => {
    try {
      const left = window.screenX + (window.outerWidth - w) / 2;
      const top = window.screenY + (window.outerHeight - h) / 2;
      window.open(url, title, `width=${w},height=${h},left=${left},top=${top},noopener,noreferrer`);
    } catch (err) {
      console.error("Failed to open share window", err);
    }
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "Share to Facebook", 700, 500);
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog ? getTitle(blog) : "");
    openShareWindow(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "Share to Twitter", 700, 450);
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "Share to LinkedIn", 700, 500);
  };

  const copyLink = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        // small non-blocking UI feedback
        // eslint-disable-next-line no-alert
        alert("Link copied to clipboard");
        return;
      }
    } catch (err) {
      console.error("Copy failed:", err);
    }
    // fallback
    // eslint-disable-next-line no-alert
    prompt("Copy this link", shareUrl);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date not available";
    try {
      // Clean the date string if it has quotes or commas
      const cleanDate = dateString.replace(/^["']+|["']+$/g, "").trim();
      const date = new Date(cleanDate);

      // Check if date is valid
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

  const getImageUrl = (blogItem: BlogItem) => {
    if (blogItem.fields?.media && blogItem.fields.media.length > 0) {
      return (
        blogItem.fields.media[0].url || blogItem.fields.media[0].thumbnail_url
      );
    }
    return "assets/img/blog-img-10.png";
  };

  const getImageAlt = (blogItem: BlogItem) => {
    if (blogItem.fields?.media && blogItem.fields.media.length > 0) {
      return (
        blogItem.fields.media[0].metadata?.alt_text ||
        blogItem.fields.media[0].filename ||
        "Blog image"
      );
    }
    return "Blog image";
  };

  const getTitle = (blogItem: BlogItem) => {
    if (!blogItem.fields?.title) return "Untitled";
    return cleanText(blogItem.fields.title);
  };

  const getDate = (blogItem: BlogItem) => {
    // Priority: fields.date > published_at
    const dateValue = blogItem.fields?.date || blogItem.published_at;
    if (dateValue) {
      return formatDate(dateValue);
    }
    return "Date not available";
  };

  const getLongText = (blogItem: BlogItem) => {
    if (!blogItem.fields?.["long-text"]) return "";
    // Clean up escaped quotes and return the HTML content
    return blogItem.fields["long-text"]
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n");
  };

  const cleanText = (text: string) => {
    if (!text) return "";
    // Step 1: Replace escaped quotes with regular quotes
    let cleaned = text.replace(/\\"/g, '"');

    // Step 2: Remove trailing comma followed by quote (like ", or \",)
    cleaned = cleaned.replace(/[,\s]*["']+$/, "");

    // Step 3: Remove leading quotes
    cleaned = cleaned.replace(/^["']+/, "");

    // Step 4: Remove trailing quotes (in case there are any left)
    cleaned = cleaned.replace(/["']+$/, "");

    // Step 5: Remove trailing comma (if any left)
    cleaned = cleaned.replace(/,\s*$/, "");

    // Step 6: Trim whitespace
    return cleaned.trim();
  };

  

  

  if (loading) {
    return (
      <div className="section-space-y">
        <div className="container">
          <div className="text-center text-light py-8">
            <p>Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="section-space-y">
        <div className="container">
          <div className="text-center text-light py-8">
            <p className="text-danger">Error: {error || "Blog not found"}</p>
            <Link to="/blog" className="btn btn-primary mt-4">
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
				.blog-content p {
					margin-bottom: 1.5rem;
					color: rgba(255, 255, 255, 0.9);
				}
				.blog-content strong, .blog-content b {
					color: #fff;
					font-weight: 700;
				}
				.blog-content em, .blog-content i {
					font-style: italic;
				}
				.blog-content img {
					max-width: 100%;
					height: auto;
					border-radius: 0.5rem;
					margin: 1.5rem 0;
				}
				.blog-card {
					transition: transform 0.3s ease, box-shadow 0.3s ease;
				}
				.blog-card:hover {
					transform: translateY(-5px);
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
				}
			`}</style>
      <div className="section-space-y">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="position-relative mb-6 rounded-4 overflow-hidden">
                <img
                  src={getImageUrl(blog)}
                  alt={getImageAlt(blog)}
                  className="img-fluid w-100"
                  style={{ height: "450px", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "assets/img/blog-img-10.png";
                  }}
                />
                
              </div>
              <div className="d-flex align-items-center row-gap-2 column-gap-6 flex-wrap mb-4">
                <div className="d-flex row-gap-2 column-gap-3 align-items-center">
                  <span className="d-inline-block flex-shrink-0 text-primary">
                    <i className="bi bi-calendar2-minus fs-5"></i>
                  </span>
                  <p className="mb-0 flex-shrink-0 fs-14 text-light">
                    {getDate(blog)}
                  </p>
                </div>
                <div className="d-flex row-gap-2 column-gap-3 align-items-center">
                  <span className="d-inline-block flex-shrink-0 text-primary">
                    <i className="bi bi-people fs-5"></i>
                  </span>
                  <p className="mb-0 flex-shrink-0 fs-14 text-light">
                    By Admin
                  </p>
                </div>
              </div>
              <h2
                className="text-light mb-4 fw-bold"
                style={{ lineHeight: "1.3" }}
              >
                {getTitle(blog)}
              </h2>
              {/* Main Blog Content */}
              <div
                className="mb-8 blog-content text-light"
                style={{ lineHeight: "1.8" }}
                dangerouslySetInnerHTML={{ __html: getLongText(blog) }}
              />
              <div className="section-space-sm-y border-top border-bottom pt-5 pb-5">
                <div className="row g-4 align-items-center">
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <ul className="list list-row align-items-center justify-content-md-end flex-wrap gap-3">
                      <li>
                        <span className="d-inline-block fw-bold text-light">
                          Share:
                        </span>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={shareFacebook}
                          className="link d-grid place-content-center w-8 h-8 rounded-circle text-dark border border-light hover:text-primary hover:border-primary"
                          aria-label="Share on Facebook"
                        >
                          <i className="bi bi-facebook"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={shareTwitter}
                          className="link d-grid place-content-center w-8 h-8 rounded-circle text-dark border border-light hover:text-primary hover:border-primary"
                          aria-label="Share on Twitter"
                        >
                          <i className="bi bi-twitter"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={shareLinkedIn}
                          className="link d-grid place-content-center w-8 h-8 rounded-circle text-dark border border-light hover:text-primary hover:border-primary"
                          aria-label="Share on LinkedIn"
                        >
                          <i className="bi bi-linkedin"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={copyLink}
                          className="link d-grid place-content-center w-8 h-8 rounded-circle text-dark border border-light hover:text-primary hover:border-primary"
                          aria-label="Copy link"
                        >
                          <i className="bi bi-clipboard"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="col-lg-4">
              <div className="row g-4">
                
                <div className="col-12">
                  <div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
                    <h3 className="mb-0 text-gradient-primary">Recent Post</h3>
                    <hr className="my-5" />
                    {recentBlogs.length === 0 ? (
                      <p className="text-light text-opacity-70 fs-14">
                        No recent posts available
                      </p>
                    ) : (
                      <ul className="list gap-4">
                        {recentBlogs.map((recentBlog) => (
                          <li key={recentBlog.uuid}>
                            <div className="d-flex gap-4 align-items-center">
                              <div className="d-grid place-content-center w-12 h-12 flex-shrink-0">
                                <img
                                  src={
                                    recentBlog.fields?.media?.[0]
                                      ?.thumbnail_url ||
                                    recentBlog.fields?.media?.[0]?.url ||
                                    "assets/img/recent-img-1.png"
                                  }
                                  alt={getImageAlt(recentBlog)}
                                  className="img-fluid"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "assets/img/recent-img-1.png";
                                  }}
                                />
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <span className="d-inline-block fs-12">
                                    <i className="bi bi-calendar2-check"></i>{" "}
                                  </span>
                                  <span className="d-inline-block fs-12">
                                    {getDate(recentBlog)}
                                  </span>
                                </div>
                                <Link
                                  to="/blog-details"
                                  state={{ uuid: recentBlog.uuid }}
                                  className="link d-inline-block fs-14 fw-medium text-light text-opacity-70 hover:text-opacity-100"
                                >
                                  {getTitle(recentBlog)}
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
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
