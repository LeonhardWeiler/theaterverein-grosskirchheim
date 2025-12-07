import { useEffect, useState } from "react";
import { loadMedia } from "../utils/loadMedia";

function ImageCarousel({ folder, imageCount }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const media = loadMedia(folder, imageCount);
    setImages(media);
    setCurrentIndex(0);
    setLoading(false);
  }, [folder, imageCount]);

  if (loading) return null;
  if (!images.length) return <p>Keine Bilder gefunden.</p>;

  const img = images[currentIndex];

  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="carousel-container">
      <img
        srcSet={`${img.small} 400w, ${img.medium} 700w, ${img.big} 1200w`}
        sizes="(max-width: 480px) 400px, (max-width: 800px) 700px, 1200px"
        loading="lazy"
        alt={`Bild ${currentIndex + 1}`}
        className="item-image"
      />
      {currentIndex > 0 && (
        <button className="carousel-btn left" onClick={prevImage}>
          ‹
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button className="carousel-btn right" onClick={nextImage}>
          ›
        </button>
      )}
    </div>
  );
}

export default ImageCarousel;

