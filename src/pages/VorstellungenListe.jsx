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
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedYear ? parseInt(item.year) === selectedYear : true
    )
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

      <YearSelector
        years={years}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <div className="items-list">
        <ShowVorstellungen items={filteredItems} selectedYear={selectedYear} />
      </div>
    </div>
  );
}

export default VorstellungenListe;

