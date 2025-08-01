import React, { useState, useEffect } from "react";

const Hero = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  backgroundColor,
  textColor,
  buttonColor,
  buttonTextColor,
  height,
  showButton = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background:
          backgroundColor ||
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      };

  return (
    <section
      style={{
        ...backgroundStyle,
        padding: isMobile ? "40px 15px" : "60px 20px",
        textAlign: "center",
        color: textColor || "white",
        borderRadius: "12px",
        margin: "20px 0",
        minHeight: isMobile
          ? height
            ? height * 0.7
            : "250px"
          : height || "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {backgroundImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            borderRadius: "12px",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1
          style={{
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            marginBottom: "15px",
            fontWeight: "700",
            textShadow: backgroundImage ? "0 2px 4px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {title || "Welcome to Our Store"}
        </h1>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.2rem",
            marginBottom: "25px",
            maxWidth: isMobile ? "90%" : "600px",
            textShadow: backgroundImage ? "0 1px 2px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {subtitle || "Discover amazing products and exceptional service"}
        </p>
        {showButton && (
          <button
            style={{
              background: buttonColor || "white",
              color: buttonTextColor || "#667eea",
              border: "none",
              padding: isMobile ? "10px 25px" : "12px 30px",
              borderRadius: "25px",
              fontSize: isMobile ? "1rem" : "1.1rem",
              cursor: "pointer",
              fontWeight: "600",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
            onClick={() => buttonLink && window.open(buttonLink, "_blank")}
          >
            {buttonText || "Shop Now"}
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
