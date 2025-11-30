import { useRouteError, Link } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="error-page">
      <h1>Oops! Etwas ist schief gelaufen.</h1>
      <p>Error: {error.statusText || error.message}</p>
      <Link className="to-start-link" to="/">Zurück zur Startseite</Link>
    </div>
  )
}
