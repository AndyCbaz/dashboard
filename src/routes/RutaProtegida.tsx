import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
//Redux
import { useAppSelector } from "../app/hooks";
import { selectClient } from "../features/userSlice";

type Props = {
  children: ReactNode;
};


export const ProtectedRoutes = ({ children }: Props) => {
  const cliente = localStorage.getItem('cliente')
  const usuario = localStorage.getItem('usuario')

  if (usuario!=='' || cliente!=='') return <>{children}</>;
  else return <Navigate to="/" />;
};
