function CarouselNavigation({ showPrev, showNext, onPrev, onNext, zoom = false }) {
  return (
    <>
      {showPrev && (
        <button className={`carousel-btn ${zoom ? "zoom-btn" : ""} left`} onClick={onPrev}>
          ‹
        </button>
      )}

      {showNext && (
        <button className={`carousel-btn ${zoom ? "zoom-btn" : ""} right`} onClick={onNext}>
          ›
        </button>
      )}
    </>
  );
}

export default CarouselNavigation;

