import { Link } from "react-router-dom";
import { loadCover } from "../utils/loadCover";

function ShowVorstellungen({ items, selectedYear }) {
  const itemsCount = items.length;
  if (!items.length) return <p>Keine Ergebnisse gefunden</p>;

  return (
    <>
      {items.map((item) => {
        const img = loadCover(item["media-folder"]);

        const imgSrc = itemsCount === 1 ? img?.big : img?.medium;

        return (
          <Link key={`${item.id}-${selectedYear}`} to={`/vorstellungen/${item.id}`} className="item">
            {imgSrc ? (
              <img
                src={imgSrc}
                loading="lazy"
                alt={item.title}
                className="item-image"
              />
            ) : (
              <div className="item-image">Kein Bild</div>
            )}

            <div className="item-text">
              <h3>{item.title}</h3>
              <p>{item.year}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ShowVorstellungen;

