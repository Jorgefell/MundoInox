import React from 'react';

const TablaPlatinas = () => {
  // Datos de las platinas
  const platinas = [
    { espesor: "1/8\"", milimetros: "3.18 mm", ancho_3_4: true, ancho_1: true, ancho_1_1_4: true, ancho_1_1_2: true, ancho_2: true },
    { espesor: "3/16\"", milimetros: "4.76 mm", ancho_3_4: false, ancho_1: true, ancho_1_1_4: true, ancho_1_1_2: true, ancho_2: true },
    { espesor: "1/4\"", milimetros: "6.35 mm", ancho_3_4: false, ancho_1: true, ancho_1_1_4: true, ancho_1_1_2: true, ancho_2: true },
    { espesor: "5/16\"", milimetros: "7.94 mm", ancho_3_4: false, ancho_1: true, ancho_1_1_4: false, ancho_1_1_2: true, ancho_2: true },
    { espesor: "3/8\"", milimetros: "9.53 mm", ancho_3_4: false, ancho_1: true, ancho_1_1_4: true, ancho_1_1_2: true, ancho_2: true },
    { espesor: "1/2\"", milimetros: "12.70 mm", ancho_3_4: false, ancho_1: true, ancho_1_1_4: false, ancho_1_1_2: true, ancho_2: true }
  ];

  // Medidas disponibles
  const medidas = [
    { pulg: "3/4\"", mm: "19.05 mm" },
    { pulg: "1\"", mm: "25.40 mm" },
    { pulg: "1 1/4\"", mm: "31.75 mm" },
    { pulg: "1 1/2\"", mm: "38.10 mm" },
    { pulg: "2\"", mm: "50.80 mm" }
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto mb-16 mt-16">
      {/* Título principal */}
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-6">PLATINAS DE ACERO INOXIDABLE</h2>
      
      {/* Descripción */}
      <p className="text-lg text-gray-700 text-center mb-6">
        Somos importadores y proveedores a nivel nacional de platinas de acero inoxidable en calidad 304 en espesores de 1/8″, 
        3/16", 1/4", 5/16", 3/8", 1/2" y anchos desde 3/4″ hasta 2″.
      </p>

      {/* Imagen */}
      <div className="text-center mb-2 h-28 flex items-center justify-center">
        <img
          src="https://static.wixstatic.com/media/d5ba68_8c95d62cff38472a9262bfcfd724ddf0~mv2.png/v1/fill/w_208,h_106,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PLATINAS_dimensiones.png"
          alt="Platinas Dimensiones"
          className="w-28 h-auto"
        />
      </div>

      {/* Sección de Tabla con título, norma y stock */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-2xl font-bold text-gray-800">Tabla de Platinas</h3>
          <div className="text-right">
            <p className="text-lg text-gray-600">Norma: ASTM A-480</p>
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
                <th rowSpan={2} className="border border-blue-500 px-4 py-2">ESPESOR</th>
                <th rowSpan={2} className="border border-blue-500 px-4 py-2 relative">
                  <div className="flex flex-col justify-center h-full">
                    <span>PULGADAS</span>
                    <div className="border-t border-white my-1 w-full"></div>
                    <span>MILÍMETROS</span>
                  </div>
                </th>
                {medidas.map((medida, index) => (
                  <th key={index} colSpan={1} className="border border-blue-500 px-4 py-2">
                    {typeof medida.pulg === 'string' ? medida.pulg.toUpperCase() : medida.pulg}
                  </th>
                ))}
              </tr>
              <tr>
                {medidas.map((medida, index) => (
                  <th key={index} className="border border-blue-500 px-4 py-2">
                    {typeof medida.mm === 'string' ? medida.mm.toUpperCase() : medida.mm}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {platinas.map((fila, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-4 py-2">{fila.espesor}</td>
                  <td className="border border-blue-500 px-4 py-2">{fila.milimetros}</td>
                  <td className="border border-blue-500 px-4 py-2">{fila.ancho_3_4 ? '✔️' : '❌'}</td>
                  <td className="border border-blue-500 px-4 py-2">{fila.ancho_1 ? '✔️' : '❌'}</td>
                  <td className="border border-blue-500 px-4 py-2">{fila.ancho_1_1_4 ? '✔️' : '❌'}</td>
                  <td className="border border-blue-500 px-4 py-2">{fila.ancho_1_1_2 ? '✔️' : '❌'}</td>
                  <td className="border border-blue-500 px-4 py-2">{fila.ancho_2 ? '✔️' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaPlatinas;