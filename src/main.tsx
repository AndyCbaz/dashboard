import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeConfig } from "./config/theme.config";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect,
  BrowserRouter,
} from "react-router-dom";
import Home from "./views/Home";

import { Pesopage } from "./components/Peso/Pesopage";
import { LogOut } from "./components/LogOut/LogOut";
import { Configuracion } from "./components/Configuracion/ConfiguracionPage";
import { NotFound } from "./views/NotFound";
import { DevicePage } from "./components/Termohigrometro/Secundario/DevicePage";
import { HomeResultados } from "./components/Termohigrometro/Resultados/HomeResultados";
import { Zonas } from "./components/Areas/Zonas/ZonasPage";
import { AreasPage } from "./components/Areas/AreasPage";
import { LoginPage } from "./views/LoginPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Cliente } from "./components/Login/Cliente";
import { Usuario } from "./components/Login/Usuario";
import { ProtectedRoutes } from "./routes/RutaProtegida";
import { ProtectedRoutesLogin } from "./routes/RutaProtegidaLogin";
import { Areas } from "./components/Areas/Areas/Areas";
import { Dispositivos } from "./components/Areas/Dispositivos/DispositivosPage";
import { UsuariosPage } from "./components/Configuracion/Usuarios/UsuariosPage";
import { SettingsOptions } from "./components/Configuracion/SettingsOptions";
import { NewClient } from "./components/Login/NewClient";
import { GatewaysPage } from "./components/Gateways/GatewaysPage";


if(localStorage.getItem('cliente')===null){
  localStorage.setItem('cliente','')
}
if(localStorage.getItem('usuario')===null){
  localStorage.setItem('usuario','')
}


const RoutesTSX = (
  <>
    <Route
      path="/*"
      element={
        <ProtectedRoutesLogin>
          <LoginPage />
        </ProtectedRoutesLogin>
      }
    >
      <Route  element={<Cliente />} index={true} />
      <Route path="loguser" element={<Usuario />} />
      <Route path="register" element={<NewClient />} />
      
    </Route>
    <Route
      path="/home/*"
      element={
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      }
    >
      <Route element={<DevicePage />} index={true} />
      <Route element={<Pesopage />} path="peso" />
      <Route element={<GatewaysPage />} path="gateways" />
      <Route element={<LogOut />} path="logout" />
      <Route element={<Configuracion />} path="settings/*">
        <Route element={<SettingsOptions />} index={true} />
        <Route element={<UsuariosPage />} path="usuarios/" />
      </Route>
      <Route element={<HomeResultados />} path="resultados" />
      <Route element={<AreasPage />} path="areas/*">
        <Route element={<Areas />} index={true} />
        <Route element={<Zonas />} path="zonas/" />
        <Route element={<Dispositivos />} path="zonas/dispositivos/" />
      </Route>
    </Route>

    <Route path="/*" element={<NotFound />} />
  </>
);

const routes = createRoutesFromElements(RoutesTSX);
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeConfig>
      <RouterProvider router={router} />
    </ThemeConfig>
  </Provider>
  // </React.StrictMode>
);
