import React, { useState } from 'react';
import CategoryView from './CategoryView';

const products = {
  'tubos': {
    title: 'Tubos',
    description: 'Nuestra línea completa de tubos de acero inoxidable para todas sus necesidades',
    items: [
      { 
        name: 'Tubo Redondo 1"', 
        image: 'https://http2.mlstatic.com/tubo-redondo-aluminio-1-polegada-254cm-x-100mm-c-1-mt-D_NQ_NP_858390-MLB25846403634_082017-F.jpg',
        description: 'Tubo redondo de acero inoxidable de 1 pulgada, ideal para aplicaciones industriales y construcción.',
        specifications: [
          'Diámetro: 1"',
          'Material: Acero 304',
          'Acabado: Brillante',
          'Espesor de pared: 1.5mm',
          'Longitud estándar: 6 metros',
          'Resistencia a la corrosión: Alta'
        ]
      },
      { 
        name: 'Tubo Cuadrado 2"', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGmbcvjBO-0yx1IOqD0yLc-QXdbZ9kWrOE5A&s',
        description: 'Tubo cuadrado de acero inoxidable de 2 pulgadas, perfecto para estructuras y barandas.',
        specifications: [
          'Dimensión: 20 x 20',
          'Material: Acero 304',
          'Acabado: Brillante',
          'Espesor de pared: 1.5mm',
          'Longitud estándar: 6 metros',
          'Resistencia a la corrosión: Alta'
        ]
      },
      { 
        name: 'Tubo Rectangular', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJtmjQ1NtWqFHRUlhJ9fPrzHAForUxB1nsNg&s',
        description: 'Tubo rectangular de acero inoxidable, ideal para marcos y estructuras arquitectónicas.',
        specifications: [
          'Dimensión: 20 x 40',
          'Material: Acero 304',
          'Acabado: Brillante',
          'Espesor de pared: 1.5mm',
          'Longitud estándar: 6 metros',
          'Resistencia a la corrosión: Alta'
        ]
      }
    ]
  },
  'angulos': {
    title: 'Ángulos',
    description: 'Ángulos de acero inoxidable para construcción y diseño',
    items: [
      { 
        name: 'Ángulo 90° 1.5"', 
        image: 'https://aceroinoxperu.com/wp-content/uploads/2024/01/Angulo-Acero-Inoxidable-C-304.jpeg',
        description: 'Ángulo recto de acero inoxidable, perfecto para esquinas y soportes estructurales.',
        specifications: [
          'Dimensión: 1.5" x 1.5"',
          'Material: Acero 304',
          'Espesor: 1/8',
          'Longitud estándar: 6 metros',
          'Acabado: Brillante',
          'Tipo: Ángulo igual'
        ]
      },
      { 
        name: 'Ángulo 45° 2"', 
        image: 'https://image.made-in-china.com/2f0j00JOBVqHjFpgrn/45-Degree-4X4-2-Inch-Hole-Angle-Stainless-Steel-Iron-Material.webp',
        description: 'Ángulo de 45 grados de acero inoxidable, ideal para conexiones y transiciones.',
        specifications: [
          'Dimensión: 2" x 2"',
          'Material: Acero 304',
          'Espesor: 1/8',
          'Longitud estándar: 6 metros',
          'Acabado: Brillante',
          'Tipo: Ángulo igual'
        ]
      }
    ]
  },
  'codos': {
    title: 'Codos',
    description: 'Codos de alta calidad para sistemas de tuberías',
    items: [
      { 
        name: 'Codo Sanitario 90°', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIVsMngum88cy4RPewq8PbYxCVrx4HqqHgQ&s',
        description: 'Codo sanitario para industria alimentaria, farmacéutica y química.',
        specifications: [
          'Diámetro: 2"',
          'Material: Acero 316L',
          'Acabado: Sanitario',
          'Radio de curvatura: 3D',
          'Presión máxima: 150 PSI',
          'Certificación: 3A Sanitaria'
        ]
      },
      { 
        name: 'Codo Industrial 45°', 
        image: 'https://aceroinoxperu.com/wp-content/uploads/2024/01/Codo-45%C2%B0-Inoxidable-A403-WP304L-SCH-10S.jpeg',
        description: 'Codo industrial para aplicaciones generales y sistemas de conducción.',
        specifications: [
          'Diámetro: 3"',
          'Material: Acero 304',
          'Presión: 150 PSI',
          'Radio de curvatura: 1.5D',
          'Acabado: Industrial',
          'Tipo: Soldable'
        ]
      }
    ]
  }
};

const Products = ({ searchQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filterProducts = () => {
    if (!searchQuery) return products;

    const query = searchQuery.toLowerCase();
    const filtered = {};

    Object.entries(products).forEach(([key, category]) => {
      const filteredItems = category.items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.specifications.some(spec => spec.toLowerCase().includes(query))
      );

      if (filteredItems.length > 0) {
        filtered[key] = {
          ...category,
          items: filteredItems
        };
      }
    });

    return filtered;
  };

  const filteredProducts = filterProducts();

  if (selectedCategory) {
    return (
      <CategoryView 
        category={products[selectedCategory]} 
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
        Nuestros Productos
      </h2>
      
      {Object.keys(filteredProducts).length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-xl">No se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {Object.entries(filteredProducts).map(([key, category]) => (
            <div 
              key={key}
              onClick={() => setSelectedCategory(key)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={category.items[0].image}
                  alt={category.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {category.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{category.description}</p>
                <p className="mt-4 text-blue-600 font-medium">
                  Ver {category.items.length} productos →
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;