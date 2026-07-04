# Website für Theaterverein Großkirchheim

Das ist die offizielle Website des Theatervereins Großkirchheim. Hier finden Sie
Informationen zu den aktuellen und vergangenen Theaterproduktionen und Kontaktmöglichkeiten.

Statische Single-Page-App mit React 19, React Router 7 und Vite (React Compiler
aktiv). Kein Backend — alle Inhalte kommen aus JSON-Dateien und statischen Assets.

## Voraussetzungen

- Node.js + npm
- `jq` und `bash` — für die Bild-/Daten-Skripte (`generate-cover`, `get-image-count`)
- Für den Deploy: ein Git-Worktree `.publish` auf dem `publish`-Branch
  (einmalig anlegen): `git worktree add .publish publish`

## Entwicklung

```bash
npm install
npm run dev       # Dev-Server
npm run build     # Produktions-Build nach dist/ (erzeugt zuvor die Sitemap)
npm run preview   # Build lokal servieren
npm run lint      # ESLint
```

## Inhalte pflegen

Alle Vorstellungen stehen in `src/data/vorstellungen.json` — ein Objekt mit der
numerischen ID als Schlüssel, gemappt auf `{ title, content, media-folder, year,
image-count }`. `src/data/cover.json` legt je `media-folder` fest, welches Bild
als Cover dient (Default `0001`).

Bilder liegen unter `public/assets/images/<media-folder>/images/` bzw. `/cover/`
(dieser Ordner ist gitignored, also nicht Teil des Repos). Namenskonvention:
4-stellig nullgepolstert plus Größensuffix, z. B. `0001-big.webp`,
`0001-medium.webp`, `0001-small.webp`. Die Bildpfade werden zur Laufzeit rein aus
`image-count` erzeugt — dieser Wert muss exakt zur Anzahl der Bilder passen.

### Asset-Workflow bei neuen Bildern

1. Originale in `public/assets/images/<media-folder>/images/` ablegen.
2. `node generate-images` — skaliert die Originale in `-big`/`-medium`/`-small`
   WebP und verschiebt die Originale nach `./originals` (Sicherung).
   Mit `DELETE_ORIGINALS=1 node generate-images` werden sie stattdessen gelöscht.
3. `bash get-image-count` — schreibt das korrekte `image-count` in
   `vorstellungen.json` zurück (legt `*.bak` an).
4. Bei Bedarf `cover.json` pflegen, dann `bash generate-cover` — kopiert das
   gewählte Bild in den `cover/`-Unterordner jeder Vorstellung.
5. `npm run sitemap` (oder einfach `npm run build`) — aktualisiert
   `public/sitemap.xml`.

## Deploy

```bash
npm run deploy
```

`deploy.mjs` prüft, dass man auf `main` und der Working Tree sauber ist, baut
frisch, kopiert `dist/` atomar in den Git-Worktree `.publish` (Branch `publish`),
legt eine `.htaccess` an (SPA-Fallback + Cache-Header) und pusht `publish`. Der
Produktions-Host (Apache) servt den `publish`-Branch. Ist der Build unverändert,
endet der Deploy ohne Commit.
