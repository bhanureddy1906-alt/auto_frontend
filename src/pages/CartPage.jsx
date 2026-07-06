import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart, subtotal, tax, total } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  if (cart.length === 0) {
    return (
      <main className="cart cart--empty" id="cart-page-empty">
        <div className="cart__empty-content">
          <div className="cart__empty-icon">
            <ShoppingBag size={64} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any vehicles yet.</p>
          <Link to="/catalog" className="cart__continue-btn" id="cart-continue-shopping">
            <ArrowLeft size={18} /> Browse Catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart" id="cart-page">
      <div className="cart__header">
        <h1 className="cart__title">
          Shopping <span className="gradient-text">Cart</span>
        </h1>
        <span className="cart__item-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="cart__layout">
        <div className="cart__items">
          {cart.map((item) => (
            <div key={item.id} className="cart__item" id={`cart-item-${item.id}`}>
              <div className="cart__item-img-wrap">
                <img src={item.image} alt={item.name} className="cart__item-img" />
              </div>
              <div className="cart__item-info">
                <span className="cart__item-brand">{item.brand}</span>
                <Link to={`/vehicle/${item.id}`} className="cart__item-name">{item.name}</Link>
                <span className="cart__item-category">
                  {item.category === 'car' ? '🚗 Car' : '🏍️ Bike'}
                </span>
              </div>
              <div className="cart__item-qty">
                <button
                  className="cart__qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="cart__qty-val">{item.quantity}</span>
                <button
                  className="cart__qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="cart__item-price">
                {formatPrice(item.price * item.quantity)}
              </div>
              <button
                className="cart__remove-btn"
                onClick={() => removeItem(item.id)}
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart__summary" id="cart-summary">
          <h3 className="cart__summary-title">Order Summary</h3>
          <div className="cart__summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="cart__summary-row">
            <span>Tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="cart__summary-row">
            <span>Shipping</span>
            <span className="cart__free-shipping">Free</span>
          </div>
          <div className="cart__summary-divider" />
          <div className="cart__summary-row cart__summary-row--total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button className="cart__checkout-btn" id="checkout-btn">
            Proceed to Checkout
          </button>

          <button className="cart__clear-btn" onClick={clearCart}>
            Clear Cart
          </button>

          <Link to="/catalog" className="cart__back-link">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
