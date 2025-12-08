import { useRef } from "react";

function CarouselSwipeHandler({ children, onSwipeLeft, onSwipeRight }) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 40) return;

    diff > 0 ? onSwipeLeft() : onSwipeRight();
  };

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {children}
    </div>
  );
}

export default CarouselSwipeHandler;

