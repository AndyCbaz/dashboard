import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};


export const ProtectedRoutes = ({ children }: Props) => {
  let cliente = localStorage.getItem('cliente')
  let usuario = localStorage.getItem('usuario')



  if (usuario!=='' || cliente!=='') return <>{children}</>;
  else return <Navigate to="/" />;
};
