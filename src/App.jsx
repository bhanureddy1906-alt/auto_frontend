import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import CatalogPage from './pages/CatalogPage';
import VehicleDetail from './pages/VehicleDetail';
import CartPage from './pages/CartPage';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSection />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
