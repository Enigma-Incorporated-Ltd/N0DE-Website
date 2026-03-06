import { useState } from "react";
import { Card } from "./Upcomming";
import { StatusBadge } from "./StatusBadge";
import { TagBadge } from "./TagBadge";

export function CardItem({
  card,
  onClick,
  onHeartToggle, 
}: {
  card: Card;
  onClick: () => void;
  onHeartToggle: (cardId: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHeartToggle((card as any)?.id); 
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(270deg, #23272c 1.87%, #000000 100%)"
          : "",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 12,
        padding: "14px 14px 12px",
        cursor: "pointer",
        transition: "all 0.15s ease",
        marginBottom: 8,
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 6,
        }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.4,
          }}>
          {card.title}
        </span>
        <button
          onClick={handleHeartClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: card.hearted ? "#ef4444" : "rgba(255,255,255,0.2)",
            padding: 2,
            flexShrink: 0,
            marginTop: 1,
            transition: "color 0.2s ease",
          }}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={card.hearted ? "#ef4444" : "none"}
            stroke={card.hearted ? "#ef4444" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
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
        {card.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        <StatusBadge status={card.status} />
        {card.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
