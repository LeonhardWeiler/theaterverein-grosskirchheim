function CarouselMainImage({ img, onClick }) {
  if (!img || !img.big) return null;

  return (
    <img
      src={img.big}
      srcSet={
        img.medium && img.big
          ? `${img.medium} 700w, ${img.big} 1200w`
          : undefined
      }
      alt="Bild"
      loading="eager"
      fetchPriority="high"
      className="carousel-image"
      onClick={onClick}
    />
  );
}

export default CarouselMainImage;

