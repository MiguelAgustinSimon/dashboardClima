import { City } from './city';
export interface Province {
    CODPROV?: string;
    NOMBRE_PROVINCIA?: string;
    CODAUTON?: string;
    COMUNIDAD_CIUDAD_AUTONOMA?: string;
    CAPITAL_PROVINCIA?: string;
    today?:string;
    tomorrow?:number;
    cities?:City[];
}
