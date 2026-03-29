import React, { useState } from 'react';

const dataPlanchas = [
  { calidad: '304/304L', acabado: 'N° 1', desde: '3.00', hasta: '50.80', medidas: [true, true, true] },
  { calidad: '304/304L', acabado: '2B', desde: '0.40', hasta: '6.00', medidas: [true, false, false] },
  { calidad: '304/304L', acabado: '2B', desde: '0.60', hasta: '6.00', medidas: [false, true, false] },
  { calidad: '304/304L', acabado: '2B', desde: '3.00', hasta: '6.00', medidas: [false, false, true] },
  { calidad: '304/304L', acabado: 'BA', desde: '0.40', hasta: '0.40', medidas: [true, false, false] },
  { calidad: '304/304L', acabado: 'BA + PVC', desde: '1.50', hasta: '2.00', medidas: [true, false, false] },
  { calidad: '304/304L', acabado: 'N°4', desde: '0.50', hasta: '1.50', medidas: [true, false, false] },
  { calidad: '304/304L', acabado: 'N°4 + PVC', desde: '0.80', hasta: '1.50', medidas: [false, true, false] },
  { calidad: '316/316L', acabado: 'N° 1', desde: '4.00', hasta: '50.80', medidas: [true, true, true] },
  { calidad: '316/316L', acabado: '2B', desde: '0.80', hasta: '3.00', medidas: [true, false, false] },
  { calidad: '316/316L', acabado: '2B', desde: '1.50', hasta: '3.00', medidas: [false, true, false] },
  { calidad: '316/316L', acabado: '2B', desde: '3.00', hasta: '3.00', medidas: [false, false, true] },
  { calidad: '430', acabado: 'BA', desde: '0.30', hasta: '1.50', medidas: [true, false, false] },
  { calidad: '430', acabado: 'BA + PVC', desde: '0.30', hasta: '1.50', medidas: [true, false, false] },
  { calidad: '430', acabado: 'N°4', desde: '0.50', hasta: '0.50', medidas: [true, false, false] }
];

const dataAcabados = [
  { tipo: 'Laminado en Caliente', tipoAcabado: 'N° 1', descripcion: 'Laminado en caliente, recocido y decapado.', acabado: 'Superficie mate-áspera.', aplicacion: 'Utilizado en aplicaciones industriales de alta resistencia al calor y a la corrosión.' },
  { tipo: 'Lamina en frío', tipoAcabado: '2D', descripcion: 'Laminado en frío, recocido y decapado.', acabado: 'Acabado deslustrado o mate.', aplicacion: 'Conveniente para retener lubricantes en superficies de embutido profundo.' },
  { tipo: 'Lamina en frío', tipoAcabado: '2B', descripcion: 'Laminado en frío, recocido, decapado con una ligera laminación en el tren skin-pass.', acabado: 'Acabado ligeramente semi-brillante.', aplicacion: 'Utilizado en casi todas las aplicaciones.' },
  { tipo: 'Lamina en frío', tipoAcabado: 'BA', descripcion: 'Laminado en frío, recocido en horno de atmósfera controlada.', acabado: 'Acabado brillante.', aplicacion: 'Más fácil de pulir que los acabados N°1 y 2D.' },
  { tipo: 'Esmerilado', tipoAcabado: 'N° 4', descripcion: 'Pulido con cintas abrasivas de granos 150 a 400.', acabado: 'Acabado esmerilado y satinado.', aplicacion: 'Uso decorativo, sanitario y general.' }
];

