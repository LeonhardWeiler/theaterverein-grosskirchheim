import { useCallback, useEffect, useState } from "react";

export function useCarouselIndex(folder, imagesLength, mainImageRef, zoomImageRef) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const setIndexWithLoading = useCallback(
    (idxOrUpdater) => {
      if (mainImageRef?.current) {
        mainImageRef.current.classList.add("loading");
      }
      if (zoomImageRef?.current) {
        zoomImageRef.current.classList.add("loading");
      }

      setCurrentIndex(prev =>
        typeof idxOrUpdater === "function"
          ? idxOrUpdater(prev)
          : idxOrUpdater
      );
    },
    [mainImageRef, zoomImageRef]
  );

  const prevImage = useCallback(() => {
    setIndexWithLoading(i => Math.max(i - 1, 0));
  }, [setIndexWithLoading]);

  const nextImage = useCallback(() => {
    setIndexWithLoading(i => Math.min(i + 1, imagesLength - 1));
  }, [setIndexWithLoading, imagesLength]);

  // Load saved index
  useEffect(() => {
    const saved = localStorage.getItem(`carousel-${folder}-index`);
    if (saved !== null) {
      setIndexWithLoading(Number(saved) || 0);
    }
  }, [folder, setIndexWithLoading]);

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
      setIndexWithLoading(0);
    }
  }, [currentIndex, imagesLength, setIndexWithLoading]);

  return {
    currentIndex,
    setCurrentIndex: setIndexWithLoading,
    prevImage,
    nextImage
  };
}

