import { useEffect, useRef, useState } from "react";
import { loadMedia } from "../utils/loadMedia";
import CarouselThumbnails from "./CarouselThumbnails";
import ZoomModal from "./ZoomModal";
import CarouselMainImage from "./CarouselMainImage";
import CarouselNavigation from "./CarouselNavigation";
import CarouselSwipeHandler from "./CarouselSwipeHandler";

function ImageCarousel({ folder, imageCount }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const preloaded = useRef(new Set());

  // --------------------- REMEMBER LAST IMAGE ---------------------
  useEffect(() => {
    const saved = localStorage.getItem(`carousel-${folder}-index`);
    if (saved) setCurrentIndex(parseInt(saved, 10));
  }, [folder]);

  useEffect(() => {
    if (images.length)
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
    const media = loadMedia(folder, imageCount);
    setImages(Array.isArray(media) ? media : []);
  }, [folder, imageCount]);

  if (!images.length) return <p>Keine Bilder gefunden</p>;

  // Falls localStorage einen zu großen Index gesetzt hat
  if (currentIndex >= images.length) {
    setCurrentIndex(0);
    return null; // Erst rerendern lassen
  }

  const img = images[currentIndex];
  if (!img) {
    return <p>Bilddaten fehlen…</p>;
  }


  const prevImage = () => currentIndex > 0 && setCurrentIndex(i => i - 1);
  const nextImage = () => currentIndex < images.length - 1 && setCurrentIndex(i => i + 1);

  return (
    <>
      {/* ---------- SWIPE HANDLER + MAIN IMAGE + BUTTONS ---------- */}
      <CarouselSwipeHandler onSwipeLeft={nextImage} onSwipeRight={prevImage}>

        <div className="carousel-container">
          <CarouselMainImage img={img} onClick={() => setZoomOpen(true)} />

          <CarouselNavigation
            showPrev={currentIndex > 0}
            showNext={currentIndex < images.length - 1}
            onPrev={prevImage}
            onNext={nextImage}
          />
        </div>

      </CarouselSwipeHandler>

      {/* ---------- THUMBNAILS ---------- */}
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
        />
      )}
    </>
  );
}

export default ImageCarousel;

