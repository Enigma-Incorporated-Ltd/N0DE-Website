import {
  Status,
  STATUS_DOT,
  STATUS_LABEL_BG,
  STATUS_LABEL_COLOR,
} from "./Upcomming";

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      style={{
        background: STATUS_LABEL_BG[status],
        color: STATUS_LABEL_COLOR[status],
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 999,
      }}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: STATUS_DOT[status],
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}
