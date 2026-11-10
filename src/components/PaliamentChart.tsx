import React from 'react';
import type { Partido } from '../data/partidos';
import { generateParliamentSeats } from '../utils/paliamentLayout';

interface ParliamentChartProps {
  partidos: Partido[];
  selectedIds: Set<string>;
}

export const ParliamentChart: React.FC<ParliamentChartProps> = ({ partidos, selectedIds }) => {
  const seats = generateParliamentSeats(partidos, selectedIds);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white p-4">
      <svg viewBox="0 0 400 210" className="w-full max-w-xl h-auto">
        {seats.map((seat) => (
          <circle
            key={seat.id}
            cx={seat.x}
            cy={seat.y}
            r="3.2"
            fill={seat.color}
            className="transition-all duration-300"
          >
            <title>{seat.partidoSiglas}</title>
          </circle>
        ))}
        <text x="200" y="185" textAnchor="middle" className="text-xs font-bold fill-slate-400">
          350 ESCAÑOS
        </text>
      </svg>
    </div>
  );
};