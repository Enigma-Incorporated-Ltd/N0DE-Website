import { useState } from "react";
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

const columns: Column[] = [
  {
    id: "exploring",
    title: "Exploring",
    count: 14,
    accentColor: "#3b82f6",
    cards: [
      {
        id: 1,
        title: "Image support in feedback/comments",
        description: "Allow users to add images to comments.",
        status: "Discovery",
        tags: ["Feedback"],
        productArea: "Feedback",
        comments: [
          {
            author: "Alex M.",
            avatar: "A",
            date: "Dec 10, 2025",
            text: "This would be super helpful for bug reports — screenshots tell a thousand words!",
          },
        ],
      },
      {
        id: 2,
        title: "Send emails via custom domains",
        description:
          "Add the ability to send emails via a custom domain instead of coming from Released.",
        status: "Discovery",
        tags: [],
        productArea: "Feedback",
        comments: [],
      },
      {
        id: 3,
        title: "Search for ideas",
        description: "Enable users to search for ideas on the roadmap.",
        status: "Discovery",
        tags: ["Roadmaps"],
        productArea: "Roadmaps",
        comments: [],
      },
      {
        id: 4,
        title: "People and companies",
        description:
          "See richer context about who's giving feedback by surfacing additional metadata about the submitter.",
        status: "Discovery",
        tags: ["Feedback"],
        productArea: "Feedback",
        comments: [],
      },
      {
        id: 5,
        title: "Automate roadmap publishing",
        description:
          "Right now, roadmaps in Released have to be published manually. That gives you full control, but adds friction.",
        status: "Discovery",
        tags: ["Roadmaps"],
        productArea: "Roadmaps",
        comments: [],
      },
      {
        id: 6,
        title: "Portal themes",
        description:
          "To offer greater flexibility, each portal should be able to use its own theme.",
        status: "Discovery",
        tags: ["Portal"],
        productArea: "Portal",
        comments: [],
      },
      {
        id: 7,
        title: "Idea board",
        description:
          "A dedicated view where product teams present curated ideas to gather early feedback.",
        status: "Discovery",
        tags: ["Feedback"],
        productArea: "Feedback",
        comments: [],
      },
    ],
  },
  {
    id: "next",
    title: "Next",
    count: 2,
    accentColor: "#8b5cf6",
    cards: [
      {
        id: 8,
        title: "Customize portal URL",
        description:
          "Allow users to customize the Portal URL after initial creation.",
        status: "Planned",
        tags: ["Portal"],
        hearted: true,
        productArea: "Portal",
        comments: [],
      },
      {
        id: 9,
        title: "Capture feedback via Email",
        description:
          "Capture emailed feedback with a dedicated address that sends submissions right into the inbox.",
        status: "Planned",
        tags: ["Feedback"],
        productArea: "Feedback",
        comments: [
          {
            author: "Julia Wester",
            avatar: "J",
            date: "Nov 29, 2025",
            text: "This would be great because you can't always get users to go to the roadmap and click the right button to deliver feedback to the right place. But, we can forward support requests to an email or give them an email to use.",
          },
        ],
      },
    ],
  },
  {
    id: "now",
    title: "Now",
    count: 2,
    accentColor: "#f59e0b",
    cards: [
      {
        id: 10,
        title: "Embeddable feedback form",
        description:
          "Add a feedback form that can be embedded directly within any webpage, allowing users to submit feedback without leaving the site.",
        status: "In Progress",
        tags: ["Feedback"],
        productArea: "Feedback",
        comments: [],
      },
      {
        id: 11,
        title: "Capture feedback via Slack",
        description:
          "Easily capture and sync feedback from Slack messages, either with a slash command or by reacting to messages.",
        status: "In Progress",
        tags: ["Feedback"],
        productArea: "Feedback",
        comments: [],
      },
    ],
  },
  {
    id: "released",
    title: "Recently released",
    count: 3,
    accentColor: "#10b981",
    cards: [
      {
        id: 12,
        title: "Feedback in embeds",
        description:
          "Support feedback (wishlist and comments) in embeddable views.",
        status: "Done",
        tags: [],
        productArea: "Feedback",
        comments: [],
      },
      {
        id: 13,
        title: "Automatically create columns based on field options or status",
        description:
          "Right now create a number of default columns and try to match them to field options. It works well in most cases.",
        status: "Done",
        tags: ["Roadmaps"],
        productArea: "Roadmaps",
        comments: [],
      },
      {
        id: 14,
        title: "Customize fav icon",
        description:
          "The favicon will automatically use your website's icon instead of displaying the Released logo.",
        status: "Done",
        tags: ["Portal"],
        productArea: "Portal",
        comments: [],
      },
    ],
  },
];

const allCards = columns.flatMap((c) => c.cards);

export default function RoadmapBoard() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const handleHeartToggle = (cardId: string) => {
    const card = allCards.find((c) => c.id === parseInt(cardId));
    if (card) {
      card.hearted = !card.hearted;
    }
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

  return (
    <div
      style={{
        minHeight: "100vh",

        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: "relative",
      }}>
      {/* Board — horizontal flex with overflow scroll */}
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
                  // background: "rgba(19,19,32,0.8)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTop: "none",
                  borderRadius: "0 0 12px 12px",
                  padding: "8px 8px 4px",
                }}>
                {col.cards.map((card) => (
                  <CardItem
                    key={card.id}
                    card={card}
                    onClick={() => setSelectedCard(card)}
                    onHeartToggle={handleHeartToggle}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay drawer */}
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
