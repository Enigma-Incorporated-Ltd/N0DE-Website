import { useState, useEffect, useMemo } from "react";
import CardDrawer from "./CardDrawer";
import RoadmapCard from "./RoadmapCard";
import MultiSelect from "./MultiSelect";

// ─── Types ─────────────────────────────────────────────────────────────────────
export type StatusKey = "exploring" | "next" | "now" | "released";

export interface RoadmapItem {
  date: string;
  id: number;
  period: string;
  brand: string[];
  product: string[];
  title: string;
  detail: string;
  status: StatusKey;
 
}

export interface ApiItem {
  id?: number;
  period?: string;
  brand?: string | string[];
  product?: string | string[];
  title?: string;
  detail?: string;
  status?: string;
 
  cardTitle?: string;
  cardDetail?: string;
  tags?: string[];
  date?: string;
}

interface ApiRoadmap {
  title?: string;
  groupedByStatus?: Record<string, ApiItem[]>;
  items?: ApiItem[];
}

interface ApiResponse {
  success: boolean;
  roadmap: ApiRoadmap;
  error?: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const COLUMNS: { key: StatusKey; label: string; accent: string }[] = [
  { key: "exploring", label: "Exploring", accent: "#3b82f6" },
  { key: "next", label: "Next", accent: "#8b5cf6" },
  { key: "now", label: "Now", accent: "#f59e0b" },
  { key: "released", label: "Recently Released", accent: "#10b981" },
];


// Map raw API status strings → StatusKey
const STATUS_MAP: Record<string, StatusKey> = {
  exploring: "exploring",
  discovery: "exploring",
  next: "next",
  planned: "next",
  now: "now",
  "in progress": "now",
  inprogress: "now",
  released: "released",
  done: "released",
};




// ─── API normalisation ──────────────────────────────────────────────────────────
let _idSeq = 0;

function toArray(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  // "N0DE; Enigma Net" or "N0DE, Enigma Net"
  return val
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatPeriod(raw: string | undefined): string {
  if (!raw) return "";
  const m1 = raw.match(/Q(\d)\s+(\d{4})/i); // "Q1 2026"
  if (m1) return `Q${m1[1]}/${m1[2].slice(2)}`;
  const m2 = raw.match(/(\d{4})-Q(\d)/i); // "2026-Q1"
  if (m2) return `Q${m2[2]}/${m2[1].slice(2)}`;
  return raw; // already formatted
}
function normaliseItem(raw: ApiItem, fallbackStatus?: StatusKey): RoadmapItem {
  const rawStatus = (raw.status ?? fallbackStatus ?? "next")
    .toLowerCase()
    .trim();
  const status: StatusKey = STATUS_MAP[rawStatus] ?? "next";



  return {
    id: raw.id ?? ++_idSeq,
    period: formatPeriod(raw.period) ?? "",
    brand: toArray(raw.brand),
    product: toArray(raw.product),
    title: raw.title ?? raw.cardTitle ?? "Untitled",
    detail: raw.detail ?? raw.cardDetail ?? "",
    date: raw.date ?? "",
    status,
   
  };
}

function normaliseRoadmap(roadmap: ApiRoadmap): RoadmapItem[] {
  _idSeq = 0;
  const items: RoadmapItem[] = [];

  // Shape 1: groupedByStatus
  if (roadmap.groupedByStatus) {
    for (const [statusKey, rawItems] of Object.entries(
      roadmap.groupedByStatus,
    )) {
      const fallback = STATUS_MAP[statusKey.toLowerCase()] ?? "next";
      (rawItems ?? []).forEach((r) => items.push(normaliseItem(r, fallback)));
    }
    return items;
  }

  // Shape 2: flat items array
  if (roadmap.items) {
    roadmap.items.forEach((r) => items.push(normaliseItem(r)));
    return items;
  }

  return items;
}

// ─── Derive filter option lists dynamically from data ──────────────────────────
function deriveOptions(items: RoadmapItem[]) {
  const brands = new Set<string>();
  const products = new Set<string>();
  const periods = new Set<string>();

  items.forEach((item) => {
    item.brand.forEach((b) => brands.add(b));
    item.product.forEach((p) => products.add(p));
    if (item.period) periods.add(item.period);
  });

  // Sort periods chronologically Q1/26, Q2/26 …
  const sortedPeriods = [...periods].sort((a, b) => {
    const parse = (s: string) => {
      const m = s.match(/Q(\d)\/(\d+)/);
      return m ? parseInt(m[2]) * 10 + parseInt(m[1]) : 9999;
    };
    return parse(a) - parse(b);
  });

  return {
    brands: [...brands].sort(),
    products: [...products].sort(),
    periods: sortedPeriods,
  };
}

export default function RoadmapBoard() {
  const [allItems, setAllItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("Product Roadmap");
  const [selectedCard, setSelectedCard] = useState<RoadmapItem | null>(null);

  // Filter state — all from doc: Period, Brand, Product, Status, Public

  const [filterProducts, setFilterProducts] = useState<string[]>([]);
  const [filterPeriods, setFilterPeriods] = useState<string[]>([]);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);

  // ── Fetch ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      const url = `${import.meta.env.VITE_ROADMAP_URL}/api/confluence/roadmap?useCache=false`;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data: ApiResponse = await res.json();
        if (!data.success) throw new Error(data.error ?? "Unknown API error");
        setTitle(data.roadmap.title ?? "Product Roadmap");
     setAllItems(
       normaliseRoadmap(data.roadmap).filter((item) =>
         item.brand.some((b) => b.toLowerCase().includes("n0de")),
       ),
     );
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch roadmap",
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);


  const {  products, periods } = useMemo(
    () => deriveOptions(allItems),
    [allItems],
  );
  const statusOptions = COLUMNS.map((c) => c.label);

  // ── Filter ──────────
  const filtered = useMemo(
    () =>
      allItems.filter((item) => {
        
        if (
          filterProducts.length &&
          !filterProducts.some((p) => item.product.includes(p))
        )
          return false;
        if (filterPeriods.length && !filterPeriods.includes(item.period))
          return false;
        if (filterStatuses.length) {
          // map label → key
          const selectedKeys = filterStatuses.map(
            (l) => COLUMNS.find((c) => c.label === l)?.key ?? "",
          );
          if (!selectedKeys.includes(item.status)) return false;
        }
        return true;
      }),
    [allItems, filterProducts, filterPeriods, filterStatuses],
  );

  const byStatus = useMemo(() => {
    const map: Record<string, RoadmapItem[]> = {};
    COLUMNS.forEach((c) => {
      map[c.key] = [];
    });
    filtered.forEach((item) => {
      map[item.status]?.push(item);
    });
    return map;
  }, [filtered]);

  const hasFilters =
  
    filterProducts.length ||
    filterPeriods.length ||
    filterStatuses.length;

  const clearAll = () => {
  
    setFilterProducts([]);
    setFilterPeriods([]);
    setFilterStatuses([]);
  };

  // ── Loading ────────
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
              width: 28,
              height: 28,
              border: "2.5px solid rgba(255,255,255,0.08)",
              borderTop: "2.5px solid #7c3aed",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            Loading roadmap…
          </span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error ──────────
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
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.22)",
            borderRadius: 12,
            padding: "22px 30px",
            maxWidth: 400,
            textAlign: "center",
          }}>
          <p
            style={{
              color: "#fca5a5",
              fontSize: 14,
              fontWeight: 600,
              margin: "0 0 6px",
            }}>
            Failed to load roadmap
          </p>
          <p
            style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0 }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  // ── Board ────────
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#fff",
      }}>
    

      {/* ── Toolbar ── */}
      <div
        style={{
          padding: "18px 20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          paddingBottom: 14,
        }}>
        <div>
          <h1
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "rgba(255,255,255,0.82)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}>
            {title}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}>
      
          <MultiSelect
            label="Period"
            options={periods}
            value={filterPeriods}
            onChange={setFilterPeriods}
          />
        
          <MultiSelect
            label="Product"
            options={products}
            value={filterProducts}
            onChange={setFilterProducts}
          />
          <MultiSelect
            label="Status"
            options={statusOptions}
            value={filterStatuses}
            onChange={setFilterStatuses}
          />

          {hasFilters > 0 && (
            <button
              onClick={clearAll}
              style={{
                background: "none",
                border: "1px solid rgba(239,68,68,0.28)",
                borderRadius: 8,
                padding: "6px 10px",
                cursor: "pointer",
                color: "#fca5a5",
                fontSize: 12,
              }}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── Kanban board ── */}
      <div style={{ padding: "16px 12px 32px", overflowX: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(255px, 1fr))",
            gap: 12,
            minWidth: 880,
          }}>
          {COLUMNS.map((col) => {
            const cards = byStatus[col.key] ?? [];
            return (
              <div key={col.key}>
                {/* Column header */}
                <div
                  style={{
                    borderRadius: "10px 10px 0 0",
                    borderTop: `2.5px solid ${col.accent}`,
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderTopColor: col.accent,
                    padding: "10px 13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.78)",
                    }}>
                    {col.label}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.07)",
                      padding: "2px 7px",
                      borderRadius: 999,
                      fontWeight: 600,
                    }}>
                    {cards.length}
                  </span>
                </div>

                {/* Cards list */}
                <div
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderTop: "none",
                    borderRadius: "0 0 10px 10px",
                    padding: "8px 7px 4px",
                    minHeight: 60,
                  }}>
                  {cards.length === 0 ? (
                    <p
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.15)",
                        textAlign: "center",
                        padding: "18px 0",
                        fontStyle: "italic",
                        margin: 0,
                      }}>
                      No items
                    </p>
                  ) : (
                    cards.map((card) => (
                      <RoadmapCard
                        key={card.id}
                        card={card}
                        onClick={() => setSelectedCard(card)}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Detail drawer ── */}
      {selectedCard && (
        <CardDrawer
          card={selectedCard}
          allCards={filtered}
          onClose={() => setSelectedCard(null)}
          onPrev={() => {
            const i = filtered.findIndex((c) => c.id === selectedCard.id);
            if (i > 0) setSelectedCard(filtered[i - 1]);
          }}
          onNext={() => {
            const i = filtered.findIndex((c) => c.id === selectedCard.id);
            if (i < filtered.length - 1) setSelectedCard(filtered[i + 1]);
          }}
        />
      )}
    </div>
  );
}
