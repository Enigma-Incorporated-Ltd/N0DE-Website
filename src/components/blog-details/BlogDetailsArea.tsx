import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CmsService, type BlogItem } from "../../services";

const BlogDetailsArea = () => {
	const [searchParams] = useSearchParams();
	const uuid = searchParams.get("uuid");
	const [blog, setBlog] = useState<BlogItem | null>(null);
	const [recentBlogs, setRecentBlogs] = useState<BlogItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBlogData = async () => {
			if (!uuid) {
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
				const foundBlog = blogs.find((b: BlogItem) => b.uuid === uuid);
				if (!foundBlog) {
					throw new Error("Blog not found");
				}

				setBlog(foundBlog);

				// Get recent blogs (excluding current one, limit to 3)
				const recent = blogs
					.filter((b: BlogItem) => b.uuid !== uuid)
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

	const getImageUrl = (blogItem: BlogItem) => {
		if (blogItem.fields?.media && blogItem.fields.media.length > 0) {
			return blogItem.fields.media[0].url || blogItem.fields.media[0].thumbnail_url;
		}
		return "assets/img/blog-img-10.png";
	};

	const getImageAlt = (blogItem: BlogItem) => {
		if (blogItem.fields?.media && blogItem.fields.media.length > 0) {
			return blogItem.fields.media[0].metadata?.alt_text || blogItem.fields.media[0].filename || "Blog image";
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
		return blogItem.fields["long-text"].replace(/\\"/g, '"').replace(/\\n/g, "\n");
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

	const getComment = (blogItem: BlogItem) => {
		if (!blogItem.fields?.comment) return "";
		return cleanText(blogItem.fields.comment);
	};

	const getTags = (blogItem: BlogItem) => {
		if (!blogItem.fields?.tag) return [];
		// Parse tags from string like "#NODE #Optimization #Gaming" and remove "#"
		const tagString = cleanText(blogItem.fields.tag);
		return tagString.split(/\s+/)
			.filter(tag => tag.startsWith("#"))
			.map(tag => tag.replace(/^#/, "")); // Remove "#" from each tag
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
										(e.target as HTMLImageElement).src = "assets/img/blog-img-10.png";
									}}
								/>
								{getTags(blog).length > 0 && (
									<div className="position-absolute top-0 start-0 m-4">
										<div className="d-flex flex-wrap gap-2">
											{getTags(blog).map((tag, idx) => (
												<span 
													key={idx}
													className="badge bg-primary-gradient text-white px-3 py-2 rounded-pill fs-13 fw-semibold shadow-lg"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								)}
							</div>
							<div className="d-flex align-items-center row-gap-2 column-gap-6 flex-wrap mb-4">
								<div className="d-flex row-gap-2 column-gap-3 align-items-center">
									<span className="d-inline-block flex-shrink-0 text-primary">
										<i className="bi bi-calendar2-minus fs-5"></i>
									</span>
									<p className="mb-0 flex-shrink-0 fs-14 text-light">{getDate(blog)}</p>
								</div>
								<div className="d-flex row-gap-2 column-gap-3 align-items-center">
									<span className="d-inline-block flex-shrink-0 text-primary">
										<i className="bi bi-people fs-5"></i>
									</span>
									<p className="mb-0 flex-shrink-0 fs-14 text-light">By Admin</p>
								</div>
							</div>
							<h2 className="text-light mb-4 fw-bold" style={{ lineHeight: "1.3" }}>
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
									<div className="col-md-6">
										{getTags(blog).length > 0 ? (
											<ul className="list list-row align-items-center flex-wrap gap-3">
												<li>
													<span className="d-inline-block fw-bold text-light fs-5">
														Tags:
													</span>
												</li>
												{getTags(blog).map((tag, idx) => (
													<li key={idx}>
														<Link 
															to={`/blog?tag=${tag}`} 
															className="btn btn-light btn-sm rounded-pill px-3"
															style={{ transition: "all 0.3s ease" }}
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
													</li>
												))}
											</ul>
										) : (
											<ul className="list list-row align-items-center flex-wrap gap-3">
												<li>
													<span className="d-inline-block fw-bold text-light fs-5">
														Tags:
													</span>
												</li>
												<li>
													<span className="text-light text-opacity-50">No tags available</span>
												</li>
											</ul>
										)}
									</div>
									<div className="col-md-6">
										<ul className="list list-row align-items-center justify-content-md-end flex-wrap gap-3">
											<li>
												<span className="d-inline-block fw-bold text-light">
													Share:
												</span>
											</li>
											<li>
												<a
													href="#"
													className="link d-grid place-content-center w-8 h-8 rounded-circle text-light border hover:text-primary hover:border-primary"
												>
													<i className="bi bi-facebook"></i>
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-grid place-content-center w-8 h-8 rounded-circle text-light border hover:text-primary hover:border-primary"
												>
													<i className="bi bi-twitter"></i>
												</a>
											</li>
											<li>
												<a
													href="#"
													className="link d-grid place-content-center w-8 h-8 rounded-circle text-light border hover:text-primary hover:border-primary"
												>
													<i className="bi bi-linkedin"></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							{getComment(blog) && (
								<div className="section-space-sm-y border-bottom">
									<h4 className="mb-8 text-light">Comment</h4>
									<ul className="list list-flush list-review">
										<li>
											<div className="d-flex flex-wrap flex-lg-nowrap gap-4 align-items-start">
												<div className="w-12 h-12 rounded-circle d-grid place-content-center flex-shrink-0 bg-primary-gradient">
													<i className="bi bi-person-fill text-white fs-5"></i>
												</div>
												<div className="flex-grow-1">
													<div className="d-flex flex-wrap align-items-center justify-content-between mb-2">
														<h6 className="mb-0 fw-semibold text-light">
															Admin
														</h6>
														<div className="d-flex align-items-center gap-2">
															<span className="d-block fs-12 text-body-secondary">
																{getDate(blog)}
															</span>
														</div>
													</div>
													<p className="mb-0 fs-14 text-light" style={{ lineHeight: "1.6" }}>
														{getComment(blog)}
													</p>
												</div>
											</div>
										</li>
									</ul>
								</div>
							)}
							<div className="section-space-sm-top">
								<div className="bg-dark-gradient p-4 p-md-6 p-xl-8 rounded-4">
									<h4 className="text-light">Leave a Reply</h4>
									<p className="fs-14">
										Your email Address Not Be Published. Requied Fields are
										Marked
									</p>
									<div className="row g-4">
										<div className="col-12">
											<label className="form-label fs-14">Your Name</label>
											<div className="form-control--gradient rounded-1">
												<input
													type="text"
													className="form-control border-0 bg-transparent"
												/>
											</div>
										</div>
										<div className="col-12">
											<label className="form-label fs-14">Email Address</label>
											<div className="form-control--gradient rounded-1">
												<input
													type="email"
													className="form-control border-0 bg-transparent"
												/>
											</div>
										</div>
										<div className="col-12">
											<label className="form-label fs-14">
												How can help you?
											</label>
											<div className="form-control--gradient rounded-1">
												<textarea
													className="form-control border-0 bg-transparent"
													rows={4}
												></textarea>
											</div>
										</div>
										<div className="col-12">
											<button className="btn btn-primary-gradient text-white fs-14 border-0 rounded-1 w-100 justify-content-center">
												<span className="d-inline-block">Submit Now </span>
												<span className="d-inline-block">
													<i className="bi bi-arrow-right"></i>
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="row g-4">
								<div className="col-12">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">
											Service Lists
										</h3>
										<hr className="my-5" />
										<ul className="list gap-4">
											<li>
												<Link
													to="/blog"
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
													to="/blog"
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
													to="/blog"
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
													to="/blog"
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
													to="/blog"
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
													to="/blog"
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
								<div className="col-12">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">Recent Post</h3>
										<hr className="my-5" />
										{recentBlogs.length === 0 ? (
											<p className="text-light text-opacity-70 fs-14">No recent posts available</p>
										) : (
											<ul className="list gap-4">
												{recentBlogs.map((recentBlog) => (
													<li key={recentBlog.uuid}>
														<div className="d-flex gap-4 align-items-center">
															<div className="d-grid place-content-center w-12 h-12 flex-shrink-0">
																<img
																	src={recentBlog.fields?.media?.[0]?.thumbnail_url || recentBlog.fields?.media?.[0]?.url || "assets/img/recent-img-1.png"}
																	alt={getImageAlt(recentBlog)}
																	className="img-fluid"
																	onError={(e) => {
																		(e.target as HTMLImageElement).src = "assets/img/recent-img-1.png";
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
																	to={`/blog-details?uuid=${recentBlog.uuid}`}
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
								<div className="col-12">
									<div className="p-4 p-md-6 p-xxl-8 bg-dark-gradient rounded-4">
										<h3 className="mb-0 text-gradient-primary">Tags:</h3>
										<hr className="my-5" />
										{getTags(blog).length > 0 ? (
											<ul className="list list-row flex-wrap gap-3">
												{getTags(blog).map((tag, idx) => (
													<li key={idx}>
														<Link 
															to={`/blog?tag=${tag}`} 
															className="btn btn-light btn-sm rounded-pill px-3"
															style={{ transition: "all 0.3s ease" }}
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
													</li>
												))}
											</ul>
										) : (
											<p className="text-light text-opacity-70 fs-14 mb-0">No tags available</p>
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

