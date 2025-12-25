function ZoomModal({
  img,
  onClose,
  prevImage,
  nextImage,
  hasPrev,
  hasNext,
  onTouchStart,
  onTouchEnd
}) {
  return (
    <div
      className="carousel-container"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="zoom-overlay" onClick={onClose}>
        <img
          src={img.big}
          alt="Zoom"
          className="zoom-image"
          onClick={e => e.stopPropagation()}
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

