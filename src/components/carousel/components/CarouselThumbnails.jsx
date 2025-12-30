import { useEffect, useRef, useState } from "react";

function CarouselThumbnails({ images, currentIndex, onSelect }) {
  const [visible, setVisible] = useState({});
  const refs = useRef([]);

  function handleClick(idx) {
    if (idx === currentIndex) return;
    const mainImage = document.querySelector(".carousel-image");
    mainImage?.classList.add("loading");
    onSelect(idx);
  }

  // IntersectionObserver für Lazy-Loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = entry.target.dataset.index;
            setVisible(prev => ({ ...prev, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" }
    );

    refs.current.forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, [images]);

  // Automatisch scrollen, damit das aktive Thumbnail sichtbar bleibt
  useEffect(() => {
    const activeThumb = refs.current[currentIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center" // wichtig für horizontales Scrollen
      });
    }
  }, [currentIndex]);

  return (
    <div tabIndex="-1" className="carousel-thumbnails">
      {images.map((t, idx) => (
        <img
          key={idx}
          ref={el => (refs.current[idx] = el)}
          data-index={idx}
          src={visible[idx] ? t.small : null}
          alt="kleines Vorschaubild für das Karussell"
          className={`carousel-thumb ${idx === currentIndex ? "active" : ""}`}
          onClick={() => handleClick(idx)}
        />
      ))}
    </div>
  );
}

export default CarouselThumbnails;

