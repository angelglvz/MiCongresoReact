export interface Partido {
  id: string;
  nombre: string;
  siglas: string;
  escanos: number;
  color: string;
}

export const PARTIDOS_INICIALES: Partido[] = [
  // Grandes bloques / Partidos principales (Imagen 1)
  { id: 'pp', nombre: 'Partido Popular + UPN', siglas: 'PP', escanos: 138, color: '#1D84CE' },
  { id: 'psoe', nombre: 'Partido Socialista Obrero Español', siglas: 'PSOE', escanos: 121, color: '#EF262D' },
  { id: 'vox', nombre: 'Vox', siglas: 'VOX', escanos: 33, color: '#63BE21' },
  
  // Izquierdas / Coaliciones amplias (según la tabla)
  { id: 'frente-amplio', nombre: 'Frente Amplio', siglas: 'F. AMPLIO', escanos: 0, color: '#A3E4D7' },
  { id: 'podemos', nombre: 'Podemos', siglas: 'PODEMOS', escanos: 0, color: '#7B2CBF' },
  { id: 'compromis', nombre: 'Compromís: Front Valencià', siglas: 'COMPROMÍS', escanos: 31, color: '#F39C12' },
  
  // Nacionalistas / Independentistas
  { id: 'erc', nombre: 'Esquerra Republicana de Catalunya', siglas: 'ERC', escanos: 7, color: '#F3B229' },
  { id: 'junts', nombre: 'Junts per Catalunya', siglas: 'JUNTS', escanos: 7, color: '#00C4B3' },
  { id: 'ehbildu', nombre: 'Euskal Herria Bildu', siglas: 'EH BILDU', escanos: 6, color: '#B5CF00' },
  { id: 'pnv', nombre: 'Partido Nacionalista Vasco', siglas: 'EAJ-PNV', escanos: 5, color: '#008040' },
  { id: 'bng', nombre: 'Bloque Nacionalista Galego', siglas: 'BNG', escanos: 1, color: '#ADC1E9' },
  { id: 'cc', nombre: 'Coalición Canaria', siglas: 'CC', escanos: 1, color: '#FFD700' },

  // Otros partidos de la segunda imagen que quieras incluir en el simulador
  { id: 'pacma', nombre: 'Partido Animalista Con el Medio Ambiente', siglas: 'PACMA', escanos: 0, color: '#2ECC71' },
  { id: 'se-acabo-fiesta', nombre: 'Se Acabó la Fiesta', siglas: 'SALF', escanos: 0, color: '#8B4513' },
  { id: 'frente-obrero', nombre: 'Frente Obrero', siglas: 'FO', escanos: 0, color: '#900C3F' },
  { id: 'escaños-blanco', nombre: 'Escaños en Blanco', siglas: 'EB', escanos: 0, color: '#BDC3C7' }
];

export const TOTAL_ESCANOS = 350;
export const MAYORIA_ABSOLUTA = 176;