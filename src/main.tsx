import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeConfig } from "./config/theme.config";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";

import { Pesopage } from "./components/Peso/Pesopage";
import { LogOut } from "./components/LogOut/LogOut";
import { Configuracion } from "./components/Configuracion/ConfiguracionPage";
import { NotFound } from "./views/NotFound";
import { DevicePage } from "./components/Termohigrometro/Secundario/DevicePage";
import { HomeResultados } from "./components/Termohigrometro/Resultados/HomeResultados";
import { Zonas } from "./components/Zonas/ZonasPage";
import { Areas } from "./components/Areas/AreasPage";
import { LoginPage } from "./views/LoginPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Cliente } from "./components/Login/Cliente";
import { Usuario } from "./components/Login/Usuario";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeConfig>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}>
            <Route index={true} element={<Cliente/>}/>
            <Route path="loguser" element={<Usuario/>}/>
          </Route>
          <Route path="/home*" element={<Home />}>
            {/* <Route element={<Termopage/>}index={true} /> */}
            <Route element={<Pesopage />} path="peso" />
            <Route element={<LogOut />} path="logout" />
            <Route element={<Configuracion />} path="settings" />
            <Route element={<DevicePage />} index={true} />
            <Route element={<HomeResultados />} path="resultados" />
            <Route element={<Zonas />} path="zonas" />
            <Route element={<Areas />} path="areas" />
            {/* <Route errorElement={<NotFound/>} path=""/> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeConfig>
  </Provider>
);
