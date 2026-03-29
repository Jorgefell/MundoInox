import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavbarProps } from '../types';
import { Link } from 'react-router-dom';
import whatsappIcon from '../assets/whatsapp.png'; // Importa la imagen de WhatsApp local
import logoImg from '../assets/logo.jpg';

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const productCategories = [
    { id: 'planchas', label: 'Planchas', path: '/productos/planchas' },
    { id: 'tubos', label: 'Tubos', path: '/productos/tubos' },
    { id: 'barras', label: 'Barras', path: '/productos/barras' },
    { id: 'angulos', label: 'Ángulos', path: '/productos/angulos' },
    { id: 'platinas', label: 'Platinas', path: '/productos/platinas' },
    { id: 'accesorios', label: 'Accesorios', path: '/productos/accesorios' },
    { id: 'accesorios-aluminio', label: 'Accesorios de Aluminio', path: '/productos/aluminio-antorcha' },
    { id: 'decorativos', label: 'Decorativos', path: '/productos/decorativos' },
    { id: 'perforado-rosca', label: 'Perforado Rosca', path: '/productos/perforado-rosca' },
    // Añadidos: Industriales y Electrodo de Varilla
    { id: 'industriales', label: 'Industriales', path: '/productos/industriales' },
    { id: 'electrodo-varilla', label: 'Electrodo de Varilla', path: '/productos/electrodo-varilla' },
    { id: 'ajustes', label: 'Ajustes', path: '/productos/ajustes' }
  ];

  const tabs = [
    { id: 'inicio', label: 'Inicio', path: '/' },
    { id: 'nosotros', label: 'Nosotros', path: '/nosotros' },
    { id: 'contacto', label: 'Contacto', path: '/contacto' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6">
        <div className="flex items-center justify-between h-14 gap-2">
          <Link to="/" className="flex items-center space-x-2" onClick={() => onTabChange('inicio')}>
            <img 
              src={logoImg}
              alt="Mundo Inox" 
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline text-lg font-bold text-gray-800">Mundo Inox</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1 bg-blue-600 text-white hover:bg-blue-700"
              >
                <span>Productos</span>
                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-sm">
                  {productCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={category.path}
                      onClick={() => {
                        onTabChange(category.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-1.5 text-xs sm:text-sm ${
                        activeTab === category.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <a
              href="https://wa.me/51987111430"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 sm:ml-4 inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <img
                src={whatsappIcon} // Usa la imagen importada localmente
                alt="WhatsApp"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
              />
              <span className="hidden sm:inline">Hablemos</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;