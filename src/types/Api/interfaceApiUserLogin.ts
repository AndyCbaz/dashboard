export interface IDispositivos {
  iddispositivo: number;
  macdispositivo: string;
  idmacgateway: number;
  macgateway: string;
  online: number;
  maxTemperatura: null | number;
  minTemperatura: null | number;
  maxHumedad: null | number;
  minHumedad: null | number;
}
export interface IZonas {
  idzona: number;
  nombrezona: string;
  dispositivos: IDispositivos[];
}
export interface IAreas {
  idarea: number;
  nombrearea: string;
  zonas: IZonas[];
}
export interface IData {
  idcliente: number;
  nombrecliente: string;
  idusuario: number;
  nombreusuario: string;
  areas: IAreas[];
}

export interface IDataUserLogin {
  idusuario: number;
  nombreusuario: string;
  idcliente: number;
}

export interface IDataApiDevice {
  bateria: number | null;
  nivelSenial: number | null;
  actualTemp: number | null;
  maximoTemp: number | null;
  minimoTemp: number | null;
  avgTemp: number | null;
  actualHum: number | null;
  maximoHum: number | null;
  minimoHum: number | null;
  avgHum: number | null;
}
