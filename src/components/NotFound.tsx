import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const settingsIcon = "/assets/img/settings-icon.png";

/** One auto-reload if SSO callback lands on this catch-all (cold start / stale bundle). */
const SSO_RELOAD_KEY = "sso-callback-afk-reload";
const SSO_RELOAD_DELAY_MS = 20_000;

function hasSsoCallbackParams(): boolean {
  const fromQuery = new URLSearchParams(window.location.search);
  if (fromQuery.get("code") && fromQuery.get("state")) {
    return true;
  }
  const fromHash = new URLSearchParams(window.location.hash.slice(1));
  return Boolean(fromHash.get("code") && fromHash.get("state"));
}

function isSsoCallbackPath(pathname: string): boolean {
  return pathname === "/sso/callback" || pathname === "/sso/callback/";
}

const NotFound: React.FC = () => {
  const location = useLocation();
  const shouldRecover =
    isSsoCallbackPath(location.pathname) || hasSsoCallbackParams();

  const [secondsLeft, setSecondsLeft] = useState(
    shouldRecover ? SSO_RELOAD_DELAY_MS / 1000 : 0
  );
  const [willReload, setWillReload] = useState(false);

  useEffect(() => {
    if (!shouldRecover) {
      return;
    }

    let alreadyTried = false;
    try {
      alreadyTried = sessionStorage.getItem(SSO_RELOAD_KEY) === "1";
    } catch {
      // ignore
    }

    if (alreadyTried) {
      setWillReload(false);
      setSecondsLeft(0);
      return;
    }

    setWillReload(true);
    const startedAt = Date.now();

    const tick = window.setInterval(() => {
      const left = Math.max(
        0,
        Math.ceil((SSO_RELOAD_DELAY_MS - (Date.now() - startedAt)) / 1000)
      );
      setSecondsLeft(left);
    }, 250);

    const reloadTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SSO_RELOAD_KEY, "1");
      } catch {
        // ignore
      }
      // Full reload keeps hash (#code=...) so /sso/callback can complete sign-in.
      window.location.reload();
    }, SSO_RELOAD_DELAY_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(reloadTimer);
    };
  }, [shouldRecover]);

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

          {willReload && secondsLeft > 0 && (
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.95rem",
                marginBottom: "1rem",
              }}
            >
              Completing SSO sign-in… reloading in {secondsLeft}s
            </p>
          )}

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
