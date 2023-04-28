export interface Props {
  user: string;
  password: string;
  client: string;
  nombre: string;
  clientregister:string;
  claveregister:string;
  nombreregister: string;
  empresaregister:string;
  directionregister:string;
  ciudadregister:string;
  telefonoregister:number | string;
  celularregister:number | string;
  emailregister: string;
}

export const initialValues = {
  user: "",
  password: "",
  client: "",
  nombre: "",
  clientregister: "",
  claveregister:'',
  nombreregister: '',
  empresaregister:'',
  directionregister:'',
  ciudadregister:'',
  telefonoregister: '',
  celularregister:'',
  emailregister:'',


};
