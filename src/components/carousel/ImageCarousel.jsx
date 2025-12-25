import { useState } from "react";
import { useCarouselImages } from "./hooks/useCarouselImages";
import { useCarouselIndex } from "./hooks/useCarouselIndex";
import { useCarouselKeyboard } from "./hooks/useCarouselKeyboard";

import CarouselMainImage from "./components/CarouselMainImage";
import CarouselNavigation from "./components/CarouselNavigation";
import CarouselThumbnails from "./components/CarouselThumbnails";
import CarouselSwipeHandler from "./components/CarouselSwipeHandler";
import ZoomModal from "./components/ZoomModal";

function ImageCarousel({ folder, imageCount }) {
  const [zoomOpen, setZoomOpen] = useState(false);

  const images = useCarouselImages(folder, imageCount);
  const {
    currentIndex,
    setCurrentIndex,
    prevImage,
    nextImage
  } = useCarouselIndex(folder, images.length);

  useCarouselKeyboard({
    prev: prevImage,
    next: nextImage,
    closeZoom: () => setZoomOpen(false)
  });

  if (!images.length) return <p>Keine Bilder gefunden</p>;

  const img = images[currentIndex];

  return (
    <>
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

      <CarouselThumbnails
        images={images}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
      />

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

