import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Configuracion } from "./components/Configuracion/Configuracion";
import { LogOut } from "./components/LogOut/LogOut";
import { Pesopage } from "./components/Peso/Pesopage";
import { Termopage } from "./components/Termohigrometro/Principal/Termopage";
import { HomeResultados } from "./components/Termohigrometro/Resultados/HomeResultados";
import { DevicePage } from "./components/Termohigrometro/Secundario/DevicePage";

import Home from "./views/Home";
import { NotFound } from "./views/NotFound";


export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound/>,
    children: [
      {
        element: <Termopage/>,
        index: true,
      },
      {
        element:<DevicePage/>,
        path: ':id' 
      }
    ]
  
  },

  

]);
