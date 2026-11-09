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
    <div className="w-full flex justify-center items-center py-4">
      <svg viewBox="0 0 400 210" className="w-full max-w-lg drop-shadow-md">
        {seats.map((seat, index) => (
          <circle
            key={index}
            cx={seat.x}
            cy={seat.y}
            r="3.5"
            fill={seat.color}
            className="transition-colors duration-300 hover:r-5 cursor-pointer"
          >
            <title>{`${seat.partidoNombre}`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
};