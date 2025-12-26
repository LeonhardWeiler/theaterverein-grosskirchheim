import { Link } from "react-router-dom";
import vorstellungenData from "../data/vorstellungen.json";

const items = Object.entries(vorstellungenData).map(([id, item]) => ({id, ...item }));

function getLatestCoverSrc() {
  const latestItem = items.reduce((latest, item) => {
    return (parseInt(item.year) > parseInt(latest.year)) ? item : latest;
  }, items[0]);

  return `/assets/${latestItem["media-folder"]}/cover/0001-big.webp`;
}

function Home() {
  return (
    <>
      <section className="hero">
        <h1><span className="w1">Theater</span><br></br><span className="w2">Großkirchheim</span></h1>
        <img src={getLatestCoverSrc()} alt="Aktuelle Vorstellung" className="hero-img" />
      </section>
      <section className="about-us">
      </section>
      <section className="all-shows">
        <div className="accent-bg">
          <h2>Alle Vorstellungen</h2>
          <p>Entdecke unsere vielfältigen Theateraufführungen, von klassischen Stücken bis hin zu modernen Inszenierungen. Tauche ein in die Welt des Theaters und erlebe unvergessliche Momente voller Emotionen und Spannung.</p>
          <Link to="/vorstellungen" className="btn">Zu den Vorstellungen</Link>
        </div>
      </section>
      <section className="all-people">
      </section>
    </>
  )
}

export default Home
