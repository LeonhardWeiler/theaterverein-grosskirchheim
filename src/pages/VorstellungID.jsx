import { useParams, useNavigate } from "react-router-dom";
import ImageCarousel from "../components/carousel/ImageCarousel";
import vorstellungenData from "../data/vorstellungen.json";

function VorstellungID() {
  const { id } = useParams();
  const item = vorstellungenData[id];
  const navigate = useNavigate();

  if (!item) return <p>Lade...</p>;

  const goBack = () => {
    navigate(-1); // geht zurück im Browser-Verlauf, Scrollposition bleibt
  };

  return (
    <div className="vorstellung-detail">
      <button onClick={goBack} className="back-link">
        &lt; Zurück zu Vorstellungen
      </button>

      <h1>{item.title}</h1>
      <p>{item.year}</p>

      <ImageCarousel folder={item["media-folder"]} imageCount={item["image-count"]} />

      <div className="item-text">{item.content}</div>
    </div>
  );
}

export default VorstellungID;

