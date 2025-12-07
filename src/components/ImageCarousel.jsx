import { useEffect, useState } from "react";
import { loadMedia } from "../utils/loadMedia";

function ImageCarousel({ folder, imageCount }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Bildpfade laden (nur Metadaten)
  useEffect(() => {
    const media = loadMedia(folder, imageCount);
    setImages(media);
  }, [folder, imageCount]);

  if (!images.length) return <p>Keine Bilder gefunden.</p>;

  const img = images[currentIndex];

  const prevImage = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="carousel-container">
      <img
        srcSet={`${img.small} 400w, ${img.medium} 700w, ${img.big} 1200w`}
        sizes="(max-width: 480px) 400px, (max-width: 800px) 700px, 1200px"
        loading="lazy"
        alt={`Bild ${currentIndex + 1}`}
        className="item-image"
      />
      <button className="carousel-btn left" onClick={prevImage}>
        ‹
      </button>
      <button className="carousel-btn right" onClick={nextImage}>
        ›
      </button>
    </div>
  );
}

export default ImageCarousel;

