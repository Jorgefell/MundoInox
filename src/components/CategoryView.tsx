import React, { useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const CategoryView = ({ category, onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleWhatsApp = (productName) => {
    const message = encodeURIComponent(`Hola, estoy interesado en obtener información sobre: ${productName}`);
    window.open(`https://wa.me/51987111430?text=${message}`, '_blank');
  };

  if (selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setSelectedProduct(null)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Volver a productos
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full rounded-lg shadow-lg object-cover aspect-square"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h2>
            <p className="text-xl text-gray-600">{selectedProduct.description}</p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Especificaciones:</h3>
              <ul className="space-y-2">
                {selectedProduct.specifications.map((spec, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleWhatsApp(selectedProduct.name)}
              className="w-full md:w-auto px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Solicitar Cotización</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Volver a categorías
      </button>

      <h2 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h2>
      <p className="text-xl text-gray-600 mb-12">{category.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.items.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div onClick={() => setSelectedProduct(item)}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={() => handleWhatsApp(item.name)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Solicitar Cotización</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryView;