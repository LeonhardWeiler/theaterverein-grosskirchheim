function ZoomModal({
  img,
  onClose,
  prevImage,
  nextImage,
  hasPrev,
  hasNext,
  onTouchStart,
  onTouchEnd,
  imageRef
}) {

  function handleLoad() {
    imageRef?.current?.classList.remove("loading");
  }

  return (
    <div
      className="carousel-container"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="zoom-overlay" onClick={onClose}>
        <img
          ref={imageRef}
          src={img.big}
          alt="Vergrößertes Bild im Zoom-Modus"
          className="zoom-image"
          onClick={e => e.stopPropagation()}
          onLoad={handleLoad}
        />
        <button className="zoom-close" onClick={onClose}>×</button>
      </div>

      {hasPrev && (
        <button className="carousel-btn zoom-btn left" onClick={prevImage}>‹</button>
      )}

      {hasNext && (
        <button className="carousel-btn zoom-btn right" onClick={nextImage}>›</button>
      )}
    </div>
  );
}

export default ZoomModal;

