import { useEffect, useState, useRef } from "react";
import { loadMedia } from "../utils/loadMedia";

function ImageCarousel({ folder, imageCount }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [zoomOpen, setZoomOpen] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const media = await loadMedia(folder, imageCount);
      if (isMounted) {
        setImages(media || []);
        setCurrentIndex(0);
      }
    };

    load();
    return () => { isMounted = false };
  }, [folder, imageCount]);


  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") setZoomOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!images.length) return <p>Keine Bilder gefunden</p>;

  const prevImage = () => {currentIndex > 0 && setCurrentIndex(i => i - 1);};
  const nextImage = () => {currentIndex < images.length - 1 && setCurrentIndex(i => i + 1);};

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 40) return;
    diff > 0 ? nextImage() : prevImage();
  };

  const img = images[currentIndex];

  return (
    <>
      <div
        className="carousel-container"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          srcSet={`${img.small} 400w, ${img.medium} 700w, ${img.big} 1200w`}
          sizes="(max-width: 480px) 400px, (max-width: 800px) 700px, 1200px"
          loading="lazy"
          alt={`Bild ${currentIndex + 1}`}
          className="carousel-image"
          onClick={() => setZoomOpen(true)}
          style={{ cursor: "zoom-in" }}
        />

        {currentIndex > 0 && (
          <button className="carousel-btn left" onClick={prevImage}>‹</button>
        )}

        {currentIndex < images.length - 1 && (
          <button className="carousel-btn right" onClick={nextImage}>›</button>
        )}
      </div>

      {/* ---------- THUMBNAILS ---------- */}
      <div className="carousel-thumbnails">
        {images.map((t, idx) => (
          <img
            key={idx}
            src={t.small}
            alt="thumbnail"
            loading="lazy"
            className={`carousel-thumb ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>

      {/* ---------- ZOOM MODAL ---------- */}
      {zoomOpen && (
        <div
          className="carousel-container"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="zoom-overlay" onClick={() => setZoomOpen(false)}>
            <img
              src={img.big}
              alt="Zoom"
              className="zoom-image"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="zoom-close" onClick={() => setZoomOpen(false)}>×</button>
          </div>
          {currentIndex > 0 && (
            <button className="carousel-btn zoom-btn left" onClick={prevImage}>‹</button>
          )}

          {currentIndex < images.length - 1 && (
            <button className="carousel-btn zoom-btn right" onClick={nextImage}>›</button>
          )}
        </div>
      )}
    </>
  );
}

export default ImageCarousel;

