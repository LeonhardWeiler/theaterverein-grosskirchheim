import { useCallback, useEffect, useState } from "react";

export function useCarouselIndex(folder, imagesLength) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = useCallback(() => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex(i => Math.min(i + 1, imagesLength - 1));
  }, [imagesLength]);

  // Load saved index
  useEffect(() => {
    const saved = localStorage.getItem(`carousel-${folder}-index`);
    if (saved) setCurrentIndex(Number(saved) || 0);
  }, [folder]);

  // Save index
  useEffect(() => {
    if (imagesLength) {
      localStorage.setItem(
        `carousel-${folder}-index`,
        Math.min(currentIndex, imagesLength - 1)
      );
    }
  }, [currentIndex, imagesLength, folder]);

  // Fix invalid index
  useEffect(() => {
    if (currentIndex >= imagesLength && imagesLength) {
      setCurrentIndex(0);
    }
  }, [currentIndex, imagesLength]);

  return {
    currentIndex,
    setCurrentIndex,
    prevImage,
    nextImage
  };
}

