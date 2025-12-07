/**
 * Erzeugt alle Bildvarianten für einen Basenamen
 */
export function getImageVariants(folder, baseName) {
  const basePath = `/assets/${folder}/images/`;

  return {
    id: baseName,
    big: `${basePath}${baseName}-big.webp`,
    medium: `${basePath}${baseName}-medium.webp`,
    small: `${basePath}${baseName}-small.webp`,
  };
}

/**
 * Erzeugt die Liste aller Basenamen
 * Beispiel: count = 3 → ["0001", "0002", "0003"]
 */
export function generateBaseNames(count) {
  return Array.from({ length: count }, (_, i) =>
    String(i + 1).padStart(4, "0")
  );
}

/**
 * Lädt alle Bilder eines Ordners
 * Parameter:
 *  - folder (String)
 *  - count  (Number) wie viele Bilder, z. B. 123
 */
export function loadMedia(folder, count) {
  const baseNames = generateBaseNames(count);

  return baseNames.map((baseName) => {
    return getImageVariants(folder, baseName);
  });
}

