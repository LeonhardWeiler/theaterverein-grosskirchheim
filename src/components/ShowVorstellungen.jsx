import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";
import { loadCover } from "../utils/loadCover";

function ShowVorstellungen({ items, blurHash }) {
  if (!items.length) return <p>Keine Ergebnisse gefunden</p>;

  return (
    <>
      {items.map((item) => {
        const preview = loadCover(item["media-folder"]);
        const hashName = item["media-folder"] + "/" + preview.id;
        const hash = blurHash[hashName];

        return (
          <Link key={item.id} to={`/vorstellungen/${item.id}`} className="item">
            {preview ? (
              <SmartImage
                alt={item.title}
                full={preview.big}
                w700={preview.medium}
                w400={preview.small}
                blurHash={hash}
                lq={preview.lq}
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

