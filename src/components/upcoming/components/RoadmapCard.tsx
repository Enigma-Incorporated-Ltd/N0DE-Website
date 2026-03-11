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
        border: `1px solid ${hovered ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.055)"}`,
        borderRadius: 10,
        padding: "13px 13px 11px",
        cursor: "pointer",
        transition: "all 0.13s ease",
        marginBottom: 7,
      }}>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "rgba(255,255,255,0.88)",
          lineHeight: 1.45,
          margin: "0 0 5px",
        }}>
        {card.title}
      </p>

      <p
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.38)",
          lineHeight: 1.5,
          marginBottom: 10,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}>
        {card.detail}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <StatusDot status={card.status} />
        </div>
        {card.period && (
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.25)",
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