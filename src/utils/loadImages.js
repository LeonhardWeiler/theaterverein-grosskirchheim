const allImages = import.meta.glob(
  "/public/images/**/images/*.{webp,jpg,jpeg,png}",
  { eager: true }
);

export function loadAllImagesFromFolder(folder) {
  if (!folder) return [];
  const cleanFolder = folder.replace("./", "/public/");
  return Object.keys(allImages)
    .filter((path) => path.startsWith(cleanFolder))
    .map((path) => path.replace("/public", ""));
}

export function loadFirstImageFromFolder(folder) {
  const images = loadAllImagesFromFolder(folder);
  return images[0] ?? null;
}

