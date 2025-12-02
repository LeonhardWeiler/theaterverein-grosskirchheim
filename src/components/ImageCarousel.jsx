import { useEffect, useState } from "react";
import { loadMedia } from "../utils/loadMedia";

function ImageCarousel({ folder }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const imgs = loadMedia(folder);
    setImages(imgs);
    setCurrentIndex(0);
  }, [folder]);

  if (!images.length) return <p>Keine Bilder gefunden.</p>;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <img
        src={images[currentIndex]}
        alt={`Bild ${currentIndex}`}
        className="carousel-image"
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

