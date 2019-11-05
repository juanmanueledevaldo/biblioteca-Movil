import { ILibro } from '../Interface/libro';
import { Prestamo } from './prestamo';

export class Detalle {
    Libro:ILibro;
    Prestamo:Prestamo;
    Momento:string;

}
