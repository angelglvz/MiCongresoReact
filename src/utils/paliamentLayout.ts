import type { Partido } from '../data/partidos';

export interface Seat {
  x: number;
  y: number;
  color: string;
  partidoId: string;
  partidoNombre: string;
  inGovernment: boolean;
}

export function generateParliamentSeats(
  partidos: Partido[],
  selectedIds: Set<string>
): Seat[] {
  const totalSeats = partidos.reduce((acc, p) => acc + p.escanos, 0);
  const seats: Seat[] = [];

  // Expandir partidos a un array individual de asientos
  const seatList: { partidoId: string; partidoNombre: string; color: string; inGov: boolean }[] = [];
  
  partidos.forEach((p) => {
    const isSelected = selectedIds.has(p.id);
    for (let i = 0; i < p.escanos; i++) {
      seatList.push({
        partidoId: p.id,
        partidoNombre: p.nombre,
        color: isSelected ? p.color : '#D1D5DB', // Color gris si no está en la coalición
        inGov: isSelected,
      });
    }
  });

  // Radio y filas del semicírculo
  const rows = 5;
  const minRadius = 70;
  const maxRadius = 170;
  const centerX = 200;
  const centerY = 190;

  // Calcular capacidad por fila
  let seatsAssigned = 0;
  for (let r = 0; r < rows; r++) {
    const radius = minRadius + (r * (maxRadius - minRadius)) / (rows - 1);
    const seatsInRow = Math.round((radius / maxRadius) * (totalSeats / 2.8));
    
    for (let i = 0; i < seatsInRow && seatsAssigned < seatList.length; i++) {
      const angle = Math.PI - (i * Math.PI) / (seatsInRow - 1);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY - radius * Math.sin(angle);
      
      const item = seatList[seatsAssigned];
      seats.push({
        x,
        y,
        color: item.color,
        partidoId: item.partidoId,
        partidoNombre: item.partidoNombre,
        inGovernment: item.inGov,
      });
      seatsAssigned++;
    }
  }

  return seats;
}