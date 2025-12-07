import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="logo">
          Theaterverein Großkirchheim
        </NavLink>

        <ul className="desktop-nav">
          <li><NavLink to="/vorstellungen" className={({isActive}) => isActive ? 'link-highlighted' : ''}>Alle Vorstellungen</NavLink></li>
          <li><NavLink to="/kontakt" className={({isActive}) => isActive ? 'link-highlighted' : ''}>Kontakt</NavLink></li>
        </ul>

        <button className="hamburger" onClick={() => setOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>×</button>
        <ul>
          <li><NavLink to="/" onClick={() => setOpen(false)}>Startseite</NavLink></li>
          <li><NavLink to="/vorstellungen" onClick={() => setOpen(false)}>Alle Vorstellungen</NavLink></li>
          <li><NavLink to="/kontakt" onClick={() => setOpen(false)}>Kontakt</NavLink></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
