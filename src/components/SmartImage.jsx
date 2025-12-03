import React, { useState } from "react";

const SmartImage = ({ alt, full, w400, w700, lq, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`smart-image-wrapper ${className ?? ""}`}>
      <img
        src={lq}
        alt=""
        aria-hidden="true"
        className={`smart-image-lq ${loaded ? "hidden" : ""}`}
      />

      <img
        src={full}
        srcSet={`${w400} 400w, ${w700} 700w, ${full} 1200w`}
        sizes="(max-width: 480px) 400px, (max-width: 800px) 700px, 1200px"
        loading="lazy"
        alt={alt}
        className={`smart-image-full ${loaded ? "visible" : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default SmartImage;

