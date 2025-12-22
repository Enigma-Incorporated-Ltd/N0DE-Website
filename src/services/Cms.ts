// API Configuration
const ensureTrailingSlash = (url: string) =>
  url.endsWith("/") ? url : url + "/";
const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl || !envUrl.trim()) {
    throw new Error(
      "VITE_API_BASE_URL is not set in .env file. Please configure it."
    );
  }
  return ensureTrailingSlash(envUrl.trim());
};
const API_BASE_URL = getApiBaseUrl();

// Types
export interface BlogMedia {
  uuid: string;
  filename: string;
  mime_type: string;
  size: string;
  url: string;
  thumbnail_url: string;
  metadata: {
    alt_text?: string;
    title?: string;
    width?: number;
    height?: number;
  };
}

export interface BlogFields {
  "long-text": string;
  media: BlogMedia[];
  date: string;
  comment: string;
  overview: string;
  title: string;
  tag?: string;
}

export interface BlogItem {
  uuid: string;
  locale: string;
  published_at: string;
  fields: BlogFields;
}

export interface ApiError {
  message: string;
  status?: number;
}

// CMS Service Class
export class CmsService {
  private static baseUrl = API_BASE_URL;

  /**
   * Fetch all blogs from the CMS
   */
  static async getBlogs(): Promise<BlogItem[]> {
    try {
      const apiUrl = `${this.baseUrl}api/Cms/blogs`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((fetchError) => {
        // Handle network errors (CORS, SSL, etc.)
        if (
          fetchError instanceof TypeError &&
          fetchError.message.includes("fetch")
        ) {
          throw new Error(
            "Network error: Please check if the API server is running and CORS is configured. For localhost HTTPS, you may need to accept the certificate."
          );
        }
        throw fetchError;
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch blogs: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Handle both array and object responses
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === "object") {
        // If it's a single object, wrap it in an array
        return [data];
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      throw err instanceof Error ? err : new Error("Failed to load blogs");
    }
  }

  /**
   * Fetch a single blog by UUID
   */
  static async getBlogByUuid(uuid: string): Promise<BlogItem> {
    const blogs = await this.getBlogs();
    const blog = blogs.find((b) => b.uuid === uuid);

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  }
}
