import type { Partido } from '../data/partidos';

export interface Seat {
  id: number;
  x: number;
  y: number;
  color: string;
  partidoSiglas: string;
}

export function generateParliamentSeats(partidos: Partido[], selectedIds: Set<string>): Seat[] {
  const seats: Seat[] = [];

  // Separar partidos en seleccionados (Pacto) y no seleccionados
  const selectedParties = partidos.filter((p) => selectedIds.has(p.id));
  const unselectedParties = partidos.filter((p) => !selectedIds.has(p.id));

  // Crear lista de asientos apilando primero los del pacto
  const seatList: { color: string; siglas: string; isSelected: boolean }[] = [];

  selectedParties.forEach((p) => {
    for (let i = 0; i < p.escanosPredictos; i++) {
      seatList.push({ color: p.color, siglas: p.siglas, isSelected: true });
    }
  });

  unselectedParties.forEach((p) => {
    for (let i = 0; i < p.escanosPredictos; i++) {
      seatList.push({ color: p.color, siglas: p.siglas, isSelected: false });
    }
  });

  // Rellenar hasta 350 si falta representación
  while (seatList.length < 350) {
    seatList.push({ color: '#F1F5F9', siglas: 'Sin asignar', isSelected: false });
  }

  const slicedSeats = seatList.slice(0, 350);

  // Filas del hemiciclo
  const rowsConfig = [
    { radius: 75, count: 46 },
    { radius: 100, count: 60 },
    { radius: 125, count: 72 },
    { radius: 150, count: 84 },
    { radius: 175, count: 88 },
  ];

  const centerX = 200;
  const centerY = 190;
  let currentSeatIndex = 0;

  rowsConfig.forEach((row) => {
    const { radius, count } = row;
    for (let i = 0; i < count && currentSeatIndex < slicedSeats.length; i++) {
      const angle = Math.PI - (i / (count - 1)) * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY - radius * Math.sin(angle);

      const seatInfo = slicedSeats[currentSeatIndex];

      seats.push({
        id: currentSeatIndex,
        x,
        y,
        // Si hay algún partido seleccionado en el pacto, los que quedan fuera se atenúan en gris tenue
        color: selectedIds.size > 0 && !seatInfo.isSelected ? '#E2E8F0' : seatInfo.color,
        partidoSiglas: seatInfo.siglas,
      });
      currentSeatIndex++;
    }
  });

  return seats;
}