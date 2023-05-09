export interface Props {
  user: string;
  password: string;
  client: string;
  nombre: string;
  clientregister: string;
  claveregister: string;
  nombreregister: string;
  empresaregister: string;
  directionregister: string;
  ciudadregister: string;
  telefonoregister: number | string;
  celularregister: number | string;
  emailregister: string;
  //formulario agregargateway
  nombregateway: string;
  //formualrio agregar device
  nombredevice: string;
  macdevice:string;
  tmaxdevice: number | string;
  tmindevice: number | string;
  hmaxdevice: number | string;
  hmindevice: number | string;
  //formulario agregar area
  nombreareacreate: string;
  //formulario agregar zona
  nombrezonacreate: string;
  // input de search
  search: string;
  //formulario de setear clave
  passwordNewValidation:string
  passwordAntsetPassword: string;
  passwordNewsetPassword: string,
}

export const initialValues = {
  user: "",
  password: "",
  client: "",
  nombre: "",
  clientregister: "",
  claveregister: "",
  nombreregister: "",
  empresaregister: "",
  directionregister: "",
  ciudadregister: "",
  telefonoregister: "",
  celularregister: "",
  emailregister: "",
  //formulario agregar gateway
  nombregateway: "",
  //formulario agreagr dispositivo
  nombredevice: "",
  macdevice:'',
  tmaxdevice: "",
  tmindevice: "",
  hmaxdevice: "",
  hmindevice: "",
  //formulario agregar area
  nombreareacreate: "",
  //formulario crear zona
  nombrezonacreate: "",
  //input de searh
  search: "",
  passwordNewValidation: "",
  passwordAntsetPassword: "",
  passwordNewsetPassword: "",

};
