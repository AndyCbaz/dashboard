import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import ConstructionIcon from "@mui/icons-material/Construction";
import ShowerIcon from "@mui/icons-material/Shower";
import { Button } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SaveIcon from "@mui/icons-material/Save";
import { themeColors } from "../../../helpers/theme/theme.colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useForm from "../../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectAreasByClient,
  selectUsersByClient,
  selectZonasByClient,
  setAreasByClient,
  setUsersByClient,
  setZonasByClient,
} from "../../../features/cliente/clientComboMacgateways";
import { getUsersByClient } from "../../../services/DevicePage/cliente/getUsersByClient";
import { getAreas } from "../../../services/Areas/getAreas";
import { getZonas } from "../../../services/DevicePage/cliente/getZonas";
import { initialValues } from "../../../helpers/Login/formProps";
import { toast } from "react-toastify";
import { createDevice } from "../../../services/Areas/crearDispositivo";

export const NewDevice = () => {
  const [userid, setUserId] = useState("");
  const [gatewayid, setGatewayId] = useState("");

  //redux
  const usuariosByClient = useAppSelector(selectUsersByClient);
  const areasByClient = useAppSelector(selectAreasByClient);
  const zonasByClient = useAppSelector(selectZonasByClient);
  const idcliente = localStorage.getItem("idcliente");

  const idarea = Number(localStorage.getItem("idarea"));
  const idzona = Number(localStorage.getItem("idzona"));

  const handleChangeSelectUser = (event: SelectChangeEvent) => {
    setUserId(event.target.value);
    const result = usuariosByClient.filter((data: any) => {
      return data.idusuario === event.target.value;
    });
    // console.log(result)
    setGatewayId(result[0].idmacgateway)
  };

  const dispatch = useAppDispatch();
  const { form, handleChange, handleSubmit } = useForm(initialValues);
  const handleShowServerToast = () => {
    toast.warning("Campos Incorrectos");
  };
  const handleCreateUser = async () => {
    if (
      form.nombredevice === "" ||
      form.tmaxdevice === "" ||
      form.tmindevice === "" ||
      form.hmaxdevice === "" ||
      form.hmindevice === ""
    ) {
      handleShowServerToast();
    } else {
      createDevice(
        form.nombredevice,
        Number(userid),
        Number(gatewayid),
        Number(idarea),
        Number(idzona),
        Number(form.tmaxdevice),
        Number(form.tmindevice),
        Number(form.hmaxdevice),
        Number(form.tmindevice)
      ).then((data) => {
        if (data !== undefined) {
          console.log(data);
        }
      });
      // console.log(form.nombredevice)
      // console.log(idusuario)
      // console.log(Number(user))
      // console.log(Number(idarea))
      // console.log(Number(idzona))
      // console.log(Number(form.tmaxdevice))
      // console.log(Number(form.tmindevice))
      // console.log(Number(form.hmaxdevice))
      // console.log(Number(form.tmindevice))
    }
  };
  useEffect(() => {
    if (usuariosByClient.length === 0) {
      getUsersByClient(Number(idcliente)).then((data) => {
        if (data !== undefined) {
          dispatch(setUsersByClient(data));
        }
      });
    }
    if (areasByClient.length === 0) {
      getAreas(Number(idcliente)).then((data) => {
        if (data !== undefined) {
          dispatch(setAreasByClient(data));
        }
      });
    }

    if (zonasByClient.length === 0) {
      getZonas(Number(idcliente)).then((data) => {
        if (data !== undefined) {
          dispatch(setZonasByClient(data));
        }
      });
    }
  }, []);

useEffect(()=>{
console.log(userid)
console.log(gatewayid)
},[userid,gatewayid])

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 2,
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Agregar Dispositivo
          </Typography>
          <Divider />

          {/* INPUT NOMBRE */}
          <Box sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}>
            <Typography variant="body1">Nombre </Typography>
          </Box>
          <Input
            sx={{
              px: 1,
              background: themeColors.GRAY2,
              borderRadius: 4,
            }}
            id="nombrenewdevice"
            type="text"
            name="nombredevice"
            value={form.nombredevice}
            onChange={handleChange}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <ConstructionIcon />
              </InputAdornment>
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* USUARIO */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
                textAlign: "center",
                // border:'solid'
              }}
            >
              <Box>
                <Typography sx={{textAlign:'start'}}>Usuario</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <FormControl fullWidth variant="filled" size="small" >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userid}
                    disableUnderline
                    
                    sx={{height:'30px', pb:2}}

                    label="Age"
                    onChange={handleChangeSelectUser}
                  >
                    {usuariosByClient.map((user: any) => (
                      <MenuItem value={user.idusuario} key={user.idusuario}>
                        {user.nombreusuario}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {/* AREA */}
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "80px",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography>ÁREA</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <FormControl fullWidth variant="filled">
                  
                  <Select
                    labelId="area"
                    id="areaId"
                    disableUnderline
                    value={area}
                    label="Age"
                    onChange={handleChangeSelectArea}
                  >
                    {areasByClient.map((area: any) => (
                      <MenuItem key={area.idarea} value={area.idarea}>
                        {area.nombrearea}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box> */}
            {/* ZONA */}
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "80px",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography>ZONA</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <FormControl fullWidth variant="filled">
                  
                  <Select
                    labelId="zona"
                    id="demo-simple-select"
                    value={zona}
                    disableUnderline
                    label="Zona"
                    onChange={handleChangeSelectZona}
                  >
                    {zonasByClient.map((zona: any) => (
                      <MenuItem key={zona.idzona} value={zona.idzona}>
                        {zona.nombrezona}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box> */}
          </Box>
          {/* INPUT TEMPERATURA MAXIMA y MINIMA */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body2">Temperatura Máxima </Typography>
              </Box>
              <Input
                sx={{
                  px: 1,
                  background: themeColors.GRAY2,
                  borderRadius: 4,
                }}
                disableUnderline
                id="tmaxdevice"
                type="number"
                name="tmaxdevice"
                value={form.tmaxdevice}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <DeviceThermostatIcon />
                  </InputAdornment>
                }
              />
            </Box>
            <Box>
              {/* INPUT TEMPERATURA MINIMA */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body2">Temperatura Mínima </Typography>
              </Box>
              <Input
                sx={{
                  px: 1,
                  background: themeColors.GRAY2,
                  borderRadius: 4,
                }}
                id="tmindevice"
                type="number"
                name="tmindevice"
                value={form.tmindevice}
                onChange={handleChange}
                disableUnderline
                startAdornment={
                  <InputAdornment position="start">
                    <DeviceThermostatIcon />
                  </InputAdornment>
                }
              />
            </Box>
          </Box>
          {/* INPUT HUMEDAD MAXIMA Y MINIMA */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body2">Humedad Máxima </Typography>
              </Box>
              <Input
                sx={{
                  px: 1,
                  background: themeColors.GRAY2,
                }}
                disableUnderline
                id="hmaxdevice"
                type="number"
                name="hmaxdevice"
                value={form.hmaxdevice}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <ShowerIcon />
                  </InputAdornment>
                }
              />
            </Box>

            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body2">Humedad Mínima </Typography>
              </Box>
              <Input
                sx={{
                  px: 1,
                  background: themeColors.GRAY2,
                  borderRadius: 4,
                }}
                disableUnderline
                id="hmindevice"
                type="number"
                name="hmindevice"
                value={form.hmindevice}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <ShowerIcon />
                  </InputAdornment>
                }
              />
            </Box>
          </Box>

          {/* </FormControl> */}
        </Box>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ width: "50%" }}
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleCreateUser}
          >
            Guardar
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};
