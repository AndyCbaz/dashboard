import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { initialValues } from "../../helpers/Login/formProps";
import useForm from "../../hooks/useForm";

import FormControl from "@mui/material/FormControl";
import { themeColors } from "../../helpers/theme/theme.colors";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAllDevices, setDevicesSelected, setResumenAllDevicesSelected } from "../../features/cliente/clientComboMacgateways";
import { getDataDevicesResumen } from "../../services/DevicePage/getDataDevicesResumen";

export const SearchSection = () => {
  const { form, handleSubmit, handleChange } = useForm(initialValues);
  const alldevices = useAppSelector(selectAllDevices);
  const dispatch = useAppDispatch()
  const handleClickSearch = () => {
    let a = alldevices.filter((element: any) => {
      return element.nombreDispositivo === form.search;
    });
    dispatch(setDevicesSelected(a))
// console.log(a[0].iddispositivo)
// console.log(a[0].idmacgateway)
getDataDevicesResumen(a[0].idmacgateway,a[0].iddispositivo)
.then((data)=>{
  let b = [];
  if(data!==undefined){
    console.log(data)
    b.push(data)
    
  }else{
    let dataError = {
      bateria: null,
      nivelSenial: null,
      actualTemp: null,
      maximoTemp: null,
      minimoTemp: null,
      avgTemp: null,
      actualHum: null,
      maximoHum: null,
      minimoHum: null,
      avgHum: null,
      infoset: false,
    };
    b.push(dataError)
  }
  dispatch(setResumenAllDevicesSelected(b))
})

  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl variant="standard" sx={{ flexGrow: 1 }}>
        <Input
          sx={{
            border: { sm: "none", xs: "solid" },
            borderColor: { xs: themeColors.BLUE1 },
            borderRadius: 2,
            p: 0.5,
            // "&:hover": {color: themePalette.GREEN_C}
          }}
          id="search"
          name="search"
          value={form.search}
          onChange={handleChange}
          disableUnderline
          placeholder="Buscar..."
          endAdornment={
            <IconButton onClick={handleClickSearch}>
              <SearchIcon
                sx={{
                  borderRadius: 3,
                  scale: "130%",
                  minWidth: 0,
                  color: themeColors.BLUE1,
                }}
              />
            </IconButton>
          }
        />
      </FormControl>
    </form>
  );
};
