import { Provincia } from './provincia';
export interface Empresa {
    id?: number;
    email: string;
    password?: string;
    nombre?: string;
    provinciaid?:number;
    localidad?: string;
    direccion?:string;
    token?:string;
    provincia?:Provincia;
    emailVerificado?:boolean;
    codigoverificacion?:string;
    empresaStripeID?:string;
}