const PlanchasTable = () => {
  const [query, setQuery] = useState('');
  const matches = (title: string) => title.toLowerCase().includes(query.trim().toLowerCase());
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto mb-16 mt-16">
      {/* Encabezado */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-blue-600 mb-2">PLANCHAS DE ACERO INOXIDABLE</h2>
        <p className="text-sm text-gray-700 mb-6">
          Somos importadores y proveedores a nivel nacional de planchas de Acero Inoxidable en calidades 304, 316 y 430, 
          en formatos 4'x8', 5'x10' y 5'x20'.
        </p>
        
        {/* Imagen centrada */}
        <div className="flex justify-center mb-2 h-28 flex items-center">
          <img
            src="https://static.wixstatic.com/media/d5ba68_dc2660d962fb4bda98d9521a557fa82c~mv2.png/v1/crop/x_112,y_397,w_763,h_270/fill/w_471,h_161,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ancho.png"
            alt="Ancho Planchas"
            className="w-32 h-auto"
          />
        </div>
      </div>

      <div className="max-w-xl mx-auto mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar tabla por nombre..."
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Sección Tabla de Planchas */}
      {(query.trim()==='' || matches('Tabla de Planchas')) && (
      <div className="mb-8">
        {/* Título + Norma + Stock */}
        <div className="flex justify-between items-end mb-3"> {/* Contenedor flexible */}
          <h3 className="text-2xl font-bold text-gray-800">Tabla de Planchas</h3>
          <div className="text-right"> {/* Alineado a la derecha */}
            <p className="text-lg text-gray-600">Norma: ASTM A-240 / A-480</p>
            <div className="flex justify-end items-center gap-2 text-green-600"> {/* Check alineado a la derecha */}
              <span className="text-xl">✔️</span>
              <span className="text-lg">Medidas en stock</span>
            </div>
          </div>
        </div>

      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center mb-8">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">CALIDAD</th>
            <th className="border border-blue-500 px-3 py-2">ACABADO</th>
            <th className="border border-blue-500 px-3 py-2">ESPESOR DESDE (MM)</th>
            <th className="border border-blue-500 px-3 py-2">ESPESOR HASTA (MM)</th>
            <th className="border border-blue-500 px-3 py-2">1220X2440 (4' X 8')</th>
            <th className="border border-blue-500 px-3 py-2">1500X3000 (5' X 10')</th>
            <th className="border border-blue-500 px-3 py-2">1500X6000 (5' X 20')</th>
          </tr>
        </thead>
        <tbody>
          {dataPlanchas.map((row, index) => (
            <tr key={index} className={`border border-blue-500 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{row.calidad}</td>
              <td className="px-3 py-2">{row.acabado}</td>
              <td className="px-3 py-2">{row.desde}</td>
              <td className="px-3 py-2">{row.hasta}</td>
              <td className="px-3 py-2">{row.medidas[0] ? '✔️' : '❌'}</td>
              <td className="px-3 py-2">{row.medidas[1] ? '✔️' : '❌'}</td>
              <td className="px-3 py-2">{row.medidas[2] ? '✔️' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      )}

      {(query.trim()==='' || matches('Tipos de Acabados')) && (
      <>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Tipos de Acabados</h3>
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">TIPO</th>
            <th className="border border-blue-500 px-3 py-2">TIPO ACABADO</th>
            <th className="border border-blue-500 px-3 py-2">DESCRIPCIÓN</th>
            <th className="border border-blue-500 px-3 py-2">ACABADO</th>
            <th className="border border-blue-500 px-3 py-2">APLICACIÓN</th>
          </tr>
        </thead>
        <tbody>
          {dataAcabados.map((row, index) => (
            <tr key={index} className={`border border-blue-500 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{row.tipo}</td>
              <td className="px-3 py-2">{row.tipoAcabado}</td>
              <td className="px-3 py-2">{row.descripcion}</td>
              <td className="px-3 py-2">{row.acabado}</td>
              <td className="px-3 py-2">{row.aplicacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      )}
      {query.trim() !== '' && !(['Tabla de Planchas','Tipos de Acabados'].some(s => matches(s))) && (
        <div className="text-center text-gray-500 mt-4">No se encontraron tablas para la búsqueda.</div>
      )}
    </div>
  );
};

export default PlanchasTable;
