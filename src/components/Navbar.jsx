import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/catalog?category=car', label: 'Cars' },
    { to: '/catalog?category=bike', label: 'Bikes' },
    { to: '/catalog', label: 'Catalog' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <nav className="navbar__inner">
        <Link to="/" className="navbar__logo" id="nav-logo">
          <Zap className="navbar__logo-icon" />
          <span className="navbar__logo-text">
            Auto<span className="gradient-text">Vault</span>
          </span>
        </Link>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`} id="nav-links">
          {navLinks.map((link) => (
            <li key={link.to + link.label}>
              <Link
                to={link.to}
                className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link to="/cart" className="navbar__cart" id="nav-cart">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="navbar__cart-badge" key={totalItems}>
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && <div className="navbar__backdrop" onClick={() => setMobileOpen(false)} />}
    </header>
  );
}
