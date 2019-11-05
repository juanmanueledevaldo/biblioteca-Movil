import { IUsuario } from '../Interface/usuario';

export class Prestamo {
    Usuario:IUsuario;
    Codigo:string;
    Estado:string;
    Fecha:string;
    Devolucion:string;
    Activo:boolean;
}
