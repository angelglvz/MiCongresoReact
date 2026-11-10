import { useState, useRef } from 'react';
import { PARTIDOS_INICIALES, MAYORIA_ABSOLUTA, TOTAL_ESCANOS} from './data/partidos';
import type { Partido } from './data/partidos';
import { ParliamentChart } from './components/PaliamentChart';
import { toPng } from 'html-to-image';
import { Download, Sliders, Check } from 'lucide-react';

export default function App() {
  const [partidos, setPartidos] = useState<Partido[]>(PARTIDOS_INICIALES);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const exportRef = useRef<HTMLDivElement>(null);

  const togglePartido = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleEscanosChange = (id: string, value: number) => {
    setPartidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, escanosPredictos: Math.max(0, value) } : p))
    );
  };

  const escanosSeleccionados = partidos
    .filter((p) => selectedIds.has(p.id))
    .reduce((acc, p) => acc + p.escanosPredictos, 0);

  const porcentajeSeleccionado = ((escanosSeleccionados / TOTAL_ESCANOS) * 100).toFixed(1);
  const alcanzaMayoria = escanosSeleccionados >= MAYORIA_ABSOLUTA;

  const exportarImagen = async () => {
    if (!exportRef.current) return;
    try {
      const dataUrl = await toPng(exportRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'pactometro-congreso.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error al exportar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Calculadora de Mayorías</h1>
          <p className="text-xs text-slate-500">Selecciona partidos para formar una coalición</p>
        </div>
        <button
          onClick={exportarImagen}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs px-3 py-2 rounded-lg font-medium shadow transition"
        >
          <Download size={15} />
          Exportar PNG
        </button>
      </header>

      {/* Tarjeta de visualización e Hemiciclo */}
      <div
        ref={exportRef}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6"
      >
        {/* Píldoras de selección de partidos (Estilo Electomanía) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {partidos.map((partido) => {
            const isSelected = selectedIds.has(partido.id);
            return (
              <button
                key={partido.id}
                onClick={() => togglePartido(partido.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all font-medium border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: partido.color }}
                />
                <span>{partido.siglas}</span>
                <span className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {partido.escanosPredictos}
                </span>
                {isSelected && <Check size={12} className="ml-0.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Hemiciclo */}
        <ParliamentChart partidos={partidos} selectedIds={selectedIds} />

        {/* Indicadores numéricos de Pacto */}
        <div className="grid grid-cols-2 gap-4 items-start my-6 pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Escaños Seleccionados</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold text-slate-900 tabular-nums">{escanosSeleccionados}</span>
              <span className="text-xs text-slate-500">de 350</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Porcentaje</p>
            <p className="text-4xl font-bold text-slate-900 tabular-nums mt-1">{porcentajeSeleccionado}%</p>
          </div>
        </div>

        {/* Barra de Progreso a 176 Escaños */}
        <div className="relative pt-6">
          {/* Marcador fijo de mayoría absoluta */}
          <div
            className="absolute top-0 pointer-events-none z-10 flex flex-col items-center"
            style={{ left: `${(MAYORIA_ABSOLUTA / TOTAL_ESCANOS) * 100}%`, transform: 'translateX(-50%)' }}
          >
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-900 text-white shadow-sm">
              176
            </span>
            <div className="w-px h-8 bg-slate-900/40 mt-1" />
          </div>

          <div className="w-full bg-slate-100 rounded-lg h-4 overflow-hidden flex relative">
            <div
              className={`h-full transition-all duration-500 ${
                alcanzaMayoria ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
              style={{ width: `${porcentajeSeleccionado}%` }}
            />
          </div>
        </div>
      </div>

      {/* Editor de predicción de escaños por partido */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Sliders size={16} /> Ajustar predicción de escaños
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {partidos.map((partido) => (
            <div key={partido.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: partido.color }} />
                <span className="text-xs font-bold text-slate-700 truncate">{partido.siglas}</span>
              </div>
              <input
                type="number"
                min="0"
                max="350"
                value={partido.escanosPredictos}
                onChange={(e) => handleEscanosChange(partido.id, parseInt(e.target.value) || 0)}
                className="w-14 text-center font-bold bg-white border border-slate-300 rounded-md py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}