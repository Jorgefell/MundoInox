import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  }
];

const Hero = ({ onCategorySelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
    navigate(`/productos/${category}`);
    onCategorySelect(category);
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
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Nuestros Productos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((product) => (
              <div
                key={product.category}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(product.category)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {product.title}
                      </h3>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
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