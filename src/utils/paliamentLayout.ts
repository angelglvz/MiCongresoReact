import type { Partido } from '../data/partidos';

export interface Seat {
  id: number;
  x: number;
  y: number;
  color: string;
  partidoSiglas: string;
}

export function generateParliamentSeats(partidos: Partido[]): Seat[] {
  const seats: Seat[] = [];
  
  const seatList: { color: string; siglas: string }[] = [];
  partidos.forEach((p) => {
    for (let i = 0; i < p.escanos; i++) {
      seatList.push({ color: p.color, siglas: p.siglas });
    }
  });

  // Rellenar hasta 350 con escaños libres/grises si la suma no llega
  while (seatList.length < 350) {
    seatList.push({ color: '#E5E7EB', siglas: 'Libre' });
  }
  const slicedSeats = seatList.slice(0, 350);

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

      seats.push({
        id: currentSeatIndex,
        x,
        y,
        color: slicedSeats[currentSeatIndex].color,
        partidoSiglas: slicedSeats[currentSeatIndex].siglas,
      });
      currentSeatIndex++;
    }
  });

  return seats;
}