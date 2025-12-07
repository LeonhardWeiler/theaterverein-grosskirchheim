export function getImageVariants(folder, baseName) {
  const basePath = `/assets/${folder}/images/`;

  return {
    id: baseName,
    big: `${basePath}${baseName}-big.webp`,
    medium: `${basePath}${baseName}-medium.webp`,
    small: `${basePath}${baseName}-small.webp`,
  };
}

export function generateBaseNames(count) {
  return Array.from({ length: count }, (_, i) =>
    String(i + 1).padStart(4, "0")
  );
}

export function loadMedia(folder, count) {
  const baseNames = generateBaseNames(count);

  return baseNames.map((baseName) => {
    return getImageVariants(folder, baseName);
  });
}

