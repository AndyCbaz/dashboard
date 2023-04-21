import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
//Redux
import { useAppSelector } from "../app/hooks";
import { selectClient } from "../features/userSlice";
import { Usuario } from "../components/Login/Usuario";

type Props = {
  children: ReactNode;
};

export const ProtectedRoutesLogin = ({ children }: Props) => {
  
  const cliente = localStorage.getItem('cliente');
  const usuario = localStorage.getItem('usuario');

  if (cliente !=='' || usuario !== '') return <Navigate to="/home" replace />;
  else return <>{children}</>;
};
