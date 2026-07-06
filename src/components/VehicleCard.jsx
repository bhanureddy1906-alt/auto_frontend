import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye, Gauge } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function VehicleCard({ vehicle }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(vehicle);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="vcard" id={`vehicle-card-${vehicle.id}`}>
      <Link to={`/vehicle/${vehicle.id}`} className="vcard__link">
        <div className="vcard__img-wrap">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.name}`}
            className="vcard__img"
            loading="lazy"
          />
          <div className="vcard__overlay">
            <span className="vcard__quick-view">
              <Eye size={16} /> Quick View
            </span>
          </div>
          <span className="vcard__category-badge">
            {vehicle.category === 'car' ? '🚗' : '🏍️'} {vehicle.category}
          </span>
          {vehicle.featured && <span className="vcard__featured-badge">★ Featured</span>}
        </div>

        <div className="vcard__body">
          <div className="vcard__header">
            <span className="vcard__brand">{vehicle.brand}</span>
            <div className="vcard__rating">
              <Star size={14} fill="var(--accent-amber)" stroke="none" />
              <span>{vehicle.rating}</span>
            </div>
          </div>

          <h3 className="vcard__name">{vehicle.name}</h3>

          <div className="vcard__specs-mini">
            <span className="vcard__spec-chip">
              <Gauge size={12} /> {vehicle.specs.horsepower}
            </span>
            <span className="vcard__spec-chip">{vehicle.specs.acceleration}</span>
          </div>

          <div className="vcard__footer">
            <span className="vcard__price">{formatPrice(vehicle.price)}</span>
            <button
              className={`vcard__cart-btn ${added ? 'vcard__cart-btn--added' : ''}`}
              onClick={handleAdd}
              id={`add-cart-${vehicle.id}`}
            >
              <ShoppingCart size={16} />
              {added ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
