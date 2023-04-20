import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
//Redux
import { useAppSelector } from "../app/hooks";
import { selectClient } from "../features/userSlice";

type Props = {
  children: ReactNode;
};

export const ProtectedRoutes = ({ children }: Props) => {
  
  const cliente = useAppSelector(selectClient);

  
  
 

  if (cliente) return <>{children}</>;
  else return <Navigate to="/" replace />;
};
