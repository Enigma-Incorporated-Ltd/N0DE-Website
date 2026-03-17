import { useState } from "react";
import StatusDot from "./StatusDot";
import { RoadmapItem } from "./Upcomming";

function RoadmapCard({
  card,
  onClick,
}: {
  card: RoadmapItem;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(270deg, #23272c 1.87%, #000000 100%)"
          : "transparent",
        border: `1px solid ${
          hovered ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.055)"
        }`,
        borderRadius: 10,
        padding: "16px 16px 14px",
        cursor: "pointer",
        transition: "all 0.15s ease",
        marginBottom: 10, 
      }}>
      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          lineHeight: 1.5,
          margin: "0 0 8px",
        }}>
        {card.title}
      </p>

      <p
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.55,
          marginBottom: 12,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3, 
          WebkitBoxOrient: "vertical",
        }}>
        {card.detail}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <StatusDot status={card.status} />
        </div>

        {card.period && (
          <span
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "monospace",
            }}>
            {card.period}
          </span>
        )}
      </div>
    </div>
  );
}

export default RoadmapCard;
