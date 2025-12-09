import { useState } from "react";
import ShowVorstellungen from "../components/ShowVorstellungen";
import vorstellungenData from "../data/vorstellungen.json";

function VorstellungenListe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const items = Object.entries(vorstellungenData).map(([id, item]) => ({id, ...item }));
  const years = Array.from(new Set(items.map((i) => parseInt(i.year)))).sort((a, b) => b - a);

  const filteredItems = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => (selectedYear ? parseInt(item.year) === selectedYear : true))
    .reverse();

  return (
    <div className="vorstellungen-page">
      <h1>Vorstellungen</h1>

      <input
        type="text"
        placeholder="Suche nach einer Vorstellung..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="year-grid">
        <button
          onClick={() => setSelectedYear(null)}
          className={selectedYear === null ? "year-btn selected" : "year-btn"}
        >
          Alle
        </button>

        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={selectedYear === year ? "year-btn selected" : "year-btn"}
          >
            {year}
          </button>
        ))}
      </div>

      <ul className="items-list">
        <ShowVorstellungen items={filteredItems} />
      </ul>
    </div>
  );
}

export default VorstellungenListe;

