import { useMemo, useState, useCallback } from 'react';
import imgElectrodos from '../../assets/electrodos/electrodos.png';
import imgVarillas from '../../assets/electrodos/Rollo.png';
import imgRollo from '../../assets/electrodos/varillas.png';

// Imágenes industriales
import AbrazaderasImg from '../../assets/industriales/Abrazaderas_Regulables_para_Manguera.png';
import ClampImg from '../../assets/industriales/Abrazadera_Tipo_Pesado_Clamp_AS.png';
import AdaptadoresImg from '../../assets/industriales/Adaptadores para Manguera.png';
import AdaptadoresVariosImg from '../../assets/industriales/Adaptadores_Varios.png';
import BridaImg from '../../assets/industriales/Brida_Slip_-_Anillo.png';
import CodoConRoscaImg45 from '../../assets/industriales/Codo_con_Rosca_de_45_grados.png';
import CodoConRoscaImg90 from '../../assets/industriales/Codo_con_Rosca_de_90_grados.png';
import CodoODSoldableImg90 from '../../assets/industriales/Codo_de_Cedula_Soldable_de_90_grados.png';
import CodoODSoldableImg45 from '../../assets/industriales/Codo_de_Cedula_Soldable_de_45_grados.png';
import CodoSanitarioImg from '../../assets/industriales/Codo_Sanitario.png';
import CodoSanitarioFerrulImg from '../../assets/industriales/Codo_Sanitario_Con_Ferrul.png';
import CoplaRoscadaImg from '../../assets/industriales/Copla_Roscada.png';
import CruzRoscadaImg from '../../assets/industriales/Cruz_Roscada.png';
import DiscoImg from '../../assets/industriales/Disco.png';
import EmpaquesImg from '../../assets/industriales/Empaques.png';
import FerrulasImg from '../../assets/industriales/Ferrulas_Clamp_Soldable.png';
import FiltroImg from '../../assets/industriales/Filtro_Tipo__Y__con_Malla__Mesh__40.png';
import JuegoAbrazaderaImg from '../../assets/industriales/Juego_de_Abrazadera_Tripe_con_Férulas.png';
import NipleImg304 from '../../assets/industriales/Niple.png';
import NipleImg316 from '../../assets/industriales/Niple.png';
import ReduccionBushingImg from '../../assets/industriales/Reducción_Bushing_con_Rosca.png';
import ReduccionCampanaImg from '../../assets/industriales/Reducción_Campana_con_Rosca.png';
import ReduccionConcentricaSanitariaImg from '../../assets/industriales/Reducción_Concéntrica_Sanitaria.png';
import ReduccionConcentricaSoldableImg from '../../assets/industriales/Reducción_Concéntrica_Soldable.png';
import TapaBombeadaImg from '../../assets/industriales/Tapa_Bombeada.png';
import TapaBombeadaCapImg from '../../assets/industriales/Tapa_Bombeada_Cap.png';
import TapaBombeadaElectricaImg from '../../assets/industriales/Tapa_Bombeada_para_Tubería_eléctrica.png';
import TapaCiegaClampImg from '../../assets/industriales/Tapa_Ciega_Clamp.png';
import TapaConRoscaHembraImg from '../../assets/industriales/Tapa_con_Rosca_Hembra.png';
import TapaHexagonalConRoscaMachoImg from '../../assets/industriales/Tapa_Hexagonal_con_Rosca_Macho.png';
import TapaPestanadaImg from '../../assets/industriales/Tapa_Pestañada.png';
import TeeConRoscaImg from '../../assets/industriales/Tee_con_Rosca.png';
import TeeODSanitarioImg from '../../assets/industriales/Tee_OD_Sanitario.png';
import TeeSanitarioFerrulaImg from '../../assets/industriales/Tee_Sanitario_con_Férula.png';
import TeeSoldableImg from '../../assets/industriales/Tee_Soldable.png';
import UnionDobleSMSImg from '../../assets/industriales/Unión_Doble_Sanitaria_SMS.png';
import UnionSimpleRoscaNPTImg from '../../assets/industriales/Unión_Simple_con_Rosca_NPT.png';
import UnionUniversalImg from '../../assets/industriales/Unión_Universal.png';
import ValvulaBolaImg from '../../assets/industriales/Válvula_Bola_Acero___2_Piezas_-_Asiento_Teflón.png';
import ValvulaCheckSwingImg from '../../assets/industriales/Válvula_Check_Swing_NPT.png';
import ValvulaCompuertaImg from '../../assets/industriales/Válvula_Compuerta.png';
import ValvulaMariposaClampImg from '../../assets/industriales/Válvula_Mariposa_con_Clamp.png';
// Fasteners data and images
import FASTENERS, { mapFastenerImages } from './fastenersData';
import ArandelaImg from '../../assets/ajustes/Arandela_de_Presión.png';
import ArandelaPlanaImg from '../../assets/ajustes/Arandela_Plana.png';
import PernoImg from '../../assets/industriales/fasteners/perno.svg';
import TuercaImg from '../../assets/industriales/fasteners/tuerca.svg';
import RemacheImg from '../../assets/industriales/fasteners/arandela.svg';
interface RowBase {
  codigo?: string;
  descripcion?: string;
  medida?: string;
  peso?: string | number;
  marca?: string;
  precio?: string | number;
}

// (removed unused TableSection interface)

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

// Cargar dinámicamente imágenes de decorativos y buscar la mejor coincidencia por nombre
const DECORATIVOS_IMAGES = import.meta.glob('../../assets/decorativos/*.{png,jpg,jpeg,svg,webp}', { eager: true, as: 'url' }) as Record<string, string>;
const DECORATIVOS_LIST = Object.entries(DECORATIVOS_IMAGES).map(([path, url]) => {
  const fname = path.split('/').pop() || path;
  const name = fname.replace(/\.[^/.]+$/, '');
  return { path, name, url };
});

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const findBestDecorImage = (title: string) => {
  const t = normalize(title);
  const tTokens = new Set(t.split(' ').filter(Boolean));
  let bestUrl: string | null = null;
  let bestScore = 0;

  for (const img of DECORATIVOS_LIST) {
    const iname = normalize(img.name);
    const tokens = new Set(iname.split(' ').filter(Boolean));
    let score = 0;
    for (const tok of tTokens) if (tokens.has(tok)) score++;
    if (iname.includes(t) || t.includes(iname)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestUrl = img.url;
    }
  }

  if (bestUrl) return bestUrl;
  return DECORATIVOS_LIST[0]?.url || '';
};

// Map explicit titles to specific decor images when filenames are exact
const DECOR_TITLE_IMAGE_MAP: Record<string, string> = {
  'Tapa Bombeada Brillante': DECORATIVOS_IMAGES['../../assets/decorativos/tapa_bombeada_brillante.png'] || DECORATIVOS_LIST[0]?.url || '',
  'Tapa Bombeada Brillante Con Hueco': DECORATIVOS_IMAGES['../../assets/decorativos/Tapa_Bombeada_Brillante_con_Hueco.png'] || DECORATIVOS_IMAGES['../../assets/decorativos/Tapa_Bombeada_Brillante_con_Hueco.PNG'] || DECORATIVOS_LIST[0]?.url || '',
};

const getDecorImageForTitle = (title: string) => {
  return DECOR_TITLE_IMAGE_MAP[title] || findBestDecorImage(title);
};

// Cargar dinámicamente imágenes de aluminio
const ALUMINIO_IMAGES = import.meta.glob('../../assets/aluminio/*.{png,jpg,jpeg,svg,webp}', { eager: true, as: 'url' }) as Record<string, string>;
const ALUMINIO_LIST = Object.entries(ALUMINIO_IMAGES).map(([path, url]) => {
  const fname = path.split('/').pop() || path;
  const name = fname.replace(/\.[^/.]+$/, '');
  return { path, name, url };
});

const findBestAluminioImage = (title: string) => {
  const t = normalize(title);
  const tTokens = new Set(t.split(' ').filter(Boolean));
  let bestUrl: string | null = null;
  let bestScore = 0;

  for (const img of ALUMINIO_LIST) {
    const iname = normalize(img.name);
    const tokens = new Set(iname.split(' ').filter(Boolean));
    let score = 0;
    for (const tok of tTokens) if (tokens.has(tok)) score++;
    if (iname.includes(t) || t.includes(iname)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestUrl = img.url;
    }
  }

  if (bestUrl) return bestUrl;
  return ALUMINIO_LIST[0]?.url || '';
};

// Map explicit titles to specific aluminio images
const ALUMINIO_TITLE_IMAGE_MAP: Record<string, string> = {
  'Bridas De Aluminio': ALUMINIO_IMAGES['../../assets/aluminio/Bridas_De_Aluminio.png'] || ALUMINIO_LIST[0]?.url || '',
  'Bridas Abiertas De Aluminio': ALUMINIO_IMAGES['../../assets/aluminio/Bridas_Abiertas_De_Aluminio.png'] || ALUMINIO_LIST[0]?.url || '',
  'Codo De Aluminio': ALUMINIO_IMAGES['../../assets/aluminio/Codo_De_Aluminio.png'] || ALUMINIO_LIST[0]?.url || '',
  'Pasante De Aluminio': ALUMINIO_IMAGES['../../assets/aluminio/Pasante_De_Aluminio.png'] || ALUMINIO_LIST[0]?.url || '',
  'Terma De Aluminio': ALUMINIO_IMAGES['../../assets/aluminio/Terma_De_Aluminio.png'] || ALUMINIO_LIST[0]?.url || '',
  'Tee De Aluminio': ALUMINIO_IMAGES['../../assets/aluminio/Tee_De_Aluminio.png'] || ALUMINIO_LIST[0]?.url || '',
  'Tricodo De Aluminio': ALUMINIO_IMAGES['../../assets/aluminio/Tricodo_De_Aluminio.png'] || ALUMINIO_LIST[0]?.url || '',
  'Tapa Repujada De Aluminio': ALUMINIO_IMAGES['../../assets/aluminio/Tapa_Repujada_De_Aluminio.png'] || ALUMINIO_LIST[0]?.url || '',
};

const getAluminioImageForTitle = (title: string) => {
  return ALUMINIO_TITLE_IMAGE_MAP[title] || findBestAluminioImage(title);
};

// Cargar dinámicamente imágenes de perforado y mapear por similaridad
const PERFORADO_IMAGES = import.meta.glob('../../assets/perforado/*.{png,jpg,jpeg,svg,webp}', { eager: true, as: 'url' }) as Record<string, string>;
const PERFORADO_LIST = Object.entries(PERFORADO_IMAGES).map(([path, url]) => {
  const fname = path.split('/').pop() || path;
  const name = fname.replace(/\.[^/.]+$/, '');
  return { path, name, url };
});

const findBestPerforadoImage = (title: string) => {
  const t = normalize(title);
  const tTokens = new Set(t.split(' ').filter(Boolean));
  let bestUrl: string | null = null;
  let bestScore = 0;

  for (const img of PERFORADO_LIST) {
    const iname = normalize(img.name);
    const tokens = new Set(iname.split(' ').filter(Boolean));
    let score = 0;
    for (const tok of tTokens) if (tokens.has(tok)) score++;
    if (iname.includes(t) || t.includes(iname)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestUrl = img.url;
    }
  }

  if (bestUrl) return bestUrl;
  return PERFORADO_LIST[0]?.url || '';
};

// Mapeo explícito opcional para títulos que requieran imagen concreta
const PERFORADO_TITLE_IMAGE_MAP: Record<string, string> = {
  'Tapa Bombeada Brillante': PERFORADO_IMAGES['../../assets/perforado/tapa_bombeada_brillante.png'] || PERFORADO_LIST[0]?.url || '',
  'Tapa Bombeada Brillante Con Hueco': PERFORADO_IMAGES['../../assets/perforado/Tapa_Bombeada_Brillante_con_Hueco.png'] || PERFORADO_LIST[0]?.url || '',
};

const getPerforadoImageForTitle = (title: string) => {
  return PERFORADO_TITLE_IMAGE_MAP[title] || findBestPerforadoImage(title);
};

// Cargar dinámicamente imágenes de limpieza
const LIMPIEZA_IMAGES = import.meta.glob('../../assets/limpieza/*.{png,jpg,jpeg,svg,webp}', { eager: true, as: 'url' }) as Record<string, string>;
const LIMPIEZA_LIST = Object.entries(LIMPIEZA_IMAGES).map(([path, url]) => {
  const fname = path.split('/').pop() || path;
  const name = fname.replace(/\.[^/.]+$/, '');
  return { path, name, url };
});

const findBestLimpiezaImage = (title: string) => {
  const t = normalize(title);
  const tTokens = new Set(t.split(' ').filter(Boolean));
  let bestUrl: string | null = null;
  let bestScore = 0;

  for (const img of LIMPIEZA_LIST) {
    const iname = normalize(img.name);
    const tokens = new Set(iname.split(' ').filter(Boolean));
    let score = 0;
    for (const tok of tTokens) if (tokens.has(tok)) score++;
    if (iname.includes(t) || t.includes(iname)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestUrl = img.url;
    }
  }

  if (bestUrl) return bestUrl;
  return LIMPIEZA_LIST[0]?.url || '';
};

const getLimpiezaImageForTitle = (title: string) => {
  return findBestLimpiezaImage(title);
};

