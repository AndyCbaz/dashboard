import React, { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link, { LinkProps } from "@mui/material/Link";
import {
  MemoryRouter,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import Typography from "@mui/material/Typography";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}
const breadcrumbNameMap: { [key: string]: string } = {
  
  "/usuarios": "Usuarios",
};

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}
export const RouterBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const pathnames2 = pathnames.slice(2,pathnames.length+1)

  return (
    // <MemoryRouter initialEntries={['/home/areas']} initialIndex={0}>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter underline="hover" color="inherit" to="/home/settings">
          Configuración
        </LinkRouter>
        {pathnames2.map((value, index) => {
        const last = index === pathnames2.length - 1;
        const to = `/${pathnames2.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={`/home/settings${to}`} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
      </Breadcrumbs>
    // </MemoryRouter>
  );
};
