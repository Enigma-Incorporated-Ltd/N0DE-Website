import Wrapper from "../../common/Wrapper";

import HeaderOne from "../../layouts/headers/HeaderOne";
import FooterOne from "../../layouts/footers/FooterOne";
import Breadcrumb from "../../common/Bredcrumb";
import { Helmet } from "react-helmet";
const content = [
  {
    title: "The Loading Screen",
    subtitle: "We are hard at work syncing the following modules to this page:",
    list: [
      {
        title: "Tech Roadmap",
        description:
          "A full breakdown of our infrastructure upgrades and engine milestones.",
      },
      {
        title: "Feature Queue",
        description:
          'See which new tools are in the "Coming Soon" tray and which are currently in Alpha.',
      },
      {
        title: "Patch Notes",
        description:
          "Early intel on upcoming balance shifts and platform optimizations.",
      },
    ],
  },
  {
    title: "Join the Dev Squad",
    subtitle:
      "N0DE is built for players, by players. We’re launching a community-driven feedback system where you can:",
    list: [
      {
        title: "Upvote Features",
        description:
          'Tell us which tools are "Must-Haves" so we can prioritize the grind.',
      },
      {
        title: "Submit Your Build",
        description:
          "Got a legendary idea for a new feature? Pitch it directly to the team.",
      },
      {
        title: "Beta Access",
        description:
          "Get first dibs on testing new drops before they go global.",
      },
    ],
  },
];
export default function Upcoming() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Upcoming: The N0DE Pipeline",
    description:
      "A tactical map of upcoming features, roadmaps, and beta access for the N0DE platform.",
    mainEntity: content.map((c) => ({
      "@type": "ItemList",
      name: c.title,
      description: c.subtitle,
      itemListElement: c.list.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.description,
      })),
    })),
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Upcoming: The N0DE Pipeline</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Helmet>
      <div className="mt-20 bg-dark">
        <HeaderOne />
        <Breadcrumb
          title="Upcoming: The N0DE Pipeline"
          subtitle="Upcoming"
        />{" "}
        <div className="container mt-10 py-10">
          <h3 className="text-white">
            We’re currently loading this page to give you a direct look at the
            N0DE’s dev cycle. This is your tactical map for everything we’re
            building, buffing, and deploying.
          </h3>
        </div>
        <div className="container ">
          {content.map((c) => (
            <div className="mb-10">
              <h3>{c.title}</h3>
              <h4>{c.subtitle}</h4>
              <ul>
                {" "}
                {c.list.map((l) => (
                  <li>
                    <p>
                      <span className="fw-bold">{l.title}: </span>
                      {l.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <FooterOne />
      </div>
    </Wrapper>
  );
}
