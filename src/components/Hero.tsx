import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import accesoriosAluminio from '../assets/Accesorios_Aluminio.jpg';
import accesoriosAntorcha from '../assets/Accesorios_antorcha.jpg';
import ajustes from '../assets/Ajustes.jpg';
import decorativos from '../assets/Decorativos.jpg';
import electrodo from '../assets/Electrodo_varilla.jpg';
import industriales from '../assets/Industriales.jpg';
import limpieza from '../assets/Limpieza.jpg';
import perforado from '../assets/Perforado_rosca.png';

const images = [
  {
    url: "https://jnaceros.com.pe/wp-content/uploads/2024/03/TUBO-BRILLANTE.webp",
    title: "Tubos de Acero Inoxidable",
    description: "Calidad y durabilidad garantizada"
  },
  {
    url: "https://bbismarck.cl/wp-content/uploads/2023/05/planchas-de-acero-tipos.jpeg",
    title: "Planchas de Acero",
    description: "Versatilidad para tus proyectos"
  },
  {
    url: "https://blesola.com/wp-content/uploads/2024/10/Angulo-inox.png",
    title: "Ángulos y Perfiles",
    description: "Soluciones estructurales precisas"
  }
];

const productCategories = [
  {
    title: "Tubos",
    image: "https://previews.123rf.com/images/ravital/ravital1512/ravital151200048/50261315-redondo-tubos-met%C3%A1licos-cuadrados-y-tuber%C3%ADas-de-diferentes-di%C3%A1metros-y-formas-aisladas-sobre-un.jpg",
    category: "tubos"
  },
  {
    title: "Planchas",
    image: "https://bbismarck.cl/wp-content/uploads/2023/05/planchas-de-acero-tipos.jpeg",
    category: "planchas"
  },
  {
    title: "Ángulos",
    image: "https://blesola.com/wp-content/uploads/2024/10/Angulo-inox.png",
    category: "angulos"
  },
  {
    title: "Barras",
    image: "https://diarium.usal.es/alumniguybrush20/files/2022/12/USAL-Barras-de-acero-inoxidable.jpg",
    category: "barras"
  },
  {
    title: "Platinas",
    image: "https://steelcompany.com.pe/img-apps/productos/platina01.jpg",
    category: "platinas"
  },
  {
    title: "Consumibles de Antorcha Tig",
    image: accesoriosAntorcha,
    category: "accesorios"
  },
  { title: "Tratamiento y Acabado Inox", image: limpieza, category: "discos-limpieza" },
  { title: "Perforado Rosca", image: perforado, category: "perforado-rosca" },
  { title: "Accesorios de Aluminio", image: accesoriosAluminio, category: "aluminio-antorcha" },
  { title: "Elementos Inox Decorativos", image: decorativos, category: "decorativos" },
  { title: "Fijaciones y Ajustes Inos", image: ajustes, category: "ajustes" },
  { title: "Industriales", image: industriales, category: "industriales" },
  { title: "Electrodo de Varilla", image: electrodo, category: "electrodo-varilla" }
];

const Hero = ({ onCategorySelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCategoryClick = (category: string) => {
    // Navega a la ruta independiente bajo /productos/{slug}
    navigate(`/productos/${category}`);
    // Solo actualiza la pestaña activa si es una pestaña principal
    const tabs = ['tubos','planchas','angulos','barras','platinas','accesorios'];
    if (tabs.includes(category)) {
      onCategorySelect(category);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Carousel Section */}
      <div className="relative h-screen">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">{image.title}</h1>
                  <p className="text-xl">{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Products Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
            Nuestros Productos
          </h2>

          {/* Buscador de tarjetillas */}
          <div className="max-w-xl mx-auto mb-10 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar tarjetilla por nombre..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productCategories
              .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
              .map((product) => (
              <div
                key={product.category}
                className="group cursor-pointer transform hover:scale-105 transition-transform duration-300"
                onClick={() => handleCategoryClick(product.category)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {product.title}
                      </h3>
                      <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Ver Productos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;