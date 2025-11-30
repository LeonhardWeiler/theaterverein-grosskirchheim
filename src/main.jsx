import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './main.css'

import Home from './pages/Home.jsx'
import Vorstellungen from './pages/Vorstellungen.jsx'
import Kontakt from './pages/Kontakt.jsx'
import Layout from './components/Layout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'vorstellungen', element: <Vorstellungen /> },
      { path: 'kontakt', element: <Kontakt /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
