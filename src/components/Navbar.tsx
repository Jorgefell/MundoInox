import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavbarProps } from '../types';
import { Link } from 'react-router-dom';

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const productCategories = [
    { id: 'planchas', label: 'Planchas', path: '/productos/planchas' },
    { id: 'tubos', label: 'Tubos', path: '/productos/tubos' },
    { id: 'barras', label: 'Barras', path: '/productos/barras' },
    { id: 'angulos', label: 'Ángulos', path: '/productos/angulos' },
    { id: 'platinas', label: 'Platinas', path: '/productos/platinas' }
  ];

  const tabs = [
    { id: 'inicio', label: 'Inicio', path: '/' },
    { id: 'nosotros', label: 'Nosotros', path: '/nosotros' },
    { id: 'contacto', label: 'Contacto', path: '/contacto' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-4" onClick={() => onTabChange('inicio')}>
            <img 
              src="/logo.jpg"
              alt="Mundo Inox" 
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold text-gray-800">Mundo Inox</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                  productCategories.some(cat => cat.id === activeTab)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>Productos</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {productCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={category.path}
                      onClick={() => {
                        onTabChange(category.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
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
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" 
                alt="WhatsApp"
                className="w-5 h-5 mr-2"
              />
              Hablemos
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;