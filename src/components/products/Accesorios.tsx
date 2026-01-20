import React from 'react';

const Accesorios: React.FC = () => {
  // RUEDITA MIL HOJAS (resumen normalizado a partir del texto)
  const rueditasMilHojas = [
    { diametroPulg: '2"', diametroMM: 50.8, grano: 40, pesoKg: 0.034, marca: 'KLINGSPOR' },
    { diametroPulg: '2"', diametroMM: 50.8, grano: 60, pesoKg: 0.033, marca: 'KLINGSPOR' },
    { diametroPulg: '2"', diametroMM: 50.8, grano: 80, pesoKg: 0.034, marca: 'KLINGSPOR' },
    { diametroPulg: '2"', diametroMM: 50.8, grano: 120, pesoKg: 0.033, marca: 'KLINGSPOR' },
    { diametroPulg: '2"', diametroMM: 50.8, grano: 150, pesoKg: 0.033, marca: 'KLINGSPOR' },
    { diametroPulg: '2"', diametroMM: 50.8, grano: 180, pesoKg: 0.033, marca: 'KLINGSPOR' },
    { diametroPulg: '2"', diametroMM: 50.8, grano: 240, pesoKg: 0.033, marca: 'KLINGSPOR' },
    { diametroPulg: '2 1/4"', diametroMM: 57.15, grano: 40, pesoKg: 0.078, marca: 'KLINGSPOR' },
    { diametroPulg: '2 1/4"', diametroMM: 57.15, grano: 60, pesoKg: 0.076, marca: 'KLINGSPOR' },
    { diametroPulg: '2 1/4"', diametroMM: 57.15, grano: 80, pesoKg: 0.076, marca: 'KLINGSPOR' },
    { diametroPulg: '2 1/4"', diametroMM: 57.15, grano: 120, pesoKg: undefined, marca: 'KLINGSPOR' },
    { diametroPulg: '3"', diametroMM: 76.2, grano: 40, pesoKg: 0.137, marca: 'KLINGSPOR' },
    { diametroPulg: '3"', diametroMM: 76.2, grano: 60, pesoKg: 0.138, marca: 'KLINGSPOR' },
    { diametroPulg: '3"', diametroMM: 76.2, grano: 80, pesoKg: 0.137, marca: 'KLINGSPOR' },
    { diametroPulg: '3"', diametroMM: 76.2, grano: 120, pesoKg: 0.133, marca: 'KLINGSPOR' }
  ];

  // SOPORTE DE PARED PLATINA ACERO INOX C-304
  const soportesPared = [
    { diametroPulg: '1"', diametroMM: 25.40, pesoKg: 0.067, marca: 'N/T' },
    { diametroPulg: '1/4"', diametroMM: 6.35, pesoKg: 0.083, marca: 'N/T' }
  ];

  // ARANDELA PLANA DE ACERO INOXIDABLE C-304
  const arandelasPlanas = [
    { diametro: '5/32"', espesorMM: undefined, pesoKg: undefined, marca: 'N/T' },
    { diametro: '3/16"', espesorMM: undefined, pesoKg: 0.001, marca: 'N/T' },
    { diametro: '1/4"', espesorMM: undefined, pesoKg: undefined, marca: 'N/T' },
    { diametro: '5/16"', espesorMM: undefined, pesoKg: 0.002, marca: 'N/T' },
    { diametro: '3/8"', espesorMM: undefined, pesoKg: 0.003, marca: 'N/T' },
    { diametro: '1/2"', espesorMM: undefined, pesoKg: 0.007, marca: 'N/T' },
    { diametro: '5/8"', espesorMM: 2.00, pesoKg: 0.010, marca: 'N/T' },
    { diametro: '3/4"', espesorMM: undefined, pesoKg: undefined, marca: 'N/T' },
    { diametro: '7/8"', espesorMM: undefined, pesoKg: undefined, marca: 'N/T' },
    { diametro: '1 1/4"', espesorMM: undefined, pesoKg: 0.070, marca: 'N/T' }
  ];

  // ADAPTADOR PARA MANGUERA A. INOX C-304
  const adaptadoresManguera = [
    { diametro: '1/4"', pesoKg: 0.018, marca: 'N/T' },
    { diametro: '3/8"', pesoKg: 0.020, marca: 'N/T' },
    { diametro: '1/2"', pesoKg: 0.059, marca: 'N/T' },
    { diametro: '3/4"', pesoKg: 0.092, marca: 'N/T' },
    { diametro: '1"', pesoKg: 0.073, marca: 'N/T' },
    { diametro: '1 1/4"', pesoKg: 0.152, marca: 'N/T' },
    { diametro: '1 1/2"', pesoKg: 0.182, marca: 'N/T' },
    { diametro: '2"', pesoKg: 0.317, marca: 'N/T' }
  ];

  // REDUCCIONES/ADAPTADORES (medidas compuestas)
  const reduccionesInox = [
    { entrada: '2"', salida: '1 1/4"', pesoKg: undefined, marca: 'N/T' },
    { entrada: '2"', salida: '1 1/2"', pesoKg: 0.267, marca: 'N/T' },
    { entrada: '3"', salida: '1 1/2"', pesoKg: 0.551, marca: 'N/T' },
    { entrada: '2 1/2"', salida: '2"', pesoKg: undefined, marca: 'N/T' },
    { entrada: '3"', salida: '2"', pesoKg: 0.71, marca: 'N/T' }
  ];

  // VÁLVULA TIPO COMPUERTA ACERO INOX C-304
  const valvulasCompuerta = [
    { medida: '4"', pesoKg: undefined, marca: 'N/T' }
  ];

  // DISCOS / ACCESORIOS DE PULIDO
  const discosPulido = [
    { producto: 'Disco de pulir 115mm de lana', medida: '4 1/2"', pesoKg: undefined, marca: 'NORTON' },
    { producto: 'Discos jeans azul con pabilo', medida: '10 cm', pesoKg: 0.058, marca: 'NORTON' },
    { producto: 'Discos jeans azul con pabilo', medida: '12 cm', pesoKg: 0.09, marca: 'NORTON' },
    { producto: 'Discos jeans azul con pabilo', medida: '15 cm', pesoKg: 0.147, marca: 'NORTON' },
    { producto: 'Discos jeans azul con pabilo', medida: '17 cm', pesoKg: 0.222, marca: 'NORTON' },
    { producto: 'Discos jeans azul con pabilo', medida: '20 cm', pesoKg: 0.301, marca: 'NORTON' },
    { producto: 'Discos jeans azul con pabilo', medida: '25 cm', pesoKg: 0.448, marca: 'NORTON' },
    { producto: 'Discos jeans azul con pabilo', medida: '30 cm', pesoKg: 0.642, marca: 'NORTON' },
    { producto: 'Disco lana Velcro amarre', medida: '4 1/2" x 7/8"', pesoKg: undefined, marca: 'UYUSTOOLS' },
    { producto: 'Disco lana Velcro pega', medida: '4 1/2" x 7/8"', pesoKg: undefined, marca: 'UYUSTOOLS' },
    { producto: 'Disco p/pulir fieltro FFS', medida: '4 1/2" x 7/8"', pesoKg: 0.095, marca: 'PFERD' },
    { producto: 'Disco Rapid Polish', medida: '4 1/2" x 7/8"', pesoKg: 0.053, marca: 'NORTON' }
  ];

  // BROCHA PARA TINTE
  const brochasTinte = [
    { medidaCm: 21, espesorMM: 6, pesoKg: 0.016, marca: 'N/T' }
  ];

  // PUNTAS MONTADAS (solo listado con peso cuando aplica)
  const puntasMontadas = [
    { codigo: 'A1', pesoKg: 0.05, marca: 'NORTON' },
    { codigo: 'A2', pesoKg: 0.033, marca: 'NORTON' },
    { codigo: 'A3', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'A4', pesoKg: 0.004, marca: 'NORTON' },
    { codigo: 'A5', pesoKg: 0.028, marca: 'NORTON' },
    { codigo: 'A6', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'A11', pesoKg: 0.043, marca: 'NORTON' },
    { codigo: 'A13', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'A14', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'A15', pesoKg: 0.012, marca: 'NORTON' },
    { codigo: 'A21', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'A23', pesoKg: 0.026, marca: 'NORTON' },
    { codigo: 'A24', pesoKg: 0.012, marca: 'NORTON' },
    { codigo: 'A25', pesoKg: 0.034, marca: 'NORTON' },
    { codigo: 'A26', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'A31', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'A32', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'A36', pesoKg: 0.037, marca: 'NORTON' },
    { codigo: 'A38', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'B53', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'B134', pesoKg: 0.003, marca: 'NORTON' },
    { codigo: 'C179', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'C220', pesoKg: 0.037, marca: 'NORTON' },
    { codigo: 'C222', pesoKg: undefined, marca: 'NORTON' },
    { codigo: 'C238', pesoKg: 0.108, marca: 'NORTON' },
  ];

  // COPA DENTADA
  const copasDentadas = [
    { medida: '4"', marca: 'BAHCO' },
    { medida: '4 1/2"', marca: 'SANDFLEX' }
  ];

  // PROTECCIÓN RESPIRATORIA / SAFETY
  const proteccionRespiratoria = [
    { producto: 'Mascarilla N-95 Blanca 3M Válvula 8210V', pesoKg: undefined, marca: '3M' },
    { producto: 'Filtro 3M 2097', pesoKg: undefined, marca: '3M' },
    { producto: 'Respirador 7502 de Silicona', pesoKg: undefined, marca: '3M' },
    { producto: 'Respirador 7502 de Silicona con Filtro', pesoKg: undefined, marca: '3M' },
  ];

  // SWITCH DE PALANCA PARA ANTORCHA TIG
  const switchesTIG = [
    { producto: 'Switch de palanca para Antorcha TIG', pesoKg: 0.010, marca: 'N/T' }
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto mb-16">
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">ACCESORIOS</h2>
      <p className="text-lg text-gray-700 text-center mb-8">
        Accesorios y consumibles compatibles con nuestros productos de acero inoxidable. Información consolidada según catálogo proporcionado.
      </p>

      {/* RUEDITA MIL HOJAS */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Ruedita Mil Hojas</h3>
          <div className="text-right">
            <p className="text-lg text-gray-600">Marca principal: KLINGSPOR</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Diámetro (pulg)</th>
                <th className="border border-blue-500 px-3 py-2">Diámetro (mm)</th>
                <th className="border border-blue-500 px-3 py-2">Grano</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {rueditasMilHojas.map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{r.diametroPulg}</td>
                  <td className="border border-blue-500 px-3 py-2">{r.diametroMM}</td>
                  <td className="border border-blue-500 px-3 py-2">{r.grano}</td>
                  <td className="border border-blue-500 px-3 py-2">{r.pesoKg ?? 'N/T'}</td>
                  <td className="border border-blue-500 px-3 py-2">{r.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SOPORTE DE PARED */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Soporte de Pared - Platina Acero Inox C-304</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Diámetro (pulg)</th>
                <th className="border border-blue-500 px-3 py-2">Diámetro (mm)</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {soportesPared.map((s, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{s.diametroPulg}</td>
                  <td className="border border-blue-500 px-3 py-2">{s.diametroMM}</td>
                  <td className="border border-blue-500 px-3 py-2">{s.pesoKg}</td>
                  <td className="border border-blue-500 px-3 py-2">{s.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ARANDELAS */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Arandela Plana de Acero Inoxidable C-304</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Diámetro</th>
                <th className="border border-blue-500 px-3 py-2">Espesor (mm)</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {arandelasPlanas.map((a, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{a.diametro}</td>
                  <td className="border border-blue-500 px-3 py-2">{a.espesorMM ?? 'N/T'}</td>
                  <td className="border border-blue-500 px-3 py-2">{a.pesoKg ?? 'N/T'}</td>
                  <td className="border border-blue-500 px-3 py-2">{a.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADAPTADOR PARA MANGUERA */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Adaptador para Manguera A. Inox C-304</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Diámetro</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {adaptadoresManguera.map((a, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{a.diametro}</td>
                  <td className="border border-blue-500 px-3 py-2">{a.pesoKg}</td>
                  <td className="border border-blue-500 px-3 py-2">{a.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REDUCCIONES */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Reducciones Inox</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Entrada</th>
                <th className="border border-blue-500 px-3 py-2">Salida</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {reduccionesInox.map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{r.entrada}</td>
                  <td className="border border-blue-500 px-3 py-2">{r.salida}</td>
                  <td className="border border-blue-500 px-3 py-2">{r.pesoKg ?? 'N/T'}</td>
                  <td className="border border-blue-500 px-3 py-2">{r.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VÁLVULAS TIPO COMPUERTA */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Válvula Tipo Compuerta A. Inox C-304</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Medida</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {valvulasCompuerta.map((v, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{v.medida}</td>
                  <td className="border border-blue-500 px-3 py-2">{v.pesoKg ?? 'N/T'}</td>
                  <td className="border border-blue-500 px-3 py-2">{v.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISCOS DE PULIDO */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Discos y Accesorios de Pulido</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Producto</th>
                <th className="border border-blue-500 px-3 py-2">Medida</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {discosPulido.map((d, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{d.producto}</td>
                  <td className="border border-blue-500 px-3 py-2">{d.medida}</td>
                  <td className="border border-blue-500 px-3 py-2">{d.pesoKg ?? 'N/T'}</td>
                  <td className="border border-blue-500 px-3 py-2">{d.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BROCHA TINTE */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Brocha para Tinte</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Medida (cm)</th>
                <th className="border border-blue-500 px-3 py-2">Espesor (mm)</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {brochasTinte.map((b, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{b.medidaCm}</td>
                  <td className="border border-blue-500 px-3 py-2">{b.espesorMM}</td>
                  <td className="border border-blue-500 px-3 py-2">{b.pesoKg}</td>
                  <td className="border border-blue-500 px-3 py-2">{b.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PUNTAS MONTADAS */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Puntas Montadas (NORTON)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Código</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {puntasMontadas.map((p, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{p.codigo}</td>
                  <td className="border border-blue-500 px-3 py-2">{p.pesoKg ?? 'N/T'}</td>
                  <td className="border border-blue-500 px-3 py-2">{p.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COPA DENTADA */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Copa Dentada</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Medida</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {copasDentadas.map((c, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{c.medida}</td>
                  <td className="border border-blue-500 px-3 py-2">{c.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROTECCIÓN RESPIRATORIA */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Protección Respiratoria</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Producto</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {proteccionRespiratoria.map((p, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{p.producto}</td>
                  <td className="border border-blue-500 px-3 py-2">{p.pesoKg ?? 'N/T'}</td>
                  <td className="border border-blue-500 px-3 py-2">{p.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SWITCH TIG */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-2xl font-bold text-gray-800">Switch de Palanca para Antorcha TIG</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-blue-500 text-sm text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-blue-500 px-3 py-2">Producto</th>
                <th className="border border-blue-500 px-3 py-2">Peso (Kg/unid)</th>
                <th className="border border-blue-500 px-3 py-2">Marca</th>
              </tr>
            </thead>
            <tbody>
              {switchesTIG.map((s, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="border border-blue-500 px-3 py-2">{s.producto}</td>
                  <td className="border border-blue-500 px-3 py-2">{s.pesoKg}</td>
                  <td className="border border-blue-500 px-3 py-2">{s.marca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Accesorios;
