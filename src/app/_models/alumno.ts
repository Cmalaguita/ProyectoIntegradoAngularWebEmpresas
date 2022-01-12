import { Ciclo } from './ciclo';
import { Provincia } from './provincia';
export interface Alumno {
    id?: number;
    email: string;
    password: string;
    nombre?: string;
    apellidos:string;
    provinciaid?:number;
    idCiclo?:number;
    ciclo?:Ciclo;
    fechaDeNacimiento:Date;
    localidad?: string;
    token?:string;
    notaMedia?:number;
    provincia?:Provincia

}
