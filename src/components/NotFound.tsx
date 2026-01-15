import React from "react";
import { Link } from 'react-router-dom';
import HeaderDashboard from "../layouts/headers/HeaderDashboard";

// Use the settings icon from the public/assets folder
const settingsIcon = "/assets/img/settings icon.png";

const NotFound: React.FC = () => (
  <div style={{
    backgroundColor: "#000",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "'Montserrat', 'Arial', sans-serif",
    display: "flex",
    flexDirection: "column"
  }}>
    <HeaderDashboard />
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flex: 1,
      gap: "3rem",
      padding: "2rem 2rem 2rem 0",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      {/* Left: Image */}
      <div style={{ width: "350px", display: "flex", justifyContent: "flex-start" }}>
        <img
          src={settingsIcon}
          alt="Settings Icon"
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
            background: "transparent",
            boxShadow: "none",
            border: "none"
          }}
        />
      </div>
      {/* Right: Text */}
      <div style={{ flex: 1, textAlign: "left", padding: "2rem 0" }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          marginBottom: "1.5rem"
        }}>
          <span className="text-gradient-primary">"This Page is AFK."</span>
        </h1>
        <Link 
  to="/" 
  className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill mt-4"
  style={{ 
    padding: "0.75rem 1.5rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem"
  }}
>
  <span>Return to Home</span>
  <i className="bi bi-arrow-right"></i>
</Link>
      </div>
    </div>
  </div>
);

export default NotFound; 