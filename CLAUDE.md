# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Überblick

Statische SPA (React 19 + Vite 7 + React Router 7) für den Theaterverein Großkirchheim. Zeigt Theaterproduktionen (Vorstellungen) mit Bildergalerien und eine Kontaktseite. Kein Backend — alle Inhalte kommen aus JSON-Dateien und statischen Assets.

## Befehle

```bash
npm run dev      # Vite Dev-Server
npm run build    # Produktions-Build nach dist/
npm run lint     # ESLint über das gesamte Projekt
npm run preview  # Produktions-Build lokal servieren
npm run deploy   # Build + Push auf den publish-Branch (siehe unten)
```

Es gibt kein Test-Setup.

## Architektur

### Datengetriebene Vorstellungen
Der gesamte Inhalt der Vorstellungen liegt in `src/data/vorstellungen.json` — ein Objekt, dessen **Schlüssel die numerische ID** ist (`"1"`, `"2"`, …), gemappt auf `{ title, content, media-folder, year, image-count }`. Routen wie `/vorstellungen/:id` schlagen den Eintrag direkt per ID in diesem JSON nach (`VorstellungID.jsx`). Beim Anlegen einer neuen Vorstellung: Eintrag hier ergänzen, `media-folder` auf den Bildordner setzen.

`src/data/cover.json` mappt `media-folder → Basisname` (z. B. `"0022"`) und legt fest, welches Bild als Cover verwendet wird (Default `0001`).

### Bild-Konvention & Pipeline
Bilder liegen unter `public/assets/images/<media-folder>/images/` und `/cover/`. **Dieser Ordner ist gitignored** (`/public/assets/`) — die Bilder sind nicht Teil des Repos und müssen lokal vorhanden sein.

Namenskonvention: 4-stellig nullgepolstert plus Größensuffix, z. B. `0001-small.webp`, `0001-medium.webp`, `0001-big.webp`. `src/utils/loadMedia.js` generiert die Bildpfade **rein aus `image-count`** (kein Verzeichnis-Scan zur Laufzeit), indem es `0001`…`000N` durchzählt. Deshalb muss `image-count` in `vorstellungen.json` exakt zur Anzahl vorhandener Bilder passen.

Hilfsskripte (aus dem Repo-Root ausführen, benötigen `sharp`, `jq`, bash):
- `node generate-images` — skaliert alle Originale in `public/assets/images/**` auf `-big`/`-medium`/`-small` WebP und **verschiebt das Original** danach nach `./originals` (Sicherung). Mit `DELETE_ORIGINALS=1` wird es stattdessen gelöscht.
- `bash get-image-count` — scannt die Bildordner und schreibt das korrekte `image-count` in `vorstellungen.json` zurück (legt `.bak` an — ist gitignored).
- `bash generate-cover` — kopiert das in `cover.json` gewählte Bild in den `cover/`-Unterordner jeder Vorstellung.
- `npm run sitemap` (`node generate-sitemap.js`) — erzeugt `public/sitemap.xml` aus allen IDs in `vorstellungen.json`. Läuft automatisch als `prebuild`, also bei jedem `npm run build`.

Reihenfolge bei neuen Bildern: Originale ablegen → `generate-images` → `get-image-count` → ggf. `cover.json` pflegen + `generate-cover`. Die Sitemap wird beim nächsten Build automatisch aktualisiert.

### Routing & Struktur
`src/main.jsx` definiert den `createBrowserRouter` mit `Layout` als Shell und `ErrorPage` als errorElement. `VorstellungenListe`, `VorstellungID` und `Kontakt` sind lazy-geladen; `Home` und `NotFound` nicht. Da BrowserRouter benutzt wird, braucht das Hosting einen SPA-Fallback auf `index.html` (wird beim Deploy per `.htaccess` gesetzt).

Der Bild-Karussell-Code liegt gekapselt unter `src/components/carousel/` mit eigenen `components/` (Navigation, Thumbnails, SwipeHandler, ZoomModal, MainImage) und `hooks/` (Index, Images, Keyboard). `useCarouselImages` preloaded die nächsten 5 Bilder.

Styling: eine einzige globale `src/main.css`. Kein CSS-Framework, keine CSS-Module.

### Deploy (`deploy.mjs`)
Deployt in einen **Git-Worktree** `.publish/`, der auf dem `publish`-Branch liegt (`git worktree add .publish publish`). Der Ablauf: prüft, dass man auf `main` und der Working Tree sauber ist → `npm ci` + `npm run build` → leert `.publish/` (außer `.git`) → kopiert `dist/` hinein → schreibt eine `.htaccess` (SPA-Rewrite + Cache-Header) → committet und pusht `publish`. Der Produktions-Host servt den `publish`-Branch.

## Hinweise
- React Compiler ist via `babel-plugin-react-compiler` aktiv (über `@vitejs/plugin-react`).
- Ziel-Domain / Hostname: `https://theater-grosskirchheim.at` (in `generate-sitemap.js`).
- `AGENT/` enthält `TODO.md` und `project-health-report.html` — Arbeitsdateien für Agenten-Workflows (siehe die Skills `implement-todo` und `review-and-update-report`), kein Teil der Website.
