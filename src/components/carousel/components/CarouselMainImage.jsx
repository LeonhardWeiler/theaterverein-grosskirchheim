function CarouselMainImage({ img, onClick, imageRef }) {
  if (!img || !img.big) return <p>Kein Bild verfügbar</p>;

  function handleLoad() {
    imageRef?.current?.classList.remove("loading");
  }

  return (
    <img
      ref={imageRef}
      src={img.big}
      srcSet={img.medium && img.big ? `${img.medium} 700w, ${img.big} 1200w` : undefined}
      alt="Erstes Bild des Bilder Karussells"
      loading="eager"
      fetchPriority="high"
      className="carousel-image"
      onClick={onClick}
      onLoad={handleLoad}
    />
  );
}

export default CarouselMainImage;

