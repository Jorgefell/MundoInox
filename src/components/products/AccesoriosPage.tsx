import React, { useMemo, useState } from 'react';
import AntorchaCompletaImg from '../../assets/antorcha/Antorcha_Completa_De_Tig.png';
import BoquillaCorteImg from '../../assets/antorcha/Boquilla_de_Corte_Plasma_90-100A_para_Cutmaster_102.png';
import CabezalImg from '../../assets/antorcha/Cabezal_De_Antorcha_Tig_26_Fv.png';
import CeramicaImg from '../../assets/antorcha/Cerámica_Antorcha_Tig.png';
import CeramicaFiltroImg from '../../assets/antorcha/Cerámica_Antorcha_Tig_Para filtro.png';
import ColletImg from '../../assets/antorcha/Collet.png';
import ElectrodoTungstenoImg from '../../assets/antorcha/Electrodo_Tungsteno_Para_Tig.png';
import GasDifusorImg from '../../assets/antorcha/Gas_Difusor_Para_Antorcha_Tig.png';
import PortaColletImg from '../../assets/antorcha/Porta_Collet_Para_Tig.png';
import TaponesImg from '../../assets/antorcha/Tapones_Tig.png';
import SwitchPalancaImg from '../../assets/antorcha/Switch_De_Palanca_Para_Antorcha_Tig.png';

// Utilidad para normalizar cadenas (sin acentos y minúsculas)
const normalize = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

// Mapeo de títulos a imágenes (normalizados)
const IMAGE_MAP: Record<string, string> = {
  [normalize('Antorcha Completa De Tig')]: AntorchaCompletaImg,
  [normalize('Boquilla de Corte Plasma 90-100A para Cutmaster 102')]: BoquillaCorteImg,
  [normalize('Cabezal De Antorcha Tig 26 Fv')]: CabezalImg,
  [normalize('Cerámica Antorcha Tig')]: CeramicaImg,
  [normalize('Cerámica Antorcha Tig Para Filtro')]: CeramicaFiltroImg,
  [normalize('Collet')]: ColletImg,
  [normalize('Electrodo de Tungsteno Para Tig')]: ElectrodoTungstenoImg,
  [normalize('Gas Difusor Para Antorcha Tig')]: GasDifusorImg,
  [normalize('Porta Collet Para Tig')]: PortaColletImg,
  [normalize('Tapones Tig')]: TaponesImg,
  [normalize('Switch De Palanca Para Antorcha Tig')]: SwitchPalancaImg,
};

const getImageForTitle = (title: string): string => {
  return IMAGE_MAP[normalize(title)] || AntorchaCompletaImg;
};

const AccesoriosPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    return [
      {
        title: 'Antorcha Completa De Tig',
        headers: ['FV', 'Marca'],
        rows: [
          ['26', 'PROFAX'],
          ['26', 'WLEPOWER'],
        ],
      },
      {
        title: 'Boquilla de Corte Plasma 90-100A para Cutmaster 102',
        headers: ['Marca del producto'],
        rows: [
          [ 'Thermal Dynamics (Victor Technologies)'],
        ],
      },
      {
        title: 'Cabezal De Antorcha Tig 26 Fv',
        headers: ['Modelo', 'Peso (kg/unid)', 'Marca'],
        rows: [
          ['26 FV', '0.20', 'WELPOWER'],
          ['26 FV', '0.20', 'PROFAX'],
        ],
      },
      {
        title: 'CERÁMICA ANTORCHA TIG',
        headers: ['Número de copa', 'Peso (kg/unid)', 'Marca del producto'],
        rows: [
          ['N° 4', '0.021', 'Importado'],
          ['N° 5', '0.019', 'Importado'],
          ['N° 6', '0.022', 'Importado'],
          ['N° 7', '0.022', 'Importado'],
          ['N° 8', '0.022', 'Importado'],
        ],
      },
      {
        title: 'CERÁMICA ANTORCHA TIG PARA FILTRO',
        headers: ['Número de copa', 'Peso (kg/unid)', 'Marca del producto'],
        rows: [
          ['N° 4', '0.026', 'Importado'],
          ['N° 5', '0.027', 'Importado'],
          ['N° 6', '0.026', 'Importado'],
          ['N° 7', '0.027', 'Importado'],
          ['N° 8', '0.025', 'Importado'],
        ],
      },
      {
        title: 'COLLET',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (kg/unid)'],
        rows: [
          ['1/16”', '1.6', '0.006'],
          ['3/32”', '2.4', '0.005'],
          ['1/8”', '3.2', '0.005'],
        ],
      },
      {
        title: 'ELECTRODO DE TUNGSTENO PARA TIG',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (kg/unid)', 'Tipo'],
        rows: [
          ['1/16”', '1.6', '0.006', 'PÚRPURA'],
          ['3/32”', '2.4', '0.015', 'PÚRPURA'],
          ['1/8”', '3.2', '0.026', 'PÚRPURA'],
          ['1/16”', '1.6', '0.006', 'TORIADO'],
          ['3/32”', '2.4', '0.014', 'TORIADO'],
          ['1/8”', '3.2', '0.025', 'TORIADO'],
          ['3/32”', '2.4', '0.014', 'PURO (VERDE)'],
        ],
      },
      {
        title: 'GAS DIFUSOR PARA ANTORCHA TIG',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (kg/unid)', 'Marca'],
        rows: [
          ['1/16"', '1.6 mm', '0.021', 'Importado'],
          ['3/32"', '2.4 mm', '0.020', 'Importado'],
          ['1/8"', '3.2 mm', '0.019', 'Importado'],
        ],
      },
      {
        title: 'PORTA COLLET PARA TIG',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (kg/unid)', 'Marca'],
        rows: [
          ['1/16"', '1.6', '0.016', 'Importado'],
          ['3/32"', '2.4', '0.016', 'Importado'],
          ['1/8"', '3.2', '0.016', 'Importado'],
        ],
      },
      {
        title: 'TAPONES TIG',
        headers: ['Tipo', 'Peso (kg/unid)', 'Marca'],
        rows: [
          ['TAPA CHICA', '0.0090', 'Importado'],
          ['TAPA MEDIANO', '0.0110', 'Importado'],
          ['TAPA LARGA (LAPICERO)', '0.0190', 'Importado'],
        ],
      },
      {
        title: 'SWITCH DE PALANCA PARA ANTORCHA TIG',
        headers: ['Voltaje','Amperaje','Peso (kg/unid)', 'Marca'],
        rows: [
          ['250 V AC','5A','0.010', 'DONGHA'],
        ],
      },
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter(s => s.title.toLowerCase().includes(q));
  }, [sections, query]);

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">ACCESORIOS DE ANTORCHA TIG</h2>
        <p className="text-sm text-gray-700 text-center mb-6">
          Descubre nuestra completa línea de accesorios para antorchas TIG. Desde cerámicas y collets hasta electrodos de tungsteno y difusores de gas, contamos con todo lo necesario para optimizar tus trabajos de soldadura. Cada componente está diseñado para garantizar precisión, durabilidad y excelentes resultados en tus proyectos.
        </p>

        <div className="max-w-xl mx-auto mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tabla por nombre..."
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center">No se encontraron tablas para la búsqueda.</div>
        ) : (
          filtered.map((s) => (
            <div className="mb-8" key={s.title}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-blue-600">{typeof s.title === 'string' ? s.title.toUpperCase() : s.title}</h3>
              </div>

              <div className="text-center mb-2 h-28 flex items-center justify-center">
                <img
                  src={getImageForTitle(s.title)}
                  alt={s.title}
                  className="w-24 h-24 object-contain"
                  onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      {s.headers.map((h) => (
                        <th key={h} className="border border-blue-500 px-3 py-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.rows.map((r, i) => (
                      <tr key={i} className={`border border-blue-500 ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                        {r.map((cell: any, ci: number) => (
                          <td key={ci} className="px-3 py-2">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AccesoriosPage;
