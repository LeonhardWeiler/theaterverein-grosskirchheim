import { useEffect, useRef, useState } from "react";
import { loadMedia } from "../../../utils/loadMedia";

export function useCarouselImages(folder, imageCount, currentIndex) {
  const [images, setImages] = useState([]);
  const preloaded = useRef(new Set());

  // --------------------- LOAD IMAGES ---------------------
  useEffect(() => {
    const media = loadMedia(folder, imageCount);

    const validImages = Array.isArray(media)
      ? media.filter(img => img && img.big)
      : [];

    setImages(validImages);
  }, [folder, imageCount]);

  // --------------------- PRELOAD NEXT IMAGES ---------------------
  useEffect(() => {
    if (!images.length) return;
    if (currentIndex < 0 || currentIndex >= images.length) return;

    const RANGE = 5;

    for (let i = 1; i <= RANGE; i++) {
      const idx = currentIndex + i;
      if (idx >= images.length) break;

      const image = images[idx];
      if (!image || !image.big) continue;

      if (!preloaded.current.has(image.big)) {
        const img = new Image();
        img.src = image.big;
        preloaded.current.add(image.big);
      }
    }
  }, [currentIndex, images]);

  return images;
}

