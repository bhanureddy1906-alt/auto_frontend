import { useState } from 'react';
import { getFeaturedVehicles } from '../data/vehicles';
import VehicleCard from './VehicleCard';
import { Sparkles } from 'lucide-react';

export default function FeaturedSection() {
  const [activeTab, setActiveTab] = useState('all');
  const featured = getFeaturedVehicles();

  const filtered =
    activeTab === 'all'
      ? featured
      : featured.filter((v) => v.category === activeTab);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'car', label: 'Cars' },
    { key: 'bike', label: 'Bikes' },
  ];

  return (
    <section className="featured" id="featured-section">
      <div className="featured__header">
        <div className="featured__title-group">
          <span className="featured__icon"><Sparkles size={22} /></span>
          <h2 className="featured__title">
            Featured <span className="gradient-text">Machines</span>
          </h2>
        </div>
        <p className="featured__subtitle">
          Hand-picked vehicles that define automotive excellence
        </p>
        <div className="featured__tabs" id="featured-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`featured__tab ${activeTab === tab.key ? 'featured__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="featured__grid stagger" key={activeTab}>
        {filtered.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
