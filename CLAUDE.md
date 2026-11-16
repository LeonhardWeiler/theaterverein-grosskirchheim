# Theaterverein Großkirchheim

Statische SPA (React 19, Vite 7, React Router 7), kein Backend. Befehle, Inhalte, Bild-Workflow
und Deploy stehen im README.

## Checks

`npm run lint` und `npm run build`. Es gibt keine Tests.

## Regeln

- Vorstellungen liegen in `src/data/vorstellungen.json`, Schlüssel ist die numerische ID.
  `src/utils/loadMedia.js` erzeugt die Bildpfade nur aus `image-count`, der Wert muss exakt zur
  Zahl der Bilder passen.
- `public/assets/` ist gitignored, die Bilder sind nicht im Repo.
- `VorstellungenListe`, `VorstellungID` und `Kontakt` werden lazy geladen.
- Eine globale `src/main.css`, kein CSS-Framework.
- Der Host servt den Branch `publish`; `deploy.mjs` schreibt die `.htaccess` mit SPA-Fallback.
