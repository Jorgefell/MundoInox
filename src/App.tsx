import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
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
import AccesoriosPage from './components/products/AccesoriosPage';
import { DiscosLimpiezaPage, PerforadoRoscaPage, AluminioAntorchaPage, DecorativosPage, AjustesPage, IndustrialesPage, ElectrodoVarillaPage } from './components/products/CollectionsPages';

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
      case 'accesorios':
        navigate('/productos/accesorios');
        break;
      case 'industriales':
        navigate('/productos/industriales');
        break;
      case 'electrodo-varilla':
        navigate('/productos/electrodo-varilla');
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
          <Route path="/productos/accesorios" element={<AccesoriosPage />} />
          {/* Rutas independientes para nuevas tarjetillas */}
          <Route path="/productos/discos-limpieza" element={<DiscosLimpiezaPage />} />
          <Route path="/productos/perforado-rosca" element={<PerforadoRoscaPage />} />
          <Route path="/productos/aluminio-antorcha" element={<AluminioAntorchaPage />} />
          <Route path="/productos/decorativos" element={<DecorativosPage />} />
          <Route path="/productos/ajustes" element={<AjustesPage />} />
          <Route path="/productos/industriales" element={<IndustrialesPage />} />
          <Route path="/productos/electrodo-varilla" element={<ElectrodoVarillaPage />} />

          {/* Alias para URLs tipo /productos/accesorios/Discos/Limpieza -> rutas nuevas */}
          <Route path="/productos/accesorios/*" element={<AccessoryAlias />} />

          {/* Colecciones genéricas (fallback si se usa /productos/:slug en otro contexto) */}
          <Route path="/productos/:slug" element={<CollectionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const AccessoryAlias: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const path = location.pathname.replace('/productos/accesorios/', '').toLowerCase();
    // Simple mapping, can be expanded
    const mapping: { [key: string]: string } = {
      'discos/limpieza': '/productos/discos-limpieza',
      'perforado/rosca': '/productos/perforado-rosca',
      'aluminio/antorcha': '/productos/aluminio-antorcha',
      'decorativos': '/productos/decorativos',
      'ajustes': '/productos/ajustes',
      'industriales': '/productos/industriales',
      'electrodo-varilla': '/productos/electrodo-varilla',
    };
    const newPath = mapping[path];
    if (newPath) {
      navigate(newPath, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return null; // or a loading spinner
};

const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <div>Página de Colección: {slug}</div>;
};

import ScrollToTop from './components/ScrollToTop';
const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;