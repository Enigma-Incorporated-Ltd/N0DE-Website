import { useEffect, useRef, useState } from "react";

function MultiSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: open ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: "6px 10px",
          cursor: "pointer",
          color: "rgba(255,255,255,0.7)",
          fontSize: 12,
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}>
        {label}
        {value.length > 0 && (
          <span
            style={{
              background: "#7c3aed",
              color: "#fff",
              borderRadius: 999,
              fontSize: 9,
              fontWeight: 700,
              padding: "1px 5px",
              lineHeight: 1.6,
            }}>
            {value.length}
          </span>
        )}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 200,
            background: "#1a1d21",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            padding: "6px 0",
            minWidth: 170,
            boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
          }}>
          <button
            onClick={() => {
              onChange([]);
              setOpen(false);
            }}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "6px 12px",
              background: "none",
              border: "none",
              color:
                value.length === 0
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.4)",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: value.length === 0 ? 600 : 400,
            }}>
            All
          </button>
          {options.map((opt) => {
            const sel = value.includes(opt);
            return (
              <button
                key={opt}
                onClick={() =>
                  onChange(
                    sel ? value.filter((v) => v !== opt) : [...value, opt],
                  )
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  textAlign: "left",
                  padding: "6px 12px",
                  background: "none",
                  border: "none",
                  color: sel
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.45)",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: sel ? 600 : 400,
                }}>
                <span
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 3,
                    flexShrink: 0,
                    border: `1.5px solid ${sel ? "#7c3aed" : "rgba(255,255,255,0.2)"}`,
                    background: sel ? "#7c3aed" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  {sel && (
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.5">
                      <polyline points="1.5 6 4.5 9 10.5 3" />
                    </svg>
                  )}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;