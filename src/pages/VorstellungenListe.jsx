import { useEffect, useState } from "react";
import ShowVorstellungen from "../components/ShowVorstellungen";

function VorstellungenListe() {
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    fetch("/data/vorstellungen.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const items = Object.entries(data).map(([id, item]) => ({
    id,
    ...item
  }));

  const years = Array.from(new Set(items.map((i) => parseInt(i.date)))).sort((a, b) => a - b);

  const filteredItems = items
    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) =>
      selectedYear ? parseInt(item.date) === selectedYear : true
    );

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

