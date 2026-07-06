import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVehicleById, getRelatedVehicles } from '../data/vehicles';
import { useCart } from '../context/CartContext';
import VehicleCard from '../components/VehicleCard';
import {
  ArrowLeft, ShoppingCart, Star, Fuel, Gauge, Zap as ZapIcon,
  Settings, Timer, TrendingUp, ChevronLeft, ChevronRight, Minus, Plus,
} from 'lucide-react';

const specIcons = {
  engine: Settings,
  horsepower: Gauge,
  torque: TrendingUp,
  transmission: Settings,
  topSpeed: ZapIcon,
  acceleration: Timer,
  fuelType: Fuel,
  mileage: Fuel,
};

const specLabels = {
  engine: 'Engine',
  horsepower: 'Horsepower',
  torque: 'Torque',
  transmission: 'Transmission',
  topSpeed: 'Top Speed',
  acceleration: '0-60 mph',
  fuelType: 'Fuel Type',
  mileage: 'Mileage / Range',
};

export default function VehicleDetail() {
  const { id } = useParams();
  const vehicle = getVehicleById(id);
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!vehicle) {
    return (
      <main className="detail detail--not-found" id="vehicle-detail-404">
        <h2>Vehicle not found</h2>
        <Link to="/catalog" className="detail__back-link">
          <ArrowLeft size={18} /> Back to catalog
        </Link>
      </main>
    );
  }

  const related = getRelatedVehicles(id, vehicle.category);

  const handleAdd = () => {
    addItem(vehicle, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const prevImg = () =>
    setActiveImg((i) => (i === 0 ? vehicle.gallery.length - 1 : i - 1));
  const nextImg = () =>
    setActiveImg((i) => (i === vehicle.gallery.length - 1 ? 0 : i + 1));

  return (
    <main className="detail" id={`vehicle-detail-${vehicle.id}`}>
      <div className="detail__breadcrumb">
        <Link to="/catalog" className="detail__back-link">
          <ArrowLeft size={16} /> Catalog
        </Link>
        <span>/</span>
        <span>{vehicle.brand}</span>
        <span>/</span>
        <span className="detail__breadcrumb-current">{vehicle.name}</span>
      </div>

      <div className="detail__top">
        {/* Gallery */}
        <div className="detail__gallery">
          <div className="detail__main-img-wrap">
            <img
              src={vehicle.gallery[activeImg]}
              alt={`${vehicle.brand} ${vehicle.name}`}
              className="detail__main-img"
            />
            {vehicle.gallery.length > 1 && (
              <>
                <button className="detail__img-nav detail__img-nav--prev" onClick={prevImg}>
                  <ChevronLeft size={20} />
                </button>
                <button className="detail__img-nav detail__img-nav--next" onClick={nextImg}>
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            <span className="detail__img-counter">
              {activeImg + 1} / {vehicle.gallery.length}
            </span>
          </div>
          <div className="detail__thumbs">
            {vehicle.gallery.map((img, i) => (
              <button
                key={i}
                className={`detail__thumb ${i === activeImg ? 'detail__thumb--active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="detail__info">
          <div className="detail__info-header">
            <span className="detail__brand-badge">{vehicle.brand}</span>
            <div className="detail__rating">
              <Star size={16} fill="var(--accent-amber)" stroke="none" />
              <span>{vehicle.rating}</span>
            </div>
          </div>

          <h1 className="detail__name">{vehicle.name}</h1>
          <span className="detail__year">{vehicle.year} Model</span>

          <p className="detail__desc">{vehicle.description}</p>

          <div className="detail__price-row">
            <span className="detail__price">{formatPrice(vehicle.price)}</span>
            <span className="detail__category-tag">
              {vehicle.category === 'car' ? '🚗 Car' : '🏍️ Bike'}
            </span>
          </div>

          <div className="detail__actions">
            <div className="detail__qty">
              <button
                className="detail__qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="detail__qty-value">{qty}</span>
              <button
                className="detail__qty-btn"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              className={`detail__add-btn ${added ? 'detail__add-btn--added' : ''}`}
              onClick={handleAdd}
              id="detail-add-cart"
            >
              <ShoppingCart size={18} />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Specs Grid */}
      <section className="detail__specs-section">
        <h2 className="detail__section-title">
          Technical <span className="gradient-text">Specifications</span>
        </h2>
        <div className="detail__specs-grid">
          {Object.entries(vehicle.specs).map(([key, value]) => {
            const Icon = specIcons[key] || Settings;
            return (
              <div key={key} className="detail__spec-card">
                <Icon size={20} className="detail__spec-icon" />
                <span className="detail__spec-label">{specLabels[key] || key}</span>
                <span className="detail__spec-value">{value}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="detail__related">
          <h2 className="detail__section-title">
            Related <span className="gradient-text">Vehicles</span>
          </h2>
          <div className="detail__related-grid stagger">
            {related.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