const SectionTable: React.FC<{ title: string; rows?: RowBase[] }>
= ({ title, rows = buildEmptyData() }) => {
  return (
    <div className="mb-8 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-blue-600">
        <h3 className="text-lg font-semibold text-white">{typeof title === 'string' ? title.toUpperCase() : title}</h3>
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

const CodoSanitarioTable: React.FC = () => {
  const rows = [
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '3/4"', espesor: '1.65 mm', peso: '0.030', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '1"', espesor: '1.65 mm', peso: '0.048', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '1 1/4"', espesor: '1.65 mm', peso: '0.074', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '1 1/2"', espesor: '1.65 mm', peso: '0.111', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '2"', espesor: '1.65 mm', peso: '0.175', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '2 1/2"', espesor: '1.65 mm', peso: '0.356', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '3"', espesor: '1.65 mm', peso: '0.537', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '4"', espesor: '1.65 mm', peso: '0.620', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Grado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.grado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CodoSanitarioFerrulTable: React.FC = () => {
  const rows = [
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '3/4"', espesor: '1.65 mm', peso: '0.052', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '1"', espesor: '1.65 mm', peso: '0.075', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '1 1/4"', espesor: '1.65 mm', peso: '0.087', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '1 1/2"', espesor: '1.65 mm', peso: '0.189', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '2"', espesor: '1.65 mm', peso: '0.315', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '2 1/2"', espesor: '1.65 mm', peso: '0.540', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '3"', espesor: '1.65 mm', peso: '0.820', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', medida: '4"', espesor: '1.65 mm', peso: '1.450', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Grado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.grado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  const CodoSoldAcTable2: React.FC = () => {
  const rows = [
    // --- SCH-40 45° (C-304) ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '1/4"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '3/8"', peso: '0.042', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '1/2"', peso: '0.050', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '3/4"', peso: '0.070', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '1"', peso: '0.120', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '1 1/4"', peso: '0.180', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '1 1/2"', peso: '0.260', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '2"', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '2 1/2"', peso: '0.860', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '3"', peso: '1.200', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '4"', peso: '2.100', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '5"', peso: '3.650', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '6"', peso: '5.800', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '45°', medida: '8"', peso: '10.200', marca: 'Importado' },

    // --- SCH-10 45° (C-316) ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '1/4"', peso: '0.025', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '1/2"', peso: '0.035', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '3/4"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '1"', peso: '0.075', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '1 1/4"', peso: '0.115', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '1 1/2"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '2"', peso: '0.240', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '2 1/2"', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '3"', peso: '0.620', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '45°', medida: '4"', peso: '1.050', marca: 'Importado' },
  ];
  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Cédula</th>
            <th className="border border-blue-500 px-3 py-2">Grado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.cedula}</td>
              <td className="px-3 py-2">{r.grado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

  const CoplaRoscadaTable: React.FC = () => {
    const rows = [
      { calidad: 'A105', acabado: 'Acero al carbono', medida: '1"', peso: '0.402', marca: 'Importado' },
    ];

    return (
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-blue-500 px-3 py-2">Calidad</th>
              <th className="border border-blue-500 px-3 py-2">Acabado</th>
              <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
              <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
              <th className="border border-blue-500 px-3 py-2">Marca</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className="px-3 py-2">{r.calidad}</td>
                <td className="px-3 py-2">{r.acabado}</td>
                <td className="px-3 py-2">{r.medida}</td>
                <td className="px-3 py-2">{r.peso}</td>
                <td className="px-3 py-2">{r.marca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
const CodoSoldAcTable1: React.FC = () => {
  const rows = [
    // --- SCH-10 90° (C-304) ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-10', grado: '90°', medida: '1/4"', peso: '0.025', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/8"', cedula: 'SCH-10', grado: '90°', peso: '0.035', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', cedula: 'SCH-10', grado: '90°', peso: '0.043', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', cedula: 'SCH-10', grado: '90°', peso: '0.055', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', cedula: 'SCH-10', grado: '90°', peso: '0.085', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', cedula: 'SCH-10', grado: '90°', peso: '0.140', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', cedula: 'SCH-10', grado: '90°', peso: '0.243', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', cedula: 'SCH-10', grado: '90°', peso: '0.420', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', cedula: 'SCH-10', grado: '90°', peso: '0.780', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', cedula: 'SCH-10', grado: '90°', peso: '1.222', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', cedula: 'SCH-10', grado: '90°', peso: '2.150', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '5"', cedula: 'SCH-10', grado: '90°', peso: '3.600', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '6"', cedula: 'SCH-10', grado: '90°', peso: '5.100', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '8"', cedula: 'SCH-10', grado: '90°', peso: '10.500', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '10"', cedula: 'SCH-10', grado: '90°', peso: '15.800', marca: 'Importado' },

    // --- SCH-40 90° (C-304) ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '90°', medida: '1/4"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/8"', cedula: 'SCH-40', grado: '90°', peso: '0.050', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', cedula: 'SCH-40', grado: '90°', peso: '0.080', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', cedula: 'SCH-40', grado: '90°', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', cedula: 'SCH-40', grado: '90°', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', cedula: 'SCH-40', grado: '90°', peso: '0.340', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', cedula: 'SCH-40', grado: '90°', peso: '0.480', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', cedula: 'SCH-40', grado: '90°', peso: '0.860', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', cedula: 'SCH-40', grado: '90°', peso: '1.580', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', cedula: 'SCH-40', grado: '90°', peso: '2.480', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', cedula: 'SCH-40', grado: '90°', peso: '4.950', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '5"', cedula: 'SCH-40', grado: '90°', peso: '7.100', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '6"', cedula: 'SCH-40', grado: '90°', peso: '11.500', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '8"', cedula: 'SCH-40', grado: '90°', peso: '21.000', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '10"', cedula: 'SCH-40', grado: '90°', peso: '38.200', marca: 'Importado' },

    // --- SCH-40 90° (C-316) ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', grado: '90°', medida: '1/4"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/8"', cedula: 'SCH-40', grado: '90°', peso: '0.050', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', cedula: 'SCH-40', grado: '90°', peso: '0.080', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', cedula: 'SCH-40', grado: '90°', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', cedula: 'SCH-40', grado: '90°', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', cedula: 'SCH-40', grado: '90°', peso: '0.340', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', cedula: 'SCH-40', grado: '90°', peso: '0.480', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', cedula: 'SCH-40', grado: '90°', peso: '0.860', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', cedula: 'SCH-40', grado: '90°', peso: '1.580', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', cedula: 'SCH-40', grado: '90°', peso: '2.480', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', cedula: 'SCH-40', grado: '90°', peso: '4.950', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '5"', cedula: 'SCH-40', grado: '90°', peso: '7.100', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '6"', cedula: 'SCH-40', grado: '90°', peso: '11.500', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '8"', cedula: 'SCH-40', grado: '90°', peso: '21.000', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '10"', cedula: 'SCH-40', grado: '90°', peso: '38.200', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Cédula</th>
            <th className="border border-blue-500 px-3 py-2">Grado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.cedula}</td>
              <td className="px-3 py-2">{r.grado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const CruzRoscadaTable: React.FC = () => {
  const rows = [
    // --- Calidad C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.070', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.105', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.160', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.235', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '0.335', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.540', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.675', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '1.240', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '2.310', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '3.380', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '5.850', presion: '150 LBS', marca: 'Importado' },

    // --- Calidad C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.070', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.105', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.160', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.235', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '0.335', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.540', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.675', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '1.240', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '2.310', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '3.380', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '5.850', presion: '150 LBS', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg)</th>
            <th className="border border-blue-500 px-3 py-2">Presión</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.presion}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DiscoTable: React.FC = () => {
  const rows = [
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', espesor: '3.0 mm', peso: '0.001' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '5/8"', espesor: '3.0 mm', peso: '0.001' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', espesor: '3.0 mm', peso: '0.002' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '7/8"', espesor: '3.0 mm', peso: '0.006' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', espesor: '3.0 mm', peso: '0.011' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', espesor: '3.0 mm', peso: '0.021' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', espesor: '3.0 mm', peso: '0.059' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', espesor: '3.0 mm', peso: '0.034' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', espesor: '3.0 mm', peso: '0.052' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', espesor: '3.0 mm', peso: '0.071' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', espesor: '3.0 mm', peso: '0.110' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4 1/2"', espesor: '3.0 mm', peso: '0.135' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '5"', espesor: '3.0 mm', peso: '0.160' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '5 1/2"', espesor: '3.0 mm', peso: '0.190' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '6"', espesor: '3.0 mm', peso: '0.220' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '6 1/2"', espesor: '3.0 mm', peso: '0.260' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '7"', espesor: '3.0 mm', peso: '0.310' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '7 1/2"', espesor: '3.0 mm', peso: '0.360' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.peso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CollectionScaffold: React.FC<{ title: string; sections: number }>
= ({ title, sections }) => {
  const [query, setQuery] = useState('');
  const allSections = useMemo(() => {
    return Array.from({ length: sections }).map((_, i) => ({
      title: `${title} - Tabla ${String(i + 1).padStart(2, '0')}`,
    }));
  }, [title, sections]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allSections;
    return allSections.filter(s => s.title.toLowerCase().includes(q));
  }, [allSections, query]);

  return (
    <div className="bg-gray-100 min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold text-blue-600">{typeof title === 'string' ? title.toUpperCase() : title}</h2>
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
            <SectionTable key={idx} title={s.title} />
          ))
        )}
      </div>
    </div>
  );
};

// Fasteners / Tornillería page
export const FastenersPage: React.FC = () => {
  const [query, setQuery] = useState('');

  // Cargar imágenes de fasteners dinámicamente
  const FASTENER_IMAGES = useMemo(() => {
    // Solo PNG, pero puedes agregar más extensiones si es necesario
    return import.meta.glob('../../assets/ajustes/*.{png,jpg,jpeg,svg,webp}', { eager: true, as: 'url' }) as Record<string, string>;
  }, []);

  // Mapea el nombre base de la imagen (sin extensión) a la URL
  const getFastenerImageUrl = useCallback((imageName: string | undefined) => {
    if (!imageName) return undefined;
    // Buscar cualquier extensión
    const found = Object.entries(FASTENER_IMAGES).find(([path]) => {
      const fname = path.split('/').pop()?.split('.')[0];
      return fname && fname.toLowerCase() === imageName.toLowerCase();
    });
    return found?.[1];
  }, [FASTENER_IMAGES]);

  // Aplica el mapeo de imágenes a todas las tablas de arandelas
  const entries = useMemo(() => {
    return Object.entries(FASTENERS)
      .map(([title, rows]) => {
        if (title.toLowerCase().includes('arandela')) {
          return [title, mapFastenerImages(rows)] as [string, any[]];
        }
        return [title, rows] as [string, any[]];
      })
      .sort((a, b) => a[0].localeCompare(b[0], 'es', { sensitivity: 'base' }));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(([title]) => title.toLowerCase().includes(q));
  }, [entries, query]);

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">TORNILLERÍA Y FIJACIONES</h2>
        <p className="text-sm text-gray-700 text-center mb-6">
          Especificaciones de arandelas, pernos, tuercas, remaches y otros elementos de fijación en distintos acabados y medidas.
        </p>

        <div className="max-w-xl mx-auto mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar sección..."
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center">No se encontraron tablas para la búsqueda.</div>
        ) : (
          <>
            {filtered.map(([title, rows]) => {
              const showCalidad = rows.some(
                (r: any) => typeof r.calidad === 'string' && r.calidad.trim() !== '' && r.calidad !== '—' && r.calidad !== '-'
              );
              // Buscar imagen para la tabla: primero fila con image, si no, fallback por título
              let imageUrl: string | undefined = undefined;
              const firstImageRow = rows.find((r: any) => r.image);
              if (firstImageRow && firstImageRow.image) {
                imageUrl = getFastenerImageUrl(firstImageRow.image);
              }
              // Si no hay imagen en ninguna fila, intentar deducir por el título
              if (!imageUrl) {
                if (title.toLowerCase().includes('arandela plana')) imageUrl = getFastenerImageUrl('arandela_plana');
                else if (title.toLowerCase().includes('arandela presión')) imageUrl = getFastenerImageUrl('arandela_de_presion');
                else if (title.toLowerCase().includes('arandela')) imageUrl = getFastenerImageUrl('arandela_plana');
                else if (title.toLowerCase().includes('perno')) imageUrl = getFastenerImageUrl('perno');
                else if (title.toLowerCase().includes('tuerca')) imageUrl = getFastenerImageUrl('tuerca');
                else if (title.toLowerCase().includes('remache')) imageUrl = getFastenerImageUrl('remache');
                // Puedes agregar más reglas si tienes más imágenes base
              }
              return (
                <div className="mb-8 bg-white shadow-md rounded-lg overflow-hidden" key={title}>
                  <div className="px-4 py-3 bg-blue-600 flex flex-col items-center gap-2">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-16 h-16 object-contain bg-white rounded shadow border border-blue-200"
                        style={{ minWidth: 48, minHeight: 48 }}
                        onError={(e:any) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <img
                        src={
                          title.toLowerCase().includes('arandela plana')
                            ? ArandelaPlanaImg
                            : [
                                'arandela presión inoxidable',
                                'arandela presión milimétrica inoxidable',
                                'arandela presión zincada',
                                'arandela presión milimétrica zincada'
                              ].includes(title.toLowerCase())
                              ? ArandelaImg
                              : title.toLowerCase().includes('arandela')
                                ? ArandelaImg
                                : title.toLowerCase().includes('perno')
                                  ? PernoImg
                                  : title.toLowerCase().includes('tuerca')
                                    ? TuercaImg
                                    : RemacheImg
                        }
                        alt={title}
                        className="w-16 h-16 object-contain bg-white rounded shadow border border-blue-200"
                        style={{ minWidth: 48, minHeight: 48 }}
                        onError={(e:any) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    <div style={{ height: 8 }} />
                    <h3 className="text-base font-semibold text-white tracking-wide" style={{ letterSpacing: 1 }}>{typeof title === 'string' ? title.toUpperCase() : title}</h3>
                  </div>
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
                        <thead className="bg-blue-600 text-white">
                          <tr>
                            {showCalidad && (
                              <th className="border border-blue-500 px-3 py-2">Calidad</th>
                            )}
                            <th className="border border-blue-500 px-3 py-2">Acabado</th>
                            <th className="border border-blue-500 px-3 py-2">Diámetro</th>
                            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                            <th className="border border-blue-500 px-3 py-2">Marca</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r: any, idx: number) => (
                            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                              {showCalidad && (
                                <td className="px-3 py-2">{r.calidad && r.calidad !== '—' && r.calidad !== '-' ? r.calidad : ''}</td>
                              )}
                              <td className="px-3 py-2">{r.acabado || '—'}</td>
                              <td className="px-3 py-2">{r.diametro || r.medida || '—'}</td>
                              <td className="px-3 py-2">{r.peso || r.peso?.toString?.() || '—'}</td>
                              <td className="px-3 py-2">{r.marca || r.brand || 'N/T'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

// Páginas independientes por tarjetilla
export const DiscosLimpiezaPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    return [
      {
      title: 'Discos Para Pulir',
      headers: ['Nombre', 'Diámetro', 'Peso (Kg/unid)', 'Marca'],
      rows: [,
        ['Disco Lana Velcro Pega', '4 1/2"', '0.035', 'UYUSTOOLS'],
        ['Disco Para Pulir Fieltro FFS', '4 1/2" x 7/8"', '0.095', 'PFERD'],
        ['Disco Rapid Polish', '4 1/2" x 7/8"', '0.053', 'NORTON'],
      ],
      },
      {
        title: 'Discos Jeans Azul Norton Hilo',
        headers: ['Acabado', 'Medidas (cm)', 'Peso (Kg/unid)', 'Marca del Producto'],
        rows: [
          ['Brillo Espejo', '10', '0.058', 'Fabricación Nacional'],
          ['Brillo Espejo', '12', '0.09', 'Fabricación Nacional'],
          ['Brillo Espejo', '15', '0.147', 'Fabricación Nacional'],
          ['Brillo Espejo', '17', '0.222', 'Fabricación Nacional'],
          ['Brillo Espejo', '20', '0.301', 'Fabricación Nacional'],
          ['Brillo Espejo', '25', '0.448', 'Fabricación Nacional'],
          ['Brillo Espejo', '30', '0.642', 'Fabricación Nacional'],
        ],
      },
      {
        title: 'Discos Drill Blanco Costura Con Hilo',
        headers: ['Acabado', 'Medidas (cm)', 'Peso (Kg/unid)', 'Marca del Producto'],
        rows: [
          ['Brillo Espejo', '12', '0.061', 'Fabricación Nacional'],
          ['Brillo Espejo', '15', '0.101', 'Fabricación Nacional'],
          ['Brillo Espejo', '17', '0.147', 'Fabricación Nacional'],
          ['Brillo Espejo', '20', '0.207', 'Fabricación Nacional'],
          ['Brillo Espejo', '25', '0.207', 'Fabricación Nacional'],
          ['Brillo Espejo', '30', '0.207', 'Fabricación Nacional'],
        ],
      },
      {
        title: 'Limpia Metal Spray Intra',
        headers: ['Acabado', 'Peso (Kg/unid)', 'Marca del Producto'],
        rows: [
          ['Químico para metal', '0.256', 'BRONCEX'],
          ['Químico para metal', '0.400', 'GENOX'],
          ['Químico para metal', '0.250', 'PROTEC'],
        ],
      },
      {
        title: 'Pasta Blanca Y Gris',
        headers: ['Aplicación a material de trabajo', 'Tipo', 'Peso (Kg/unid)', 'Marca del Producto'],
        rows: [
          ['Para Acero inoxidable', 'BLANCA', '0.635', 'Fabricación Nacional'],
          ['Para Acero inoxidable', 'GRIS', '0.74', 'Fabricación Nacional'],
        ],
      },
      {
        title: 'Thiner Acrilico',
        headers: ['Acabado', 'Contenido', 'Peso (Kg/unid)', 'Marca del Producto'],
        rows: [
          ['Para Metal', '1 GALON', '2.297', 'ANIPSA'],
        ],
      },
      {
        title: 'Soldinox Soldexa',
        headers: ['Aplicación a material de trabajo', 'Peso (Kilogramo)', 'Marca del Producto'],
        rows: [
          ['Para Acero inoxidable', '0.050', 'SOLDINOX'],
          ['Para Acero inoxidable', '0.100', 'SOLDINOX'],
          ['Para Acero inoxidable', '0.150', 'SOLDINOX'],
          ['Para Acero inoxidable', '0.200', 'SOLDINOX'],
          ['Para Acero inoxidable', '0.250', 'SOLDINOX'],
          ['Para Acero inoxidable', '0.300', 'SOLDINOX'],
          ['Para Acero inoxidable', '0.400', 'SOLDINOX'],
          ['Para Acero inoxidable', '0.500', 'SOLDINOX'],
          ['Para Acero inoxidable', '1.000', 'SOLDINOX'],
          ['Para Acero inoxidable', '1.500', 'SOLDINOX'],
          ['Para Acero inoxidable', '2.000', 'SOLDINOX'],
        ],
      },
      {
        title: 'Pulverizador',
        headers: ['Modelo', 'Peso (Kg/unid)', 'Marca del Producto'],
        rows: [
          ['Gatillo Pulverizador', '0.072', 'Importado'],
        ],
      },
      {
        title: 'Spry Tapa',
        headers: ['Modelo', 'Marca del Producto'],
        rows: [
          ['Atomizador Manual Celeste', 'Importado'],
          ['Atomizador Manual Blanco', 'Importado'],
        ],
      },
      {
        title: 'Brocha profesional',
        headers: ['Medidas (mm)', 'Peso (Kg/unid)', 'Marca del Producto'],
        rows: [
          ['60', '0.016', 'Luxor'],
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
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">DISCOS Y ARTÍCULOS DE LIMPIEZA</h2>
        <p className="text-sm text-gray-700 text-center mb-6">
          Explore nuestra gama de discos y artículos de limpieza, ideales para el tratamiento de superficies y mantenimiento. Encuentre las especificaciones de cada producto para una elección informada.
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
                  src={getLimpiezaImageForTitle(s.title)}
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
                        {Array.isArray(r) && r !== undefined
                          ? r.map((cell: any, ci: number) => (
                              <td key={ci} className="px-3 py-2">{cell}</td>
                            ))
                          : r && typeof r === 'object'
                            ? Object.values(r).map((cell: any, ci: number) => (
                                <td key={ci} className="px-3 py-2">{cell}</td>
                              ))
                            : s.headers.map((_, ci: number) => (
                                <td key={ci} className="px-3 py-2"></td>
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

export const PerforadoRoscaPage: React.FC = () => {
  const [query, setQuery] = useState('');

 const sections = useMemo(() => {
    return [
      {
        title: 'BROCA DE ALTA VELOCIDAD HSS CON 5% DE COBALTO',
        headers: ['Aplicación a Material de trabajo','Medidas (pulg.)','Peso (Kg/unid)','Marca del Producto'],
        rows: [
          ['Para Acero Inoxidable', '1/16"', '0.001', 'Ballack'],
          ['Para Acero Inoxidable', '3/32"', '0.002', 'Ballack'],
          ['Para Acero Inoxidable', '1/8"', '0.003', 'Ballack'],
          ['Para Acero Inoxidable', '9/64"', '0.004', 'Ballack'],
          ['Para Acero Inoxidable', '5/32"', '0.005', 'Ballack'],
          ['Para Acero Inoxidable', '3/16"', '0.009', 'Ballack'],
          ['Para Acero Inoxidable', '1/4"', '0.017', 'Ballack'],
          ['Para Acero Inoxidable', '5/16"', '0.031', 'Ballack'],
          ['Para Acero Inoxidable', '3/8"', '0.041', 'Ballack'],
          ['Para Acero Inoxidable', '1/2"', '0.102', 'Ballack'],
          ['Para Acero Inoxidable', '5/8"', '0.195', 'Ballack'],
          ['Para Acero Inoxidable', '3/4"', '0.277', 'Ballack'],
          ['Para Acero Inoxidable', '1"', '0.627', 'Ballack'],
        ],
      },
      {
        title: 'BROCA DE ACERO DE ALTA VELOCIDAD (HSS)',
        headers: ['Aplicación a Material de trabajo','Medidas (pulg.)','Peso (Kg/unid)','Marca del Producto'],
        rows: [
          ['Para Metal', '3/64"', '0.002', 'Bosch'],
          ['Para Metal', '3/32"', '0.002', 'Titan'],
          ['Para Metal', '1/8"', '0.003', 'Titan'],
          ['Para Metal', '9/64"', '0.004', 'Titan'],
          ['Para Metal', '5/32"', '0.005', 'Titan'],
          ['Para Metal', '3/16"', '0.008', 'Titan'],
          ['Para Metal', '7/32"', '0.013', 'Titan'],
          ['Para Metal', '1/4"', '0.015', 'Titan'],
          ['Para Metal', '5/16"', '0.032', 'Bosch'],
          ['Para Metal', '11/32"', '0.040', 'Bosch'],
          ['Para Metal', '3/8"', '0.051', 'Bosch'],
          ['Para Metal', '7/16"', '0.075', 'Bosch'],
          ['Para Metal', '1/2"', '0.105', 'Bosch'],
          ['Para Metal', '5/8"', '0.183', 'Bosch'],
          ['Para Metal', '3/4"', '0.290', 'Bosch'],
          ['Para Metal', '1"', '0.560', 'Bosch'],
        ],
      },
      {
        title: 'BROCA CON PUNTA DE DIAMANTE',
        headers: ['Aplicación a Material de trabajo','Medidas (pulg.)','Peso (Kg/unid)','Marca del Producto'],
        rows: [
          ['Para Concreto','1/4"','0.025','SCHUBERT'],
          ['Para Concreto','5/16"','0.035','GERMANY'],
          ['Para Concreto','3/8"','0.041','SCHUBERT'],
          ['Para Concreto','1/2"','0.078','SCHUBERT'],
        ],
      },
      {
        title: 'SIERRA COPA BIMETAL SANDFLEX',
        headers: ['Aplicación a Material de trabajo','Medidas (Pulg)','Medidas (mm)','Peso (Kg/unid)','Marca del Producto'],
        rows: [
          ['Para Metal', '5/8"', '15.88', '0.030', 'Bahco'],
          ['Para Metal', '3/4"', '19.05', '0.040', 'Bahco'],
          ['Para Metal', '7/8"', '22.23', '0.050', 'Bahco'],
          ['Para Metal', '1"', '25.40', '0.070', 'Bahco'],
          ['Para Metal', '1 1/4"', '31.75', '0.090', 'Bahco'],
          ['Para Metal', '1 1/2"', '38.10', '0.110', 'Bahco'],
          ['Para Metal', '2"', '50.80', '0.160', 'Bahco'],
          ['Para Metal', '2 1/2"', '63.50', '0.220', 'Bahco'],
          ['Para Metal', '3"', '76.20', '0.280', 'Bahco'],
          ['Para Metal', '3 1/2"', '88.90', '0.340', 'Bahco'],
          ['Para Metal', '4"', '101.60', '0.415', 'Bahco'],
          ['Para Metal', '4 1/2"', '114.30', '0.499', 'Bahco'],
        ],
      },
      {
        title: 'FRESA ROTATIVA',
        headers: ['Aplicación a Material de trabajo','Medidas (mm)','Peso (Kg/unid)','Marca del Producto'],
        rows: [
          ['Para Metal','6 x 18','0.039','Carbide Burr'],
          ['Para Metal','10 x 20','0.046','Carbide Burr'],
          ['Para Metal','12 x 25','0.049','Makita'],
          ['Para Metal','16 x 14','0.065','Makita'],
        ],
      },
      {
        title: 'MACHO CON ROSCA UNC DE ACERO DE ALTA VELOCIDAD (MANUAL)',
        headers: ['Aplicación a Material de trabajo','Medidas (pulg.)','Hilo','Peso (Kg/unid)','Marca del Producto'],
        rows: [
          ['Para Metal', '3/16"', '24H', '0.008', 'Importado'],
          ['Para Metal', '1/4"',  '20H', '0.020', 'Importado'],
          ['Para Metal', '5/16"', '18H', '0.030', 'Importado'], 
          ['Para Metal', '3/8"',  '16H', '0.045', 'Importado'],
          ['Para Metal', '1/2"',  '13H', '0.085', 'Importado'],
        ],
      },
      {
        title: 'PUNTAS MONTADAS',
        headers: ['Aplicación a Material de trabajo','Medida','Peso (Kg/unid)','Marca del Producto'],
        rows: [
          ['Para Metal', 'A 1', '0.050', 'Norton'],
          ['Para Metal', 'A 2', '0.033', 'Norton'],
          ['Para Metal', 'A 3', '0.045', 'Norton'],
          ['Para Metal', 'A 4', '0.004', 'Norton'],
          ['Para Metal', 'A 5', '0.028', 'Norton'],
          ['Para Metal', 'A 6', '0.015', 'Norton'],
          ['Para Metal', 'A 11', '0.043', 'Norton'],
          ['Para Metal', 'A 13', '0.012', 'Norton'],
          ['Para Metal', 'A 14', '0.009', 'Norton'],
          ['Para Metal', 'A 15', '0.012', 'Norton'],
          ['Para Metal', 'A 21', '0.042', 'Norton'],
          ['Para Metal', 'A 23', '0.026', 'Norton'],
          ['Para Metal', 'A 24', '0.012', 'Norton'],
          ['Para Metal', 'A 25', '0.034', 'Norton'],
          ['Para Metal', 'A 26', '0.018', 'Norton'],
          ['Para Metal', 'A 31', '0.022', 'Norton'],
          ['Para Metal', 'A 32', '0.018', 'Norton'],
          ['Para Metal', 'A 36', '0.037', 'Norton'],
          ['Para Metal', 'A 38', '0.025', 'Norton'],
          ['Para Metal', 'B 53', '0.005', 'Norton'],
          ['Para Metal', 'B 134', '0.003', 'Norton'],
          ['Para Metal', 'C 179', '0.010', 'Norton'],
          ['Para Metal', 'C 220', '0.037', 'Norton'],
          ['Para Metal', 'C 222', '0.024', 'Norton'],
          ['Para Metal', 'C 238', '0.108', 'Norton'],
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
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">ARTÍCULOS PERFORADO, CORTE Y ROSCA</h2>
        <p className="text-sm text-gray-700 text-center mb-6">
          Aquí agrupamos brocas, sierras, fresas, machos y puntas montadas para perforado, corte y rosca; medidas, pesos y marcas para una selección técnica eficiente.
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
                <h3 className="text-xl font-bold text-blue-600">{s.title}</h3>
              </div>

              <div className="text-center mb-2 h-28 flex items-center justify-center">
                <img
                  src={getPerforadoImageForTitle(s.title)}
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

export const AluminioAntorchaPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    return [
      {
        title: 'Bridas De Aluminio',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (Kg/unid)', 'Marca'],
        rows: [
          ['1/2"', '12.70', '0.013', 'Fabricacion Nacional'],
          ['5/8"', '15.88', '0.014', 'Fabricacion Nacional'],
          ['3/4"', '19.05', '0.016', 'Fabricacion Nacional'],
          ['7/8"', '22.23', '0.018', 'Fabricacion Nacional'],
          ['1"', '25.40', '0.021', 'Fabricacion Nacional'],
          ['1 1/4"', '31.75', '0.029', 'Fabricacion Nacional'],
          ['1 1/2"', '38.10', '0.073', 'Fabricacion Nacional'],
          ['2"', '50.80', '0.110', 'Fabricacion Nacional'],
        ],
      },
      {
        title: 'Bridas Abiertas De Aluminio',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (Kg/unid)', 'Marca'],
        rows: [
          ['1"', '25.40', '0.018', 'Fabricacion Nacional'],
          ['1 1/4"', '31.75', '0.034', 'Fabricacion Nacional'],
        ],
      },
      {
        title: 'Codo De Aluminio',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (Kg/unid)', 'Marca'],
        rows: [
          ['3/4"', '19.05', '0.056', 'Fabricacion Nacional'],
          ['7/8"', '22.23', '0.058', 'Fabricacion Nacional'],
          ['1"', '25.40', '0.073', 'Fabricacion Nacional'],
          ['1 1/4"', '31.75', '0.111', 'Fabricacion Nacional'],
          ['1 1/2"', '38.10', '0.127', 'Fabricacion Nacional'],
          ['2"', '50.80', '0.195', 'Fabricacion Nacional'],
        ],
      },
      {
        title: 'Pasante De Aluminio',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (Kg/unid)', 'Marca'],
        rows: [
          ['1/2"', '12.70', '0.010', 'Fabricacion Nacional'],
          ['5/8"', '15.88', '0.016', 'Fabricacion Nacional'],
          ['3/4"', '19.05', '0.021', 'Fabricacion Nacional'],
          ['7/8"', '22.23', '0.023', 'Fabricacion Nacional'],
          ['1"', '25.40', '0.040', 'Fabricacion Nacional'],
          ['1 1/4"', '31.75', '0.093', 'Fabricacion Nacional'],
          ['1 1/2"', '38.10', '0.109', 'Fabricacion Nacional'],
          ['2"', '50.80', '0.165', 'Fabricacion Nacional'],
        ],
      },
      {
        title: 'Terminal De Aluminio',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (Kg/unid)', 'Marca'],
        rows: [
          ['1/2"', '12.70', '0.012', 'Fabricacion Nacional'],
          ['5/8"', '15.88', '0.022', 'Fabricacion Nacional'],
          ['3/4"', '19.05', '0.025', 'Fabricacion Nacional'],
          ['7/8"', '22.23', '0.029', 'Fabricacion Nacional'],
          ['1"', '25.40', '0.039', 'Fabricacion Nacional'],
          ['1 1/4"', '31.75', '0.103', 'Fabricacion Nacional'],
          ['1 1/2"', '38.10', '0.138', 'Fabricacion Nacional'],
           ['2"', '50.80', '0.165', 'Fabricacion Nacional'],
        ],
      },
      {
        title: 'Tee De Aluminio',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (Kg/unid)', 'Marca'],
        rows: [
          ['3/4"', '19.05', '0.032', 'Fabricacion Nacional'],
          ['7/8"', '22.23', '0.050', 'Fabricacion Nacional'],
          ['1"', '25.40', '0.056', 'Fabricacion Nacional'],
          ['1 1/4"', '31.75', '0.114', 'Fabricacion Nacional'],
          ['1 1/2"', '38.10', '0.144', 'Fabricacion Nacional'],
          ['2"', '50.80', '0.245', 'Fabricacion Nacional'],
        ],
      },
      {
        title: 'Tricodo De Aluminio',
        headers: ['Diámetro (pulg)', 'Diámetro (mm)', 'Peso (Kg/unid)', 'Marca'],
        rows: [
          ['3/4"', '19.05', '0.068', 'Fabricacion Nacional'],
          ['7/8"', '22.23', '0.142', 'Fabricacion Nacional'],
          ['1"', '25.40', '0.101', 'Fabricacion Nacional'],
          ['1 1/4"', '31.75', '0.119', 'Fabricacion Nacional'],
          ['1 1/2"', '38.10', '0.155', 'Fabricacion Nacional'],
          ['2"', '50.80', '0.230', 'Fabricacion Nacional'],
        ],
      },
      {
        title: 'Tapa Repujada De Aluminio',
        headers: [, 'Diámetro (mm)', 'Marca'],
        rows: [
          ['492', 'Fabricacion Nacional'],
          ['585', 'Fabricacion Nacional'],
          ['720', 'Fabricacion Nacional'],
          ['950', 'Fabricacion Nacional'],
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
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">ACCESORIOS DE ALUMINIO</h2>
        <p className="text-sm text-gray-700 text-center mb-6">
          En esta sección encontrarás las especificaciones técnicas de nuestros accesorios de aluminio , diseñados para aplicaciones industriales y decorativas.
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
                  src={getAluminioImageForTitle(s.title)}
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
                        {r.map((cell, ci) => (
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

// Placeholder image component that shows a message when image fails to load
const PlaceholderImage: React.FC<{ src: string; alt?: string }> = ({ src, alt = 'Imagen no cargada' }) => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">{alt}</div>
  ) : (
    <img src={src} alt={alt} className="w-24 h-auto" onError={() => setFailed(true)} />
  );
};

export const DecorativosPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    return [
      {
        title: 'Base para Canopla',
        headers: ['Acabado', 'Diámetro (pulg)', 'Diámetro (mm)', 'Espesor (mm)', 'Para Tubo'],
        rows: [
          ['Acero inoxidable industrial', '2"', '50.80', '3.0', '1/2"'],
          ['Acero inoxidable industrial', '2"', '50.80', '3.0', '5/8"'],
          ['Acero inoxidable industrial', '2"', '50.80', '3.0', '3/4"'],
          ['Acero inoxidable industrial', '2"', '50.80', '3.0', '7/8"'],
          ['Acero inoxidable industrial', '2 1/2"', '63.50', '3.0', '1"'],
          ['Acero inoxidable industrial', '2 3/4"', '69.85', '3.0', '1 1/4"'],
          ['Acero inoxidable industrial', '3"', '76.20', '3.0', '1 1/2"'],
          ['Acero inoxidable industrial', '3 1/2"', '88.90', '3.0', '2"'],
          ['Acero inoxidable industrial', '4"', '101.60', '3.0', '2 1/2"'],
          ['Acero inoxidable industrial', '4 1/2"', '114.30', '3.0', '3"'],
          ['Acero inoxidable industrial', '5 1/2"', '139.70', '3.0', '4"'],
          
          ['Acero al carbono LAC', '2"', '50.80', '3.0', '1/2"'],
          ['Acero al carbono LAC', '2"', '50.80', '3.0', '5/8"'],
          ['Acero al carbono LAC', '2"', '50.80', '3.0', '3/4"'],
          ['Acero al carbono LAC', '2"', '50.80', '3.0', '3/4"'],
          ['Acero al carbono LAC', '2"', '50.80', '3.0', '7/8"'],
          ['Acero al carbono LAC', '2 1/2"', '63.50', '3.0', '1"'],
          ['Acero al carbono LAC', '2 3/4"', '69.85', '3.0', '1 1/4"'],
          ['Acero al carbono LAC', '3"', '76.20', '3.0', '1 1/2"'],
          ['Acero al carbono LAC', '3 1/2"', '88.90', '3.0', '2"'],
          ['Acero al carbono LAC', '4"', '101.60', '3.0', '2 1/2"'],
          ['Acero al carbono LAC', '4 1/2"', '114.30', '3.0', '3"'],
          ['Acero al carbono LAC', '5 1/2"', '139.70', '3.0', '4"'],
        ],
      },
      {
        title: 'Base para Canopla Cuadrada',
        headers: ['Calidad', 'Acabado', 'Lado (pulg)', 'Lado (mm)', 'Espesor (mm)', 'Para Tubo'],
        rows: [
          ['C-304', 'Acero inoxidable', '2 1/8" x 2 1/8"', '53.98 x 53.98', '3.0', '1/2"'],
          ['C-304', 'Acero inoxidable', '2 1/8" x 2 1/8"', '50.80 x 50.80', '3.0', '3/4"'],
          ['C-304', 'Acero inoxidable', '2 1/2" x 2 1/2"', '63.50 x 63.50', '3.0', '1"'],
          ['C-304', 'Acero inoxidable', '2 3/4" x 2 3/4"', '69.85 x 69.85', '3.0', '1 1/2"'],
          
          
          ['C-304', 'Acero inoxidable', '3 1/4" x 3 1/4"', '82.55 x 82.55', '2.5', '2"'],
          ['C-304', 'Acero inoxidable', '4" x 4"', '101.60 x 101.60', '3.0', '3"'],
          ['C-304', 'Acero inoxidable', '5" x 5"', '127.00 x 127.00', '3.0', '4"'],
        ],
      },
      {
        title: 'Bastón para Cortina (Abierto y cerrado)',
        headers: ['Acabado','Longitud (pulg)','Longitud (mm)','Espesor (pulg)','Para Tubo','Peso (kg/unid)'],
        rows: [
          ['Acero inoxidable','3/8"','1106','3/8','1"','0.515'],
          ['Acero inoxidable','3/8"','1106','3/8','1 1/4"','0.433'],
        ],
      },
      {
        title: 'Bisagras',
        headers: ['Calidad','Acabado','Dimension Nominal (largo x ancho) (pulg)','Largo de hoja (mm)','Espesor (mm)','Peso (kg/unid)','Marca'],
        rows: [
          // Calidad C-20
          ['C-201', 'Acero inoxidable', '2" x 2"', '50.80', '2.0', '0.0290', 'Eurolock,s'],
          ['C-201', 'Acero inoxidable', '2 1/2" x 2 1/2"', '63.50', '2.0', '0.0420', 'Eurolock,s'],
          ['C-201', 'Acero inoxidable', '3" x 3"', '76.20', '2.0', '0.1290', 'Eurolock,s'],
          ['C-201', 'Acero inoxidable', '3 1/2" x 3 1/2"', '88.90', '2.0', '0.1680', 'Eurolock,s'],
          ['C-201', 'Acero inoxidable', '4" x 3"', '101.60', '2.0', '0.2000', 'Eurolock,s'],

          // Calidad C-304
          ['C-304', 'Acero inoxidable', '3" x 3"', '76.20', '2.0', '0.1280', 'Firenze'],
          ['C-304', 'Acero inoxidable', '3 1/2" x 3 1/2"', '88.90', '2.0', '0.1690', 'Firenze'],
          ['C-304', 'Acero inoxidable', '4" x 3"', '101.60', '2.0', '0.1700', 'Firenze'],
          ['C-304', 'Acero inoxidable', '4" x 3"', '101.60', '2.5', '0.2080', 'Firenze'],
        ],
      },
      {
        title: 'Brida Abierta',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable','1"','25.40','0.039','Importado'],
          ['C-304','Acero inoxidable','1 1/4"','31.75','0.042','Importado'],
        ],
      },
      {
        title: 'Canopla Cuadrada Pestaña',
      headers: ['Calidad', 'Acabado', 'Lado (pulg)', 'Lado (mm)', 'Peso (kg/unid)', 'Marca'],
      rows: [
      ['C-304', 'Acero inoxidable', '3/4" x 3/4"', '19.05 x 19.05', '0.0640', 'Importado'],
      ['C-304', 'Acero inoxidable', '1" x 1"', '25.40 x 25.40', '0.0640', 'Importado'],
      ['C-304', 'Acero inoxidable', '1 1/4" x 1 1/4"', '31.75 x 31.75', '0.0640', 'Importado'],
      ['C-304', 'Acero inoxidable', '1 1/2" x 1 1/2"', '38.10 x 38.10', '0.0610', 'Importado'],
      ['C-304', 'Acero inoxidable', '2" x 2"', '50.80 x 50.80', '0.1040', 'Importado'],
    ],
      },
      {
        title: 'CANOPLA RECTANGULAR BRILLANTE',
        headers: ['Calidad', 'Acabado', 'Dimensión Nominal (Largo x Ancho)', 'Peso (kg/unid)', 'Marca'],
        rows: [
            ['C-304', 'Acero inoxidable', '10 x 20 mm', '0.038', 'Importado'],
            ['C-304', 'Acero inoxidable', '10 x 25 mm', '0.042', 'Importado'],
            ['C-304', 'Acero inoxidable', '10 x 30 mm', '0.048', 'Importado'],
            ['C-304', 'Acero inoxidable', '10 x 40 mm', '0.052', 'Importado'],
            ['C-304', 'Acero inoxidable', '10 x 50 mm', '0.058', 'Importado'],
            ['C-304', 'Acero inoxidable', '15 x 30 mm', '0.055', 'Importado'],
            ['C-304', 'Acero inoxidable', '20 x 40 mm', '0.061', 'Importado'],
            ['C-304', 'Acero inoxidable', '25 x 50 mm', '0.103', 'Importado'],
            ['C-304', 'Acero inoxidable', '30 x 60 mm', '0.125', 'Importado'],
            ['C-304', 'Acero inoxidable', '40 x 80 mm', '0.158', 'Importado'],
            ['C-304', 'Acero inoxidable', '50 x 100 mm', '0.210', 'Importado'],
        ],
      },
      {
        title: 'Canopla Redonda Con Cuello',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-201','Acero inoxidable','1 1/2"','38.10','0.0270','Importado'],
          ['C-201','Acero inoxidable','2"','50.80','0.0330','Importado'],
        ],
      },
      {
        title: 'Canopla Redonda Brillante',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','1/2"','12.70','0.0120','Importado'],
          ['C-304','Acero inoxidable brillante','5/8"','15.88','0.0120','Importado'],
          ['C-304','Acero inoxidable brillante','3/4"','19.05','0.0110','Importado'],
          ['C-304','Acero inoxidable brillante','7/8"','22.23','0.0160','Importado'],
          ['C-304','Acero inoxidable brillante','1"','25.40','0.0170','Importado'],
          ['C-304','Acero inoxidable brillante','1 1/4"','31.75','0.0230','Importado'],
          ['C-304','Acero inoxidable brillante','1 1/2"','38.10','0.0350','Importado'],
          ['C-304','Acero inoxidable brillante','2"','50.80','0.0340','Importado'],
          ['C-304','Acero inoxidable brillante','2 1/2"','63.50','0.0310','Importado'],
          ['C-304','Acero inoxidable brillante','3"','76.20','0.0340','Importado'],
          ['C-304','Acero inoxidable brillante','4"','101.60','0.0420','Importado'],
        ],
      },
      {
        title: 'Cerrojo (Picaporte)',
        headers: ['Calidad','Acabado','Medida / Referencia','Peso (kg/unid)','Marca'],
        rows: [
          ['C-201','Acero inoxidable ','2" x 2" (PAR)','0.120','Importado'],
          ['C-201', 'Acero inoxidable', '3" (PAR)', '0.185', 'Importado'],
          ['C-201', 'Acero inoxidable', '4"', '0.145', 'Importado'],
          
        ],
      },
      {
        title: 'Codo Brillante',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-201','Acero inoxidable','1/2"','12.70','0.017','Importado'],
          ['C-201','Acero inoxidable','5/8"','15.88','0.023','Importado'],
          ['C-201','Acero inoxidable','3/4"','19.05','0.024','Importado'],
          ['C-201','Acero inoxidable','7/8"','22.23','0.032','Importado'],
          ['C-201','Acero inoxidable','1"','25.40','0.052','Importado'],
          ['C-201','Acero inoxidable','1 1/4"','31.75','0.062','Importado'],
          ['C-201','Acero inoxidable','1 1/2"','38.10','0.116','Importado'],
          ['C-201','Acero inoxidable','2"','50.80','0.210','Importado'],
          ['C-304','Acero inoxidable','1/2"','12.70','0.012','Importado'],
          ['C-304','Acero inoxidable','5/8"','15.88','0.015','Importado'],
          ['C-304','Acero inoxidable','3/4"','19.05','0.024','Importado'],
          ['C-304','Acero inoxidable','7/8"','22.23','0.032','Importado'],
          ['C-304','Acero inoxidable','1"','25.40','0.048','Importado'],
          ['C-304','Acero inoxidable','1 1/4"','31.75','0.084','Importado'],
          ['C-304','Acero inoxidable','1 1/2"','38.10','0.118','Importado'],
          ['C-304','Acero inoxidable','2"','50.80','0.210','Importado'],
          ['C-304','Acero inoxidable','2 1/2"','63.50','0.316','Importado'],
          ['C-304','Acero inoxidable','3"','76.20','0.376','Importado'],
          ['C-304','Acero inoxidable','4"','101.60','0.620','Importado'],
        ],
      },
      {
        title: 'Esferas De Baluastre Decorativo',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Marca'],
        rows: [
          ['C-304','Acero inoxidable','2 1/2" x 1 1/2"','Importado'],
          ['C-304','Acero inoxidable','3" x 1 1/2"','Importado'],
          ['C-304','Acero inoxidable','2 1/2" x 2"','Importado'],
          ['C-304','Acero inoxidable','3" x 2"','Importado'],
        ],
      },
      {
        title: 'Gancho Cromado',
        headers: ['Acabado','Diámetro (pulg)','Longitud (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Cromado', '1/4"', '50.00', '0.016', 'importado'],
          ['Cromado', '1/4"', '80.00', '0.026', 'importado'],
          ['Cromado', '1/4"', '100.00', '0.033', 'importado'],
          ['Cromado', '1/4"', '150.00', '0.049', 'importado'],
          ['Cromado', '1/4"', '200.00', '0.066', 'importado'],
          ['Cromado', '1/4"', '250.00', '0.082', 'importado'],
          ['Cromado', '1/4"', '300.00', '0.098', 'importado'],
          ['Cromado', '1/4"', '350.00', '0.115', 'importado'],
        ],
      },
      {
        title: 'Jalador Modelo Agatha, Serie Liviana',
        headers: ['Calidad', 'Acabado','Longitud (mm)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-201', 'Acero inoxidable satinado','96','9.52','0.035','Importado'],
          ['C-304', 'Acero inoxidable satinado','128','9.52','0.034','Importado'],
          ['C-304', 'Acero inoxidable satinado','160','9.52','0.046','Importado'],
          ['C-304', 'Acero inoxidable satinado','192','9.52','0.046','Importado'],
        ],
      },
      {
        title: 'MANILLÓN AGATHA',
        headers: ['Acabado', 'Diámetro (pulg)', 'Longitud entre patas (mm)', 'Longitud total (mm)', 'Peso (kg/unid)', 'Marca'],
        rows: [
          ['Acero inoxidable', '3/4"', '300', '500', '0.250', 'Importado'],
          ['Acero inoxidable', '3/4"', '400', '600', '0.310', 'Importado'],
          ['Acero inoxidable', '3/4"', '500', '700', '0.380', 'Importado'],
        ],
      },
      {
        title: 'Manillón Deane',
        headers: ['Acabado','Diámetro (mm)','Longitud entre patas (mm)','Longitud total (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','32','400.00','600','0.946','Importado'],
        ],
      },
      {
        title: 'Manillón Soporte para Baño',
        headers: ['Acabado','Diámetro (mm)','Longitud (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','32','500','0.629','Importado'],
        ],
      },
      {
        title: 'Manillón Velko',
        headers: ['Acabado','Diámetro (pulg)','Longitud (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','3/4"','320','0.242','Importado'],
        ],
      },
      {
        title: 'Pasante',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable','1"','25.40','0.053','Importado'],
          ['Acero inoxidable','1 1/4"','31.75','0.063','Importado'],
          ['Acero inoxidable','1 1/2"','38.10','0.630','Importado'],
        ],
      },
      {
        title: 'Perilla Alfajor',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1 1/4"','31.75','0.108','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla De estaca ',
        headers: ['Acabado','PT','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','PT-12','1"','25.40','0.048','Fabricacion Nacional'],
          ['Acero inoxidable brillante','PT-12','1 1/4"','31.75','0.053','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla Cubo ',
        headers: ['Calidad','Acabado','PT','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','PT-14','1"','25.40','0.139','Fabricacion Nacional'],
          ['C-304','Acero inoxidable brillante','PT-14','1 1/4"','31.75','0.147','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla Huevo ',
        headers: ['Calidad','Acabado','PT','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','PT-11','1"','25.40','0.060','Fabricacion Nacional'],
          ['C-304','Acero inoxidable brillante','PT-11','1 1/4"','31.75','0.117','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla Pancito',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','1"','25.40','0.056','Fabricacion Nacional'],
          ['C-304','Acero inoxidable brillante','1 1/4"','31.75','0.057','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla Platillo ',
        headers: ['Calidad','Acabado','PT','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','PT-16','1"','25.40','0.058','Fabricacion Nacional'],
          ['C-304','Acero inoxidable brillante','PT-16','1 1/4"','31.75','0.052','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla Triángulo',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','1"','25.40','0.061','Fabricacion Nacional'],
          ['C-304','Acero inoxidable brillante','1 1/4"','31.75','0.071','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla Moneda',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1"','25.40','0.068','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla Moneda Gruesa',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1"','25.40','0.059','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Perilla Sombrerito',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1 1/4"','31.75','0.015','Fabricacion Nacional'],
        ],
      },
      {
        title: 'Pasante Para Tubo',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1/2"','12.70','0.039','Importado'],
        ],
      },
      {
        title: 'Soporte De Pasamanos Colgante',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1/2"','12.70','0.150','Importado'],
          ['Acero inoxidable brillante','2"','50.80','0.153','Importado'],
        ],
      },
      {
        title: 'Soporte De Pared Con Canopla',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1"','25.40','0.113','Fabricación Nacional'],
          ['Acero inoxidable brillante','1/4"','6.35','0.114','Fabricación Nacional'],
        ],
      },
      {
        title: 'Soporte De Pared Doble Con Canopla',
        headers: ['Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1"','25.40','0.213','Fabricación Nacional'],
          ['Acero inoxidable brillante','1 1/4"','32','0.250','Fabricación Nacional'],
        ],
      },
      {
        title: 'Soporte De Pared de Platina',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable','1"','25.40','0.067','Fabricación Nacional'],
          ['C-304','Acero inoxidable','1/4"','6.35','0.083','Fabricación Nacional'],
        ],
      },
      {
        title: 'Soporte De Repisa Visani',
        headers: ['Calidad','Acabado','Diámetro D (mm)','Longitud L (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-201','Acero inoxidable satinado','25','25','0.034','Importado'],
          ['C-201','Acero inoxidable satinado','25','30','0.046','Importado'],
          ['C-201','Acero inoxidable satinado','25','40','0.035','Importado'],
          ['C-201','Acero inoxidable satinado','25','60','0.047','Importado'],
          ['C-201','Acero inoxidable satinado','25','80','0.048','Importado'],
          ['C-201','Acero inoxidable satinado','25','100','0.051','Importado'],
          ['C-201','Acero inoxidable satinado','25','200','0.143','Importado'],
          ['C-201','Acero inoxidable satinado','30','30','0.047','Importado'],
          ['C-201','Acero inoxidable satinado','30','40','0.050','Importado'],
        ],
      },
      {
        title: 'Soporte De Techo Doble',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-201','Acero inoxidable brillante','1"','25.40','0.111','Importado'],
          ['C-201','Acero inoxidable brillante','1 1/4"','31.75','0.199','Importado'],
        ],
      },
      {
        title: 'Soporte De Techo Platina',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Diámetro (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-201','Acero inoxidable brillante','1"','25.40','0.070','Importado'],
          ['C-201','Acero inoxidable brillante','1 1/4"','31.75','0.075','Importado'],
        ],
      },
      {
        title: 'Soporte De Vidrio Con Hueco',
        headers: ['Acabado','Para Tubo','Longitud L (mm)','Espesor para vidrio (mm)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1 1/2"','43.00','8.00','0.117','Importado'],
          ['Acero inoxidable brillante','2"','43.00','8.00','0.097','Importado'],
        ],
      },
      {
        title: 'Soporte Para Vidrio, Modelo Pipa',
        headers: ['Calidad', 'Acabado', 'Medida (pulg)', 'Medida (mm)', 'Peso (kg/unid)', 'Marca'],
        rows: [
          ['C-304', 'Acero inoxidable brillante', '1/2" x 1"', '12.70 x 25.40', '0.085', 'Importado'],
          ['C-304', 'Acero inoxidable brillante', '1/2" x 1 1/4"', '12.70 x 31.75', '0.095', 'Importado'],
          ['C-304', 'Acero inoxidable brillante', '5/8" x 1"', '15.88 x 25.40', '0.110', 'Importado'],
          ['C-304', 'Acero inoxidable brillante', '5/8" x 1 1/4"', '15.88 x 31.75', '0.125', 'Importado'],
        ],
      },
      {
        title: 'Tapa Bola',
        headers: ['Acabado','Diámetro (pulg)','Peso (kg/unid)','Marca'],
        rows: [
          ['Acero inoxidable brillante','1/2"','0.010','Importado'],
          ['Acero inoxidable brillante','5/8"','0.010','Importado'],
        ],
      },
      {
        title: 'Tapa Bombeada Brillante',
        headers: ['Calidad','Diámetro (pulg)','Diámetro (mm)','Peso (Kg/unid)','Marca'],
        rows: [
          // Calidad C-201
          ['C-201', '1 1/2"', '38.10', '0.022', 'importado'],
          ['C-201', '2"', '50.80', '0.034', 'importado'],

          // Calidad C-304
          ['C-304', '1/2"', '12.70', '0.005', 'Importado'],
          ['C-304', '5/8"', '15.88', '0.007', 'Importado'],
          ['C-304', '3/4"', '19.05', '0.009', 'Importado'],
          ['C-304', '7/8"', '22.23', '0.011', 'Importado'],
          ['C-304', '1"', '25.40', '0.013', 'Importado'],
          ['C-304', '1 1/4"', '31.75', '0.017', 'Importado'],
          ['C-304', '1 1/2"', '38.10', '0.021', 'Importado'],
          ['C-304', '2"', '50.80', '0.034', 'Importado'],
          ['C-304', '3"', '76.20', '0.075', 'Importado'],
          ['C-304', '4"', '101.60', '0.135', 'Importado'],
        ],
      },
      {
        title: 'Tapa Bombeada Brillante Con Hueco',
        headers: ['Calidad','Diámetro (pulg)','Peso (Kg/unid)','Marca'],
        rows: [
          // Calidad C-201
          ['C-201', '1 1/2" x 1/2"', '0.022', 'Importado'],
          ['C-201', '1 1/2" x 5/8"', '0.022', 'Importado'],
          ['C-201', '2" x 1/2"', '0.034', 'Importado'],
          ['C-201', '2" x 5/8"', '0.034', 'Importado'],

          // Calidad C-304
          ['C-304', '1 1/4" x 1/2"', '0.018', 'Importado'],
          ['C-304', '1 1/4" x 5/8"', '0.018', 'Importado'],
          ['C-304', '1 1/2" x 1/2"', '0.022', 'Importado'],
          ['C-304', '1 1/2" x 5/8"', '0.022', 'Importado'],
          ['C-304', '2" x 1/2"', '0.035', 'Importado'],
          ['C-304', '2" x 5/8"', '0.034', 'Importado'],

        ],
      },
      {
        title: 'Tapa Brida',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','1"','Importado'],
        ],
      },
      {
        title: 'TAPA PARA EMBONAR',
        headers: ['Calidad', 'Acabado', 'Diámetro (pulg)', 'Peso (kg/unid)', 'Marca'],
        rows: [
          ['C-304', 'Acero inoxidable brillante', '1/2"', '0.002', 'Fabricación Nacional'],
          ['C-304', 'Acero inoxidable brillante', '5/8"', '0.003', 'Fabricación Nacional'],
          ['C-304', 'Acero inoxidable brillante', '3/4"', '0.004', 'Fabricación Nacional'],
          ['C-304', 'Acero inoxidable brillante', '7/8"', '0.004', 'Fabricación Nacional'],
          ['C-304', 'Acero inoxidable brillante', '1"', '0.005', 'Fabricación Nacional'],
          ['C-304', 'Acero inoxidable brillante', '1 1/4"', '0.006', 'Fabricación Nacional'],
          ['C-304', 'Acero inoxidable brillante', '1 1/2"', '0.010', 'Fabricación Nacional'],
          ['C-304', 'Acero inoxidable brillante', '2"', '0.018', 'Fabricación Nacional'],
        ],
      },
      {
        title: 'Terminal',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','1"','0.058','Importado'],
          ['C-304','Acero inoxidable brillante','1 1/4"','0.072','Importado'],
          ['C-304','Acero inoxidable brillante','1 1/2"','0.810','Importado'],
        ],
      },
      {
        title: 'Terminal Cuadrado',
        headers: ['Calidad','Acabado','Diámetro (pulg)','Peso (kg/unid)','Marca'],
        rows: [
          ['C-304','Acero inoxidable brillante','1"','0.169','Importado'],
        ],
      },
    ];
  }, []);

  // Helpers to procesar tablas de decorativos
  const ensureQuote = (v: any) => {
    const s = String(v || '').trim();
    if (!s) return s;
    if (/"$/.test(s)) return s;
    if (/^[0-9]+(?:\s+[0-9]+\/[0-9]+)?$/.test(s)) return `${s}"`;
    return s;
  };

  const parsePulg = (s: string): number => {
    const t = String(s || '').replace(/\"/g, '"').replace(/"/g, '').trim();
    if (!t) return Number.POSITIVE_INFINITY;
    const parts = t.split(' ');
    let total = 0;
    for (const p of parts) {
      if (/^\d+$/.test(p)) { total += parseFloat(p); continue; }
      const m = p.match(/^(\d+)\/(\d+)$/);
      if (m) {
        const num = parseFloat(m[1]);
        const den = parseFloat(m[2]);
        if (den) total += num / den;
      }
    }
    return total || Number.POSITIVE_INFINITY;
  };

  const normalizeHeaders = (headers: string[]) => {
    const hs = headers.map(h => h);
    const idxLp = hs.findIndex(h => /Longitud\s*\(\s*pulg/i.test(h));
    const idxLm = hs.findIndex(h => /Longitud\s*\(\s*mm/i.test(h));
    if (idxLp !== -1) hs[idxLp] = 'Diámetro (pulg)';
    if (idxLm !== -1) hs[idxLm] = 'Longitud (mm)';
    const idxAlt = hs.findIndex(h => /Altura/i.test(h));
    if (idxAlt !== -1) hs[idxAlt] = 'Longitud';
    return hs;
  };

  const cleanCell = (val: any, header: string) => {
    if (val === null || val === undefined) return val;
    let s = String(val).trim();
    if (!s) return s;
    if (/[a-zA-Z]/.test(s) || s.includes('—') || s.includes('---') || s.includes('"')) return s;
    const isPeso = /Peso/i.test(header);
    const isDiametro = /Diámetro/i.test(header) || /Diametro/i.test(header);
    if (isPeso || isDiametro) return s;
    const n = Number(s.replace(',', '.'));
    if (!isNaN(n)) return String(Math.trunc(n));
    return s;
  };

// Helpers
    const toNumber = (v: any): number | null => {
      const s = String(v ?? '').trim();
      if (!s || s === '---' || s === '—') return null;
      const n = Number(s.replace(',', '.'));
      return isNaN(n) ? null : n;
    };
    const simplifyToFraction = (x: number) => {
      // Aproxima a fracciones con denominadores comunes (2,4,8)
      const denoms = [2, 4, 8, 16, 32];
      let best = { err: Infinity, n: 0, d: 1 };
      for (const d of denoms) {
        const n = Math.round(x * d);
        const err = Math.abs(x - n / d);
        if (err < best.err) best = { err, n, d };
      }
      if (best.n === 0) return '';
      if (best.n === best.d) return '1';
      
      const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
      const common = gcd(best.n, best.d);
      const simplifiedN = best.n / common;
      const simplifiedD = best.d / common;

      if (simplifiedD === 1) return `${simplifiedN}`;
      return `${simplifiedN}/${simplifiedD}`;
    };
    const mmToPulg = (mm: number): string => {
      if (mm === 0) return '0"';
      const inches = mm / 25.4;
      const whole = Math.floor(inches + 1e-6);
      const frac = inches - whole;
      let fracStr = '';
      if (frac > 1e-3) {
        fracStr = simplifyToFraction(frac);
      }
      const main = whole > 0 ? (fracStr ? `${whole} ${fracStr}` : `${whole}`) : (fracStr || '');
      return main ? `${main}"` : '';
    };
    
  const reorderPTTable = (headers: string[], rows: any[][]) => {
    const hasPT = headers.some(h => /^PT$/i.test(h) || /\bPT\b/i.test(h));
    if (!hasPT) return { headers, rows };

    const norm = normalizeHeaders(headers);
    const findIdx = (re: RegExp) => norm.findIndex(h => re.test(h));
    const idxCalidad = findIdx(/Calidad/i);
    const idxAcabado = findIdx(/Acabado/i);
    const idxPulg = findIdx(/Diámetro\s*\(\s*pulg/i);
    const idxMm = findIdx(/Diámetro\s*\(\s*mm\s*\)/i);
    const idxPeso = findIdx(/Peso/i);
    const idxPT = findIdx(/^PT$|\bPT\b/i);
    const idxMarca = findIdx(/Marca/i);

    const target = (
      idxCalidad !== -1
        ? ['Calidad', 'Acabado', 'Diámetro (pulgada)', 'Peso (kg/unid)', 'PT', 'Marca']
        : ['Acabado', 'Diámetro (pulgada)', 'Peso (kg/unid)', 'PT', 'Marca']
    );

    const pick = (row: any[], name: string) => {
      switch (name) {
        case 'Calidad': return idxCalidad !== -1 ? row[idxCalidad] : '—';
        case 'Acabado': return idxAcabado !== -1 ? row[idxAcabado] : '—';
        case 'Diámetro (pulgada)': return idxPulg !== -1 ? ensureQuote(row[idxPulg]) : (idxMm !==-1 && toNumber(row[idxMm]) ? mmToPulg(toNumber(row[idxMm])!) : '');
        case 'Peso (kg/unid)': return idxPeso !== -1 ? row[idxPeso] : '';
        case 'PT': return idxPT !== -1 ? row[idxPT] : '';
        case 'Marca': return idxMarca !== -1 ? (row[idxMarca] ?? 'N/T') : 'N/T';
        default: return '';
      }
    };

    let newRows = rows.map(r => target.map(col => cleanCell(pick(r, col), col)));

    const diIdx = target.indexOf('Diámetro (pulgada)');
    if (diIdx !== -1) {
      newRows = newRows.sort((a, b) => parsePulg(a[diIdx]) - parsePulg(b[diIdx]));
    }
    return { headers: target, rows: newRows };
  };

  // Reordenación para tablas con dimensiones en mm (sin PT):
  // Objetivo de orden: Acabado, Diámetro (pulg), Diámetro (mm), Longitud, Peso (kg/unid), Marca
  // Si existe Diámetro (mm) y falta Diámetro (pulg), se inserta la columna Diámetro (pulg) convertida desde mm.
  const reorderMMTable = (headers: string[], rows: any[][]) => {
    const hasPT = headers.some(h => /^PT$/i.test(h) || /\bPT\b/i.test(h));
    if (hasPT) return { headers, rows };

    const hs = headers.slice();
    const findIndexRe = (re: RegExp) => hs.findIndex(h => re.test(h));

    const idxAcabado = findIndexRe(/Acabado/i);
    let idxDiamMm = findIndexRe(/Diámetro.*\(\s*mm\s*\)/i);
    const hasDiamMm = idxDiamMm !== -1;
    let idxDiamPulgHeader = findIndexRe(/Diámetro\s*\(\s*pulg/i);
    const originalHasPulg = idxDiamPulgHeader !== -1;

    if (idxAcabado === -1) return { headers, rows };

    let localRows = rows.map(r => r.slice());
    let localHeaders = hs.slice();
    
    if (hasDiamMm) {
      if (!originalHasPulg) {
        const newColValues = localRows.map(r => {
          const mm = toNumber(r[idxDiamMm]);
          return mm !== null ? mmToPulg(mm) : r[idxDiamMm];
        });

        const insertAt = idxDiamMm;
        localHeaders.splice(insertAt, 0, 'Diámetro (pulgada)');
        localRows.forEach((r, i) => r.splice(insertAt, 0, newColValues[i]));

        idxDiamMm++;
        idxDiamPulgHeader = insertAt;
        
        localHeaders.splice(idxDiamMm, 1);
        localRows.forEach(r => r.splice(idxDiamMm, 1));
        idxDiamMm = -1;
      }
    }

    if (idxDiamPulgHeader !== -1) {
      localHeaders[idxDiamPulgHeader] = 'Diámetro (pulgada)';
    }
    
    const finalHeaders = localHeaders;
    const finalRows = localRows.map(r => {
      const rowData = new Map(localHeaders.map((h, i) => [h, r[i]]));
      return finalHeaders.map(h => {
        let cell = rowData.get(h) ?? '';
        if (h === 'Longitud') {
            const n = toNumber(cell);
            if (n !== null) cell = String(Math.trunc(n));
        }
        return cell;
      });
    });

    return { headers: finalHeaders, rows: finalRows };
  };

  const processSection = (s: { title: string; headers: string[]; rows: any[][] }) => {
    if (s.title === 'Soporte De Repisa Visani') {
      return s;
    }
    let headers = normalizeHeaders(s.headers);
    let rows = s.rows.map(r => r.slice());

    headers.forEach((h, hi) => {
      if (/\(\s*pulg\s*\)/i.test(h)) {
        rows = rows.map(r => {
          const v = ensureQuote(r[hi]);
          return r.map((cell, ci) => (ci === hi ? v : cell));
        });
      }
    });

    ({ headers, rows } = reorderPTTable(headers, rows));
    if (s.title !== 'Jalador Modelo Agatha, Serie Liviana') {
      ({ headers, rows } = reorderMMTable(headers, rows));
    }

    headers.forEach((h, hi) => {
      if (/Peso/i.test(h) || /Diámetro/i.test(h) || /Diametro/i.test(h)) return;
      rows = rows.map(r => r.map((cell, ci) => (ci === hi ? cleanCell(cell, h) : cell)));
    });

    return { title: s.title, headers, rows };
  };

  const processedSections = useMemo(() => sections.map(processSection), [sections]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return processedSections;
    return processedSections.filter(s => s.title.toLowerCase().includes(q));
  }, [processedSections, query]);

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4 uppercase">PRODUCTOS DECORATIVOS</h2>
        <p className="text-sm text-gray-700 text-center mb-6">En esta sección encontrarás nuestras tablas de productos decorativos. Usa el buscador para localizar rápidamente una tabla por nombre.</p>

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
          filtered.map((s, idx) => {
            const isManillonSoporte = s.title === 'Manillón Soporte para Baño';
            const imageClassName = isManillonSoporte
              ? "w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
              : "w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain";
            
            return (
              <div className="mb-8" key={s.title}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600 uppercase">{s.title}</h3>
                </div>

                <div className="text-center mb-2 h-28 md:h-40 flex items-center justify-center">
                  <img
                    src={getDecorImageForTitle(s.title)}
                    alt={s.title}
                    className={imageClassName}
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
                          {r.map((cell, ci) => (
                            <td key={ci} className="px-3 py-2">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Mapeo de ajustes - se define aquí para ser usado en AjustesPage
const AJUSTES_IMAGE_MAP: Record<string, string> = {};

// Importar dinámicamente las imágenes de ajustes
const loadAjustesImages = async () => {
  const images = import.meta.glob('../../assets/ajustes/*.png', { eager: true, as: 'url' }) as Record<string, string>;
  const titleImageMap: Record<string, string> = {
    'ARANDELA PLANA': images['../../assets/ajustes/Arandela_Plana.png'],
    'ARANDELA PLANA ZINCADA': images['../../assets/ajustes/Arandela_Plana.png'],
    'ARANDELA PLANA MILIMÉTRICA': images['../../assets/ajustes/Arandela_Plana.png'],
    'ARANDELA PLANA MILIMÉTRICA ZINCADA': images['../../assets/ajustes/Arandela_Plana.png'],
    'ARANDELA PRESIÓN': images['../../assets/ajustes/Arandela_de_Presión.png'],
    'ARANDELA PRESIÓN MILIMÉTRICA': images['../../assets/ajustes/Arandela_de_Presión.png'],
    'ARANDELA PRESIÓN ZINCADA': images['../../assets/ajustes/Arandela_de_Presión.png'],
    'ARANDELA PRESIÓN MILIMÉTRICA ZINCADA': images['../../assets/ajustes/Arandela_de_Presión.png'],
    'ARANDELA DE PRESIÓN': images['../../assets/ajustes/Arandela_de_Presión.png'],
    'PERNO CON TUERCA Y ARANDELA': images['../../assets/ajustes/Perno_con_Tuerca_y_Arandela.png'],
    'AUTOPERFORANTE': images['../../assets/ajustes/Autoperforante.png'],
    'PERNO COCHE UNC': images['../../assets/ajustes/Perno_Coche_Unc.png'],
    'PERNO DE EXPANSIÓN': images['../../assets/ajustes/Perno_de_Expansión.png'],
    'PERNO HEXAGONAL': images['../../assets/ajustes/Perno_Hexagonal.png'],
    'PERNO DE CABEZA PLANA CON HEXÁGONO INTERIOR (SOCKET)': images['../../assets/ajustes/Perno_de_Cabeza_Plana_con_Hexágono_Interior.png'],
    'PERNO DE CABEZA CILÍNDRICA CON HEXÁGONO INTERIOR': images['../../assets/ajustes/Perno_de_Cabeza_Cilíndrica_con_Hexágono_Interior.png'],
    'PRISIONERO CON HEXÁGONO INTERIOR': images['../../assets/ajustes/Prisionero_con_Hexágono_Interior.png'],
    'REMACHE': images['../../assets/ajustes/Remache.png'],
    'ESPÁRRAGO ROSCADO': images['../../assets/ajustes/Espárrago_Roscado.png'],
    'STOVE BOLT DE CABEZA PAN': images['../../assets/ajustes/Stove_Bolt_de_Cabeza_Pan-removebg-preview.png'],
    'TACOS DE EXPANSIÓN': images['../../assets/ajustes/Tacos_De_Expansión.png'],
    'TARUGOS': images['../../assets/ajustes/Tarugos.png'],
    'TIRAFÓN': images['../../assets/ajustes/Tirafón.png'],
    'TORNILLO AUTORROSCANTE DE CABEZA PAN': images['../../assets/ajustes/Tornillo_Autorroscante_de_Cabeza_Pan.png'],
    'TORNILLO AUTORROSCANTE DE CABEZA PLANA': images['../../assets/ajustes/Tornillo_Autorroscante_de_Cabeza_Plana.png'],
    'TORNILLOS SPACK': images['../../assets/ajustes/Tornillos_Spack.png'],
    'TUERCA CIEGA': images['../../assets/ajustes/Tuerca_Ciega.png'],
    'TUERCA HEXAGONAL': images['../../assets/ajustes/Tuerca_Hexagonal.png'],
    'TUERCA HEXAGONAL MILIMETRICA': images['../../assets/ajustes/Tuerca_Hexagonal_Métrica.png'],
    'TUERCA MARIPOSA': images['../../assets/ajustes/Tuerca_Mariposa.png'],
    'PERNO (ZINCADO)': images['../../assets/ajustes/Perno_zincado.png'],
    'STOVE BOLT ZINCADO': images['../../assets/ajustes/Stove_Bolt_Zincado.png'],
    'TUERCA ZINCADO': images['../../assets/ajustes/Tuerca_Hexagonal.png'],
  };
  return titleImageMap;
};

loadAjustesImages().then(map => {
  Object.assign(AJUSTES_IMAGE_MAP, map);
});

export const AjustesPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const entries = useMemo(() => Object.entries(FASTENERS).sort((a, b) => a[0].localeCompare(b[0], 'es', { sensitivity: 'base' })), []);

  const getImageForTitleLocal = useCallback((title: string) => {
    return AJUSTES_IMAGE_MAP[title] || null;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(([title, rows]) => {
      const t = title.toLowerCase();
      if (t.includes(q) || t.includes(q.replace(/á/g, 'a'))) return true;
      // search inside rows (any field contains query)
      return rows.some(r => Object.values(r).some(v => String(v || '').toLowerCase().includes(q)));
    });
  }, [query, entries]);

  // filtered contains the fastener sections to render

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">AJUSTES</h2>
        <p className="text-sm text-gray-700 text-center mb-6">
          En esta sección encontrarás los datos técnicas de los ajustes y piezas relacionadas. Aquí también agrupamos la tornillería y fijaciones (arandelas, pernos, tuercas, remaches) con sus medidas y acabados.
        </p>

        <div className="max-w-xl mx-auto mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tabla por nombre..."
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {filtered.map(([title, rows]) => {
          const imgSrc = getImageForTitleLocal(title);

          return (
          <div className="mb-8" key={title}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-blue-600">{title}</h3>
            </div>

            {imgSrc && (
              <div className="text-center mb-2 h-28 flex items-center justify-center">
                <img
                  src={imgSrc}
                  alt={title}
                  className="w-24 h-24 object-contain"
                  onError={(e:any) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="border border-blue-500 px-3 py-2">Calidad</th>
                    <th className="border border-blue-500 px-3 py-2">Acabado</th>
                    <th className="border border-blue-500 px-3 py-2">Diámetro</th>
                    <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                    <th className="border border-blue-500 px-3 py-2">Marca del producto</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r: any, idx: number) => (
                    <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                      <td className="px-3 py-2">{r.calidad || '—'}</td>
                      <td className="px-3 py-2">{r.acabado || '—'}</td>
                      <td className="px-3 py-2">{r.diametro || r.medida || '—'}</td>
                      <td className="px-3 py-2">{r.peso || '—'}</td>
                      <td className="px-3 py-2">{r.marca || r.brand || 'N/T'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          );
        })}

        {/** Rendered above: fasteners tables */}
      </div>
    </div>
  );
};

export const IndustrialesPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return {
      abrazaderas: true, clamp: true, adaptadores: true, adaptadoresVarios: true, brida: true,
      CodoConRoscaImg45: true, CodoConRoscaImg90: true, codoSanitario: true, codoSanitarioFerrul: true, codoODSoldable45: true, codoODSoldable90: true,
      coplaRoscada: true, cruzRoscada: true, disco: true, empaques: true, ferrulas: true, filtro: true, juegoAbrazadera: true,
      niple: true, reduccionBushing: true, reduccionCampana: true, reduccionConcentricaSanitaria: true, reduccionConcentricaSoldable: true,
      tapaPestanada: true, tapaSemibonbeada: true, tapaPrensadaMate: true, tapaBombeada: true, tapaBombeadaCap: true, tapaBombeadaElectrica: true, tapaCiegaClamp: true, tapaConRoscaHembra: true, tapaHexagonalConRoscaMacho: true,
      teeConRosca: true, teeODSanitario: true, teeSanitarioFerrula: true, teeSoldable: true,
      unionDobleSMS: true, unionSimpleRoscaNPT: true, unionUniversal: true,
      valvulaBola: true, valvulaCheckSwing: true, valvulaMariposaClamp: true, valvulaCompuerta: true
    }; 
    return {
      abrazaderas: matches('Abrazaderas Regulables', q),
      clamp: matches('Clamp ASI', q),
      adaptadores: matches('Adaptadores para Manguera', q) || matches('Adaptadores', q),
      adaptadoresVarios: matches('Adaptadores Varios', q) || matches('Varios', q),
      brida: matches('Brida Slip', q),

      CodoConRoscaImg45: matches('Codo con Rosca de 45°', q) || matches('Codo de 45°', q),
      CodoConRoscaImg90: matches('Codo con Rosca de 90°', q) || matches('Codo de 90°', q),
      codoSanitario: matches('Codo Sanitario', q),
      codoSanitarioFerrul: matches('Codo Sanitario Con Ferrul', q) || matches('Ferrul', q),
      codoODSoldable45: matches('Codo OD Soldable de 45°', q) || matches('OD Soldable de 45°', q),
      codoODSoldable90: matches('Codo OD Soldable de 90°', q) || matches('OD Soldable de 90°', q),

      coplaRoscada: matches('Copla Roscada', q) || matches('Copla', q),
      cruzRoscada: matches('Cruz Roscada', q) || matches('Cruz', q),
      disco: matches('Disco', q),
      empaques: matches('Empaques', q),
      ferrulas: matches('Férulas', q) || matches('Ferrulas', q) || matches('Ferrula', q),
      filtro: matches('Filtro Tipo Y', q) || matches('Filtro', q),
      juegoAbrazadera: matches('Juego de Abrazadera', q) || matches('Abrazadera Triple', q),
      niple304: matches('Niple', q) || matches('Niples', q),
      niple316: matches('Niple', q) || matches('Niples', q),
      reduccionBushing: matches('Reducción Bushing', q) || matches('Bushing', q),
      reduccionCampana: matches('Reducción Campana', q) || matches('Campana', q),
      reduccionConcentricaSanitaria: matches('Reducción Concéntrica Sanitaria', q),
      reduccionConcentricaSoldable: matches('Reducción Concéntrica Soldable', q),

      tapaPestanada: matches('Tapa Pestañada', q),
      tapaBombeada: matches('Tapa Bombeada', q) || matches('Tapa Bombin', q) || matches('Tapa Bomba', q),
      tapaBombeadaCap: matches('Tapa Bombeada Cap', q) || matches('Cap', q),
      tapaBombeadaElectrica: matches('Tapa Bombeada para Tubería eléctrica', q) || matches('eléctrica', q),
      tapaCiegaClamp: matches('Tapa Ciega Clamp', q),
      tapaConRoscaHembra: matches('Tapa con Rosca Hembra', q),
      tapaHexagonalConRoscaMacho: matches('Tapa Hexagonal con Rosca Macho', q) || matches('Tapa Hexagonal', q),

      teeConRosca: matches('Tee con Rosca', q),
      teeODSanitario: matches('Tee OD Sanitario', q),
      teeSanitarioFerrula: matches('Tee Sanitario con Férula', q),
      teeSoldable: matches('Tee Soldable', q),

      unionDobleSMS: matches('Unión Doble Sanitaria SMS', q),
      unionSimpleRoscaNPT: matches('Unión Simple con Rosca NPT', q),
      unionUniversal: matches('Unión Universal', q) || matches('Union Universal', q),

      valvulaBola: matches('Válvula Bola', q) || matches('Valvula Bola', q),
      valvulaCheckSwing: matches('Válvula Check Swing', q) || matches('Valvula Check Swing', q),
      valvulaMariposaClamp: matches('Válvula Mariposa', q) || matches('Valvula Mariposa', q),
      valvulaCompuerta: matches('Válvula Compuerta', q) || matches('Valvula Compuerta', q),
    }; 
  }, [query]);

  const hasResults = filtered.abrazaderas || filtered.clamp || filtered.adaptadores || filtered.adaptadoresVarios || filtered.brida ||
      filtered.CodoConRoscaImg45 || filtered.CodoConRoscaImg90  || filtered.codoSanitario || filtered.codoSanitarioFerrul || filtered.codoODSoldable45 || filtered.codoODSoldable90 || filtered.coplaRoscada || filtered.cruzRoscada || filtered.disco || filtered.empaques || filtered.ferrulas || filtered.filtro || filtered.juegoAbrazadera 
      || filtered.niple304 || filtered.niple316 || filtered.reduccionBushing || filtered.reduccionCampana || filtered.reduccionConcentricaSanitaria || filtered.reduccionConcentricaSoldable ||
      filtered.tapaPestanada || filtered.tapaSemibonbeada || filtered.tapaPrensadaMate || filtered.tapaBombeada || filtered.tapaBombeadaCap || filtered.tapaBombeadaElectrica || filtered.tapaCiegaClamp || filtered.tapaConRoscaHembra || filtered.tapaHexagonalConRoscaMacho ||
      filtered.teeConRosca || filtered.teeODSanitario || filtered.teeSanitarioFerrula || filtered.teeSoldable ||
      filtered.unionDobleSMS || filtered.unionSimpleRoscaNPT || filtered.unionUniversal ||
      filtered.valvulaBola || filtered.valvulaCheckSwing || filtered.valvulaMariposaClamp || filtered.valvulaCompuerta;

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">PRODUCTOS INDUSTRIALES</h2>
        <p className="text-sm text-gray-700 text-center mb-6">
          Aquí encontrarás las especificaciones técnicas de nuestros artículos industriales de acero inoxidable y acero al carbono, diseñados para aplicaciones de sujeción, conexión y montaje en sistemas industriales. También incluimos tornillería y fijaciones (arandelas, pernos, tuercas, remaches) con sus medidas y pesos para facilitar la selección.
        </p>

        <div className="max-w-xl mx-auto mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tabla por nombre..."
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {!hasResults ? (
          <div className="text-gray-500 text-center">No se encontraron tablas para la búsqueda.</div>
        ) : (
          <>
            {filtered.abrazaderas && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">ABRAZADERAS REGULABLES PARA MANGUERA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={AbrazaderasImg} alt="Abrazaderas Regulables" className="w-24 h-auto" />
                </div>
                <AbrazaderasRegulablesTable />
              </div>
            )} 
            {filtered.clamp && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">ABRAZADERA TIPO PESADO CLAMP ASI</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ClampImg} alt="Clamp" className="w-24 h-auto" />
                </div>
                <ClampASITable />
              </div>
            )}
            {filtered.adaptadores && (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-blue-600">ADAPTADORES PARA MANGUERA</h3>
                  </div>
                  <div className="text-center mb-2 h-28 flex items-center justify-center">
                    <img src={AdaptadoresImg} alt="Adaptadores" className="w-24 h-auto" />
                  </div>
                  <AdaptadoresTable />
                </div>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-blue-600">ADAPTADORES VARIOS</h3>
                  </div>
                  <div className="text-center mb-2 h-28 flex items-center justify-center">
                    <img src={AdaptadoresVariosImg} alt="Adaptadores Varios" className="w-24 h-auto" />
                  </div>
                  <AdaptadoresVariosTable />
                </div>
              </>
            )}
            {filtered.brida && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">BRIDA SLIP ON SOLDABLE</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={BridaImg} alt="Brida" className="w-32 h-auto" />
                </div>
                <BridaSlipTable />
              </div>
            )}
            {filtered.CodoConRoscaImg45 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">CODO CON ROSCA DE 45°</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={CodoConRoscaImg45} alt="codo con Rosca" className="w-24 h-auto" />
                </div>
                <CodoRoscaTable1 />
              </div>
            )}
            {filtered.CodoConRoscaImg90 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">CODO CON ROSCA DE 90°</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={CodoConRoscaImg90} alt="Codo con Rosca" className="w-24 h-auto" />
                </div>
                <CodoRoscaTable2 />
              </div>
            )}


            {filtered.codoSanitario && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">CODO SANITARIO</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={CodoSanitarioImg} alt="Codo Sanitario" className="w-24 h-auto" />
                </div>
                <CodoSanitarioTable />
              </div>
            )}

            {filtered.codoSanitarioFerrul && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">CODO SANITARIO CON FERRUL</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={CodoSanitarioFerrulImg} alt="Codo Sanitario con Ferrul" className="w-24 h-auto" />
                </div>
                <CodoSanitarioFerrulTable />
              </div>
            )}

            {filtered.codoODSoldable90 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">CODO DE CEDULA SOLDABLE DE 90°</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={CodoODSoldableImg90} alt="Codo OD Soldable" className="w-24 h-auto" />
                </div>
                <CodoSoldAcTable1 />
              </div>
            )}
            {filtered.codoODSoldable45 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">CODO DE CEDULA SOLDABLE DE 45°</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={CodoODSoldableImg45} alt="Codo OD Soldable" className="w-24 h-auto" />
                </div>
                <CodoSoldAcTable2 />
              </div>
            )}           

            {filtered.coplaRoscada && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">COPLA ROSCADA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={CoplaRoscadaImg} alt="Copla Roscada" className="w-24 h-auto" />
                </div>
                <CoplaRoscadaTable />
              </div>
            )}

            {filtered.cruzRoscada && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">CRUZ ROSCADA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={CruzRoscadaImg} alt="Cruz Roscada" className="w-24 h-auto" />
                </div>
                <CruzRoscadaTable />
              </div>
            )}

            {filtered.disco && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">DISCO</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={DiscoImg} alt="Disco" className="w-24 h-auto" />
                </div>
                <DiscoTable />
              </div>
            )}

            {filtered.empaques && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">EMPAQUES</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={EmpaquesImg} alt="Empaques" className="w-24 h-auto" />
                </div>
                <EmpaquesTable />
              </div>
            )}

            {filtered.ferrulas && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">FÉRULAS</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={FerrulasImg} alt="Ferrulas" className="w-24 h-auto" />
                </div>
                <FerrulasClampSoldableTable />
              </div>
            )}

            {filtered.filtro && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">FILTRO TIPO Y</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={FiltroImg} alt="Filtro Tipo Y" className="w-24 h-auto" />
                </div>
                <FiltroYBridadoTable />
              </div>
            )}

            {filtered.juegoAbrazadera && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">JUEGO DE ABRAZADERA TRI CLAMP</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={JuegoAbrazaderaImg} alt="Juego Abrazadera" className="w-24 h-auto" />
                </div>
                <JuegoAbrazaderaTripleTable />
              </div>
            )}

            {filtered.niple && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">NIPLE CON ROSCA CALIDAD 304</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={NipleImg304} alt="Niple" className="w-28 h-auto" />
                </div>
                <NipleTable1 />
              </div>
            )}
            {filtered.niple && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">NIPLE CON ROSCA CALIDAD 316</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={NipleImg316} alt="Niple" className="w-28 h-auto" />
                </div>
                <NipleTable2 />
              </div>
            )}            

            {filtered.reduccionBushing && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">REDUCCIÓN BUSHING CON ROSCA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ReduccionBushingImg} alt="Reducción Bushing" className="w-24 h-auto" />
                </div>
                <ReduccionBushingTable />
              </div>
            )}

            {filtered.reduccionCampana && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">REDUCCIÓN CAMPANA CON ROSCA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ReduccionCampanaImg} alt="Reducción Campana" className="w-24 h-auto" />
                </div>
                <ReduccionCampanaTable />
              </div>
            )}

            {filtered.reduccionConcentricaSanitaria && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">REDUCCIÓN CONCÉNTRICA SANITARIA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ReduccionConcentricaSanitariaImg} alt="Reducción Concéntrica Sanitaria" className="w-28 h-auto" />
                </div>
                <ReduccionConcentricaSanitariaTable />
              </div>
            )}

            {filtered.reduccionConcentricaSoldable && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">REDUCCIÓN CONCÉNTRICA SOLDABLE</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ReduccionConcentricaSoldableImg} alt="Reducción Concéntrica Soldable" className="w-32 h-auto" />
                </div>
                <ReduccionConcentricaSoldableTable />
              </div>
            )}

            {filtered.tapaBombeada && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TAPA BOMBEADA PARA TUBO ELECTROSOLDADO</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TapaBombeadaImg} alt="Tapa Bombeada" className="w-24 h-auto" />
                </div>
                <TapaBombinTable />
              </div>
            )}

            {filtered.tapaBombeadaCap && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TAPA SEMIBOMBEADA PARA TANQUE</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TapaBombeadaCapImg} alt="Tapa Bombeada Cap" className="w-32 h-auto" />
                </div>
                <TapaBombaTable />
              </div>
            )}

            {filtered.tapaBombeadaElectrica && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TAPA CAP PARA TUBERIA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TapaBombeadaElectricaImg} alt="Tapa Bombeada Eléctrica" className="w-24 h-auto" />
                </div>
                <TapaBomaCapTable />
              </div>
            )}

            {filtered.tapaCiegaClamp && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TAPA CIEGA CLAMP</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TapaCiegaClampImg} alt="Tapa Ciega Clamp" className="w-24 h-auto" />
                </div>
                <TapaCiegaClampTable />
              </div>
            )}

            {filtered.tapaConRoscaHembra && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TAPA CON ROSCA HEMBRA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TapaConRoscaHembraImg} alt="Tapa con Rosca Hembra" className="w-24 h-auto" />
                </div>
                <TapaConRoscaHembraTable />
              </div>
            )}

            {filtered.tapaHexagonalConRoscaMacho && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TAPA HEXAGONAL CON ROSCA MACHO</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TapaHexagonalConRoscaMachoImg} alt="Tapa Hexagonal" className="w-24 h-auto" />
                </div>
                <TapaHexagonalConRoscaMachoTable />
              </div>
            )} 
            {filtered.tapaPestanada && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TAPA PESTAÑADA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TapaPestanadaImg} alt="Tapa Pestañada" className="w-32 h-auto" />
                </div>
                <TapaPestanadaTable />
              </div>
            )}
            {filtered.teeConRosca && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TEE CON ROSCA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TeeConRoscaImg} alt="Tee con Rosca" className="w-32 h-auto" />
                </div>
                <TeeConRoscaTable />
              </div>
            )}
            {filtered.teeODSanitario && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TEE OD SANITARIO</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TeeODSanitarioImg} alt="Tee OD Sanitario" className="w-24 h-auto" />
                </div>
                <TeeODSanitarioTable />
              </div>
            )}
            {filtered.teeSanitarioFerrula && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TEE SANITARIO CON FÉRULA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TeeSanitarioFerrulaImg} alt="Tee Sanitario con Férula" className="w-24 h-auto" />
                </div>
                <TeeSanitarioFerrulaTable />
              </div>
            )}
            {filtered.teeSoldable && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">TEE SOLDABLE</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={TeeSoldableImg} alt="Tee Soldable" className="w-24 h-auto" />
                </div>
                <TeeSoldableTable />
              </div>
            )}
            {filtered.unionDobleSMS && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">UNIÓN DOBLE SANITARIA SMS</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={UnionDobleSMSImg} alt="Unión Doble Sanitaria SMS" className="w-24 h-auto" />
                </div>
                <UnionDobleSMSTable />
              </div>
            )}
            {filtered.unionSimpleRoscaNPT && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">UNIÓN SIMPLE CON ROSCA NPT</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={UnionSimpleRoscaNPTImg} alt="Unión Simple con Rosca NPT" className="w-24 h-auto" />
                </div>
                <UnionSimpleRoscaNPTTable />
              </div>
            )}
            {filtered.unionUniversal && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">UNIÓN UNIVERSAL</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={UnionUniversalImg} alt="Unión Universal" className="w-24 h-auto" />
                </div>
                <UnionUniversalTable />
              </div>
            )}
            {filtered.valvulaBola && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">VÁLVULA BOLA ACERO – 2 PIEZAS - ASIENTO TEFLÓN</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ValvulaBolaImg} alt="Válvula Bola" className="w-24 h-auto" />
                </div>
                <ValvulaBolaTable />
              </div>
            )}
            {filtered.valvulaCheckSwing && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">VÁLVULA CHECK SWING NPT</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ValvulaCheckSwingImg} alt="Válvula Check Swing" className="w-24 h-auto" />
                </div>
                <ValvulaCheckSwingTable />
              </div>
            )}
            {filtered.valvulaMariposaClamp && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">VÁLVULA MARIPOSA CON CLAMP</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ValvulaMariposaClampImg} alt="Válvula Mariposa" className="w-24 h-auto" />
                </div>
                <ValvulaMariposaClampTable />
              </div>
            )}
            {filtered.valvulaCompuerta && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">VÁLVULA COMPUERTA</h3>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img src={ValvulaCompuertaImg} alt="Válvula Compuerta" className="w-24 h-auto" />
                </div>
                <ValvulaCompuertaTable />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const TapaPestanadaTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '250', espesor: '1.5', peso: '0.678', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '315', espesor: '1.5', peso: '0.985', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '315', espesor: '2.0', peso: '1.377', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '315', espesor: '2.5', peso: '1.645', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '315', espesor: '3.0', peso: '1.970', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '380', espesor: '1.5', peso: '1.450', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '380', espesor: '2.0', peso: '1.980', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '380', espesor: '2.5', peso: '2.420', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '380', espesor: '3.0', peso: '2.950', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '465', espesor: '2.0', peso: '2.950', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '465', espesor: '2.5', peso: '3.700', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '465', espesor: '3.0', peso: '4.410', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '570', espesor: '2.0', peso: '4.254', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '570', espesor: '2.5', peso: '5.540', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '570', espesor: '3.0', peso: '6.650', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '760', espesor: '2.0', peso: '7.580', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero inoxidable 2B', diametro: '760', espesor: '3.0', peso: '11.450', marca: 'Fabricación Nacional' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable 2B', diametro: '250', espesor: '1.5', peso: '0.678', marca: 'Fabricación Nacional' },
    { calidad: 'C-316', acabado: 'Acero inoxidable 2B', diametro: '315', espesor: '2.0', peso: '1.377', marca: 'Fabricación Nacional' },
    { calidad: 'C-316', acabado: 'Acero inoxidable 2B', diametro: '380', espesor: '2.0', peso: '1.980', marca: 'Fabricación Nacional' },
    { calidad: 'C-316', acabado: 'Acero inoxidable 2B', diametro: '380', espesor: '3.0', peso: '2.950', marca: 'Fabricación Nacional' },
    { calidad: 'C-316', acabado: 'Acero inoxidable 2B', diametro: '465', espesor: '3.0', peso: '4.410', marca: 'Fabricación Nacional' },
    { calidad: 'C-316', acabado: 'Acero inoxidable 2B', diametro: '570', espesor: '3.0', peso: '6.650', marca: 'Fabricación Nacional' },
    { calidad: 'C-316', acabado: 'Acero inoxidable 2B', diametro: '760', espesor: '3.0', peso: '11.450', marca: 'Fabricación Nacional' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (cm)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor (mm)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const TeeConRoscaTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1/4"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3/8"', peso: '0.065', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1/2"', peso: '0.105', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3/4"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1"', peso: '0.265', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/4"', peso: '0.410', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/2"', peso: '0.525', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2"', peso: '0.810', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2 1/2"', peso: '1.430', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3"', peso: '2.150', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '4"', peso: '3.650', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1/4"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3/8"', peso: '0.065', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1/2"', peso: '0.105', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3/4"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1"', peso: '0.265', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1 1/4"', peso: '0.410', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1 1/2"', peso: '0.525', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '2"', peso: '0.810', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '2 1/2"', peso: '1.430', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3"', peso: '2.150', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '4"', peso: '3.650', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TeeODSanitarioTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1/2"', espesor: '1.65', peso: '0.062', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3/4"', espesor: '1.65', peso: '0.085', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1"', espesor: '1.65', peso: '0.117', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/4"', espesor: '1.65', peso: '0.125', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/2"', espesor: '1.65', peso: '0.133', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2"', espesor: '1.65', peso: '0.360', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2 1/2"', espesor: '1.65', peso: '0.480', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3"', espesor: '1.65', peso: '0.620', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '4"', espesor: '1.65', peso: '0.940', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor (mm)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TeeSanitarioFerrulaTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', espesor: '1.65', peso: '0.095', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', espesor: '1.65', peso: '0.120', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', espesor: '1.65', peso: '0.185', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', espesor: '1.65', peso: '0.240', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', espesor: '1.65', peso: '0.315', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', espesor: '1.65', peso: '0.520', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', espesor: '1.65', peso: '0.780', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', espesor: '1.65', peso: '1.050', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', espesor: '1.65', peso: '1.820', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', espesor: '1.65', peso: '0.095', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', espesor: '1.65', peso: '0.120', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', espesor: '1.65', peso: '0.185', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', espesor: '1.65', peso: '0.240', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', espesor: '1.65', peso: '0.315', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', espesor: '1.65', peso: '0.520', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', espesor: '1.65', peso:'0.780', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', espesor: '1.65', peso: '1.050', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', espesor: '1.65', peso: '1.820', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor (mm)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TeeSoldableTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 / SCH 40 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1/4"', peso: '0.050', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '3/8"', peso: '0.060', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1/2"', peso: '0.066', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '3/4"', peso: '0.151', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1"', peso: '0.320', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1 1/4"', peso: '0.480', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1 1/2"', peso: '0.766', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '2"', peso: '1.148', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '2 1/2"', peso: '1.750', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '3"', peso: '2.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '4"', peso: '4.150', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '6"', peso: '8.500', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '8"', peso: '15.200', marca: 'Importado' },

    // --- CALIDAD C-316 / SCH 40 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1/2"', peso: '0.066', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '3/4"', peso: '0.151', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1"', peso: '0.320', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1 1/4"', peso: '0.480', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '1 1/2"', peso: '0.766', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '2"', peso: '1.148', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '3"', peso: '2.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '4"', peso: '4.150', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '6"', peso: '8.500', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH 40', medida: '8"', peso: '15.200', marca: 'Importado' },
   ];
  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Cédula</th>
            <th className="border border-blue-500 px-3 py-2">Medida (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.cedula}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UnionDobleSMSTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '0.196', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.489', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '0.549', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '0.820', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '1.150', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '1.850', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.150', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '0.196', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.489', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '0.549', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '0.820', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '1.150', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '1.850', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UnionSimpleRoscaNPTTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.014', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.023', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.029', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.044', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '0.107', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '0.146', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '0.660', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '0.946', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.014', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.023', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.029', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.044', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '0.107', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '0.146', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '0.660', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '0.946', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const UnionUniversalTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 / 150 LBS ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.066', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.079', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.118', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.165', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '0.169', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.410', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.296', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '0.479', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '1.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '1.980', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '3.350', marca: 'Importado' },

    // --- CALIDAD C-316 / 150 LBS ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.066', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.079', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.118', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.165', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '0.169', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.410', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.296', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '0.479', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '1.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '1.980', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '3.350', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ValvulaBolaTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.192', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.193', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.228', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.286', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '0.533', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.758', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.851', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '1.513', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '4.208', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '7.850', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.192', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.193', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.228', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.286', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '0.467', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.758', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '1.194', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '1.593', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '3.150', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '4.208', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '7.850', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ValvulaCheckSwingTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.236', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.242', marca: 'Importado' }, // Añadido del catálogo
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.218', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.352', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '0.531', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.820', marca: 'Importado' }, // Añadido del catálogo
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '1.050', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '1.580', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '3.950', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '6.800', marca: 'Importado' },

    // --- CALIDAD C-316 (Extension sugerida por estándar industrial para NPT) ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/4"', peso: '0.236', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/8"', peso: '0.242', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.218', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.352', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '0.531', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.820', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '1.050', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '1.580', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '3.950', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '6.800', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ValvulaMariposaClampTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '1.263', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '1.080', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '1.080', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '1.325', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '2.150', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '2.950', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '6.500', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '5"', peso: '8.200', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '6"', peso: '10.500', marca: 'Importado' },

    // --- CALIDAD C-316 (Siguiendo el rango de la imagen) ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '1.263', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '1.080', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '1.080', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '1.325', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '2.150', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '2.950', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '6.500', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '5"', peso: '8.200', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '6"', peso: '10.500', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ValvulaCompuertaTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 / 150HGV ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', peso: '1.950', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', peso: '2.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '3.100', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '4.200', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '5.300', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '8.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '12.800', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '16.500', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '24.200', marca: 'Importado' },

    // --- CALIDAD C-316 / 150HGV ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', peso: '1.950', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '2.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '3.100', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '4.200', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '1.475', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '8.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '12.800', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '16.500', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '24.200', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas (pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TiposElectrodosTable: React.FC = () => {
  const rows = [
    { calidad: 'E-6011', acabado: 'Acero al carbono', espesor: '3/32"', peso: '1.00', marca: 'CELLOCOR' },
    { calidad: 'E-6011', acabado: 'Acero al carbono', espesor: '1/8"', peso: '1.00', marca: 'CELLOCOR' },
    { calidad: 'E-6011', acabado: 'Acero al carbono', espesor: '3/32"', peso: '1.00', marca: 'PUNTO AZUL' },
    { calidad: 'E-6011', acabado: 'Acero al carbono', espesor: '1/8"', peso: '1.00', marca: 'PUNTO AZUL' },
    { calidad: 'E-6011', acabado: 'Acero al carbono', espesor: '3/32"', peso: '1.00', marca: 'WELDSOL' },
    { calidad: 'E-6011', acabado: 'Acero al carbono', espesor: '1/8"', peso: '1.00', marca: 'WELDSOL' },
    { calidad: 'E-7018', acabado: 'Acero al carbono', espesor: '3/32"', peso: '1.00', marca: 'SUPERCITO' },
    { calidad: 'E-7018', acabado: 'Acero al carbono', espesor: '1/8"', peso: '1.00', marca: 'SUPERCITO' },
    { calidad: 'C-308', acabado: 'Acero inoxidable', espesor: '1/16"', peso: '0.006', marca: 'AW' },
    { calidad: 'C-308', acabado: 'Acero inoxidable', espesor: '3/32"', peso: '0.023', marca: 'AW' },
    { calidad: 'C-308', acabado: 'Acero inoxidable', espesor: '1/8"', peso: '0.038', marca: 'GOLD BRG' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', espesor: '1/16"', peso: '1.00', marca: 'AW' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', espesor: '3/32"', peso: '1.00', marca: 'GOLD BRG' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', espesor: '1/8"', peso: '1.00', marca: 'GOLD BRG' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Espesor (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca del producto</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EmpaquesTable: React.FC = () => {
  const rows = [
    { acabado: 'Nitrilo', medida: '1/2"', peso: '0.001', marca: 'Importado' },
    { acabado: 'Nitrilo', medida: '3/4"', peso: '0.001', marca: 'Importado' },
    { acabado: 'Nitrilo', medida: '1"', peso: '0.001', marca: 'Importado' },
    { acabado: 'Nitrilo', medida: '1 1/4"', peso: '0.002', marca: 'Importado' },
    { acabado: 'Nitrilo', medida: '1 1/2"', peso: '0.003', marca: 'Importado' },
    { acabado: 'Nitrilo', medida: '2"', peso: '0.004', marca: 'Importado' },
    { acabado: 'Nitrilo', medida: '2 1/2"', peso: '0.006', marca: 'Importado' },
    { acabado: 'Nitrilo', medida: '3"', peso: '0.007', marca: 'Importado' },
    { acabado: 'Nitrilo', medida: '4"', peso: '0.010', marca: 'Importado' },
    { acabado: 'Silicona', medida: '1"', peso: '0.005', marca: 'Importado' },
    { acabado: 'Silicona', medida: '1 1/4"', peso: '0.004', marca: 'Importado' },
    { acabado: 'Silicona', medida: '1 1/2"', peso: '0.010', marca: 'Importado' },
    { acabado: 'Silicona', medida: '2"', peso: '0.004', marca: 'Importado' },
    { acabado: 'Silicona', medida: '2 1/2"', peso: '0.010', marca: 'Importado' },
    { acabado: 'Silicona', medida: '3"', peso: '0.007', marca: 'Importado' },
    { acabado: 'Silicona', medida: '4"', peso: '0.010', marca: 'Importado' },
    { acabado: 'Neoprene sanitario', medida: '4 mm (1.22 × 1.22 m)', peso: '7.50', marca: 'Importado' },
    { acabado: 'Neoprene sanitario', medida: '6 mm (1.22 × 1.22 m)', peso: '11.20', marca: 'Importado' },
    { acabado: 'Neoprene sanitario', medida: '1/2" (1.22 × 1.22 m)', peso: '23.80', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FerrulasClampSoldableTable: React.FC = () => {
  const rows = [
    // Calidad C-304
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1"', peso: '0.068', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.075', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.082', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2"', peso: '0.125', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '0.180', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '3"', peso: '0.240', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '4"', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '5"', peso: '0.480', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-304', acabado: 'Acero inoxidable', medida: '6"', peso: '0.620', marca: 'Importado' }, // Añadido de imagen

    // Calidad C-316
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1/2"', peso: '0.040', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3/4"', peso: '0.045', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1"', peso: '0.068', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/4"', peso: '0.075', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '1 1/2"', peso: '0.082', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2"', peso: '0.125', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '2 1/2"', peso: '0.180', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '3"', peso: '0.240', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '4"', peso: '0.350', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '5"', peso: '0.480', marca: 'Importado' }, // Añadido de imagen
    { calidad: 'C-316', acabado: 'Acero inoxidable', medida: '6"', peso: '0.620', marca: 'Importado' }, // Añadido de imagen
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FiltroYBridadoTable: React.FC = () => {
  const rows = [
    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '1 1/2"', peso: '4.232', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const JuegoAbrazaderaTripleTable: React.FC = () => {
  const rows = [
    // Calidad C-304
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '1/2"', medidaMm: '12.7', peso: '0.15', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '3/4"', medidaMm: '19.05', peso: '0.18', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '1"', medidaMm: '25.4', peso: '0.22', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '1 1/4"', medidaMm: '31.75', peso: '0.25', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '1 1/2"', medidaMm: '38.1', peso: '0.28', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '2"', medidaMm: '50.8', peso: '0.35', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '2 1/2"', medidaMm: '63.5', peso: '0.45', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '3"', medidaMm: '76.2', peso: '0.55', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '4"', medidaMm: '101.6', peso: '0.85', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '5"', medidaMm: '127.0', peso: '1.10', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidaPulg: '6"', medidaMm: '152.4', peso: '1.40', marca: 'Importado' },

    // Calidad C-316
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '1/2"', medidaMm: '12.7', peso: '0.15', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '3/4"', medidaMm: '19.05', peso: '0.18', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '1"', medidaMm: '25.4', peso: '0.22', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '1 1/4"', medidaMm: '31.75', peso: '0.25', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '1 1/2"', medidaMm: '38.1', peso: '0.28', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '2"', medidaMm: '50.8', peso: '0.35', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '2 1/2"', medidaMm: '63.5', peso: '0.45', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '3"', medidaMm: '76.2', peso: '0.55', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '4"', medidaMm: '101.6', peso: '0.85', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '5"', medidaMm: '127.0', peso: '1.10', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidaPulg: '6"', medidaMm: '152.4', peso: '1.40', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Medida (mm)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medidaPulg}</td>
              <td className="px-3 py-2">{r.medidaMm}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const NipleTable1: React.FC = () => {
  const rows = [
    // --- DIÁMETRO 1/4" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '1"', peso: '0.012', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '1 1/2"', peso: '0.020', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '2"', peso: '0.027', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '2 1/2"', peso: '0.035', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '3"', peso: '0.043', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '3 1/2"', peso: '0.049', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '4"', peso: '0.056', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '4 1/2"', peso: '0.063', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '5"', peso: '0.071', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '5 1/2"', peso: '0.078', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '6"', peso: '0.085', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '7"', peso: '0.098', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '8"', peso: '0.112', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '10"', peso: '0.140', marca: 'Importado' },

    // --- DIÁMETRO 3/8" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '1"', peso: '0.016', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '1 1/2"', peso: '0.024', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '2"', peso: '0.032', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '2 1/2"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '3"', peso: '0.052', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '3 1/2"', peso: '0.066', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '4"', peso: '0.072', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '4 1/2"', peso: '0.084', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '5"', peso: '0.095', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '5 1/2"', peso: '0.108', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '6"', peso: '0.120', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '7"', peso: '0.142', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '8"', peso: '0.165', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '10"', peso: '0.210', marca: 'Importado' },

    // --- DIÁMETRO 1/2" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '1"', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '1 1/2"', peso: '0.032', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '2"', peso: '0.044', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '2 1/2"', peso: '0.058', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '3"', peso: '0.073', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '3 1/2"', peso: '0.080', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '4"', peso: '0.087', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '4 1/2"', peso: '0.116', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '5"', peso: '0.145', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '5 1/2"', peso: '0.155', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '6"', peso: '0.166', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '7"', peso: '0.170', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '8"', peso: '0.177', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '10"', peso: '0.310', marca: 'Importado' },

    // --- DIÁMETRO 3/4" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '1"', peso: '0.024', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '1 1/2"', peso: '0.044', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '2"', peso: '0.064', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '2 1/2"', peso: '0.088', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '3"', peso: '0.111', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '3 1/2"', peso: '0.122', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '4"', peso: '0.134', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '4 1/2"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '5"', peso: '0.185', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '5 1/2"', peso: '0.205', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '6"', peso: '0.227', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '7"', peso: '0.270', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '8"', peso: '0.315', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '10"', peso: '0.400', marca: 'Importado' },

    // --- DIÁMETRO 1" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '1"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '1 1/2"', peso: '0.067', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '2"', peso: '0.089', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '2 1/2"', peso: '0.118', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '3"', peso: '0.148', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '3 1/2"', peso: '0.176', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '4"', peso: '0.204', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '4 1/2"', peso: '0.236', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '5"', peso: '0.268', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '5 1/2"', peso: '0.291', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '6"', peso: '0.314', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '7"', peso: '0.380', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '8"', peso: '0.445', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '10"', peso: '0.560', marca: 'Importado' },

    // --- DIÁMETRO 1 1/4" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '1 1/2"', peso: '0.096', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '2"', peso: '0.128', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '2 1/2"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '3"', peso: '0.195', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '3 1/2"', peso: '0.228', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '4"', peso: '0.260', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '4 1/2"', peso: '0.295', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '5"', peso: '0.330', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '5 1/2"', peso: '0.360', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '6"', peso: '0.390', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '7"', peso: '0.455', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '8"', peso: '0.520', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '10"', peso: '0.650', marca: 'Importado' },

    // --- DIÁMETRO 1 1/2" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '1 1/2"', peso: '0.097', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '2"', peso: '0.130', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '2 1/2"', peso: '0.218', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '3"', peso: '0.262', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '3 1/2"', peso: '0.304', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '4"', peso: '0.347', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '4 1/2"', peso: '0.380', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '5"', peso: '0.413', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '5 1/2"', peso: '0.468', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '6"', peso: '0.523', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '7"', peso: '0.622', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '8"', peso: '0.721', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '10"', peso: '0.873', marca: 'Importado' },

    // --- DIÁMETRO 2" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '2"', peso: '0.205', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '2 1/2"', peso: '0.256', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '3"', peso: '0.324', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '3 1/2"', peso: '0.384', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '4"', peso: '0.444', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '4 1/2"', peso: '0.517', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '5"', peso: '0.591', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '5 1/2"', peso: '0.647', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '6"', peso: '0.704', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '7"', peso: '0.826', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '8"', peso: '0.949', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '10"', peso: '1.213', marca: 'Importado' },

    // --- DIÁMETRO 2 1/2" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '2 1/2"', peso: '0.400', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '3"', peso: '0.480', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '4"', peso: '0.640', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '5"', peso: '0.855', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '6"', peso: '1.066', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '8"', peso: '1.400', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '10"', peso: '1.750', marca: 'Importado' },

    // --- DIÁMETRO 3" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '3"', peso: '0.660', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '4"', peso: '0.880', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '5"', peso: '1.106', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '6"', peso: '1.304', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '8"', peso: '1.760', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '10"', peso: '2.210', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '12"', peso: '2.640', marca: 'Importado' },

    // --- DIÁMETRO 4" ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '4"', peso: '1.250', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '5"', peso: '1.550', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '6"', peso: '1.870', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '8"', peso: '2.500', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '10"', peso: '3.120', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Cédula</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Largo</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.cedula}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.largo}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const NipleTable2: React.FC = () => {
  const rows = [
    // --- DIÁMETRO 1/4" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '1"', peso: '0.012', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '1 1/2"', peso: '0.020', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '2"', peso: '0.027', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '2 1/2"', peso: '0.035', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '3"', peso: '0.043', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '3 1/2"', peso: '0.049', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '4"', peso: '0.056', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '4 1/2"', peso: '0.063', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '5"', peso: '0.071', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '5 1/2"', peso: '0.078', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '6"', peso: '0.085', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '7"', peso: '0.098', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '8"', peso: '0.112', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/4"', largo: '10"', peso: '0.140', marca: 'Importado' },

    // --- DIÁMETRO 3/8" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '1"', peso: '0.016', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '1 1/2"', peso: '0.024', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '2"', peso: '0.032', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '2 1/2"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '3"', peso: '0.052', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '3 1/2"', peso: '0.066', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '4"', peso: '0.072', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '4 1/2"', peso: '0.084', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '5"', peso: '0.095', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '5 1/2"', peso: '0.108', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '6"', peso: '0.120', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '7"', peso: '0.142', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '8"', peso: '0.165', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/8"', largo: '10"', peso: '0.210', marca: 'Importado' },

    // --- DIÁMETRO 1/2" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '1"', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '1 1/2"', peso: '0.032', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '2"', peso: '0.044', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '2 1/2"', peso: '0.058', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '3"', peso: '0.073', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '3 1/2"', peso: '0.080', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '4"', peso: '0.087', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '4 1/2"', peso: '0.116', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '5"', peso: '0.145', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '5 1/2"', peso: '0.155', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '6"', peso: '0.166', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '7"', peso: '0.170', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '8"', peso: '0.177', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1/2"', largo: '10"', peso: '0.310', marca: 'Importado' },

    // --- DIÁMETRO 3/4" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '1"', peso: '0.024', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '1 1/2"', peso: '0.044', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '2"', peso: '0.064', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '2 1/2"', peso: '0.088', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '3"', peso: '0.111', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '3 1/2"', peso: '0.122', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '4"', peso: '0.134', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '4 1/2"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '5"', peso: '0.185', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '5 1/2"', peso: '0.205', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '6"', peso: '0.227', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '7"', peso: '0.270', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '8"', peso: '0.315', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3/4"', largo: '10"', peso: '0.400', marca: 'Importado' },

    // --- DIÁMETRO 1" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '1"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '1 1/2"', peso: '0.067', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '2"', peso: '0.089', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '2 1/2"', peso: '0.118', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '3"', peso: '0.148', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '3 1/2"', peso: '0.176', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '4"', peso: '0.204', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '4 1/2"', peso: '0.236', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '5"', peso: '0.268', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '5 1/2"', peso: '0.291', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '6"', peso: '0.314', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '7"', peso: '0.380', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '8"', peso: '0.445', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1"', largo: '10"', peso: '0.560', marca: 'Importado' },

    // --- DIÁMETRO 1 1/4" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '1 1/2"', peso: '0.096', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '2"', peso: '0.128', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '2 1/2"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '3"', peso: '0.195', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '3 1/2"', peso: '0.228', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '4"', peso: '0.260', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '4 1/2"', peso: '0.295', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '5"', peso: '0.330', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '5 1/2"', peso: '0.360', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '6"', peso: '0.390', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '7"', peso: '0.455', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '8"', peso: '0.520', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/4"', largo: '10"', peso: '0.650', marca: 'Importado' },

    // --- DIÁMETRO 1 1/2" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '1 1/2"', peso: '0.097', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '2"', peso: '0.130', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '2 1/2"', peso: '0.218', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '3"', peso: '0.262', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '3 1/2"', peso: '0.304', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '4"', peso: '0.347', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '4 1/2"', peso: '0.380', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '5"', peso: '0.413', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '5 1/2"', peso: '0.468', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '6"', peso: '0.523', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '7"', peso: '0.622', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '8"', peso: '0.721', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '1 1/2"', largo: '10"', peso: '0.873', marca: 'Importado' },

    // --- DIÁMETRO 2" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '2"', peso: '0.205', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '2 1/2"', peso: '0.256', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '3"', peso: '0.324', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '3 1/2"', peso: '0.384', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '4"', peso: '0.444', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '4 1/2"', peso: '0.517', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '5"', peso: '0.591', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '5 1/2"', peso: '0.647', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '6"', peso: '0.704', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '7"', peso: '0.826', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '8"', peso: '0.949', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2"', largo: '10"', peso: '1.213', marca: 'Importado' },
    // --- DIÁMETRO 2 1/2" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '2 1/2"', peso: '0.400', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '3"', peso: '0.480', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '4"', peso: '0.640', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '5"', peso: '0.855', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '6"', peso: '1.066', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '8"', peso: '1.400', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '2 1/2"', largo: '10"', peso: '1.750', marca: 'Importado' },

    // --- DIÁMETRO 3" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '3"', peso: '0.660', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '4"', peso: '0.880', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '5"', peso: '1.106', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '6"', peso: '1.304', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '8"', peso: '1.760', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '10"', peso: '2.210', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '3"', largo: '12"', peso: '2.640', marca: 'Importado' },

    // --- DIÁMETRO 4" ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '4"', peso: '1.250', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '5"', peso: '1.550', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '6"', peso: '1.870', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '8"', peso: '2.500', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '10"', peso: '4.080', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', cedula: 'SCH-40', diametro: '4"', largo: '12"', peso: '4.890', marca: 'Importado' },

  
               
  ];
  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Cédula</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Largo</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.cedula}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.largo}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const ReduccionBushingTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    // Grupo x 1/4"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3/8" x 1/4"', peso: '0.014', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1/2" x 1/4"', peso: '0.024', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3/4" x 1/4"', peso: '0.052', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1" x 1/4"', peso: '0.116', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1/4"', peso: '0.155', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1/4"', peso: '0.180', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1/4"', peso: '0.315', marca: 'Importado' },
    
    // Grupo x 3/8"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1/2" x 3/8"', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3/4" x 3/8"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1" x 3/8"', peso: '0.108', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 3/8"', peso: '0.145', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 3/8"', peso: '0.170', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 3/8"', peso: '0.295', marca: 'Importado' },

    // Grupo x 1/2"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3/4" x 1/2"', peso: '0.029', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1" x 1/2"', peso: '0.096', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1/2"', peso: '0.104', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1/2"', peso: '0.145', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1/2"', peso: '0.245', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1/2"', peso: '0.380', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 1/2"', peso: '0.490', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 1/2"', peso: '1.120', marca: 'Importado' },

    // Grupo x 3/4"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1" x 3/4"', peso: '0.046', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 3/4"', peso: '0.125', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 3/4"', peso: '0.117', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 3/4"', peso: '0.231', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 3/4"', peso: '0.360', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 3/4"', peso: '0.470', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 3/4"', peso: '1.050', marca: 'Importado' },

    // Grupo x 1"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1"', peso: '0.095', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1"', peso: '0.135', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1"', peso: '0.204', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1"', peso: '0.310', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 1"', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 1"', peso: '0.980', marca: 'Importado' },

    // Grupo x 1 1/4"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1 1/4"', peso: '0.153', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1 1/4"', peso: '0.215', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1 1/4"', peso: '0.330', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 1 1/4"', peso: '0.440', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 1 1/4"', peso: '0.940', marca: 'Importado' },

    // Grupo x 1 1/2"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1 1/2"', peso: '0.185', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1 1/2"', peso: '0.305', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 1 1/2"', peso: '0.420', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 1 1/2"', peso: '0.910', marca: 'Importado' },

    // Grupo x 2"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 2"', peso: '0.295', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 2"', peso: '0.420', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 2"', peso: '0.920', marca: 'Importado' },

    // Grupo x 2 1/2"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 2 1/2"', peso: '0.410', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 2 1/2"', peso: '0.880', marca: 'Importado' },

    // Grupo x 3"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 3"', peso: '0.845', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    // Grupo x 1/4"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3/8" x 1/4"', peso: '0.015', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1/2" x 1/4"', peso: '0.024', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3/4" x 1/4"', peso: '0.052', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1" x 1/4"', peso: '0.116', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1/4"', peso: '0.155', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1/4"', peso: '0.180', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1/4"', peso: '0.315', marca: 'Importado' },

    // Grupo x 3/8"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1/2" x 3/8"', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3/4" x 3/8"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1" x 3/8"', peso: '0.108', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 3/8"', peso: '0.145', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 3/8"', peso: '0.170', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 3/8"', peso: '0.295', marca: 'Importado' },

    // Grupo x 1/2"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3/4" x 1/2"', peso: '0.029', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1" x 1/2"', peso: '0.096', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1/2"', peso: '0.104', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1/2"', peso: '0.145', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1/2"', peso: '0.245', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1/2"', peso: '0.380', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 1/2"', peso: '0.490', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 1/2"', peso: '1.120', marca: 'Importado' },

    // Grupo x 3/4"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1" x 3/4"', peso: '0.046', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 3/4"', peso: '0.125', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 3/4"', peso: '0.117', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 3/4"', peso: '0.231', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 3/4"', peso: '0.360', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 3/4"', peso: '0.470', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 3/4"', peso: '1.050', marca: 'Importado' },

    // Grupo x 1"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1"', peso: '0.095', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1"', peso: '0.135', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1"', peso: '0.204', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1"', peso: '0.310', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 1"', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 1"', peso: '0.980', marca: 'Importado' },

    // Grupo x 1 1/4"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1 1/4"', peso: '0.153', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1 1/4"', peso: '0.215', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1 1/4"', peso: '0.330', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 1 1/4"', peso: '0.440', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 1 1/4"', peso: '0.940', marca: 'Importado' },

    // Grupo x 1 1/2"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1 1/2"', peso: '0.185', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1 1/2"', peso: '0.400', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 1 1/2"', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 1 1/2"', peso: '0.910', marca: 'Importado' },

    // Grupo x 2"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 2"', peso: '0.403', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 2"', peso: '0.462', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 2"', peso: '0.920', marca: 'Importado' },

    // Grupo x 2 1/2"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 2 1/2"', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 2 1/2"', peso: '0.890', marca: 'Importado' },

    // Grupo x 3"
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 3"', peso: '0.860', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medidas}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const ReduccionCampanaTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    // Grupo x 1/4"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3/8" x 1/4"', peso: '0.028', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1/2" x 1/4"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3/4" x 1/4"', peso: '0.060', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1" x 1/4"', peso: '0.098', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1/4"', peso: '0.130', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1/4"', peso: '0.175', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1/4"', peso: '0.280', marca: 'Importado' },

    // Grupo x 3/8"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1/2" x 3/8"', peso: '0.048', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3/4" x 3/8"', peso: '0.059', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1" x 3/8"', peso: '0.102', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 3/8"', peso: '0.135', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 3/8"', peso: '0.182', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 3/8"', peso: '0.285', marca: 'Importado' },

    // Grupo x 1/2"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3/4" x 1/2"', peso: '0.070', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1" x 1/2"', peso: '0.043', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1/2"', peso: '0.148', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1/2"', peso: '0.154', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1/2"', peso: '0.279', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 1/2"', peso: '0.580', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 1/2"', peso: '1.050', marca: 'Importado' },

    // Grupo x 3/4"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1" x 3/4"', peso: '0.115', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 3/4"', peso: '0.170', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 3/4"', peso: '0.210', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 3/4"', peso: '0.283', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 3/4"', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 3/4"', peso: '0.595', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 3/4"', peso: '1.080', marca: 'Importado' },

    // Grupo x 1"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1"', peso: '0.185', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1"', peso: '0.225', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1"', peso: '0.300', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1"', peso: '0.465', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 1"', peso: '0.610', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 1"', peso: '1.120', marca: 'Importado' },

    // Grupo x 1 1/4"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1 1/4"', peso: '0.235', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1 1/4"', peso: '0.330', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1 1/4"', peso: '0.480', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 1 1/4"', peso: '0.635', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 1 1/4"', peso: '1.150', marca: 'Importado' },

    // Grupo x 1 1/2"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2" x 1 1/2"', peso: '0.267', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1 1/2"', peso: '0.495', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 1 1/2"', peso: '0.551', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 1 1/2"', peso: '1.185', marca: 'Importado' },

    // Grupo x 2"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 2"', peso: '0.510', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 2"', peso: '0.710', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 2"', peso: '1.210', marca: 'Importado' },

    // Grupo x 2 1/2"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '3" x 2 1/2"', peso: '0.750', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 2 1/2"', peso: '1.230', marca: 'Importado' },

    // Grupo x 3"
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medidas: '4" x 3"', peso: '1.250', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    // (Siguiendo el mismo orden de prioridad derecha)
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3/8" x 1/4"', peso: '0.028', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1/2" x 1/4"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3/4" x 1/4"', peso: '0.060', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1" x 1/4"', peso: '0.098', marca: 'Importado' },
    
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1/2" x 3/8"', peso: '0.048', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3/4" x 3/8"', peso: '0.059', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1" x 3/8"', peso: '0.102', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3/4" x 1/2"', peso: '0.070', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1" x 1/2"', peso: '0.105', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1/2"', peso: '0.148', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1/2"', peso: '0.154', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1/2"', peso: '0.279', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1/2"', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 1/2"', peso: '0.580', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1" x 3/4"', peso: '0.115', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 3/4"', peso: '0.170', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 3/4"', peso: '0.210', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 3/4"', peso: '0.283', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 3/4"', peso: '0.470', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 3/4"', peso: '0.610', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/4" x 1"', peso: '0.185', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1"', peso: '0.225', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1"', peso: '0.300', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1"', peso: '0.485', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 1"', peso: '0.640', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 1"', peso: '1.120', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '1 1/2" x 1 1/4"', peso: '0.235', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1 1/4"', peso: '0.330', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1 1/4"', peso: '0.495', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 1 1/4"', peso: '0.670', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 1 1/4"', peso: '1.160', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2" x 1 1/2"', peso: '0.355', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 1 1/2"', peso: '0.510', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 1 1/2"', peso: '0.690', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 1 1/2"', peso: '1.185', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '2 1/2" x 2"', peso: '0.510', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 2"', peso: '0.710', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 2"', peso: '1.210', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '3" x 2 1/2"', peso: '0.730', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 2 1/2"', peso: '1.230', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero Inoxidable', medidas: '4" x 3"', peso: '1.250', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medidas}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ReduccionConcentricaSanitariaTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    // Grupo x 1/2"
    { calidad: 'C-304', acabado: 'Brillante', medidas: '3/4" x 1/2"', espesor: '1.65 mm', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '1" x 1/2"', espesor: '1.65 mm', peso: '0.037', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '1 1/2" x 1/2"', espesor: '1.65 mm', peso: '0.085', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '2" x 1/2"', espesor: '1.65 mm', peso: '0.145', marca: 'Importado' },

    // Grupo x 3/4"
    { calidad: 'C-304', acabado: 'Brillante', medidas: '1" x 3/4"', espesor: '1.65 mm', peso: '0.017', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '1 1/2" x 3/4"', espesor: '1.65 mm', peso: '0.065', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '2" x 3/4"', espesor: '1.65 mm', peso: '0.125', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '2 1/2" x 3/4"', espesor: '1.65 mm', peso: '0.190', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '3" x 3/4"', espesor: '1.65 mm', peso: '0.275', marca: 'Importado' },

    // Grupo x 1"
    { calidad: 'C-304', acabado: 'Brillante', medidas: '1 1/2" x 1"', espesor: '1.65 mm', peso: '0.046', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '2" x 1"', espesor: '1.65 mm', peso: '0.167', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '2 1/2" x 1"', espesor: '1.65 mm', peso: '0.175', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '3" x 1"', espesor: '1.65 mm', peso: '0.255', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '4" x 1"', espesor: '1.65 mm', peso: '0.450', marca: 'Importado' },

    // Grupo x 1 1/2"
    { calidad: 'C-304', acabado: 'Brillante', medidas: '2" x 1 1/2"', espesor: '1.65 mm', peso: '0.066', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '2 1/2" x 1 1/2"', espesor: '1.65 mm', peso: '0.120', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '3" x 1 1/2"', espesor: '1.65 mm', peso: '0.205', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '4" x 1 1/2"', espesor: '1.65 mm', peso: '0.410', marca: 'Importado' },

    // Grupo x 2"
    { calidad: 'C-304', acabado: 'Brillante', medidas: '2 1/2" x 2"', espesor: '1.65 mm', peso: '0.075', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '3" x 2"', espesor: '1.65 mm', peso: '0.213', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Brillante', medidas: '4" x 2"', espesor: '1.65 mm', peso: '0.360', marca: 'Importado' },

    // Grupo x 2 1/2"
    { calidad: 'C-304', acabado: 'Brillante', medidas: '3" x 2 1/2"', espesor: '1.65 mm', peso: '0.166', marca: 'Importado' },

    // Grupo x 3"
    { calidad: 'C-304', acabado: 'Brillante', medidas: '4" x 3"', espesor: '1.65 mm', peso: '0.311', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    // Grupo x 1/2"
    { calidad: 'C-316', acabado: 'Brillante', medidas: '3/4" x 1/2"', espesor: '1.65 mm', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '1" x 1/2"', espesor: '1.65 mm', peso: '0.037', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '1 1/2" x 1/2"', espesor: '1.65 mm', peso: '0.085', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '2" x 1/2"', espesor: '1.65 mm', peso: '0.145', marca: 'Importado' },

    // Grupo x 3/4"
    { calidad: 'C-316', acabado: 'Brillante', medidas: '1" x 3/4"', espesor: '1.65 mm', peso: '0.017', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '1 1/2" x 3/4"', espesor: '1.65 mm', peso: '0.065', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '2" x 3/4"', espesor: '1.65 mm', peso: '0.125', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '2 1/2" x 3/4"', espesor: '1.65 mm', peso: '0.190', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '3" x 3/4"', espesor: '1.65 mm', peso: '0.275', marca: 'Importado' },

    // Grupo x 1"
    { calidad: 'C-316', acabado: 'Brillante', medidas: '1 1/2" x 1"', espesor: '1.65 mm', peso: '0.046', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '2" x 1"', espesor: '1.65 mm', peso: '0.167', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '2 1/2" x 1"', espesor: '1.65 mm', peso: '0.175', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '3" x 1"', espesor: '1.65 mm', peso: '0.255', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '4" x 1"', espesor: '1.65 mm', peso: '0.450', marca: 'Importado' },

    // Grupo x 1 1/2"
    { calidad: 'C-316', acabado: 'Brillante', medidas: '2" x 1 1/2"', espesor: '1.65 mm', peso: '0.066', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '2 1/2" x 1 1/2"', espesor: '1.65 mm', peso: '0.120', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '3" x 1 1/2"', espesor: '1.65 mm', peso: '0.205', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '4" x 1 1/2"', espesor: '1.65 mm', peso: '0.410', marca: 'Importado' },

    // Grupo x 2"
    { calidad: 'C-316', acabado: 'Brillante', medidas: '2 1/2" x 2"', espesor: '1.65 mm', peso: '0.075', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '3" x 2"', espesor: '1.65 mm', peso: '0.213', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Brillante', medidas: '4" x 2"', espesor: '1.65 mm', peso: '0.360', marca: 'Importado' },

    // Grupo x 2 1/2"
    { calidad: 'C-316', acabado: 'Brillante', medidas: '3" x 2 1/2"', espesor: '1.65 mm', peso: '0.166', marca: 'Importado' },

    // Grupo x 3"
    { calidad: 'C-316', acabado: 'Brillante', medidas: '4" x 3"', espesor: '1.65 mm', peso: '0.311', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medidas}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const ReduccionConcentricaSoldableTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    // Grupo x 1/2"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '3/4" x 1/2"', cedula: 'SCH 40', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1" x 1/2"', cedula: 'SCH 40', peso: '0.236', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1 1/4" x 1/2"', cedula: 'SCH 40', peso: '0.290', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1 1/2" x 1/2"', cedula: 'SCH 40', peso: '0.360', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2" x 1/2"', cedula: 'SCH 40', peso: '0.436', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2 1/2" x 1/2"', cedula: 'SCH 40', peso: '0.540', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '3" x 1/2"', cedula: 'SCH 40', peso: '0.710', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '4" x 1/2"', cedula: 'SCH 40', peso: '1.210', marca: 'Importado' },

    // Grupo x 3/4"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1" x 3/4"', cedula: 'SCH 40', peso: '0.016', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1 1/4" x 3/4"', cedula: 'SCH 40', peso: '0.310', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1 1/2" x 3/4"', cedula: 'SCH 40', peso: '0.237', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2" x 3/4"', cedula: 'SCH 40', peso: '0.340', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2 1/2" x 3/4"', cedula: 'SCH 40', peso: '0.580', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '3" x 3/4"', cedula: 'SCH 40', peso: '0.740', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '4" x 3/4"', cedula: 'SCH 40', peso: '1.250', marca: 'Importado' },

    // Grupo x 1"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1 1/4" x 1"', cedula: 'SCH 40', peso: '0.330', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1 1/2" x 1"', cedula: 'SCH 40', peso: '0.250', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2" x 1"', cedula: 'SCH 40', peso: '0.427', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2 1/2" x 1"', cedula: 'SCH 40', peso: '0.620', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '3" x 1"', cedula: 'SCH 40', peso: '0.752', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '4" x 1"', cedula: 'SCH 40', peso: '1.280', marca: 'Importado' },

    // Grupo x 1 1/4"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '1 1/2" x 1 1/4"', cedula: 'SCH 40', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2" x 1 1/4"', cedula: 'SCH 40', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2 1/2" x 1 1/4"', cedula: 'SCH 40', peso: '0.650', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '3" x 1 1/4"', cedula: 'SCH 40', peso: '0.780', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '4" x 1 1/4"', cedula: 'SCH 40', peso: '1.310', marca: 'Importado' },

    // Grupo x 1 1/2"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2" x 1 1/2"', cedula: 'SCH 40', peso: '0.382', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2 1/2" x 1 1/2"', cedula: 'SCH 40', peso: '0.510', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '3" x 1 1/2"', cedula: 'SCH 40', peso: '0.740', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '4" x 1 1/2"', cedula: 'SCH 40', peso: '1.310', marca: 'Importado' },

    // Grupo x 2"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '2 1/2" x 2"', cedula: 'SCH 40', peso: '0.680', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '3" x 2"', cedula: 'SCH 40', peso: '0.196', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '4" x 2"', cedula: 'SCH 40', peso: '1.330', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '5" x 2"', cedula: 'SCH 40', peso: '2.100', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '6" x 2"', cedula: 'SCH 40', peso: '2.950', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '8" x 2"', cedula: 'SCH 40', peso: '4.800', marca: 'Importado' },

    // Grupo x 2 1/2"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '3" x 2 1/2"', cedula: 'SCH 40', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '4" x 2 1/2"', cedula: 'SCH 40', peso: '1.380', marca: 'Importado' },

    // Grupo x 3"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '4" x 3"', cedula: 'SCH 40', peso: '1.510', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '5" x 3"', cedula: 'SCH 40', peso: '2.350', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '6" x 3"', cedula: 'SCH 40', peso: '3.100', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '8" x 3"', cedula: 'SCH 40', peso: '5.100', marca: 'Importado' },

    // Grupo x 4"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '5" x 4"', cedula: 'SCH 40', peso: '2.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '6" x 4"', cedula: 'SCH 40', peso: '3.400', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '8" x 4"', cedula: 'SCH 40', peso: '5.450', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '10" x 4"', cedula: 'SCH 40', peso: '8.200', marca: 'Importado' },

    // Grupo x 5"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '6" x 5"', cedula: 'SCH 40', peso: '3.650', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '8" x 5"', cedula: 'SCH 40', peso: '5.800', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '10" x 5"', cedula: 'SCH 40', peso: '8.600', marca: 'Importado' },

    // Grupo x 6"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '8" x 6"', cedula: 'SCH 40', peso: '6.150', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '10" x 6"', cedula: 'SCH 40', peso: '9.200', marca: 'Importado' },

    // Grupo x 8"
    { calidad: 'C-304', acabado: 'Acero inoxidable', medidas: '10" x 8"', cedula: 'SCH 40', peso: '10.500', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '3/4" x 1/2"', cedula: 'SCH 40', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '1" x 1/2"', cedula: 'SCH 40', peso: '0.236', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '1 1/2" x 1/2"', cedula: 'SCH 40', peso: '0.360', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2" x 1/2"', cedula: 'SCH 40', peso: '0.436', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2 1/2" x 1/2"', cedula: 'SCH 40', peso: '0.540', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '3" x 1/2"', cedula: 'SCH 40', peso: '0.710', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '4" x 1/2"', cedula: 'SCH 40', peso: '1.210', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '1" x 3/4"', cedula: 'SCH 40', peso: '0.016', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '1 1/4" x 3/4"', cedula: 'SCH 40', peso: '0.310', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '1 1/2" x 3/4"', cedula: 'SCH 40', peso: '0.237', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2" x 3/4"', cedula: 'SCH 40', peso: '0.340', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2 1/2" x 3/4"', cedula: 'SCH 40', peso: '0.580', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '3" x 3/4"', cedula: 'SCH 40', peso: '0.740', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '4" x 3/4"', cedula: 'SCH 40', peso: '1.250', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '1 1/4" x 1"', cedula: 'SCH 40', peso: '0.330', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '1 1/2" x 1"', cedula: 'SCH 40', peso: '0.046', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2" x 1"', cedula: 'SCH 40', peso: '0.168', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2 1/2" x 1"', cedula: 'SCH 40', peso: '0.620', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '3" x 1"', cedula: 'SCH 40', peso: '0.752', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '4" x 1"', cedula: 'SCH 40', peso: '1.280', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '1 1/2" x 1 1/4"', cedula: 'SCH 40', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2" x 1 1/4"', cedula: 'SCH 40', peso: '0.450', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2 1/2" x 1 1/4"', cedula: 'SCH 40', peso: '0.650', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '3" x 1 1/4"', cedula: 'SCH 40', peso: '0.780', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '4" x 1 1/4"', cedula: 'SCH 40', peso: '1.310', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2" x 1 1/2"', cedula: 'SCH 40', peso: '0.064', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2 1/2" x 1 1/2"', cedula: 'SCH 40', peso: '0.510', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '3" x 1 1/2"', cedula: 'SCH 40', peso: '0.740', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '4" x 1 1/2"', cedula: 'SCH 40', peso: '1.310', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '2 1/2" x 2"', cedula: 'SCH 40', peso: '0.680', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '3" x 2"', cedula: 'SCH 40', peso: '0.196', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '4" x 2"', cedula: 'SCH 40', peso: '1.330', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '3" x 2 1/2"', cedula: 'SCH 40', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '4" x 2 1/2"', cedula: 'SCH 40', peso: '1.380', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero inoxidable', medidas: '4" x 3"', cedula: 'SCH 40', peso: '1.510', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas</th>
            <th className="border border-blue-500 px-3 py-2">Cédula</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medidas}</td>
              <td className="px-3 py-2">{r.cedula}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TapaBombinTable: React.FC = () => {
  const rows = [
    { acabado: 'Acero al carbono', medida: '1/2"', peso: '0.002', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '5/8"', peso: '0.003', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '3/4"', peso: '0.005', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '7/8"', peso: '0.007', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '1"', peso: '0.009', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '1 1/4"', peso: '0.017', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '1 1/2"', peso: '0.024', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '2"', peso: '0.039', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '2 1/2"', peso: '0.046', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '42 mm', peso: '0.046', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { acabado: 'Acero al carbono', medida: '58 mm', peso: '0.046', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TapaBombaTable: React.FC = () => {
  const rows = [
    // --- ACERO INOXIDABLE C-304 ---
    { calidad: 'C-304', acabado: 'Acero Inoxidable 2B', medida: '380 mm', peso: '1.450', espesor: '1.5 mm', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable 2B', medida: '380 mm', peso: '1.920', espesor: '2.0 mm', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable 2B', medida: '380 mm', peso: '2.880', espesor: '3.0 mm', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable 2B', medida: '465 mm', peso: '2.950', espesor: '2.0 mm', marca: 'Fabricación Nacional' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable 2B', medida: '465 mm', peso: '4.420', espesor: '3.0 mm', marca: 'Fabricación Nacional' },

    // --- ACERO INOXIDABLE C-316 ---
    { calidad: 'C-316', acabado: 'Acero Inoxidable 2B', medida: '465 mm', peso: '4.420', espesor: '3.0 mm', marca: 'Fabricación Nacional' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable 2B', medida: '570 mm', peso: '4.600', espesor: '2.0 mm', marca: 'Fabricación Nacional' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable 2B', medida: '570 mm', peso: '6.900', espesor: '3.0 mm', marca: 'Fabricación Nacional' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Espesor</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TapaBomaCapTable: React.FC = () => {
  // Fabricación Nacional
  const rows = [
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '1/2"', peso: '0.054', marca: 'Importado' },
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '3/4"', peso: '0.070', marca: 'Importado' },
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '1"', peso: '0.120', marca: 'Importado' },
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '1 1/4"', peso: '0.170', marca: 'Importado' },
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '1 1/2"', peso: '0.220', marca: 'Importado' },
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '2"', peso: '0.360', marca: 'Importado' },
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '2 1/2"', peso: '0.650', marca: 'Importado' },
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '3"', peso: '1.050', marca: 'Importado' },
    { acabado: 'Acero al carbono', cedula: 'SCH-40', medida: '4"', peso: '1.850', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Cédula</th>
            <th className="border border-blue-500 px-3 py-2">Medida</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.cedula}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const TapaCiegaClampTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1/2"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3/4"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1"', peso: '0.081', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/4"', peso: '0.081', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/2"', peso: '0.081', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2"', peso: '0.133', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2 1/2"', peso: '0.202', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3"', peso: '0.287', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '4"', peso: '0.593', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '5"', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '6"', peso: '1.240', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1/2"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3/4"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1"', peso: '0.081', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1 1/4"', peso: '0.081', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1 1/2"', peso: '0.081', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '2"', peso: '0.133', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '2 1/2"', peso: '0.202', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3"', peso: '0.287', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '4"', peso: '0.593', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '5"', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '6"', peso: '1.240', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TapaConRoscaHembraTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1/4"', peso: '0.019', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3/8"', peso: '0.028', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1/2"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3/4"', peso: '0.065', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/4"', peso: '0.180', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/2"', peso: '0.220', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2"', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2 1/2"', peso: '0.620', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3"', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '4"', peso: '1.450', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1/4"', peso: '0.019', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3/8"', peso: '0.028', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1/2"', peso: '0.045', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3/4"', peso: '0.065', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1 1/4"', peso: '0.180', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1 1/2"', peso: '0.220', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '2"', peso: '0.350', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '2 1/2"', peso: '0.620', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3"', peso: '0.850', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '4"', peso: '1.450', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TapaHexagonalConRoscaMachoTable: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1/4"', peso: '0.009', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3/8"', peso: '0.023', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1/2"', peso: '0.024', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3/4"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1"', peso: '0.056', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/4"', peso: '0.092', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '1 1/2"', peso: '0.130', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2"', peso: '0.210', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '2 1/2"', peso: '0.440', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '3"', peso: '0.620', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero Inoxidable', medida: '4"', peso: '1.050', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1/4"', peso: '0.009', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3/8"', peso: '0.023', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1/2"', peso: '0.024', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3/4"', peso: '0.040', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1"', peso: '0.056', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1 1/4"', peso: '0.092', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '1 1/2"', peso: '0.130', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '2"', peso: '0.210', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '2 1/2"', peso: '0.440', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '3"', peso: '0.620', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero Inoxidable', medida: '4"', peso: '1.050', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medida (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2 ">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2 ">{r.medida}</td>
              <td className="px-3 py-2 ">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const VarillasTable: React.FC = () => {
  const rows = [
    // --- ACERO AL CARBONO ---
    { calidad: 'ER70S-6', acabado: 'Acero de carbono', espesor: '1.6', largo: '1000', peso: '0.016', marca: 'INDURA' },
    { calidad: 'ER70S-6', acabado: 'Acero de carbono', espesor: '2.4', largo: '1000', peso: '0.035', marca: 'INDURA' },
    { calidad: 'ER70S-6', acabado: 'Acero de carbono', espesor: '3.2', largo: '1000', peso: '0.063', marca: 'INDURA' },
    
    // --- ACERO INOXIDABLE C-308L ---
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '0.8', largo: '1000', peso: '0.004', marca: 'BÖHLER' },
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '1.0', largo: '1000', peso: '0.006', marca: 'BÖHLER' },
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '1.2', largo: '1000', peso: '0.009', marca: 'BÖHLER' },
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '1.6', largo: '1000', peso: '0.016', marca: 'BÖHLER' },
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '2.4', largo: '1000', peso: '0.036', marca: 'BÖHLER' },
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '3.2', largo: '1000', peso: '0.064', marca: 'BÖHLER' },
    
    // --- ACERO INOXIDABLE C-316L ---
    { calidad: 'ER-316L', acabado: 'Acero inoxidable', espesor: '1.6', largo: '1000', peso: '0.016', marca: 'BÖHLER' },
    { calidad: 'ER-316L', acabado: 'Acero inoxidable', espesor: '2.4', largo: '1000', peso: '0.036', marca: 'BÖHLER' },
    { calidad: 'ER-316L', acabado: 'Acero inoxidable', espesor: '3.2', largo: '1000', peso: '0.064', marca: 'BÖHLER' },
    
    // --- ALUMINIO (ER-4043) ---
    { calidad: 'ER-4043', acabado: 'Aluminio', espesor: '1.6', largo: '1000', peso: '0.005', marca: 'SUPERON' },
    { calidad: 'ER-4043', acabado: 'Aluminio', espesor: '2.4', largo: '1000', peso: '0.012', marca: 'SUPERON' },
    { calidad: 'ER-4043', acabado: 'Aluminio', espesor: '3.2', largo: '1000', peso: '0.022', marca: 'SUPERON' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Espesor (mm)</th>
            <th className="border border-blue-500 px-3 py-2">Largo (mm)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.largo}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RolloTable: React.FC = () => {
  const rows = [
    // --- ACERO INOXIDABLE ER-308L ---
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '0.8', peso: '5.00', marca: 'SUPERON' },
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '1.0', peso: '5.00', marca: 'SUPERON' },
    { calidad: 'ER-308L', acabado: 'Acero inoxidable', espesor: '1.2', peso: '5.00', marca: 'SUPERON' },

    // --- ACERO INOXIDABLE ER-316L ---
    { calidad: 'ER-316L', acabado: 'Acero inoxidable', espesor: '0.8', peso: '5.00', marca: 'SUPERON' },
    { calidad: 'ER-316L', acabado: 'Acero inoxidable', espesor: '1.0', peso: '5.00', marca: 'SUPERON' },
    { calidad: 'ER-316L', acabado: 'Acero inoxidable', espesor: '1.2', peso: '5.00', marca: 'SUPERON' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Espesor (mm)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca del producto</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.espesor}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const AbrazaderasRegulablesTable: React.FC = () => {
  const rows = [
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1/2" (11–14)', peso: '0.006', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '3/4" (11.2–19.8)', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1" (14.2–26.9)', peso: '0.008', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1 1/4" (17–32)', peso: '0.019', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1 1/2" (21–38)', peso: '0.019', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '2" (27–51)', peso: '0.021', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca del producto</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ClampASITable: React.FC = () => {
  const rows = [
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1/2"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '3/4"', peso: '0.160', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1 1/4"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1 1/2"', peso: '0.110', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '2"', peso: '0.148', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '2 1/2"', peso: '0.417', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '3"', peso: '0.448', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '4"', peso: '0.278', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca del producto</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdaptadoresTable: React.FC = () => {
  const rows = [
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1/4"', peso: '0.018', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '3/8"', peso: '0.020', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1/2"', peso: '0.059', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '3/4"', peso: '0.092', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1"', peso: '0.073', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1 1/4"', peso: '0.152', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1 1/2"', peso: '0.182', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '2"', peso: '0.250', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca del producto</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdaptadoresVariosTable: React.FC = () => {
  const rows = [
    { acabado: 'Metal',medidas:'M-14 x 1"', producto: 'Adaptador Para Rueda Flap', peso: '0.255', marca: 'Fabricación Nacional' },
    { acabado: 'Metal',medidas:'1/2" x 1"', producto: 'Adaptador Para Rueda Light Finish', peso: '0.288', marca: 'Fabricación Nacional' },
    { acabado: 'Metal',medidas:'1/2" x 3"', producto: 'Adaptador para disco Jeans', peso: '0.357', marca: 'Fabricación Nacional' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Medidas</th>
            <th className="border border-blue-500 px-3 py-2">Producto</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca del producto</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.medidas}</td>
              <td className="px-3 py-2">{r.producto}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BridaSlipTable: React.FC = () => {
  const rows = [
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '3/4"', peso: '0.45', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1"', peso: '0.85', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1 1/4"', peso: '1.05', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '1 1/2"', peso: '1.38', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '2"', peso: '2.04', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '3"', peso: '3.95', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', diametro: '4"', peso: '5.36', marca: 'Importado' },

    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '1/2"', peso: '0.35', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '3/4"', peso: '0.624', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '1"', peso: '0.90', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '1 1/4"', peso: '1.10', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '1 1/2"', peso: '1.45', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '2"', peso: '2.150', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '3"', peso: '3.950', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', diametro: '4"', peso: '5.600', marca: 'Importado' },

    { calidad: 'A105', acabado: 'Acero al carbono', diametro: '1"', peso: '0.90', marca: 'Importado' },
    { calidad: 'A105', acabado: 'Acero al carbono', diametro: '1 1/4"', peso: '1.10', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Marca del producto</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CodoRoscaTable1: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '1/4"', peso: '0.028', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '3/8"', peso: '0.034', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '1/2"', peso: '0.062', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '3/4"', peso: '0.041', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '1"', peso: '0.063', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '1 1/4"', peso: '0.124', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '1 1/2"', peso: '0.135', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '2"', peso: '0.182', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '2 1/2"', peso: '0.340', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '3"', peso: '0.520', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '45°', medida: '4"', peso: '0.960', presion: '150 LBS', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '1/4"', peso: '0.030', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '3/8"', peso: '0.063', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '1/2"', peso: '0.093', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '3/4"', peso: '0.118', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '1"', peso: '0.220', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '1 1/4"', peso: '0.226', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '1 1/2"', peso: '0.290', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '2"', peso: '0.320', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '2 1/2"', peso: '0.380', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '3"', peso: '0.580', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '45°', medida: '4"', peso: '1.020', presion: '150 LBS', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Grado</th>
            <th className="border border-blue-500 px-3 py-2">Medida</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/und)</th>
            <th className="border border-blue-500 px-3 py-2">Presión</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.grado}</td>
              <td className="px-3 py-2">{r.medida}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.presion}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const CodoRoscaTable2: React.FC = () => {
  const rows = [
    // --- CALIDAD C-304 ---
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '1/4"', peso: '0.026', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '3/8"', peso: '0.040', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '1/2"', peso: '0.062', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '3/4"', peso: '0.096', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '1"', peso: '0.108', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '1 1/4"', peso: '0.283', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '1 1/2"', peso: '0.458', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '2"', peso: '0.633', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '2 1/2"', peso: '0.890', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '3"', peso: '1.181', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-304', acabado: 'Acero inoxidable', grado: '90°', diametro: '4"', peso: '1.816', presion: '150 LBS', marca: 'Importado' },

    // --- CALIDAD C-316 ---
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '1/4"', peso: '0.031', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '3/8"', peso: '0.034', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '1/2"', peso: '0.084', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '3/4"', peso: '0.061', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '1"', peso: '0.050', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '1 1/4"', peso: '0.147', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '1 1/2"', peso: '0.190', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '2"', peso: '0.477', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '2 1/2"', peso: '0.740', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '3"', peso: '1.181', presion: '150 LBS', marca: 'Importado' },
    { calidad: 'C-316', acabado: 'Acero inoxidable', grado: '90°', diametro: '4"', peso: '1.871', presion: '150 LBS', marca: 'Importado' },
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-blue-500 px-3 py-2">Calidad</th>
            <th className="border border-blue-500 px-3 py-2">Acabado</th>
            <th className="border border-blue-500 px-3 py-2">Grado</th>
            <th className="border border-blue-500 px-3 py-2">Diámetro (Pulg)</th>
            <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
            <th className="border border-blue-500 px-3 py-2">Presión</th>
            <th className="border border-blue-500 px-3 py-2">Marca</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className={`border border-blue-500 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="px-3 py-2">{r.calidad}</td>
              <td className="px-3 py-2">{r.acabado}</td>
              <td className="px-3 py-2">{r.grado}</td>
              <td className="px-3 py-2">{r.diametro}</td>
              <td className="px-3 py-2">{r.peso}</td>
              <td className="px-3 py-2">{r.presion}</td>
              <td className="px-3 py-2">{r.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const matches = (text: string, query: string): boolean => {
  return text.toLowerCase().includes(query.toLowerCase());
};

export const ElectrodoVarillaPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { tiposElectrodos: true, varillas: true, rollo: true };
    return {
      tiposElectrodos: matches('Tipos de Electrodos', q),
      varillas: matches('Tipos de varillas', q),
      rollo: matches('Rollo Proceso Mig', q),
    };
  }, [query]);

  const hasResults = filtered.tiposElectrodos || filtered.varillas || filtered.rollo;

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">ELECTRODOS DE VARILLA</h2>
        <p className="text-sm text-gray-700 text-center mb-6">
          Aquí encontrarás las especificaciones técnicas de nuestros electrodos de varilla, incluyendo el tipo de electrodo, material, espesor y peso por unidad. 
          Contamos con electrodos para acero al carbono y acero inoxidable, garantizando calidad y resistencia.
        </p>

        <div className="max-w-xl mx-auto mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tabla por nombre..."
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {!hasResults ? (
          <div className="text-gray-500 text-center">No se encontraron tablas para la búsqueda.</div>
        ) : (
          <>
            {filtered.tiposElectrodos && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600">TIPOS DE ELECTRODOS</h3>
                  </div>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img
                    src={imgElectrodos}
                    alt="Electrodos"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <TiposElectrodosTable />
              </div>
            )}
            {filtered.varillas && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600">APORTE TIG</h3>
                  </div>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img
                    src={imgRollo}
                    alt="Varillas"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <VarillasTable />
              </div>
            )}
            {filtered.rollo && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600">ROLLO PROCESO MIG</h3>
                  </div>
                </div>
                <div className="text-center mb-2 h-28 flex items-center justify-center">
                  <img
                    src={imgVarillas}
                    alt="Rollo"
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <RolloTable />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

