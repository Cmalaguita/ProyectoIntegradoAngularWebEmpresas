import * as internal from 'stream';

export interface PosicionDeTrabajo {
  id: number;
  nombre: string;
  fechainicio: Date;
  fechafin: Date;
  empresaid: number;
  ciclos: number[];
  descripcion: string;
  horario: string;
  remuneracion: number;
}
