import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const settingsIcon = "/assets/img/settings-icon.png";

function hasSsoCallbackParams(): boolean {
  const fromQuery = new URLSearchParams(window.location.search);
  if (fromQuery.get("code") && fromQuery.get("state")) {
    return true;
  }
  const fromHash = new URLSearchParams(window.location.hash.slice(1));
  if (fromHash.get("code") && fromHash.get("state")) {
    return true;
  }
  try {
    const stashed = sessionStorage.getItem("sso_pending_params");
    return Boolean(stashed && stashed.includes("code=") && stashed.includes("state="));
  } catch {
    return false;
  }
}

function isSsoCallbackPath(pathname: string): boolean {
  return pathname.replace(/\/$/, "") === "/sso/callback";
}

const NotFound: React.FC = () => {
  const location = useLocation();

  // Safety net: if AFK somehow shows during SSO, jump straight to the callback page.
  useEffect(() => {
    if (!isSsoCallbackPath(location.pathname) && !hasSsoCallbackParams()) {
      return;
    }

    try {
      if (sessionStorage.getItem("sso_afk_bounce") === "1") {
        return;
      }
      sessionStorage.setItem("sso_afk_bounce", "1");
    } catch {
      // ignore
    }

    const hash = window.location.hash || "";
    const search = window.location.search || "";
    let target = `${window.location.origin}/sso/callback`;

    if (hash.includes("code=")) {
      target += hash;
    } else if (search.includes("code=")) {
      target += search;
    } else {
      try {
        const stashed = sessionStorage.getItem("sso_pending_params");
        if (stashed) {
          target += `#${stashed}`;
        }
      } catch {
        // ignore
      }
    }

    window.location.replace(target);
  }, [location.pathname]);

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Montserrat', 'Arial', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: "3rem",
          padding: "2rem 2rem 2rem 0",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            flex: "0 0 300px",
            maxWidth: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={settingsIcon}
            alt="Settings Icon"
            style={{
              width: "100%",
              maxWidth: "260px",
              maxHeight: "40vh",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
        <div style={{ flex: 1, textAlign: "center", padding: "2rem 0" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: "1.5rem",
            }}
          >
            <span className="text-gradient-primary ">"This Page is AFK."</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.95rem",
              marginBottom: "1rem",
            }}
          >
            If you were signing in, redirecting to SSO…
          </p>
          <Link
            to="/"
            className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill mt-4"
            style={{
              padding: "0.75rem 1.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>Return to Home</span>
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
