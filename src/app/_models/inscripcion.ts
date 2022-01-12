import { Alumno } from './alumno';
export interface Inscripcion {

  id: number;
  alumnoId: number;
  alumno?:Alumno;
  empresaId: number;
  posicionId: number;
  estadoInscripcion:string;
  fechaInscripcion: Date ;

}
