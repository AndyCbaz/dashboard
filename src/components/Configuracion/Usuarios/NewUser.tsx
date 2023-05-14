import React, { useState, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import NativeSelect from "@mui/material/NativeSelect";
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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectDataCliente, setDataCliente } from "../../../features/userSlice";

import {
  selectComboGateways,
  setComboGateways,
} from "../../../features/cliente/clientComboMacgateways";
import { createUser } from "../../../services/Configuracion/createUser";
import useForm from "../../../hooks/useForm";
import { initialValues } from "../../../helpers/Login/formProps";
import { getComboGateways } from "../../../services/Configuracion/getComboGateways";
import { toast } from "react-toastify";

const NewUser = ({close}:any) => {
  //redux
  const dispatch = useAppDispatch();
  const idcliente = Number(localStorage.getItem('idcliente'))
  
  const comboGateways = useAppSelector(selectComboGateways);
  const [mac, setMac] = useState("");

  const handleChangeSelectMac = (event: SelectChangeEvent) => {
    setMac(event.target.value);
  };

  const { form, handleChange, handleSubmit } = useForm(initialValues);

  useEffect(() => {
    getComboGateways(idcliente)
    .then((data)=>{
      if(data!==undefined){
        dispatch(setComboGateways(data))
      }
    });
    
  }, []);

  const handleShowError = () => {
    toast.warning("Campos de Texto Vacios");
  }

  const handleCreateUser = () => {
    if (form.nombre !== "") {
      if (mac !== "") {
        createUser(idcliente, form.nombre, mac).then((data) => {
          console.log(data);
        });
      }
    }else{
      handleShowError();
    }
  };

  

  return (
    <React.Fragment>
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
          Agregar Usuario
        </Typography>
        <Divider />

        {/* INPUT NOMBRE */}
        {/* box padre 1 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            gap: 2,
            // border:'solid'
          }}
        >
          {/* nombre */}
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",

                // border:'solid'
              }}
            >
              {/* nombre */}

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body2">Nombre </Typography>
              </Box>
              {/* input */}
              <Box>
                <Input
                  sx={{
                    px: 1,
                    background: themeColors.GRAY2,
                    borderRadius: 4,
                  }}
                  value={form.nombre}
                  id="newuser"
                  type="text"
                  name="nombre"
                  disableUnderline
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <ConstructionIcon />
                    </InputAdornment>
                  }
                />
              </Box>
              {/* MAC */}
              <Box>
                <Typography variant="body2">MAC</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <FormControl variant="standard" fullWidth size="small">
                  {/* <InputLabel id="demo-simple-select-label">ID</InputLabel> */}
                  <Select
                    sx={{ display: "flex", px: 1 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={mac}
                    disableUnderline
                    label="Age"
                    onChange={handleChangeSelectMac}
                  >
                    {comboGateways.map((gateway: any) => (
                      <MenuItem
                        key={gateway.macgateway}
                        value={gateway.idmacgateway}
                      >
                        {gateway.macgateway}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </form>
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
    </React.Fragment>
  );
};

export default NewUser;
