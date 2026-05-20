import React, { useState } from 'react';
import tuboRedondoImg from '../../assets/tuboredondo.jpg';
import tuboCuadradoImg from '../../assets/tubocuadrado.jpg';
import tuboRectangularImg from '../../assets/tuborectangular.jpg';
import tuboindustrialImg from '../../assets/tuboindustrial.png';
import TuberíaIndustrialImg from '../../assets/tuberias/Tuberia_Industrial.png';
import TuboRedondoAltImg from '../../assets/tuberias/Tubo_Redondo.png';
import TuboCuadradoAltImg from '../../assets/tuberias/Tubo_Cuadrado.png';
import TuboRectangularAltImg from '../../assets/tuberias/Tubo_Rectangular.png';

const dataTubos = [
  { diametroNominalMM: 3.175, diametroNominalPulg: '1/8"', diametroExteriorMM: 10.287, diametroExteriorPulg: 0.405, cedula: 10, espesorMM: 1.245, espesorPulg: 0.049, pesoLbPie: 0.190, pesoKgM: 0.283 },
  { diametroNominalMM: 3.175, diametroNominalPulg: '1/8"', diametroExteriorMM: 10.287, diametroExteriorPulg: 0.405, cedula: 40, espesorMM: 1.727, espesorPulg: 0.068, pesoLbPie: 0.250, pesoKgM: 0.372 },
  { diametroNominalMM: 6.350, diametroNominalPulg: '1/4"', diametroExteriorMM: 13.716, diametroExteriorPulg: 0.540, cedula: 10, espesorMM: 1.651, espesorPulg: 0.065, pesoLbPie: 0.336, pesoKgM: 0.501 },
  { diametroNominalMM: 6.350, diametroNominalPulg: '1/4"', diametroExteriorMM: 13.716, diametroExteriorPulg: 0.540, cedula: 40, espesorMM: 2.235, espesorPulg: 0.088, pesoLbPie: 0.433, pesoKgM: 0.645 },
  { diametroNominalMM: 9.525, diametroNominalPulg: '3/8"', diametroExteriorMM: 17.145, diametroExteriorPulg: 0.675, cedula: 10, espesorMM: 1.651, espesorPulg: 0.065, pesoLbPie: 0.432, pesoKgM: 0.643 },
  { diametroNominalMM: 9.525, diametroNominalPulg: '3/8"', diametroExteriorMM: 17.145, diametroExteriorPulg: 0.675, cedula: 40, espesorMM: 2.311, espesorPulg: 0.091, pesoLbPie: 0.579, pesoKgM: 0.862 },
  { diametroNominalMM: 12.700, diametroNominalPulg: '1/2"', diametroExteriorMM: 21.336, diametroExteriorPulg: 0.840, cedula: 10, espesorMM: 2.108, espesorPulg: 0.083, pesoLbPie: 0.685, pesoKgM: 1.019 },
  { diametroNominalMM: 12.700, diametroNominalPulg: '1/2"', diametroExteriorMM: 21.336, diametroExteriorPulg: 0.840, cedula: 40, espesorMM: 2.769, espesorPulg: 0.109, pesoLbPie: 0.868, pesoKgM: 1.292 },
  { diametroNominalMM: 19.050, diametroNominalPulg: '3/4"', diametroExteriorMM: 26.670, diametroExteriorPulg: 1.050, cedula: 10, espesorMM: 2.108, espesorPulg: 0.083, pesoLbPie: 0.875, pesoKgM: 1.301 },
  { diametroNominalMM: 19.050, diametroNominalPulg: '3/4"', diametroExteriorMM: 26.670, diametroExteriorPulg: 1.050, cedula: 40, espesorMM: 2.870, espesorPulg: 0.113, pesoLbPie: 1.154, pesoKgM: 1.717 },
  { diametroNominalMM: 25.400, diametroNominalPulg: '1"', diametroExteriorMM: 33.401, diametroExteriorPulg: 1.315, cedula: 10, espesorMM: 2.769, espesorPulg: 0.109, pesoLbPie: 1.432, pesoKgM: 2.131 },
  { diametroNominalMM: 25.400, diametroNominalPulg: '1"', diametroExteriorMM: 33.401, diametroExteriorPulg: 1.315, cedula: 40, espesorMM: 3.378, espesorPulg: 0.133, pesoLbPie: 1.713, pesoKgM: 2.549 },
  { diametroNominalMM: 31.750, diametroNominalPulg: '1 1/4"', diametroExteriorMM: 42.164, diametroExteriorPulg: 1.660, cedula: 10, espesorMM: 2.769, espesorPulg: 0.109, pesoLbPie: 1.842, pesoKgM: 2.741 },
  { diametroNominalMM: 31.750, diametroNominalPulg: '1 1/4"', diametroExteriorMM: 42.164, diametroExteriorPulg: 1.660, cedula: 40, espesorMM: 3.556, espesorPulg: 0.140, pesoLbPie: 2.319, pesoKgM: 3.450 },
  { diametroNominalMM: 50.800, diametroNominalPulg: '2"', diametroExteriorMM: 60.325, diametroExteriorPulg: 2.375, cedula: 40, espesorMM: 3.912, espesorPulg: 0.154, pesoLbPie: 3.727, pesoKgM: 5.546 },
  { diametroNominalMM: 63.500, diametroNominalPulg: '2 1/2"', diametroExteriorMM: 73.025, diametroExteriorPulg: 2.875, cedula: 10, espesorMM: 3.048, espesorPulg: 0.120, pesoLbPie: 3.733, pesoKgM: 5.556 },
  { diametroNominalMM: 63.500, diametroNominalPulg: '2 1/2"', diametroExteriorMM: 73.025, diametroExteriorPulg: 2.875, cedula: 40, espesorMM: 5.156, espesorPulg: 0.203, pesoLbPie: 5.793, pesoKgM: 8.627 },
  { diametroNominalMM: 76.200, diametroNominalPulg: '3"', diametroExteriorMM: 88.900, diametroExteriorPulg: 3.500, cedula: 10, espesorMM: 3.048, espesorPulg: 0.120, pesoLbPie: 4.391, pesoKgM: 6.536 },
  { diametroNominalMM: 76.200, diametroNominalPulg: '3"', diametroExteriorMM: 88.900, diametroExteriorPulg: 3.500, cedula: 40, espesorMM: 5.486, espesorPulg: 0.216, pesoLbPie: 7.576, pesoKgM: 11.285 },
  { diametroNominalMM: 101.600, diametroNominalPulg: '4"', diametroExteriorMM: 114.300, diametroExteriorPulg: 4.500, cedula: 10, espesorMM: 3.048, espesorPulg: 0.120, pesoLbPie: 5.495, pesoKgM: 8.178 },
  { diametroNominalMM: 101.600, diametroNominalPulg: '4"', diametroExteriorMM: 114.300, diametroExteriorPulg: 4.500, cedula: 40, espesorMM: 6.019, espesorPulg: 0.237, pesoLbPie: 10.793, pesoKgM: 16.065 },
  { diametroNominalMM: 127.000, diametroNominalPulg: '5"', diametroExteriorMM: 141.300, diametroExteriorPulg: 5.563, cedula: 10, espesorMM: 3.404, espesorPulg: 0.134, pesoLbPie: 7.654, pesoKgM: 11.393 },
  { diametroNominalMM: 127.000, diametroNominalPulg: '5"', diametroExteriorMM: 141.300, diametroExteriorPulg: 5.563, cedula: 40, espesorMM: 6.553, espesorPulg: 0.258, pesoLbPie: 14.620, pesoKgM: 21.768 },
  { diametroNominalMM: 152.400, diametroNominalPulg: '6"', diametroExteriorMM: 168.275, diametroExteriorPulg: 6.625, cedula: 10, espesorMM: 3.404, espesorPulg: 0.134, pesoLbPie: 9.119, pesoKgM: 13.576 },
  { diametroNominalMM: 152.400, diametroNominalPulg: '6"', diametroExteriorMM: 168.275, diametroExteriorPulg: 6.625, cedula: 40, espesorMM: 7.112, espesorPulg: 0.280, pesoLbPie: 18.974, pesoKgM: 28.250 },
  { diametroNominalMM: 203.200, diametroNominalPulg: '8"', diametroExteriorMM: 219.075, diametroExteriorPulg: 8.625, cedula: 10, espesorMM: 3.759, espesorPulg: 0.148, pesoLbPie: 12.529, pesoKgM: 18.640 },
  { diametroNominalMM: 203.200, diametroNominalPulg: '8"', diametroExteriorMM: 219.075, diametroExteriorPulg: 8.625, cedula: 40, espesorMM: 8.179, espesorPulg: 0.322, pesoLbPie: 28.558, pesoKgM: 42.518 },
  { diametroNominalMM: 254.000, diametroNominalPulg: '10"', diametroExteriorMM: 273.050, diametroExteriorPulg: 10.750, cedula: 10, espesorMM: 4.191, espesorPulg: 0.165, pesoLbPie: 17.411, pesoKgM: 25.902 },
  { diametroNominalMM: 254.000, diametroNominalPulg: '10"', diametroExteriorMM: 273.050, diametroExteriorPulg: 10.750, cedula: 40, espesorMM: 9.271, espesorPulg: 0.365, pesoLbPie: 40.480, pesoKgM: 60.230 },
  { diametroNominalMM: 304.800, diametroNominalPulg: '12"', diametroExteriorMM: 323.850, diametroExteriorPulg: 12.750, cedula: 10, espesorMM: 4.572, espesorPulg: 0.180, pesoLbPie: 21.502, pesoKgM: 32.011 },
  { diametroNominalMM: 304.800, diametroNominalPulg: '12"', diametroExteriorMM: 323.850, diametroExteriorPulg: 12.750, cedula: 40, espesorMM: 10.312, espesorPulg: 0.406, pesoLbPie: 49.560, pesoKgM: 73.720 }
];

