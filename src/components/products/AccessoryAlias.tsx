import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Normaliza el segmento después de /productos/accesorios/ a un slug existente
// Ejemplos:
//   "Discos/Limpieza" -> "discos-limpieza"
//   "Perforado Rosca" -> "perforado-rosca"
//   "Aluminio y Antorcha" -> "aluminio-antorcha"
//   "Decorativos" -> "decorativos"
//   "Ajustes" -> "ajustes"
//   "Industriales" -> "industriales"
//   "Electrodo de Varilla" -> "electrodo-de-varilla"
const AccessoryAlias: React.FC = () => {
  const location = useLocation();
  // path completo, p.e. /productos/accesorios/Discos/Limpieza
  const full = decodeURIComponent(location.pathname);
  const base = '/productos/accesorios/';
  let tail = '';
  if (full.toLowerCase().startsWith(base)) {
    tail = full.slice(base.length);
  }
  // Reemplaza separadores '/' por '-', y espacios múltiples por '-'
  let slug = tail
    .replace(/\\/g, '/')
    .split('/')
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Normalizaciones específicas
  if (slug === 'discos-limpieza') slug = 'discos-limpieza';
  if (slug === 'perforado-rosca') slug = 'perforado-rosca';
  if (slug === 'aluminio-y-antorcha' || slug === 'aluminio-antorcha') slug = 'aluminio-antorcha';
  if (slug === 'decorativos') slug = 'decorativos';
  if (slug === 'ajustes') slug = 'ajustes';
  if (slug === 'industriales') slug = 'industriales';
  if (slug === 'electrodo-de-varilla') slug = 'electrodo-de-varilla';

  if (!slug) {
    // Si no hay segmento, redirige a /productos/accesorios (página de accesorios general)
    return <Navigate to="/productos/accesorios" replace />;
  }

  // Redirige a la ruta de colección ya existente
  return <Navigate to={`/productos/${slug}`} replace />;
};

export default AccessoryAlias;
