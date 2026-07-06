import { Link } from 'react-router-dom';
import { Zap, Mail, MapPin, Phone, ExternalLink, MessageCircle, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer__glow" />
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <Zap size={24} />
            <span>Auto<span className="gradient-text">Vault</span></span>
          </Link>
          <p className="footer__tagline">
            The premier destination for performance cars and superbikes.
            Experience automotive excellence.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Github"><ExternalLink size={18} /></a>
            <a href="#" className="footer__social" aria-label="Twitter"><MessageCircle size={18} /></a>
            <a href="#" className="footer__social" aria-label="Instagram"><Camera size={18} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Full Catalog</Link></li>
            <li><Link to="/catalog?category=car">Cars</Link></li>
            <li><Link to="/catalog?category=bike">Bikes</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__contact-list">
            <li><MapPin size={14} /> 123 Speed Lane, Detroit MI</li>
            <li><Phone size={14} /> +1 (555) 987-6543</li>
            <li><Mail size={14} /> hello@autovault.com</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} AutoVault. All rights reserved.</p>
      </div>
    </footer>
  );
}
