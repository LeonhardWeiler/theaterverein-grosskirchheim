/**
 * Gibt die Pfade aller Varianten eines Cover-Bildes zurück
 * @param {string} folder - z.B. "2025-fuer-immer-dico"
 */
export function getCoverVariants(folder) {
  const baseName = "0001"; // immer die erste Datei
  const basePath = `/assets/${folder}/cover/`; // public/assets/...

  return {
    id: baseName,
    big: `${basePath}${baseName}-big.webp`,
    medium: `${basePath}${baseName}-medium.webp`,
    small: `${basePath}${baseName}-small.webp`,
  };
}

/**
 * Lädt das erste Cover-Bild eines Ordners
 */
export function loadCover(folder) {
  return getCoverVariants(folder);
}
