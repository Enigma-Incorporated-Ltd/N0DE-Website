import React from "react";
import HeaderDashboard from "../layouts/headers/HeaderDashboard";

// Use the local image from the public/assets folder
const sadnessImg = "/assets/sadness.png";

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
      justifyContent: "center",
      flex: 1,
      gap: "3rem",
      padding: "2rem"
    }}>
      {/* Left: Image */}
      <div style={{ width: "350px", display: "flex", justifyContent: "center" }}>
        <img
          src={sadnessImg}
          alt="Sadness crying"
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
          <span className="text-gradient-primary">A W W W . . . D O N ' T   C R Y .</span>
        </h1>
        <div style={{ fontSize: "1.1rem", color: "#ccc", marginBottom: "0.5rem" }}>
          It's just a 404 Error!
        </div>
        <div style={{ fontSize: "1rem", color: "#aaa", marginBottom: "2rem" }}>
          What you’re looking for may have been misplaced in Long Term Memory.
        </div>
      </div>
    </div>
  </div>
);

export default NotFound; 