import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
//Redux
import { useAppSelector } from "../app/hooks";
import { Usuario } from "../components/Login/Usuario";

type Props = {
  children: ReactNode;
};

export const ProtectedRoutesLogin = ({ children }: Props) => {
  
  const cliente = localStorage.getItem('cliente');
  const usuario = localStorage.getItem('usuario');
  if(cliente ===undefined ){
    return <>{children}</>
  }
  if(cliente ===null){
    return <>{children}</>
  }
  if(usuario ===undefined ){
    return <>{children}</>
  }
  if(usuario ===null){
    return <>{children}</>
  }
  
  if (cliente !=='' || usuario !== '') return <Navigate to="/home" replace />;
  else return <>{children}</>;
};
