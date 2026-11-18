import { useRouteError, Link } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="error-page">
      <h1>Etwas ist schiefgelaufen.</h1>
      <p>Error: {error.statusText || error.message}</p>
      <Link className="btn" to="/">Zurück zur Startseite</Link>
    </div>
  )
}
