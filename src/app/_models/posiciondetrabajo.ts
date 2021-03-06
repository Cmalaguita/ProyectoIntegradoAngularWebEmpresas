import { Empresa } from './empresa';
import { Inscripcion } from './inscripcion';
import { Alumno } from "./alumno";
import { Ciclo } from "./ciclo";


export interface PosicionDeTrabajo {
  id?: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  empresaid: number;
  empresa?:Empresa;
  ciclos: Ciclo[];
  descripcion: string;
  horario?: string;
  remuneracion: number;
  listaInscritos?:Inscripcion[];
}
