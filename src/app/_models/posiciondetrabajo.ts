import * as internal from "stream";

export interface PosicionDeTrabajo {
  id: number;
  name: string;
 datestart: Date;
 dateofend: Date;
 empresaid: number;
 ciclos: number[];
 description:string;
schedule: string;
salary : number;
}
