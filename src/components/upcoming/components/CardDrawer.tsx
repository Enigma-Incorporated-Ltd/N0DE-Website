import Pill from "./Pill";
import StatusDot from "./StatusDot";
import { RoadmapItem } from "./Upcomming";

function CardDrawer({
  card,
  allCards,
  onClose,
  onPrev,
  onNext,
}: {
  card: RoadmapItem;
  allCards: RoadmapItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const idx = allCards.findIndex((c) => c.id === card.id);
  const DEFAULT_BRAND_COLOR = {
    bg: "rgba(255,255,255,0.06)",
    text: "rgba(255,255,255,0.5)",
    border: "rgba(255,255,255,0.12)",
  };
  const BRAND_COLORS: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    N0DE: {
      bg: "rgba(139,92,246,0.12)",
      text: "#c4b5fd",
      border: "rgba(139,92,246,0.3)",
    },
    "Enigma Net": {
      bg: "rgba(59,130,246,0.12)",
      text: "#93c5fd",
      border: "rgba(59,130,246,0.3)",
    },
  };
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 200,
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(580px, 100vw)",
          background: "linear-gradient(270deg, #23272c 1.87%, #000000 100%)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
          fontFamily: "inherit",
        }}>
        {/* Header nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
          <div style={{ display: "flex", gap: 6 }}>
            {(["←", "→"] as const).map((arrow, i) => {
              const disabled =
                i === 0 ? idx === 0 : idx === allCards.length - 1;
              return (
                <button
                  key={arrow}
                  onClick={i === 0 ? onPrev : onNext}
                  disabled={disabled}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 7,
                    padding: "5px 10px",
                    cursor: disabled ? "not-allowed" : "pointer",
                    color: disabled
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.6)",
                    fontSize: 13,
                  }}>
                  {arrow}
                </button>
              );
            })}
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.25)",
                alignSelf: "center",
                paddingLeft: 4,
              }}>
              {idx + 1} / {allCards.length}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 7,
              padding: "5px 8px",
              cursor: "pointer",
              color: "rgba(255,255,255,0.5)",
              fontSize: 16,
              lineHeight: 1,
            }}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
              margin: "12px 0 16px",
              lineHeight: 1.4,
            }}>
            {card.title}
          </h2>

          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              margin: "0 0 28px",
            }}>
            {card.detail}
          </p>

          {/* Metadata table */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}>
            {[
              {
                label: "Status",
                value: <StatusDot status={card.status} /> ,
              },
              { label: "Period", value: card.period || "—" },
              { label: "Products", value: card.product.join(", ") || "—" },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  padding: "10px 14px",
                  borderBottom:
                    i < arr.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                }}>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.28)",
                    width: 72,
                    flexShrink: 0,
                    paddingTop: 1,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}>
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                  }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDrawer;
