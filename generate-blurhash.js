// generateBlurhash.js
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { encode } from "blurhash";

const BASE_DIR = "./public/assets";
const OUTPUT_FILE = "./src/data/blurhash.json";

async function getBlurhash(filePath) {
  const image = sharp(filePath);
  const { data, info } = await image
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: "inside" })
    .toBuffer({ resolveWithObject: true });

  return encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  );
}

async function main() {
  const result = {};

  const folders = fs.readdirSync(BASE_DIR);
  for (const folder of folders) {
    const imagesDir = path.join(BASE_DIR, folder, "images");
    if (!fs.existsSync(imagesDir)) continue;

    // Alle -big.webp Dateien nehmen
    const files = fs.readdirSync(imagesDir).filter(f => f.endsWith("-big.webp"));
    for (const file of files) {
      // Basisname aus originaler Datei, z.B. img_0033
      const baseName = file.replace(/-big\.webp$/, "");
      const fullPath = path.join(imagesDir, file);

      try {
        const hash = await getBlurhash(fullPath);
        const key = `${folder}/${baseName}`;
        result[key] = hash;
        console.log("Generated:", key);
      } catch (e) {
        console.error("Error processing", file, e);
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log("Blurhashes saved to", OUTPUT_FILE);
}

main();

