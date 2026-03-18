import { StatusKey } from "./Upcomming";

function StatusDot({ status }: { status: StatusKey }) {
    const STATUS_META: Record<
      StatusKey,
      { dot: string; bg: string; text: string; label: string }
    > = {
      exploring: {
        dot: "#60a5fa",
        bg: "rgba(96,165,250,0.12)",
        text: "#93c5fd",
        label: "Exploring",
      },
      next: {
        dot: "#818cf8",
        bg: "rgba(129,140,248,0.12)",
        text: "#a5b4fc",
        label: "Next",
      },
      now: {
        dot: "#fbbf24",
        bg: "rgba(251,191,36,0.12)",
        text: "#fcd34d",
        label: "Now",
      },
      released: {
        dot: "#34d399",
        bg: "rgba(52,211,153,0.12)",
        text: "#6ee7b7",
        label: "Released",
      },
    };

  const m = STATUS_META[status] ?? STATUS_META.next;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 7px",
        borderRadius: 999,
        background: m.bg,
        color: m.text,
      }}>
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: m.dot,
          flexShrink: 0,
        }}
      />
      {m.label}
    </span>
  );
}

export default StatusDot;