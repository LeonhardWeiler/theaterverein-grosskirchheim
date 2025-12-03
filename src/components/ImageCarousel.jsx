import { useState } from "react";
import SmartImage from "./SmartImage";
import { loadMedia } from "../utils/loadMedia";

function ImageCarousel({ folder }) {
  const images = loadMedia(folder);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) return <p>Keine Bilder gefunden.</p>;

  const img = images[currentIndex];

  const prevImage = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="carousel-container">
      <SmartImage
        full={img.big}
        w700={img.medium}
        w400={img.small}
        lq={img.lq}
        alt={`Bild ${img.id}`}
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

