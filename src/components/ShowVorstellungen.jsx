import { Link } from "react-router-dom";
import { loadCover } from "../utils/loadCover";

function ShowVorstellungen({ items }) {
  if (!items.length) return <p>Keine Ergebnisse gefunden</p>;

  return (
    <>
      {items.map((item) => {
        const img = loadCover(item["media-folder"]);

        return (
          <Link key={item.id} to={`/vorstellungen/${item.id}`} className="item">
            {img ? (
              <img
                srcSet={`${img.small} 400w, ${img.medium} 700w, ${img.big} 1200w`}
                sizes="(max-width: 480px) 400px, (max-width: 800px) 700px, 1200px"
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

