import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Sobre Nosotros</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <img
            src="https://inoxpres.com/wp-content/uploads/2018/09/almacen-2.jpg"
            alt="Nuestro taller"
            className="rounded-lg shadow-lg"
          />
        </div>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            En Mundo Inox, nos especializamos en la distribución y comercialización de productos de acero inoxidable de la más alta calidad. Con años de experiencia en el mercado, nos hemos convertido en un referente en Arequipa y el sur del Perú.
          </p>
          
          <p className="text-lg text-gray-700">
            Nuestro compromiso es proporcionar soluciones integrales para proyectos industriales y comerciales, garantizando la mejor calidad y servicio a nuestros clientes.
          </p>
          
          <div className="pt-4">
            <a
              href="#contacto"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Visión - izquierda */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Visión</h3>
          <p className="text-lg text-gray-700 text-justify">
            Consolidarnos como empresa líder en aceros inoxidables a nivel nacional, siendo reconocidos por la calidad de nuestros productos y por la excelencia de nuestros colaboradores.
          </p>
        </div>
        
        {/* Misión - derecha */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Misión</h3>
          <p className="text-lg text-gray-700 text-justify">
            La empresa Mundo Inox E.I.R.L asume con responsabilidad social la producción y comercialización de productos de alta calidad, estando enfocada en brindar una excelente atención al cliente.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
