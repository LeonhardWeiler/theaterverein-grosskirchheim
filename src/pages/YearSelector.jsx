import { useEffect, useRef, useState } from "react";

function YearSelector({ years, selectedYear, setSelectedYear }) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);

  const [visibleYears, setVisibleYears] = useState([]);
  const [overflowYears, setOverflowYears] = useState([]);

  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current || !measureRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const GAP = 8;
      const SELECT_WIDTH = 150;

      let usedWidth = 0;
      let count = 0;

      const buttons = measureRef.current.children;
      const availableWidth = containerWidth - SELECT_WIDTH;

      for (let i = 0; i < buttons.length; i++) {
        const w = buttons[i].offsetWidth + GAP;
        if (usedWidth + w > availableWidth) break;
        usedWidth += w;
        count++;
      }

      const visible = years.slice(0, count);
      const overflow = years.filter((y) => !visible.includes(y));

      setVisibleYears(visible);
      setOverflowYears(overflow);
    };

    calculate();
    const observer = new ResizeObserver(calculate);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [years]);

  return (
    <>
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          height: 0,
          overflow: "hidden",
        }}
      >
        {years.map((year) => (
          <button key={year} className="year-btn">
            {year}
          </button>
        ))}
      </div>

      <div className="year-grid" ref={containerRef}>
        <button
          onClick={() => setSelectedYear(null)}
          className={selectedYear === null ? "year-btn selected" : "year-btn"}
        >
          Alle
        </button>

        {visibleYears.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={selectedYear === year ? "year-btn selected" : "year-btn"}
          >
            {year}
          </button>
        ))}

        {overflowYears.length > 0 && (
          <select
            className="year-select"
            value={selectedYear ?? ""}
            onChange={(e) =>
              setSelectedYear(
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          >
            <option value="">Weitere Jahre</option>
            {overflowYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}

export default YearSelector;

