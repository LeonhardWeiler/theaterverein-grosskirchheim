# Website für Theaterverein Großkirchheim

Das ist die offizielle Website des Theatervereins Großkirchheim. Hier finden Sie
Informationen zu den aktuellen und vergangenen Theaterproduktionen und Kontaktmöglichkeiten.

Statische Single-Page-App mit React 19, React Router 7 und Vite (React Compiler
aktiv). Kein Backend, alle Inhalte kommen aus JSON-Dateien und statischen Assets.

## Voraussetzungen

- Node.js + npm
- `jq` und `bash` für die Bild- und Daten-Skripte (`generate-cover`, `get-image-count`)
- Für den Deploy einmalig einen Git-Worktree `.publish` auf dem Branch `publish`
  anlegen: `git worktree add .publish publish`

## Entwicklung

```bash
npm install
npm run dev       # Dev-Server
npm run build     # Produktions-Build nach dist/ (erzeugt zuvor die Sitemap)
npm run preview   # Build lokal servieren
npm run lint      # ESLint
```

## Inhalte pflegen

Alle Vorstellungen stehen in `src/data/vorstellungen.json`. Schlüssel ist die
numerische ID, Wert ist `{ title, content, media-folder, year,
image-count }`. `src/data/cover.json` legt je `media-folder` fest, welches Bild
als Cover dient (Default `0001`).

Bilder liegen unter `public/assets/images/<media-folder>/images/` bzw. `/cover/`
(gitignored, nicht im Repo). Dateinamen sind 4-stellig mit führenden Nullen plus
Größensuffix, z. B. `0001-big.webp`,
`0001-medium.webp`, `0001-small.webp`. Die Bildpfade werden zur Laufzeit nur aus
`image-count` erzeugt, der Wert muss exakt zur Anzahl der Bilder passen.

### Asset-Workflow bei neuen Bildern

1. Originale in `public/assets/images/<media-folder>/images/` ablegen.
2. `node generate-images` skaliert die Originale auf `-big`/`-medium`/`-small`
   WebP und verschiebt sie nach `./originals`. Mit
   `DELETE_ORIGINALS=1 node generate-images` werden sie stattdessen gelöscht.
3. `bash get-image-count` schreibt `image-count` in `vorstellungen.json`
   (legt `*.bak` an).
4. Bei Bedarf `cover.json` anpassen, dann `bash generate-cover`. Das kopiert das
   gewählte Bild in den Ordner `cover/` jeder Vorstellung.
5. `npm run sitemap` (oder `npm run build`) aktualisiert `public/sitemap.xml`.

## Deploy

```bash
npm run deploy
```

`deploy.mjs` bricht ab, wenn man nicht auf `main` ist oder der Working Tree nicht
sauber ist. Sonst baut es neu, kopiert `dist/` in den Worktree `.publish`, legt
eine `.htaccess` an (SPA-Fallback und Cache-Header) und pusht `publish`. Der
Apache-Host servt diesen Branch. Ist der Build unverändert, gibt es keinen Commit.
