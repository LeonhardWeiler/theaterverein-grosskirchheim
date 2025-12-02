import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function VorstellungID() {
  const { id } = useParams();

  return (
    <div>
      <Link to="/vorstellungen">← Zurück zu den Vorstellungen</Link>
      <h1>Vorstellung ID: {id}</h1>
    </div>
  );
}

export default VorstellungID;
