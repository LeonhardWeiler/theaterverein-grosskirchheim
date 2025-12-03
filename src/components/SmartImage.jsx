import React, { useState } from "react";

const SmartImage = ({ alt, full, w400, w640, lq, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`smart-image-wrapper ${className ?? ""}`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <img
        src={lq}
        aria-hidden="true"
        className="smart-image-lq"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          filter: "blur(20px)",
          transform: "scale(1.1)",
          transition: "opacity 0.4s ease",
          opacity: loaded ? 0 : 1,
        }}
      />

      <img
        src={full}
        srcSet={`${w400} 400w, ${w640} 640w, ${full} 1200w`}
        sizes="(max-width: 480px) 400px, (max-width: 800px) 640px, 1200px"
        loading="lazy"
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
};

export default SmartImage;
