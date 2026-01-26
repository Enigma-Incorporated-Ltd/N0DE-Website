import { useEffect, useState } from "react";

type IgMedia = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp?: string;
};

const INSTAGRAM_USERNAME = "n0de.gg";

const InstagramHomeOne = () => {
  const [items, setItems] = useState<IgMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = (import.meta as ImportMeta).env?.VITE_IG_ACCESS_TOKEN as
    | string
    | undefined;
  const embedUrl = (import.meta as ImportMeta).env?.VITE_IG_EMBED_URL as
    | string
    | undefined;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        if (embedUrl) {
          setLoading(false);
          return;
        }
        if (!token) {
          setLoading(false);
          return;
        }
        const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=10&access_token=${encodeURIComponent(
          token,
        )}`;
        // Basic diagnostics (will only be visible in dev tools)
        if ((import.meta as ImportMeta).env?.DEV) {
          // Avoid logging the token itself
          // eslint-disable-next-line no-console
          console.debug(
            "[Instagram] Starting fetch. Token present:",
            Boolean(token),
          );
        }
        const res = await fetch(url, { method: "GET" });
        if (!res.ok) {
          let apiError: unknown = null;
          try {
            apiError = await res.json();
          } catch {
            /* ignore json parse */
          }
          const apiMsg =
            (apiError as { error?: { message?: string } })?.error?.message ||
            "Unknown error";
          throw new Error(`HTTP ${res.status}: ${apiMsg}`);
        }
        const data = await res.json();
        if (cancelled) return;
        if (data?.data && Array.isArray(data.data)) {
          const list = data.data as IgMedia[];
          if ((import.meta as ImportMeta).env?.DEV) {
            // eslint-disable-next-line no-console
            console.debug("[Instagram] Received items:", list.length);
          }
          if (list.length === 0) {
            setError(
              "No media returned for this token. The Instagram app permissions may be missing or the token may be invalid/expired.",
            );
          } else {
            setItems(list);
          }
        } else {
          setError("Unexpected response from Instagram API.");
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const message =
            e instanceof Error ? e.message : "Failed to load Instagram feed.";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [token, embedUrl]);

  const renderGrid = (media: IgMedia[]) => (
    <div className="container">
      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center"
        data-cues="fadeIn"
      >
        {media.slice(0, 10).map((m) => {
          const isVideo = m.media_type === "VIDEO";
          const imgSrc = isVideo ? m.thumbnail_url || m.media_url : m.media_url;
          const alt = m.caption?.slice(0, 120) || "Instagram post";
          return (
            <div className="col text-center" key={m.id}>
              <a
                href={m.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="d-block position-relative"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={imgSrc}
                  alt={alt}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: "24px",
                    display: "block",
                  }}
                />
                {isVideo && (
                  <span
                    style={{
                      position: "absolute",
                      right: 12,
                      bottom: 12,
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      borderRadius: 20,
                      padding: "4px 8px",
                      fontSize: 12,
                    }}
                  >
                    ▶ Video
                  </span>
                )}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="section-space-md-top section-space-bottom">
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="h2 text-center text-light mb-0" data-cue="fadeIn">
                N0DE On Instagram
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      {embedUrl && (
        <div className="container" data-cue="fadeIn">
          <div className="row justify-content-center">
            <div className="col-12">
              <iframe
                src={embedUrl}
                title="Instagram feed"
                style={{
                  width: "100%",
                  border: 0,
                  overflow: "hidden",
                  borderRadius: "24px",
                }}
                width="100%"
                height="600"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      )}
      {!embedUrl && loading && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <p className="text-light text-opacity-70 mb-0">
                Loading Instagram feed…
              </p>
            </div>
          </div>
        </div>
      )}

      {!embedUrl &&
        !loading &&
        token &&
        !error &&
        items.length > 0 &&
        renderGrid(items)}

      {/* Fallback when no token or error */}
      {!embedUrl && (!token || error || items.length === 0) && !loading && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 text-center">
              <p className="text-light text-opacity-70">
                Follow us on Instagram to see the latest images and reels from @
                {INSTAGRAM_USERNAME}.
              </p>
              {error && (
                <div
                  className="text-warning small mb-3"
                  style={{ opacity: 0.8 }}
                >
                  Instagram feed error: {error}. If this persists, you can set
                  an embed widget URL in your .env as VITE_IG_EMBED_URL to
                  display a feed without API tokens.
                </div>
              )}
              <a
                href={`https://www.instagram.com/${INSTAGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                Visit @{INSTAGRAM_USERNAME}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramHomeOne;
