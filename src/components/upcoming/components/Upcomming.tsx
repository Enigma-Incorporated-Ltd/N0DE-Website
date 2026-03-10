import { useState, useEffect } from "react";
import { Drawer } from "./UpCommingDrawer";
import { CardItem } from "./CardItem";

export type Status = "Discovery" | "Planned" | "In Progress" | "Done";
export type Tag = "Feedback" | "Portal" | "Roadmaps";

export interface Comment {
  author: string;
  avatar: string;
  date: string;
  text: string;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  status: Status;
  tags: Tag[];
  hearted?: boolean;
  comments?: Comment[];
  productArea?: string;
  period?: string;
  brand?: string;
  date: string;
}

export interface Column {
  id: string;
  title: string;
  count: number;
  accentColor: string;
  cards: Card[];
}

export const STATUS_DOT: Record<Status, string> = {
  Discovery: "#60a5fa",
  Planned: "#818cf8",
  "In Progress": "#fbbf24",
  Done: "#34d399",
};

export const STATUS_LABEL_BG: Record<Status, string> = {
  Discovery: "rgba(96,165,250,0.12)",
  Planned: "rgba(129,140,248,0.12)",
  "In Progress": "rgba(251,191,36,0.12)",
  Done: "rgba(52,211,153,0.12)",
};

export const STATUS_LABEL_COLOR: Record<Status, string> = {
  Discovery: "#93c5fd",
  Planned: "#a5b4fc",
  "In Progress": "#fcd34d",
  Done: "#6ee7b7",
};

export const TAG_STYLE: Record<
  Tag,
  { bg: string; color: string; border: string }
> = {
  Feedback: {
    bg: "rgba(139,92,246,0.12)",
    color: "#c4b5fd",
    border: "rgba(139,92,246,0.3)",
  },
  Portal: {
    bg: "rgba(59,130,246,0.12)",
    color: "#93c5fd",
    border: "rgba(59,130,246,0.3)",
  },
  Roadmaps: {
    bg: "rgba(16,185,129,0.12)",
    color: "#6ee7b7",
    border: "rgba(16,185,129,0.3)",
  },
};

// Maps API status key → our Status type
const STATUS_MAP: Record<string, Status> = {
  exploring: "Discovery",
  next: "Planned",
  now: "In Progress",
  released: "Done",
};

// Column definitions aligned to API groupedByStatus keys
const COLUMN_DEFS: {
  id: string;
  apiKey: string;
  title: string;
  accentColor: string;
}[] = [
  {
    id: "exploring",
    apiKey: "exploring",
    title: "Exploring",
    accentColor: "#3b82f6",
  },
  { id: "next", apiKey: "next", title: "Next", accentColor: "#8b5cf6" },
  { id: "now", apiKey: "now", title: "Now", accentColor: "#f59e0b" },
  {
    id: "released",
    apiKey: "released",
    title: "Recently Released",
    accentColor: "#10b981",
  },
];

let _idCounter = 0;

function mapApiItemToCard(item: any): Card {
  const status: Status = STATUS_MAP[item.status] ?? "Planned";

  // Infer tags from product/brand/title keywords
  const tags: Tag[] = [];
  const text =
    `${item.title ?? ""} ${item.product ?? ""} ${item.brand ?? ""}`.toLowerCase();
  if (
    text.includes("feedback") ||
    text.includes("support") ||
    text.includes("comment")
  ) {
    tags.push("Feedback");
  }
  if (
    text.includes("portal") ||
    text.includes("embed") ||
    text.includes("ui") ||
    text.includes("ux")
  ) {
    tags.push("Portal");
  }
  if (
    text.includes("roadmap") ||
    text.includes("timeline") ||
    text.includes("documentation")
  ) {
    tags.push("Roadmaps");
  }

  return {
    id: ++_idCounter,
    title: item.title ?? "Untitled",
    description: item.detail ?? "",
    status,
    tags,
    productArea: item.product ?? undefined,
    brand: item.brand ?? undefined,
    period: item.period ?? undefined,
    hearted: false,
    date: item.date,
    comments: [],
  };
}

