import React, { useState, useEffect, useRef } from "react";

const SmartImage = ({ alt, full, w400, w700, lq, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const updateSrc = () => {
      if (!wrapperRef.current) return;

      const width = wrapperRef.current.offsetWidth;
      if (width <= 480 && w400) {
        setCurrentSrc(w400);
      } else if (width <= 800 && w700) {
        setCurrentSrc(w700);
      } else if (full) {
        setCurrentSrc(full);
      } else if (lq) {
        setCurrentSrc(lq);
      }
    };

    updateSrc();

    const observer = new ResizeObserver(updateSrc);
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [full, w400, w700, lq]);

  return (
    <div ref={wrapperRef} className={`smart-image-wrapper ${className ?? ""}`}>
      {lq && (
        <img
          src={lq}
          alt=""
          aria-hidden="true"
          className={`item-image smart-image-lq ${loaded ? "hidden" : ""}`}
        />
      )}

      {currentSrc && (
        <img
          src={currentSrc}
          loading="lazy"
          alt={alt}
          className={`item-image smart-image-full ${loaded ? "visible" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
};

export default SmartImage;

