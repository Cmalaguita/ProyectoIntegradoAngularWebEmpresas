import { Ciclo } from "./ciclo";


export interface PosicionDeTrabajo {
  id?: number;
  nombre: string;
  fechainicio: Date;
  fechafin: Date;
  empresaid: number;
  ciclos: Ciclo[];
  descripcion: string;
  horario?: string;
  remuneracion: number;
}