const dataTubosred = [
  {
    acabado: "Brillante",
    espesor: "1.00 mm",
    medidas: [true, true, true, true, true, true, false, true, true, false, false, false, false, false, false]
  },
  {
    acabado: "Brillante",
    espesor: "1.20 mm",
    medidas: [false, true, true, true, true, true, false, true, true, true, false, false, false, false, false]
  },
  {
    acabado: "Brillante",
    espesor: "1.50 mm",
    medidas: [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
  },
  {
    acabado: "Brillante",
    espesor: "2.00 mm",
    medidas: [false, false, false, false, false, false, false, true, false, false, true, false, true, true, false]
  },
  {
    acabado: "Satinado",
    espesor: "1.50 mm",
    medidas: [false, true, true, true, false, true, false, true, true, true, false, true, true, false, false]
  }
];

const medidasTubos = [
  { pulg: '3/8"', mm: 9.525 },
  { pulg: '1/2"', mm: 12.700 },
  { pulg: '5/8"', mm: 15.875 },
  { pulg: '3/4"', mm: 19.050 },
  { pulg: '7/8"', mm: 22.225 },
  { pulg: '1"', mm: 25.400 },
  { pulg: '1 1/8"', mm: 28.575 },
  { pulg: '1 1/4"', mm: 31.750 },
  { pulg: '1 1/2"', mm: 38.100 },
  { pulg: '2"', mm: 50.800 },
  { pulg: '2 1/2"', mm: 63.500 },
  { pulg: '3"', mm: 76.200 },
  { pulg: '4"', mm: 101.60 },
  { pulg: '5"', mm: 127.00 },
  { pulg: '6"', mm: 152.40 }
];

const dataTuboCuadrado = {
  medidas: [
    "1/2\" 12.70mm", "--- 15.00mm", "3/4\" 19.05mm", "---- 20mm", 
    "1\" 25.40mm", "--- 30.00mm", "1 1/4\" 31.75mm", "1 1/2\" 38.10mm", 
    "--- 40.00mm", "2\" 50.80mm", "--- 70.00mm", "3\" 76.20mm", "4\" 101.60mm"
  ],
  data: [
    { acabado: "Brillante", espesor: "1.20 mm", medidas: [true, true, true, true, true, true, true, true, true, true, false, false, false] },
    { acabado: "Brillante", espesor: "1.50 mm", medidas: [true, true, true, true, true, false, true, true, false, true, false, true, true] },
    { acabado: "Brillante", espesor: "2.00 mm", medidas: [false, false, false, false, false, false, false, false, false, true, false, false, false] },
    { acabado: "Satinado", espesor: "1.00 mm", medidas: [false, false, false, true, true, false, false, true, false, false, false, false, false] },
    { acabado: "Satinado", espesor: "1.20 mm", medidas: [true, true, true, false, true, true, true, true, false, true, false, false, false] },
    { acabado: "Satinado", espesor: "1.50 mm", medidas: [true, false, true, false, true, true, true, true, true, true, true, true, true] },
    { acabado: "Satinado", espesor: "2.00 mm", medidas: [false, false, false, false, false, false, false, false, false, true, false, false, true] },
    { acabado: "Satinado", espesor: "3.00 mm", medidas: [false, false, false, false, false, false, false, false, false, false, false, false, true] }
  ]
};

const dataTuboRectangular = {
  medidas: [
    "10 x 20", "10 x 30", "10 x 40", "10 x 50", "10 x 60", "10 x 80", 
    "15 x 30", "20 x 40", "25 x 38", "25 x 50", "30 x 60", "40 x 80", "50 x 100"
  ],
  data: [
    {
      acabado: "Brillante",
      espesor: "1.20mm",
      medidas: [true, true, true, true, true, true, true, true, false, true, true, true, true]
    },
    {
      acabado: "Brillante",
      espesor: "1.50mm",
      medidas: [true, true, true, true, true, true, true, true, false, true, true, true, true]
    },
    {
      acabado: "Satinado",
      espesor: "1.50mm",
      medidas: [true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
  ]
};

const TubosTable = () => {
  const [query, setQuery] = useState('');
  const matches = (title: string) => title.toLowerCase().includes(query.trim().toLowerCase());
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-4">TUBOS DE ACERO INOXIDABLE</h2>
      <p className="text-sm text-gray-700 text-center mb-4">
        Aquí encontrarás las especificaciones técnicas de nuestros tubos de acero inoxidable, incluyendo el diámetro nominal, espesor y peso por metro.
      </p>

      <div className="max-w-xl mx-auto mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar tabla por nombre..."
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Tubo Cuadrado Ornamental */}
      {(query.trim()==='' || matches('Tubo Cuadrado Ornamental')) && (
      <div className="mb-12">
        <div className="mb-4">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">Tubo Cuadrado Ornamental</h3>
          <p className="text-xl text-gray-600">Norma: ASTM A-554</p>
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <span className="text-2xl">✔️</span>
            <span className="text-xl">Medidas en stock</span>
          </div>
        </div>

        {/* Imágenes */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <img 
            src={tuboCuadradoImg} 
            alt="Tubo Cuadrado" 
            className="w-48 h-auto"
          />
          <img 
            src={TuboCuadradoAltImg} 
            alt="Tubo Cuadrado Alt" 
            className="w-48 h-auto"
          />
        </div>

        <table className="min-w-full border-collapse border border-red-500 text-xs text-center">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="border border-red-500 px-1 py-1">ACABADO</th>
              <th className="border border-red-500 px-1 py-1">ESPESOR</th>
              {dataTuboCuadrado.medidas.map((medida, index) => (
                <th key={index} className="border border-red-500 px-1 py-1">{typeof medida === 'string' ? medida.toUpperCase() : medida}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTuboCuadrado.data.map((row, index) => (
              <tr key={index} className={`border border-red-500 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className="px-1 py-1">{row.acabado}</td>
                <td className="px-1 py-1">{row.espesor}</td>
                {row.medidas.map((isAvailable, medidaIndex) => (
                  <td key={medidaIndex} className="px-1 py-1">
                    {isAvailable ? "✔️" : "❌"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* Tubo Rectangular Ornamental */}
      {(query.trim()==='' || matches('Tubo Rectangular Ornamental')) && (
      <div className="mb-12">
        <div className="mb-4">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">Tubo Rectangular Ornamental</h3>
          <p className="text-xl text-gray-600">Norma: ASTM A-554</p>
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <span className="text-2xl">✔️</span>
            <span className="text-xl">Medidas en stock</span>
          </div>
        </div>

        {/* Imágenes */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <img 
            src={tuboRectangularImg} 
            alt="Tubo Rectangular" 
            className="w-48 h-auto"
          />
          <img 
            src={TuboRectangularAltImg} 
            alt="Tubo Rectangular Alt" 
            className="w-48 h-auto"
          />
        </div>

        <table className="min-w-full border-collapse border border-yellow-500 text-sm text-center">
          <thead className="bg-yellow-600 text-white">
            <tr>
              <th className="border border-yellow-500 px-1 py-1">ACABADO</th>
              <th className="border border-yellow-500 px-1 py-1">ESPESOR</th>
              {dataTuboRectangular.medidas.map((medida, index) => (
                <th key={index} className="border border-yellow-500 px-1 py-1">{typeof medida === 'string' ? medida.toUpperCase() : medida}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTuboRectangular.data.map((row, index) => (
              <tr key={index} className={`border border-yellow-500 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className="px-1 py-1">{row.acabado}</td>
                <td className="px-1 py-1">{row.espesor}</td>
                {row.medidas.map((isAvailable, medidaIndex) => (
                  <td key={medidaIndex} className="px-1 py-1">
                    {isAvailable ? "✔️" : "❌"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* Tubo Redondo Ornamental */}
      {(query.trim()==='' || matches('Tubo Redondo Ornamental')) && (
      <div className="mb-12">
        <div className="mb-4">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">Tubo Redondo Ornamental</h3>
          <p className="text-xl text-gray-600">Norma: ASTM A-554</p>
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <span className="text-2xl">✔️</span>
            <span className="text-xl">Medidas en stock</span>
          </div>
        </div>

        {/* Imágenes */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <img 
            src={tuboRedondoImg} 
            alt="Tubo Redondo" 
            className="w-48 h-auto"
          />
          <img 
            src={TuboRedondoAltImg} 
            alt="Tubo Redondo Alt" 
            className="w-48 h-auto"
          />
        </div>

        <table className="min-w-full border-collapse border border-green-500 text-xs text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border border-green-500 px-1 py-1">ACABADO</th>
              <th className="border border-green-500 px-1 py-1">ESPESOR</th>
              {medidasTubos.map((medida, index) => (
                <th key={index} className="border border-green-500 px-1 py-1">{`${typeof medida.pulg === 'string' ? medida.pulg.toUpperCase() : medida.pulg} | ${typeof medida.mm === 'string' ? medida.mm : medida.mm} MM`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTubosred.map((row, rowIndex) => (
              <tr key={rowIndex} className={`border border-green-500 ${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className="px-1 py-1">{row.acabado}</td>
                <td className="px-1 py-1">{row.espesor}</td>
                {row.medidas.map((medida, medidaIndex) => (
                  <td key={medidaIndex} className="border border-green-500 px-1 py-1">
                    {medida ? '✔️' : '❌'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* Tubería Industrial con Costura */}
{(query.trim()==='' || matches('Tubería Industrial con Costura')) && (
<div className="mb-12">
  <div className="mb-4">
    <h3 className="text-3xl font-bold text-blue-600 mb-2">Tubería Industrial con Costura</h3>
    <p className="text-xl text-gray-600">Norma: ASTM A-312</p>
    <div className="flex items-center gap-2 text-green-600 mb-4">
      <span className="text-2xl">✔️</span>
      <span className="text-xl">Medidas en stock</span>
    </div>
  </div>

  {/* Imágenes */}
  <div className="flex justify-center items-center gap-8 mb-8">
    <img
      src={tuboindustrialImg}
      alt="Tubería Industrial"
      className="w-48 h-auto"
    />
    <img
      src={TuberíaIndustrialImg}
      alt="Tubería Industrial Alt"
      className="w-48 h-auto"
    />
  </div>

  {/* Tabla principal */}
  <table className="min-w-full border-collapse border border-blue-500 text-sm text-center mb-8">
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="border border-blue-500 px-3 py-2">DIÁMETRO NOMINAL (MM)</th>
        <th className="border border-blue-500 px-3 py-2">DIÁMETRO NOMINAL (PULG)</th>
        <th className="border border-blue-500 px-3 py-2">DIÁMETRO EXTERIOR (MM)</th>
        <th className="border border-blue-500 px-3 py-2">DIÁMETRO EXTERIOR (PULG)</th>
        <th className="border border-blue-500 px-3 py-2">CÉDULA</th>
        <th className="border border-blue-500 px-3 py-2">ESPESOR (MM)</th>
        <th className="border border-blue-500 px-3 py-2">ESPESOR (PULG)</th>
        <th className="border border-blue-500 px-3 py-2">PESO (LB/FT)</th>
        <th className="border border-blue-500 px-3 py-2">PESO (KG/M)</th>
      </tr>
    </thead>
    <tbody>
      {dataTubos.map((row, index) => (
        <tr key={index} className={`border border-blue-500 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
          <td className="px-3 py-2">{row.diametroNominalMM}</td>
          <td className="px-3 py-2">{row.diametroNominalPulg}</td>
          <td className="px-3 py-2">{row.diametroExteriorMM}</td>
          <td className="px-3 py-2">{row.diametroExteriorPulg}</td>
          <td className="px-3 py-2">{row.cedula}</td>
          <td className="px-3 py-2">{row.espesorMM}</td>
          <td className="px-3 py-2">{row.espesorPulg}</td>
          <td className="px-3 py-2">{row.pesoLbPie}</td>
          <td className="px-3 py-2">{row.pesoKgM}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
)}
    </div>
  );
};

export default TubosTable;