import { Outlet, Link } from 'react-router-dom'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function Layout() {
  return (
    <div className="app-container">
      <ScrollToTop />
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

