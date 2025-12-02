import { Link } from "react-router-dom";
import { loadFirstImageFromFolder } from "../utils/loadImages";

function ShowVorstellungen({ items }) {
  if (!items.length) return <li>Keine Ergebnisse gefunden</li>;

  return (
    <>
      {items.map((item) => {
        const preview = loadFirstImageFromFolder(item["image-folder"]);

        return (
          <Link
            key={item.id}
            to={`/vorstellungen/${item.id}`}
            className="item"
          >
            {preview ? (
              <img src={preview} alt={item.title} className="item-image" />
            ) : (
              <div className="item-image">Kein Bild</div>
            )}

            <div className="item-text">
              <h3>{item.title}</h3>
              <p>{item.date}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ShowVorstellungen;

