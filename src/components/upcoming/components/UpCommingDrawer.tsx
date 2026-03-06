import { useState } from "react";
import { Card } from "./Upcomming";
import { StatusBadge } from "./StatusBadge";
import { TagBadge } from "./TagBadge";

export function Drawer({
  card,
  onClose,
  onPrev,
  onNext,
}: {
  card: Card;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [comment, setComment] = useState("");

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 10,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(3px)",
          zIndex: 9998,
        }}
      />
      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(720px, 100vw)",
          background: "linear-gradient(270deg, #23272c 1.87%, #000000 100%)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
          animation:
            "drawerSlideIn 0.22s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}>
          <div style={{ display: "flex", gap: 2 }}>
            <button
              onClick={onPrev}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.35)",
                padding: "6px 8px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
              }}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={onNext}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.35)",
                padding: "6px 8px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
              }}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.3)",
                padding: "6px 8px",
                borderRadius: 8,
                display: "flex",
              }}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.3)",
                padding: "6px 8px",
                borderRadius: 8,
                display: "flex",
              }}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.3)",
                padding: "6px 8px",
                borderRadius: 8,
                display: "flex",
              }}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.35)",
                padding: "6px 8px",
                borderRadius: 8,
                display: "flex",
                marginLeft: 4,
              }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 32px" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              marginBottom: 10,
              marginTop: 0,
            }}>
            {card.title}
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.65,
              marginBottom: 24,
              marginTop: 0,
            }}>
            {card.description}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 24,
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.28)",
                  width: 96,
                  flexShrink: 0,
                }}>
                Status
              </span>
              <StatusBadge status={card.status} />
            </div>
            {card.productArea && (
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.28)",
                    width: 96,
                    flexShrink: 0,
                  }}>
                  Product area
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                  }}>
                  {card.productArea}
                </span>
              </div>
            )}
            {card.tags.length > 0 && (
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.28)",
                    width: 96,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}>
                  Tags
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {card.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              marginBottom: 20,
            }}
          />

          <h3
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 16,
              marginTop: 0,
            }}>
            Comments
          </h3>

          {card.comments && card.comments.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                marginBottom: 20,
              }}>
              {card.comments.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                    {c.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                      }}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.8)",
                        }}>
                        {c.author}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.28)",
                        }}>
                        {c.date}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.52)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}>
                      {c.text}
                    </p>
                    <button
                      style={{
                        marginTop: 8,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(255,255,255,0.28)",
                        fontSize: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: 0,
                      }}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round">
                        <polyline points="9 17 4 12 9 7" />
                        <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                      </svg>
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.2)",
                marginBottom: 20,
                fontStyle: "italic",
              }}>
              No comments yet.
            </p>
          )}

          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#475569,#334155)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}>
              R
            </div>
            <div style={{ flex: 1 }}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us why this is important to you..."
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  resize: "none",
                  outline: "none",
                  minHeight: 80,
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                  boxSizing: "border-box",
                }}
              />
              {comment.trim() && (
                <button
                  onClick={() => setComment("")}
                  style={{
                    marginTop: 8,
                    padding: "6px 16px",
                    background: "#7c3aed",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
