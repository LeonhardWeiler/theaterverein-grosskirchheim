import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";

function VorstellungID() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch("/data/vorstellungen.json")
      .then((res) => res.json())
      .then((json) => setItem(json[id]));
  }, [id]);

  if (!item) return <p>Lade...</p>;

  return (
    <div className="vorstellung-detail">
      <Link to="/vorstellungen" className="back-link">&lt; Zurück zu Vorstellungen</Link>
      <h1>{item.title}</h1>
      <p>{item.date}</p>

      <ImageCarousel folder={item["image-folder"]} />

      <div className="item-text">{item.content}</div>
    </div>
  );
}

export default VorstellungID;

