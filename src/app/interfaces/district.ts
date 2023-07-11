export interface District {
    CODIGOINE?: string;
    CODPROV?: string;
    NOMBRE?: string;
    POBLACION_MUNI?: number;
    SUPERFICIE?: number;
    stateSky?:string;
    tempActual:number;
    tempMin?:number;
    tempMax?:number;
    humedad?:number;
    viento?:number;
    prob_precipitacion?:number;
}
