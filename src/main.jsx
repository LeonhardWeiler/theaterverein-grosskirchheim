import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'

// Lazy load der Seiten
const VorstellungenListe = lazy(() => import('./pages/VorstellungenListe.jsx'))
const VorstellungID = lazy(() => import('./pages/VorstellungID.jsx'))
const Kontakt = lazy(() => import('./pages/Kontakt.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Suspense fallback={<div>Loading…</div>}><Home /></Suspense> },
      { path: 'vorstellungen', element: <Suspense fallback={<div>Loading…</div>}><VorstellungenListe /></Suspense> },
      { path: 'vorstellungen/:id', element: <Suspense fallback={<div>Loading…</div>}><VorstellungID /></Suspense> },
      { path: 'kontakt', element: <Suspense fallback={<div>Loading…</div>}><Kontakt /></Suspense> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

