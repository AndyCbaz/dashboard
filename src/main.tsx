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
  BrowserRouter
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
import { dataLoader } from "./helpers/Apis/loader";


const RoutesTSX = (
  <>
    <Route
      path="/"
      element={
        <ProtectedRoutesLogin>
          <LoginPage />
        </ProtectedRoutesLogin>
      }
    >
      <Route index={true} element={<Cliente />} />
      <Route path="loguser" element={<Usuario />} />
    </Route>
    <Route
      path="home/*"
      element={
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      }
      
    >
      <Route element={<DevicePage />} index={true} loader={dataLoader} />
      <Route element={<Pesopage />} path="peso" />
      <Route element={<LogOut />} path="logout" />
      <Route element={<Configuracion />} path="settings" />
      <Route element={<HomeResultados />} path="resultados" loader={dataLoader} />
      <Route element={<Zonas />} path="zonas" />
      <Route element={<AreasPage />} path="areas/*">
        <Route element={<Areas />} index={true} />
        <Route element={<Zonas />} path="zonas/" />
        <Route element={<Dispositivos />} path="zonas/dispositivos/" />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
    
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
