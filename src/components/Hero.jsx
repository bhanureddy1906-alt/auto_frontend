import { Link } from 'react-router-dom';
import { ArrowRight, Car, Bike } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" id="hero-section">
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1" />
        <div className="hero__gradient-orb hero__gradient-orb--2" />
        <div className="hero__gradient-orb hero__gradient-orb--3" />
        <div className="hero__grid-overlay" />
      </div>

      <div className="hero__content animate-fade">
        <div className="hero__badge animate-slide-up">
          <span className="hero__badge-dot" />
          <span>2026 Premium and Most latest Collection Now Available</span>
        </div>

        <h1 className="hero__title">
          Find Your Perfect
          <br />
          <span className="gradient-text">Hyper Machine</span>
        </h1>

        <p className="hero__subtitle">
          Explore the world&apos;s most exhilarating supercars and superbikes.
          <br className="hero__subtitle-br" />
          Unmatched performance. Unrivaled design. Dream destination.
        </p>

        <div className="hero__ctas">
          <Link to="/catalog?category=car" className="hero__btn hero__btn--primary" id="hero-cta-cars">
            <Car size={20} />
            Browse Cars
            <ArrowRight size={18} />
          </Link>
          <Link to="/catalog?category=bike" className="hero__btn hero__btn--secondary" id="hero-cta-bikes">
            <Bike size={20} />
            Browse Bikes
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">12+</span>
            <span className="hero__stat-label">Premium Vehicles</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">6</span>
            <span className="hero__stat-label">Top Brands</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">4.8</span>
            <span className="hero__stat-label">Avg. Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
