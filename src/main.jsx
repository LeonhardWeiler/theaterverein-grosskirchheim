import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './main.css'

import Home from './pages/Home.jsx'
import VorstellungenListe from './pages/VorstellungenListe.jsx'
import VorstellungID from './pages/VorstellungID.jsx'
import Kontakt from './pages/Kontakt.jsx'
import Layout from './components/Layout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'vorstellungen', element: <VorstellungenListe /> },
      { path: 'vorstellungen/:id', element: <VorstellungID /> },
      { path: 'kontakt', element: <Kontakt /> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
