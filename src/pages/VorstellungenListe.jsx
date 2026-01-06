import { useState } from "react";
import ShowVorstellungen from "../components/ShowVorstellungen";
import YearSelector from "./YearSelector";
import vorstellungenData from "../data/vorstellungen.json";

function VorstellungenListe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);

  const items = Object.entries(vorstellungenData).map(([id, item]) => ({
    id,
    ...item,
  }));

  const years = Array.from(
    new Set(items.map((i) => parseInt(i.year)))
  ).sort((a, b) => b - a);

  const filteredItems = items
    .filter((item) =>
      item.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedYear ? parseInt(item.year) === selectedYear : true
    )
    .reverse();

  return (
    <>
      <div className="site-heading full-width no-top-margin">
        <h1 className="heading-text">Vorstellungen</h1>
        <img fetchPriority="high" src="/assets/images/2024-doener-durst-und-dosenwurst/images/0008-big.webp" alt="Foto der Vorstellung von 2024 Döner Durst und Dosenwurst mit Schauspieler:innen auf der Bühne" className="heading-img" loading="eager" />
      </div>

      <div>
        <input
          type="text"
          placeholder="Suche nach einer Vorstellung..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <YearSelector
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>

      <div className="items-list">
        <ShowVorstellungen items={filteredItems} selectedYear={selectedYear} />
      </div>
    </>
  );
}

export default VorstellungenListe;

