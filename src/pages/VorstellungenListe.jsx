import React, { useState } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    title: "Erster Post",
    createdAt: "2025-11-25",
    imageUrl: "https://picsum.photos/id/1015/600/300",
  },
  {
    id: 2,
    title: "Zweiter Post",
    createdAt: "2025-11-26",
    imageUrl: "https://picsum.photos/id/1016/600/300",
  },
  {
    id: 3,
    title: "Dritter Post",
    createdAt: "2025-11-24",
    imageUrl: "https://picsum.photos/id/1018/600/300",
  },
  {
    id: 4,
    title: "Vierter Post",
    createdAt: "2024-10-12",
    imageUrl: "https://picsum.photos/id/1020/600/300",
  },
  {
    id: 5,
    title: "Fünfter Post",
    createdAt: "2023-05-18",
    imageUrl: "https://picsum.photos/id/1024/600/300",
  },
];

function VorstellungenListe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);

  const years = Array.from(
    new Set(items.map((item) => new Date(item.createdAt).getFullYear()))
  ).sort((a, b) => b - a);

  const filteredItems = items
  .filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((item) =>
    selectedYear ? new Date(item.createdAt).getFullYear() === selectedYear : true
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
            className={
              selectedYear === year ? "year-btn selected" : "year-btn"
            }
          >
            {year}
          </button>
        ))}
      </div>

      <ul className="items-list">
        {filteredItems.map((item) => (
          <Link key={item.id} className="item" to={`/vorstellungen/${item.id}`}>
            <img src={item.imageUrl} alt={item.title} className="item-image" />
            <div className="item-text">
              <p>{item.title} - {item.createdAt}</p>
            </div>
          </Link>
        ))}
        {filteredItems.length === 0 && <li>Keine Ergebnisse gefunden</li>}
      </ul>
    </div>
  );
}

export default VorstellungenListe;

