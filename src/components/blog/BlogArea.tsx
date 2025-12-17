import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CmsService, type BlogItem } from "../../services";

const BlogArea = () => {
	const [blogs, setBlogs] = useState<BlogItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				setLoading(true);
				setError(null);
				
				const blogs = await CmsService.getBlogs();
				setBlogs(blogs);
			} catch (err) {
				console.error("Error fetching blogs:", err);
				setError(err instanceof Error ? err.message : "Failed to load blogs");
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, []);

	const formatDate = (dateString: string) => {
		if (!dateString) return "Date not available";
		try {
			// Clean the date string if it has quotes or commas
			const cleanDate = dateString.replace(/^["']+|["']+$/g, '').trim();
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

	const cleanText = (text: string) => {
		if (!text) return "";
		// Step 1: Replace escaped quotes with regular quotes
		let cleaned = text.replace(/\\"/g, '"');
		
		// Step 2: Remove trailing comma followed by quote (like ", or \",)
		cleaned = cleaned.replace(/[,\s]*["']+$/, '');
		
		// Step 3: Remove leading quotes
		cleaned = cleaned.replace(/^["']+/, '');
		
		// Step 4: Remove trailing quotes (in case there are any left)
		cleaned = cleaned.replace(/["']+$/, '');
		
		// Step 5: Remove trailing comma (if any left)
		cleaned = cleaned.replace(/,\s*$/, '');
		
		// Step 6: Trim whitespace
		return cleaned.trim();
	};

	const stripHtmlTags = (html: string) => {
		if (!html) return "";
		// Remove HTML tags and decode entities
		const tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		let text = tmp.textContent || tmp.innerText || "";
		// Clean up escaped quotes and newlines
		text = text.replace(/\\"/g, '"').replace(/\\n/g, " ").trim();
		return text;
	};

	const getImageUrl = (blog: BlogItem) => {
		if (blog.fields?.media && blog.fields.media.length > 0) {
			return blog.fields.media[0].thumbnail_url || blog.fields.media[0].url;
		}
		return "assets/img/blog-img-1.png"; // Fallback image
	};

	const getImageAlt = (blog: BlogItem) => {
		if (blog.fields?.media && blog.fields.media.length > 0) {
			return blog.fields.media[0].metadata?.alt_text || blog.fields.media[0].filename || "Blog image";
		}
		return "Blog image";
	};

	const getTitle = (blog: BlogItem) => {
		if (!blog.fields?.title) return "Untitled";
		return cleanText(blog.fields.title);
	};

	const getOverview = (blog: BlogItem) => {
		// Prefer overview, then comment, then a truncated version of long-text
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
			return text.length > 150 ? text.substring(0, 150) + "..." : text;
		}
		return "No description available";
	};

	const getDate = (blog: BlogItem) => {
		// Priority: fields.date > published_at
		const dateValue = blog.fields?.date || blog.published_at;
		if (dateValue) {
			return formatDate(dateValue);
		}
		return "Date not available";
	};

	const getTags = (blog: BlogItem) => {
		if (!blog.fields?.tag) return [];
		// Parse tags from string like "#NODE #Optimization #Gaming" and remove "#"
		const tagString = cleanText(blog.fields.tag);
		return tagString.split(/\s+/)
			.filter(tag => tag.startsWith("#"))
			.map(tag => tag.replace(/^#/, "")); // Remove "#" from each tag
	};

	if (loading) {
		return (
			<div className="section-space-y">
				<div className="container">
					<div className="text-center text-light py-8">
						<p>Loading blogs...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="section-space-y">
				<div className="container">
					<div className="text-center text-light py-8">
						<p className="text-danger">Error: {error}</p>
						<p className="fs-14">Please check your API connection.</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<style>{`
				.blog-card {
					transition: transform 0.3s ease, box-shadow 0.3s ease;
				}
				.blog-card:hover {
					transform: translateY(-5px);
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
				}
				.blog-card img {
					transition: transform 0.3s ease;
				}
				.blog-card:hover img {
					transform: scale(1.05);
				}
				.badge.hover\:bg-primary:hover {
					background-color: var(--bs-primary) !important;
					color: white !important;
				}
				.btn.hover\:bg-danger:hover {
					background-color: var(--bs-danger) !important;
					color: white !important;
				}
			`}</style>
			<div className="section-space-y">
				<div className="section-space-sm-bottom">
					<div className="container">
						<div className="row g-4 align-items-center">
							<div className="col-md-6">
								<h2 className="text-light mb-0" data-cue="fadeIn">
									Our Blogs
								</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					{blogs.length === 0 ? (
						<div className="text-center text-light py-8">
							<p>No blogs available at the moment.</p>
						</div>
					) : (
						<div className="row g-4" data-cues="fadeIn">
							{blogs.map((blog) => {
								const tags = getTags(blog);
								return (
									<div key={blog.uuid} className="col-md-6 col-xl-4">
									<div className="blog-card h-100 d-flex flex-column bg-dark-gradient rounded-4 overflow-hidden">
										<Link 
											to="/blog-details"
											state={{ uuid: blog.uuid }}
											className="link d-block mb-0 position-relative overflow-hidden"
										>
											<img
												src={getImageUrl(blog)}
												alt={getImageAlt(blog)}
												className="img-fluid w-100"
												style={{ height: "250px", objectFit: "cover" }}
												onError={(e) => {
													(e.target as HTMLImageElement).src = "assets/img/blog-img-1.png";
												}}
											/>
												<div className="position-absolute top-0 end-0 m-3">
													{tags.length > 0 && (
														<div className="d-flex flex-wrap gap-2">
															{tags.slice(0, 2).map((tag, idx) => (
																<span 
																	key={idx}
																	className="badge bg-primary-gradient text-white px-3 py-1 rounded-pill fs-12 fw-normal"
																>
																	{tag}
																</span>
															))}
														</div>
													)}
												</div>
											</Link>
											<div className="p-4 p-md-5 d-flex flex-column flex-grow-1">
												<div className="d-flex align-items-center gap-3 mb-3">
													<span className="d-inline-flex align-items-center gap-2 fs-14 text-light text-opacity-70">
														<i className="bi bi-calendar3"></i>
														{getDate(blog)}
													</span>
												</div>
												<h5 className="mb-3">
													<Link
														to="/blog-details"
														state={{ uuid: blog.uuid }}
														className="link d-inline-block text-light hover:text-primary transition-colors"
														style={{ lineHeight: "1.4" }}
													>
														{getTitle(blog)}
													</Link>
												</h5>
												<p className="fs-14 mb-4 text-light text-opacity-80 flex-grow-1" style={{ lineHeight: "1.6" }}>
													{getOverview(blog)}
												</p>
												<div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
													{tags.length > 0 && (
														<div className="d-flex flex-wrap gap-2">
															{tags.map((tag, idx) => (
																<Link
																	key={idx}
																	to={`/blog?tag=${tag}`}
																	className="badge bg-light text-dark px-2 py-1 rounded fs-12 text-decoration-none"
																	style={{ transition: "all 0.3s ease", cursor: "pointer" }}
																	onMouseEnter={(e) => {
																		e.currentTarget.style.backgroundColor = "var(--bs-primary)";
																		e.currentTarget.style.color = "white";
																	}}
																	onMouseLeave={(e) => {
																		e.currentTarget.style.backgroundColor = "";
																		e.currentTarget.style.color = "";
																	}}
																>
																	{tag}
																</Link>
															))}
														</div>
													)}
													<Link
														to="/blog-details"
														state={{ uuid: blog.uuid }}
														className="btn btn-sm btn-outline-danger fs-14 rounded-pill d-inline-flex align-items-center gap-2"
														style={{ transition: "all 0.3s ease" }}
														onMouseEnter={(e) => {
															e.currentTarget.style.backgroundColor = "var(--bs-danger)";
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
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default BlogArea;
