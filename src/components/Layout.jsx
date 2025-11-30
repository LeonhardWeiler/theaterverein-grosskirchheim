import { Outlet, Link } from 'react-router-dom'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

export default function Layout() {
  return (
    <div className="app-container">
      <header className="header">
        <Navbar />
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <Footer />
      </footer>

    </div>
  )
}

