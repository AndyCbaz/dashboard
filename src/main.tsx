import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeConfig } from "./config/theme.config";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";

import { Pesopage } from "./components/Peso/Pesopage";
import { LogOut } from "./components/LogOut/LogOut";
import { Configuracion } from "./components/Configuracion/Configuracion";
import { NotFound } from "./views/NotFound";
import { DevicePage } from "./components/Termohigrometro/Secundario/DevicePage";
import { HomeResultados } from "./components/Termohigrometro/Resultados/HomeResultados";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeConfig>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home/>}>
          {/* <Route element={<Termopage/>}index={true} /> */}
          <Route element={<Pesopage/>} path="peso" />
          <Route element={<LogOut/>} path="logout" />
          <Route element={<Configuracion/>} path="settings" />
          <Route element={<DevicePage/>} index={true} />
          <Route element={<HomeResultados/>} path="resultados" />
          {/* <Route errorElement={<NotFound/>} path=""/> */}
        </Route>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </ThemeConfig>
);
