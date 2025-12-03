// Lazy-Pfade für WebP-Bilder
const mediaFiles = import.meta.glob("/src/assets/**/images/*.webp");

/**
 * Gibt die Basisnamen aller Bilder eines Ordners zurück
 */
export function getBaseNames(folder) {
  const prefix = `/src/assets/${folder}/images/`;
  return Object.keys(mediaFiles)
    .filter((path) => path.startsWith(prefix))
    .map((path) => path.split("/").pop())
    .map((file) => file.replace(/\.webp$/, ""))           // .webp entfernen
    .map((file) => file.replace(/-(big|medium|small|lq)$/, "")) // Varianten entfernen
    .filter((v, i, a) => a.indexOf(v) === i); // unique
}

/**
 * Gibt die Pfade aller Varianten eines Bildes zurück
 */
export function getImageVariants(folder, baseName) {
  return {
    id: baseName,
    big: `/src/assets/${folder}/images/${baseName}-big.webp`,
    medium: `/src/assets/${folder}/images/${baseName}-medium.webp`,
    small: `/src/assets/${folder}/images/${baseName}-small.webp`,
    lq: `/src/assets/${folder}/images/${baseName}-lq.webp`,
  };
}

/**
 * Lädt alle Bilder eines Ordners
 */
export function loadMedia(folder) {
  const baseNames = getBaseNames(folder);
  return baseNames.map((baseName) => getImageVariants(folder, baseName));
}

/**
 * Lädt das erste Bild eines Ordners
 */
export function loadFirstImage(folder) {
  const baseNames = getBaseNames(folder);
  if (!baseNames.length) return null;
  return getImageVariants(folder, baseNames[0]);
}

