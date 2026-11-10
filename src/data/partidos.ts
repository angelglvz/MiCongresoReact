export interface Partido {
  id: string;
  nombre: string;
  siglas: string;
  escanosPredictos: number;
  color: string;
}

export const PARTIDOS_INICIALES: Partido[] = [
  { id: 'ehbildu', nombre: 'EH Bildu', siglas: 'EH Bildu', escanosPredictos: 7, color: '#B5CF00' },
  { id: 'erc', nombre: 'Esquerra Republicana', siglas: 'ERC', escanosPredictos: 9, color: '#F3B229' },
  { id: 'bng', nombre: 'Bloque Nacionalista Galego', siglas: 'BNG', escanosPredictos: 2, color: '#ADC1E9' },
  { id: 'adelante', nombre: 'Adelante Andalucía', siglas: 'Adelante Andalucía', escanosPredictos: 3, color: '#00C07F' },
  { id: 'podemos', nombre: 'Podemos', siglas: 'Podemos', escanosPredictos: 2, color: '#7B2CBF' },
  { id: 'frente-amplio', nombre: 'Frente Amplio', siglas: 'Frente Amplio', escanosPredictos: 14, color: '#E51C55' },
  { id: 'psoe', nombre: 'Partido Socialista Obrero Español', siglas: 'PSOE', escanosPredictos: 97, color: '#EF262D' },
  { id: 'pnv', nombre: 'Euzko Alderdi Jeltzalea', siglas: 'PNV', escanosPredictos: 4, color: '#008040' },
  { id: 'junts', nombre: 'Junts per Catalunya', siglas: 'Junts', escanosPredictos: 6, color: '#00C4B3' },
  { id: 'cc', nombre: 'Coalición Canaria', siglas: 'CC', escanosPredictos: 1, color: '#FFD700' },
  { id: 'upn', nombre: 'Unión del Pueblo Navarro', siglas: 'UPN', escanosPredictos: 2, color: '#0057A4' },
  { id: 'pp', nombre: 'Partido Popular', siglas: 'PP', escanosPredictos: 134, color: '#1D84CE' },
  { id: 'vox', nombre: 'Vox', siglas: 'Vox', escanosPredictos: 69, color: '#63BE21' },

  // Otros partidos de la segunda imagen que quieras incluir en el simulador
  { id: 'pacma', nombre: 'Partido Animalista Con el Medio Ambiente', siglas: 'PACMA', escanosPredictos: 0, color: '#2ECC71' },
  { id: 'se-acabo-fiesta', nombre: 'Se Acabó la Fiesta', siglas: 'SALF', escanosPredictos: 0, color: '#8B4513' },
  { id: 'frente-obrero', nombre: 'Frente Obrero', siglas: 'FO', escanosPredictos: 0, color: '#900C3F' },
  { id: 'escaños-blanco', nombre: 'Escaños en Blanco', siglas: 'EB', escanosPredictos: 0, color: '#BDC3C7' }
];

export const TOTAL_ESCANOS = 350;
export const MAYORIA_ABSOLUTA = 176;