function buildColumnsFromRoadmap(roadmap: any): Column[] {
  _idCounter = 0;
  const grouped: Record<string, any[]> = roadmap.groupedByStatus ?? {};

  return COLUMN_DEFS.map((def) => {
    const apiItems: any[] = grouped[def.apiKey] ?? [];
    const cards = apiItems.map(mapApiItemToCard);
    return {
      id: def.id,
      title: def.title,
      accentColor: def.accentColor,
      count: cards.length,
      cards,
    };
  });
}

export default function RoadmapBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roadmapTitle, setRoadmapTitle] = useState("Roadmap");

  useEffect(() => {
    async function fetchRoadmap() {
      const url = `${import.meta.env.VITE_ROADMAP_URL}/api/confluence/roadmap?useCache=false`;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.error ?? "Unknown API error");

        setRoadmapTitle(data.roadmap.title ?? "Roadmap");
        setColumns(buildColumnsFromRoadmap(data.roadmap));
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch roadmap");
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmap();
  }, []);

  const allCards = columns.flatMap((c) => c.cards);

  const handleHeartToggle = (cardId: string) => {
    const numId = parseInt(cardId);
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === numId ? { ...card, hearted: !card.hearted } : card,
        ),
      })),
    );
    setSelectedCard((prev) =>
      prev && prev.id === numId ? { ...prev, hearted: !prev.hearted } : prev,
    );
  };

  const handlePrev = () => {
    if (!selectedCard) return;
    const idx = allCards.findIndex((c) => c.id === selectedCard.id);
    if (idx > 0) setSelectedCard(allCards[idx - 1]);
  };

  const handleNext = () => {
    if (!selectedCard) return;
    const idx = allCards.findIndex((c) => c.id === selectedCard.id);
    if (idx < allCards.length - 1) setSelectedCard(allCards[idx + 1]);
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: "3px solid rgba(255,255,255,0.1)",
              borderTop: "3px solid #7c3aed",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            Loading roadmap…
          </span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: 12,
            padding: "20px 28px",
            maxWidth: 420,
            textAlign: "center",
          }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            style={{ marginBottom: 10 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p
            style={{
              color: "#fca5a5",
              fontSize: 14,
              margin: "0 0 4px",
              fontWeight: 600,
            }}>
            Failed to load roadmap
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 12,
              margin: 0,
            }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  // ── Board ──────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: "relative",
      }}>
      {roadmapTitle && (
        <div style={{ padding: "16px 20px 0" }}>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "rgba(255,255,255,0.75)",
              margin: 0,
            }}>
            {roadmapTitle}
          </h1>
        </div>
      )}

      <div className="px-3 py-4 pb-5" style={{ overflowX: "auto" }}>
        <div className="row g-3">
          {columns.map((col) => (
            <div
              key={col.id}
              className="col-12 col-md-6 col-lg-4 col-xl-3"
              style={{ maxWidth: "100%" }}>
              {/* Column header */}
              <div
                style={{
                  borderTop: `2.5px solid ${col.accentColor}`,
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTopColor: col.accentColor,
                  borderRadius: "12px 12px 0 0",
                  padding: "11px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.8)",
                  }}>
                  {col.title}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.3)",
                    background: "rgba(255,255,255,0.07)",
                    padding: "2px 8px",
                    borderRadius: 999,
                    fontWeight: 500,
                  }}>
                  {col.count}
                </span>
              </div>

              {/* Cards */}
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTop: "none",
                  borderRadius: "0 0 12px 12px",
                  padding: "8px 8px 4px",
                  minHeight: 60,
                }}>
                {col.cards.length === 0 ? (
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.18)",
                      textAlign: "center",
                      padding: "16px 0",
                      fontStyle: "italic",
                      margin: 0,
                    }}>
                    No items
                  </p>
                ) : (
                  col.cards.map((card) => (
                    <CardItem
                      key={card.id}
                      card={card}
                      onClick={() => setSelectedCard(card)}
                      onHeartToggle={handleHeartToggle}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCard && (
        <Drawer
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
