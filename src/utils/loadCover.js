export function loadCover(folder) {
  const baseName = "0001";
  const basePath = `/assets/${folder}/cover/`;

  return {
    // big: null,
    // medium: null,
    // small: null,
    big: `${basePath}${baseName}-big.webp`,
    medium: `${basePath}${baseName}-medium.webp`,
    small: `${basePath}${baseName}-small.webp`,
  };
}
