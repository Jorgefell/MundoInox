import React from 'react';

const dataBarras = [
  { pulgadas: '1/8"', milimetros: '3.175 mm', tipo304: true, tipo201: true },
  { pulgadas: '3/16"', milimetros: '4.763 mm', tipo304: true, tipo201: true },
  { pulgadas: '1/4"', milimetros: '6.350 mm', tipo304: true, tipo201: true },
  { pulgadas: '5/16"', milimetros: '7.938 mm', tipo304: true, tipo201: true },
  { pulgadas: '3/8"', milimetros: '9.525 mm', tipo304: true, tipo201: true },
  { pulgadas: '7/16"', milimetros: '11.113 mm', tipo304: true, tipo201: false },
  { pulgadas: '1/2"', milimetros: '12.700 mm', tipo304: true, tipo201: true },
  { pulgadas: '9/16"', milimetros: '14.288 mm', tipo304: false, tipo201: true },
  { pulgadas: '5/8"', milimetros: '15.875 mm', tipo304: true, tipo201: true },
  { pulgadas: '3/4"', milimetros: '19.050 mm', tipo304: true, tipo201: true },
  { pulgadas: '7/8"', milimetros: '22.225 mm', tipo304: true, tipo201: true },
  { pulgadas: '1"', milimetros: '25.400 mm', tipo304: true, tipo201: true },
  { pulgadas: '1 1/8"', milimetros: '28.575 mm', tipo304: true, tipo201: true },
  { pulgadas: '1 1/4"', milimetros: '31.750 mm', tipo304: true, tipo201: true },
  { pulgadas: '1 3/8"', milimetros: '34.925 mm', tipo304: true, tipo201: false },
  { pulgadas: '1 1/2"', milimetros: '38.100 mm', tipo304: true, tipo201: true },
  { pulgadas: '1 3/4"', milimetros: '44.450 mm', tipo304: true, tipo201: true },
  { pulgadas: '2"', milimetros: '50.800 mm', tipo304: true, tipo201: true },
  { pulgadas: '2 1/4"', milimetros: '57.150 mm', tipo304: true, tipo201: true },
  { pulgadas: '2 1/2"', milimetros: '63.500 mm', tipo304: true, tipo201: true },
  { pulgadas: '3"', milimetros: '76.200 mm', tipo304: true, tipo201: true },
  { pulgadas: '3 1/2"', milimetros: '88.900 mm', tipo304: true, tipo201: false },
  { pulgadas: '4"', milimetros: '101.600 mm', tipo304: true, tipo201: true },
  { pulgadas: '4 1/2"', milimetros: '114.300 mm', tipo304: true, tipo201: false },
  { pulgadas: '5"', milimetros: '127.000 mm', tipo304: true, tipo201: false },
  { pulgadas: '6"', milimetros: '152.400 mm', tipo304: true, tipo201: false },
];

const TablaBarras = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto mb-16">
      {/* Título principal */}
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-6">BARRAS DE ACERO INOXIDABLE</h2>
      
      {/* Descripción */}
      <p className="text-lg text-gray-700 text-center mb-6">
        Somos importadores y proveedores a nivel nacional de barras de acero inoxidable en diferentes diámetros. 
        Contamos con barras redondas de Acero Inoxidable en calidades 304 y 316.
      </p>

      {/* Imagen */}
      <div className="text-center mb-12">
        <img 
          src="https://static.wixstatic.com/media/d5ba68_cf52d9faf7744a609e7232ea622cbf0d~mv2.png/v1/crop/x_17,y_56,w_514,h_560/fill/w_123,h_133,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png" 
          alt="Barras de Acero Inoxidable" 
          className="mx-auto w-40 md:w-80"
        />
      </div>

      {/* Sección de Tabla con título, norma y stock */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Tabla de Barras</h3>
          <div className="text-right">
            <p className="text-lg text-gray-600">Norma: ASTM A-276</p>
            <div className="flex justify-end items-center gap-2 text-green-600">
              <span className="text-xl">✔️</span>
              <span className="text-lg">Medidas en stock</span>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-base text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-4 py-2">Pulgadas</th>
                <th className="border border-blue-500 px-4 py-2">Milímetros (mm)</th>
                <th className="border border-blue-500 px-4 py-2">304</th>
                <th className="border border-blue-500 px-4 py-2">201</th>
              </tr>
            </thead>
            <tbody>
              {dataBarras.map((row, index) => (
                <tr key={index} className={`border border-blue-500 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
                  <td className="border border-blue-500 px-4 py-2">{row.pulgadas}</td>
                  <td className="border border-blue-500 px-4 py-2">{row.milimetros}</td>
                  <td className="border border-blue-500 px-4 py-2">{row.tipo304 ? "✔️" : "❌"}</td>
                  <td className="border border-blue-500 px-4 py-2">{row.tipo201 ? "✔️" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaBarras;