import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import vorstellungenData from "../data/vorstellungen.json";

function VorstellungID() {
  const { id } = useParams();
  const item = vorstellungenData[id];

  if (!item) return <p>Lade...</p>;

  return (
    <div className="vorstellung-detail">
      <Link to="/vorstellungen" className="back-link">&lt; Zurück zu Vorstellungen</Link>
      <h1>{item.title}</h1>
      <p>{item.date}</p>

      <ImageCarousel folder={item["media-folder"]} />

      <div className="item-text">{item.content}</div>
    </div>
  );
}

export default VorstellungID;

