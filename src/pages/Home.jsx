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
        <a href="#about-us" className="scroll-down-indicator">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z"></path> </g></svg>
        </a>
      </section>
      <section id="about-us" className="about-us">
        <div className="about-us-text">
          <h2 className="heading-home">Über uns</h2>
          <p>Das Theater Großkirchheim ist eine leidenschaftliche Gemeinschaft von Theaterliebhabern, die sich der Kunst des Theaters verschrieben haben. Seit unserer Gründung im Jahr 1985 haben wir es uns zur Aufgabe gemacht, qualitativ hochwertige Theateraufführungen zu präsentieren und die kulturelle Vielfalt unserer Region zu bereichern.</p>
        </div>
        <img src={getLatestCoverSrc()} alt="Über uns" className="about-us-img" />
      </section>
      <section className="all-shows">
        <div className="accent-bg">
          <h2 className="heading-home">Alle Vorstellungen</h2>
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
