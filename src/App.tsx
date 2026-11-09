import { useState, useRef } from 'react';
import type { Partido } from './data/partidos';
import { PARTIDOS_INICIALES, MAYORIA_ABSOLUTA, TOTAL_ESCANOS} from './data/partidos';
import { ParliamentChart } from './components/PaliamentChart';
import { toPng } from 'html-to-image';
import { Download, Sliders, Users } from 'lucide-react';

export default function App() {
  const [partidos, setPartidos] = useState<Partido[]>(PARTIDOS_INICIALES);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleEscanosChange = (id: string, value: number) => {
    setPartidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, escanosPredictos: Math.max(0, value) } : p))
    );
  };

  const totalAsignados = partidos.reduce((acc, p) => acc + p.escanos, 0);

  const [pactoIds, setPactoIds] = useState<Set<string>>(new Set(['pp', 'vox']));

  const togglePacto = (id: string) => {
    setPactoIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalPacto = partidos
    .filter((p) => pactoIds.has(p.id))
    .reduce((acc, p) => acc + p.escanos, 0);

  const exportarImagen = async () => {
    if (!exportRef.current) return;
    try {
      const dataUrl = await toPng(exportRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'prediccion-congreso.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error al exportar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">MiCongresoApp</h1>
          <p className="text-sm text-slate-500">Simulador y Predictor del Congreso de los Diputados</p>
        </div>
        <button
          onClick={exportarImagen}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium shadow transition"
        >
          <Download size={18} />
          Exportar PNG
        </button>
      </header>

      {/* Bloque para exportar a imagen */}
      <div
        ref={exportRef}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200 flex flex-col items-center mb-8"
      >
        <h2 className="text-xl font-bold text-slate-800 mb-1">Hemiciclo de Resultados</h2>
        <p className="text-xs text-slate-400 mb-4">Total asignado en predicción: {totalAsignados} / {TOTAL_ESCANOS}</p>

        <ParliamentChart partidos={partidos} />

        <div className="w-full max-w-2xl mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm text-slate-700 flex items-center gap-1">
              <Users size={16} /> Escaños del Pacto Seleccionado: {totalPacto}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${totalPacto >= MAYORIA_ABSOLUTA ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {totalPacto >= MAYORIA_ABSOLUTA ? '✔ Mayoría Absoluta (176)' : `Faltan ${MAYORIA_ABSOLUTA - totalPacto} para la absoluta`}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${Math.min(100, (totalPacto / TOTAL_ESCANOS) * 100)}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
              style={{ left: `${(MAYORIA_ABSOLUTA / TOTAL_ESCANOS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Panel para modificar los escaños previstos por partido */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Sliders size={20} /> Predice los escaños de cada partido
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partidos.map((partido) => {
            const enPacto = pactoIds.has(partido.id);
            return (
              <div key={partido.id} className="flex flex-col p-3 bg-slate-50 rounded-2xl border border-slate-200 gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: partido.color }} />
                    <span className="font-bold text-sm text-slate-700 truncate" title={partido.nombre}>{partido.siglas}</span>
                  </div>
                  <button
                    onClick={() => togglePacto(partido.id)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border transition ${
                      enPacto ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300'
                    }`}
                  >
                    {enPacto ? 'En Pacto' : 'Sumar'}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-400">Escaños:</span>
                  <input
                    type="number"
                    min="0"
                    max="350"
                    value={partido.escanos}
                    onChange={(e) => handleEscanosChange(partido.id, parseInt(e.target.value) || 0)}
                    className="w-16 text-center font-bold bg-white border border-slate-300 rounded-lg py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}