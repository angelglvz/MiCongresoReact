import { useState, useRef } from 'react';
import { PARTIDOS_INICIALES, MAYORIA_ABSOLUTA, TOTAL_ESCANOS } from './data/partidos';
import { ParliamentChart } from './components/PaliamentChart';
import { toPng } from 'html-to-image';
import { Download, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [partidos] = useState(PARTIDOS_INICIALES);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['pp', 'vox']));
  const exportRef = useRef<HTMLDivElement>(null);

  const togglePartido = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalEscanosGobierno = partidos
    .filter((p) => selectedIds.has(p.id))
    .reduce((acc, p) => acc + p.escanos, 0);

  const alcanzaMayoria = totalEscanosGobierno >= MAYORIA_ABSOLUTA;

  const exportarImagen = async () => {
    if (!exportRef.current) return;
    try {
      const dataUrl = await toPng(exportRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = 'pactometro-congreso.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error al exportar la imagen:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 flex flex-col items-center">
      {/* Botón de exportación fuera de la captura para no tapar */}
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <button
          onClick={exportarImagen}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
        >
          <Download size={18} />
          Exportar Imagen
        </button>
      </div>

      {/* Contenedor principal a exportar */}
      <div
        ref={exportRef}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 border border-slate-100 flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-1">Pactómetro del Congreso</h1>
        <p className="text-slate-500 text-sm mb-6">Simulador de Mayorías y Coaliciones de Gobierno</p>

        {/* Hemiciclo */}
        <ParliamentChart partidos={partidos} selectedIds={selectedIds} />

        {/* Barra de Mayoría Absoluta */}
        <div className="w-full max-w-xl my-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg flex items-center gap-2">
              Escaños en coalición: {totalEscanosGobierno} / {TOTAL_ESCANOS}
              {alcanzaMayoria && (
                <span className="text-emerald-600 text-sm flex items-center gap-1 font-bold">
                  <CheckCircle2 size={16} /> ¡Mayoría Absoluta!
                </span>
              )}
            </span>
            <span className="text-xs text-slate-400">Meta: {MAYORIA_ABSOLUTA}</span>
          </div>

          <div className="relative w-full h-5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-500 ${
                alcanzaMayoria ? 'bg-emerald-500' : 'bg-blue-600'
              }`}
              style={{ width: `${(totalEscanosGobierno / TOTAL_ESCANOS) * 100}%` }}
            />
            {/* Línea indicadora de 176 escaños */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
              style={{ left: `${(MAYORIA_ABSOLUTA / TOTAL_ESCANOS) * 100}%` }}
              title="Línea de Mayoría Absoluta (176)"
            />
          </div>
        </div>

        {/* Selector de partidos */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {partidos.map((partido) => {
            const isSelected = selectedIds.has(partido.id);
            return (
              <button
                key={partido.id}
                onClick={() => togglePartido(partido.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-slate-800 bg-slate-900 text-white shadow-md scale-[1.02]'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: partido.color }}
                  />
                  <span className="font-bold text-sm truncate">{partido.siglas}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/50 text-slate-600">
                  {partido.escanos}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}