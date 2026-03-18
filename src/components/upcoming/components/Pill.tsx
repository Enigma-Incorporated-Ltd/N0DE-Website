function Pill({
  label,
  color,
  bg,
  border,
}: {
  label: string;
  color: string;
  bg: string;
  border?: string;
}) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 600,
        padding: "2px 7px",
        borderRadius: 999,
        background: bg,
        color,
        border: `1px solid ${border ?? "transparent"}`,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}>
      {label}
    </span>
  );
}

export default Pill;