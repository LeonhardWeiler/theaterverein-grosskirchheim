const mediaFiles = import.meta.glob(
  "/src/assets/images/**/{images,videos}/*.{webp,jpg,jpeg,png,mp4,mov}",
  { eager: true, import: "default" }
);

export function loadMedia(folder, type = "images") {
  if (!folder) return [];

  const base = `/src/assets/images/${folder}/${type}/`;

  return Object.entries(mediaFiles)
    .filter(([path]) => path.startsWith(base))
    .sort(([a], [b]) => a.localeCompare(b, "de", { numeric: true }))
    .map(([, url]) => url);
}

export function loadFirstImage(folder) {
  return loadMedia(folder, "images")[0] ?? null;
}

export function loadFirstVideo(folder) {
  return loadMedia(folder, "videos")[0] ?? null;
}

