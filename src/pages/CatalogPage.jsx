import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import vehicles, { brands } from '../data/vehicles';
import VehicleCard from '../components/VehicleCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setSelectedBrands([]);
    setSortBy('featured');
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    let result = vehicles;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.brand.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }

    if (category !== 'all') {
      result = result.filter((v) => v.category === category);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((v) => selectedBrands.includes(v.brand));
    }

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [search, category, selectedBrands, sortBy]);

  const hasActiveFilters = search || category !== 'all' || selectedBrands.length > 0;

  return (
    <main className="catalog" id="catalog-page">
      <div className="catalog__hero">
        <h1 className="catalog__title">
          Vehicle <span className="gradient-text">Catalog</span>
        </h1>
        <p className="catalog__subtitle">
          Browse our complete collection of {vehicles.length} premium vehicles
        </p>
      </div>

      <div className="catalog__layout">
        {/* Sidebar */}
        <aside className={`catalog__sidebar ${showFilters ? 'catalog__sidebar--open' : ''}`} id="catalog-sidebar">
          <div className="catalog__sidebar-header">
            <h3><SlidersHorizontal size={18} /> Filters</h3>
            {hasActiveFilters && (
              <button className="catalog__clear-btn" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          {/* Search */}
          <div className="catalog__filter-group">
            <label className="catalog__filter-label">Search</label>
            <div className="catalog__search-wrap">
              <Search size={16} className="catalog__search-icon" />
              <input
                type="text"
                placeholder="Search vehicles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="catalog__search-input"
                id="catalog-search"
              />
              {search && (
                <button className="catalog__search-clear" onClick={() => setSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="catalog__filter-group">
            <label className="catalog__filter-label">Category</label>
            <div className="catalog__category-btns">
              {['all', 'car', 'bike'].map((cat) => (
                <button
                  key={cat}
                  className={`catalog__cat-btn ${category === cat ? 'catalog__cat-btn--active' : ''}`}
                  onClick={() => {
                    setCategory(cat);
                    if (cat === 'all') {
                      searchParams.delete('category');
                    } else {
                      searchParams.set('category', cat);
                    }
                    setSearchParams(searchParams);
                  }}
                >
                  {cat === 'all' ? 'All' : cat === 'car' ? '🚗 Cars' : '🏍️ Bikes'}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="catalog__filter-group">
            <label className="catalog__filter-label">Brands</label>
            <div className="catalog__brand-list">
              {brands.map((brand) => (
                <label key={brand} className="catalog__brand-check">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className="catalog__brand-checkmark" />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="catalog__filter-group">
            <label className="catalog__filter-label">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="catalog__sort-select"
              id="catalog-sort"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </aside>

        {/* Grid */}
        <div className="catalog__main">
          <div className="catalog__toolbar">
            <span className="catalog__count">
              {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found
            </span>
            <button
              className="catalog__filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>

          {hasActiveFilters && (
            <div className="catalog__active-filters">
              {category !== 'all' && (
                <span className="catalog__chip">
                  {category === 'car' ? '🚗 Cars' : '🏍️ Bikes'}
                  <button onClick={() => { setCategory('all'); searchParams.delete('category'); setSearchParams(searchParams); }}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedBrands.map((b) => (
                <span key={b} className="catalog__chip">
                  {b}
                  <button onClick={() => toggleBrand(b)}><X size={12} /></button>
                </span>
              ))}
              {search && (
                <span className="catalog__chip">
                  "{search}"
                  <button onClick={() => setSearch('')}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="catalog__grid stagger">
              {filtered.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : (
            <div className="catalog__empty">
              <p className="catalog__empty-title">No vehicles found</p>
              <p className="catalog__empty-text">Try adjusting your filters or search query.</p>
              <button className="catalog__empty-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="catalog__overlay" onClick={() => setShowFilters(false)} />
      )}
    </main>
  );
}
