import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";
import { loadFirstImage } from "../utils/loadMedia";

function ShowVorstellungen({ items }) {
  if (!items.length) return <p>Keine Ergebnisse gefunden</p>;

  return (
    <>
      {items.map((item) => {
        const preview = loadFirstImage(item["media-folder"]);

        return (
          <Link key={item.id} to={`/vorstellungen/${item.id}`} className="item">
            {preview ? (
              <SmartImage
                full={preview.big}
                w700={preview.medium}
                w400={preview.small}
                lq={preview.lq}
                alt={item.title}
              />
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

