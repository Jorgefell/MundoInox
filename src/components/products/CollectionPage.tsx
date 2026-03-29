import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

// Configuración de todas las tarjetillas solicitadas con cantidad de tablas
export const collectionConfig: Record<string, { title: string; sections: number }> = {
  'discos-limpieza': { title: 'Discos o Artículos de Limpieza', sections: 12 },
  'perforado-rosca': { title: 'Artículos Perforado Rosca', sections: 9 },
  'aluminio-antorcha': { title: 'Accesorios de Aluminio y Antorcha', sections: 19 },
  'decorativos': { title: 'Decorativos', sections: 58 },
  'ajustes': { title: 'Ajustes', sections: 35 },
  'industriales': { title: 'Industriales', sections: 85 },
  'electrodo-varilla': { title: 'Electrodos de Varilla', sections: 8 },
};

// Estructura base de una fila de la tabla
interface RowBase {
  codigo?: string;
  descripcion?: string;
  medida?: string;
  peso?: string | number;
  marca?: string;
  precio?: string | number; // Precio por unidad
}

// Genera datos vacíos/placeholder para cada sección
const buildEmptyData = (rows: number = 5): RowBase[] => {
  return Array.from({ length: rows }).map((_, i) => ({
    codigo: `COD-${String(i + 1).padStart(3, '0')}`,
    descripcion: 'Completar descripción',
    medida: '—',
    peso: '—',
    marca: '—',
    precio: '—',
  }));
};

const SectionTable: React.FC<{ title: string; iconPath?: string; rows?: RowBase[] }>
= ({ title, iconPath = '/icons/placeholder.png', rows = buildEmptyData() }) => {
  return (
    <div className="mb-8 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Encabezado clásico azul con espacio para icono opcional */}
      <div className="flex items-center gap-4 px-4 py-3 bg-blue-600">
        <div className="w-10 h-10 bg-white/20 rounded-md overflow-hidden flex items-center justify-center">
          <img src={iconPath} alt={title} className="w-full h-full object-cover" onError={(e:any)=>{e.currentTarget.style.display='none'}} />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-blue-500 px-3 py-2">CÓDIGO</th>
              <th className="border border-blue-500 px-3 py-2">DESCRIPCIÓN</th>
              <th className="border border-blue-500 px-3 py-2">MEDIDA</th>
              <th className="border border-blue-500 px-3 py-2">PESO</th>
              <th className="border border-blue-500 px-3 py-2">MARCA</th>
              <th className="border border-blue-500 px-3 py-2">PRECIO POR UNIDAD</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className="px-3 py-2">{r.codigo}</td>
                <td className="px-3 py-2 text-left">{r.descripcion}</td>
                <td className="px-3 py-2">{r.medida}</td>
                <td className="px-3 py-2">{r.peso}</td>
                <td className="px-3 py-2">{r.marca}</td>
                <td className="px-3 py-2">{r.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CollectionPage: React.FC = () => {
  const { slug } = useParams();
  const [query, setQuery] = useState('');

  const config = collectionConfig[slug ?? ''];

  const sections = useMemo(() => {
    if (!config) return [] as { title: string; iconPath: string }[];
    return Array.from({ length: config.sections }).map((_, i) => ({
      title: `${config.title} - Tabla ${String(i + 1).padStart(2, '0')}`,
      iconPath: `/icons/${(slug || 'collection')}-${String(i + 1).padStart(2, '0')}.png`,
    }));
  }, [config, slug]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter(s => s.title.toLowerCase().includes(q));
  }, [sections, query]);

  if (!config) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-100 text-yellow-900 border border-yellow-300 p-4 rounded-lg">
          La colección solicitada no existe.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold text-blue-600">{config.title}</h2>
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Buscar tabla por nombre..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-gray-500">No se encontraron tablas para la búsqueda.</div>
        ) : (
          filtered.map((s, idx) => (
            <SectionTable key={idx} title={s.title} iconPath={s.iconPath} />
          ))
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
