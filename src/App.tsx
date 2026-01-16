import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Tubos from './components/products/Tubos';
import Angulos from './components/products/Angulos';
import Planchas from './components/products/Planchas';
import Barras from './components/products/Barras';
import Platinas from './components/products/Platinas';

const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'inicio':
        navigate('/');
        break;
      case 'nosotros':
        navigate('/nosotros');
        break;
      case 'contacto':
        navigate('/contacto');
        break;
      case 'tubos':
        navigate('/productos/tubos');
        break;
      case 'angulos':
        navigate('/productos/angulos');
        break;
      case 'planchas':
        navigate('/productos/planchas');
        break;
      case 'barras':
        navigate('/productos/barras');
        break;
      case 'platinas':
        navigate('/productos/platinas');
        break;
      default:
        navigate('/');
    }
  };

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/') return 'inicio';
    if (path === '/nosotros') return 'nosotros';
    if (path === '/contacto') return 'contacto';
    if (path.startsWith('/productos/')) {
      return path.split('/')[2];
    }
    return 'inicio';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        activeTab={getCurrentTab()} 
        onTabChange={handleTabChange}
      />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Hero onCategorySelect={handleTabChange} />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/productos/tubos" element={<Tubos searchQuery={searchQuery} />} />
          <Route path="/productos/angulos" element={<Angulos searchQuery={searchQuery} />} />
          <Route path="/productos/planchas" element={<Planchas searchQuery={searchQuery} />} />
          <Route path="/productos/barras" element={<Barras searchQuery={searchQuery} />} />
          <Route path="/productos/platinas" element={<Platinas searchQuery={searchQuery} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;