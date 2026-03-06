import { Tag, TAG_STYLE } from "./Upcomming";

export function TagBadge({ tag }: { tag: Tag }) {
  const s = TAG_STYLE[tag];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 999,
      }}>
      {tag}
    </span>
  );
}
