import { useEffect, useRef, useState } from "react";
import { loadMedia } from "../utils/loadMedia";
import CarouselThumbnails from "./CarouselThumbnails";
import ZoomModal from "./ZoomModal";

function ImageCarousel({ folder, imageCount }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const preloaded = useRef(new Set());

  // --------------------- REMEMBER LAST IMAGE ---------------------
  useEffect(() => {
    const saved = localStorage.getItem(`carousel-${folder}-index`);
    if (saved) {
      setCurrentIndex(parseInt(saved, 10));
    }
  }, [folder]);

  useEffect(() => {
    if (images.length > 0)
      localStorage.setItem(`carousel-${folder}-index`, currentIndex);
  }, [currentIndex, images, folder]);


  // --------------------- PRELOAD NEXT 5 IMAGES ---------------------
  const preloadNextImages = (startIndex) => {
    if (!images.length) return;

    const RANGE = 5;

    for (let i = 1; i <= RANGE; i++) {
      const nextIndex = startIndex + i;
      if (nextIndex >= images.length) break;

      const imgObj = images[nextIndex];

      if (!preloaded.current.has(imgObj.big)) {
        const img = new Image();
        img.src = imgObj.big;
        preloaded.current.add(imgObj.big);
      }
    }
  };

  useEffect(() => {
    preloadNextImages(currentIndex);
  }, [currentIndex, images]);


  // --------------------- LOAD IMAGES ---------------------
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const media = await loadMedia(folder, imageCount);
      if (isMounted) {
        setImages(media || []);
      }
    };

    load();
    return () => { isMounted = false };
  }, [folder, imageCount]);


  // --------------------- KEYBOARD CONTROL ---------------------
  useEffect(() => {
    const handleKey = e => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") setZoomOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!images.length) return <p>Keine Bilder gefunden</p>;


  const prevImage = () => {
    currentIndex > 0 && setCurrentIndex(i => i - 1);
  };

  const nextImage = () => {
    currentIndex < images.length - 1 && setCurrentIndex(i => i + 1);
  };


  // --------------------- SWIPE ---------------------
  const onTouchStart = e => { touchStartX.current = e.changedTouches[0].screenX };
  const onTouchEnd   = e => {
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
      {/* ---------- MAIN IMAGE (priority load) ---------- */}
      <div
        className="carousel-container"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          srcSet={`${img.medium} 700w, ${img.big} 1200w`}
          sizes="(max-width: 800px) 700px, 1200px"
          alt={`Bild ${currentIndex + 1}`}
          className="carousel-image"
          onClick={() => setZoomOpen(true)}
          style={{ cursor: "zoom-in" }}
          loading="eager"        // PRIORITY!
          fetchpriority="high"   // PRIORITY!
        />

        {currentIndex > 0 && (
          <button className="carousel-btn left" onClick={prevImage}>‹</button>
        )}

        {currentIndex < images.length - 1 && (
          <button className="carousel-btn right" onClick={nextImage}>›</button>
        )}
      </div>

      {/* ---------- THUMBNAILS (lazy via IntersectionObserver) ---------- */}
      <CarouselThumbnails
        images={images}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
      />

      {/* ---------- ZOOM MODAL ---------- */}
      {zoomOpen && (
        <ZoomModal
          img={img}
          onClose={() => setZoomOpen(false)}
          prevImage={prevImage}
          nextImage={nextImage}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < images.length - 1}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      )}
    </>
  );
}

export default ImageCarousel;

